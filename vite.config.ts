import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { defineConfig, type Plugin } from 'vite';
import { BRAND, SERVICES, SHORT_DESCRIPTION, COMPANY } from './src/site/content';
import { NOT_FOUND, ROUTES, SITE_URL, absolute, renderHead } from './src/site/seo';

/**
 * Production-only: writes a static HTML file per route with its own <head> (title, description, canonical,
 * Open Graph/Twitter tags, JSON-LD), plus 404.html, sitemap.xml, robots.txt and llms.txt, then pre-compresses
 * text assets (.br/.gz) for server.ts to serve. Route data comes from src/site/seo.ts.
 */
function seoPages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'primptech-seo-pages',
    apply: 'build',
    configResolved(config) { outDir = path.resolve(config.root, config.build.outDir); },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const marker = /<!--seo:head-->[\s\S]*?<!--\/seo:head-->/;
      if (!marker.test(template)) throw new Error('index.html is missing the <!--seo:head--> marker');
      const write = (file: string, content: string) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, content);
      };

      for (const route of ROUTES) {
        const file = route.path === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.path.slice(1), 'index.html');
        write(file, template.replace(marker, renderHead(route)));
      }
      write(path.join(outDir, '404.html'), template.replace(marker, renderHead(NOT_FOUND)));

      const lastmod = new Date().toISOString().slice(0, 10);
      write(path.join(outDir, 'sitemap.xml'), [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...ROUTES.map((route) => `  <url><loc>${absolute(route.path)}</loc><lastmod>${lastmod}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority.toFixed(1)}</priority></url>`),
        '</urlset>',
        '',
      ].join('\n'));

      write(path.join(outDir, 'robots.txt'), ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'));

      // llms.txt (https://llmstxt.org): a plain-language map of the site for AI assistants and crawlers.
      const section = (name: string) => ROUTES.filter((route) => route.group === name).map((route) => `- [${route.heading}](${absolute(route.path)}): ${route.description}`);
      write(path.join(outDir, 'llms.txt'), [
        `# ${BRAND}`,
        '',
        `> ${SHORT_DESCRIPTION}`,
        '',
        `${BRAND} works across ${SERVICES.length} services: ${SERVICES.map((service) => service.title).join(', ')}. Custom development is the core offering; products are presented as available only once they are developed, tested and ready.`,
        '',
        `Contact: ${COMPANY.email}`,
        '',
        '## Main pages',
        ...section('Main'),
        '',
        '## Services',
        ...section('Services'),
        '',
        '## Company',
        ...section('Company'),
        '',
        '## Optional',
        ...section('Legal'),
        '',
      ].join('\n'));

      // Pre-compress text files so the server can send Brotli/gzip without compressing on every request.
      const compressible = /\.(html|js|css|xml|txt|json|svg|webmanifest)$/;
      const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      });
      for (const file of walk(outDir)) {
        if (!compressible.test(file)) continue;
        const data = fs.readFileSync(file);
        if (data.length < 1024) continue;
        fs.writeFileSync(`${file}.br`, zlib.brotliCompressSync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: data.length } }));
        fs.writeFileSync(`${file}.gz`, zlib.gzipSync(data, { level: 9 }));
      }
    },
  };
}

export default defineConfig(() => {
  const rootDir = import.meta.dirname || path.resolve();
  return {
    plugins: [react(), tailwindcss(), seoPages()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      // No source maps in production: they would publish the full original source.
      sourcemap: false,
      // Keep the 3D engine in its own long-cached chunk.
      chunkSizeWarningLimit: 700,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
