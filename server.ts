import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.disable('x-powered-by');
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));

// Initialize GoogleGenAI server-side client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// API endpoint for Text-to-Video generation using gemini-omni-1.1-flash via Interactions API
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, aspectRatio = '16:9', duration = '5s', resolution = '720p' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'A text prompt is required for video generation.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured in environment. Please configure your API key in Secrets.',
      });
    }

    const client = ai || new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Ensure valid aspect ratio according to specification ('16:9' or '9:16')
    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    // Call Interactions API with gemini-omni-1.1-flash
    const interaction = await client.interactions.create(
      {
        model: 'gemini-omni-1.1-flash',
        input: prompt,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: validAspectRatio,
          duration: duration === '10s' ? '10s' : '5s',
          resolution: resolution === '1080p' ? '1080p' : '720p',
        },
      },
      { timeout: 300000 }
    );

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      const mimeType = videoPart.mime_type || 'video/mp4';
      return res.json({
        success: true,
        videoData: `data:${mimeType};base64,${videoPart.data}`,
        mimeType,
        aspectRatio: validAspectRatio,
        prompt,
      });
    } else if (videoPart && videoPart.uri) {
      return res.json({
        success: true,
        videoUri: videoPart.uri,
        mimeType: videoPart.mime_type || 'video/mp4',
        aspectRatio: validAspectRatio,
        prompt,
      });
    } else {
      return res.status(500).json({
        error: 'Model did not return a valid video payload.',
        details: interaction,
      });
    }
  } catch (error: any) {
    console.error('Error generating video:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate video with gemini-omni-1.1-flash.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const rootDir = process.cwd();

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: rootDir,
    });
    app.use(vite.middlewares);
  } else {
    const dist = path.resolve(rootDir, 'dist');
    const notFoundPage = path.join(dist, '404.html');

    app.use((_req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      next();
    });

    // One URL per page: /about/ -> /about (the query string is kept).
    app.use((req, res, next) => {
      if (req.path.length > 1 && req.path.endsWith('/')) {
        const query = req.originalUrl.slice(req.originalUrl.indexOf('?') === -1 ? req.originalUrl.length : req.originalUrl.indexOf('?'));
        return res.redirect(301, req.path.replace(/\/+$/, '') + query);
      }
      next();
    });

    /** Sends a file, using the pre-compressed .br/.gz copy written at build time when the browser accepts it. */
    const sendFile = (req: express.Request, res: express.Response, file: string, status = 200) => {
      const accepts = String(req.headers['accept-encoding'] ?? '');
      const variant = accepts.includes('br') && fs.existsSync(`${file}.br`) ? 'br' : accepts.includes('gzip') && fs.existsSync(`${file}.gz`) ? 'gzip' : '';
      res.status(status).type(path.extname(file));
      res.setHeader('Vary', 'Accept-Encoding');
      // Hashed build assets never change; HTML and root files must always be revalidated.
      res.setHeader('Cache-Control', file.startsWith(path.join(dist, 'assets') + path.sep) && /-[A-Za-z0-9_-]{8}\.(js|css)$/.test(file)
        ? 'public, max-age=31536000, immutable'
        : file.endsWith('.html') ? 'no-cache' : 'public, max-age=86400');
      if (variant) res.setHeader('Content-Encoding', variant);
      res.sendFile(variant ? `${file}.${variant === 'br' ? 'br' : 'gz'}` : file);
    };

    app.get('*', (req, res) => {
      let requested: string;
      try { requested = decodeURIComponent(req.path); } catch { return sendFile(req, res, notFoundPage, 404); }
      const target = path.normalize(path.join(dist, requested));
      if (!target.startsWith(dist)) return sendFile(req, res, notFoundPage, 404);
      // Real files (assets, sitemap.xml, robots.txt, favicon.ico, ...). Pre-compressed copies are never served directly.
      if (!/\.(br|gz)$/.test(target) && fs.existsSync(target) && fs.statSync(target).isFile()) return sendFile(req, res, target);
      // Pages: each route was written to <route>/index.html at build time; anything else is a real 404.
      const page = requested === '/' ? path.join(dist, 'index.html') : path.join(target, 'index.html');
      if (fs.existsSync(page)) return sendFile(req, res, page);
      return sendFile(req, res, notFoundPage, 404);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PrimpTech server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
