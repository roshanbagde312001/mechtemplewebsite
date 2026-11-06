import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
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
    app.use(express.static(path.resolve(rootDir, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(rootDir, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Korvantage Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
