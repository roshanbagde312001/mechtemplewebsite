import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { defineConfig, type Plugin } from 'vite';
import { execSync } from 'node:child_process';
import {
  BRAND, COMMITMENTS, COMPANY, FOUNDER, INDUSTRIES, LIFECYCLE, MARKETS, MEDIUM_DESCRIPTION, PROJECTS, QUESTIONS, SERVICES, SERVICE_SEO, SHORT_DESCRIPTION, SOLUTIONS, serviceSlug,
} from './src/site/content';
import { BRAND_ALIASES, NOT_FOUND, ROUTES, SITE_URL, absolute, renderHead } from './src/site/seo';
import { ARTICLES, plainText } from './src/site/resources';

/**
 * Production-only: writes a static HTML file per route with its own <head> (title, description, canonical,
 * Open Graph/Twitter tags, JSON-LD) and its prerendered <body> content (src/entry-server.tsx), plus 404.html,
 * sitemap.xml, robots.txt and llms.txt, then pre-compresses text assets (.br/.gz) for server.ts to serve.
 * Route data comes from src/site/seo.ts.
 */

/** Date of the last commit touching site content or code; the build date only if git is unavailable. */
function lastContentChange(root: string) {
  try {
    const iso = execSync('git log -1 --format=%cI -- src public index.html', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (iso) return iso.slice(0, 10);
  } catch { /* not a git checkout (e.g. some CI caches) */ }
  return new Date().toISOString().slice(0, 10);
}
function seoPages(): Plugin {
  let outDir = 'dist';
  let root = process.cwd();
  // CSS and JS of the lazily loaded page chunks, read from the bundle graph in writeBundle. The prerendered HTML links
  // them in <head> so the page is styled at first paint (otherwise pages.css arrives with the lazy chunk and the whole
  // layout shifts: CLS ~0.7 measured) and hydration starts sooner (modulepreload instead of a request waterfall).
  const chunkAssets: Record<'inner' | 'home', { css: string[]; js: string[] }> = { inner: { css: [], js: [] }, home: { css: [], js: [] } };
  return {
    name: 'primptech-seo-pages',
    apply: 'build',
    configResolved(config) { root = config.root; outDir = path.resolve(config.root, config.build.outDir); },
    writeBundle(_options, bundle) {
      const chunks = Object.values(bundle).filter((item): item is Extract<typeof item, { type: 'chunk' }> => item.type === 'chunk');
      const byFile = new Map(chunks.map((chunk) => [chunk.fileName, chunk]));
      const collect = (suffix: string) => {
        const start = chunks.find((chunk) => chunk.facadeModuleId?.replace(/\\/g, '/').endsWith(suffix));
        if (!start) throw new Error(`No chunk for ${suffix}`);
        const js = new Set<string>();
        const css = new Set<string>();
        const visit = (fileName: string) => {
          const chunk = byFile.get(fileName);
          if (!chunk || chunk.isEntry || js.has(fileName)) return;
          js.add(fileName);
          (chunk as { viteMetadata?: { importedCss: Set<string> } }).viteMetadata?.importedCss.forEach((file) => css.add(file));
          chunk.imports.forEach(visit);
        };
        visit(start.fileName);
        return { css: [...css], js: [...js] };
      };
      chunkAssets.inner = collect('/src/site/pages/index.tsx');
      chunkAssets.home = collect('/src/site/Site.tsx');
    },
    async closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const marker = /<!--seo:head-->[\s\S]*?<!--\/seo:head-->/;
      const rootDiv = '<div id="root"></div>';
      if (!marker.test(template)) throw new Error('index.html is missing the <!--seo:head--> marker');
      if (!template.includes(rootDiv)) throw new Error(`index.html is missing ${rootDiv}`);
      const write = (file: string, content: string) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, content);
      };

      // Prerender each page's body with React, loaded through Vite's SSR module loader (same source as the client bundle).
      const { createServer } = await import('vite');
      // Own cache dir and no browser dependency optimizing: this server runs with NODE_ENV=production, and sharing
      // node_modules/.vite with `npm run dev` would put production React into the dev server's cache
      // ("_jsxDEV is not a function" in the browser). SSR loads node_modules directly and needs no optimized deps.
      const ssr = await createServer({
        root, logLevel: 'error', appType: 'custom',
        cacheDir: path.join(root, 'node_modules/.vite-prerender'),
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true, hmr: false, ws: false, watch: null },
      });
      try {
        const { render } = await ssr.ssrLoadModule('/src/entry-server.tsx') as { render: (path: string) => Promise<string> };
        for (const route of [...ROUTES, NOT_FOUND]) {
          const body = await render(route.path);
          if (!body.includes('<h1')) throw new Error(`Prerendered ${route.path} has no <h1>`);
          const assets = route.path === '/' ? chunkAssets.home : chunkAssets.inner;
          const links = [...assets.css.map((file) => `<link rel="stylesheet" href="/${file}" />`), ...assets.js.map((file) => `<link rel="modulepreload" href="/${file}" />`)].join('\n    ');
          // After Vite's own entry CSS (end of <head>) so pages.css keeps overriding index.css exactly as before.
          const html = template.replace(marker, () => renderHead(route)).replace('</head>', () => `  ${links}\n  </head>`).replace(rootDiv, () => `<div id="root">${body}</div>`);
          const file = route === NOT_FOUND ? path.join(outDir, '404.html') : route.path === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.path.slice(1), 'index.html');
          write(file, html);
        }
      } finally {
        await ssr.close();
      }

      const lastmod = lastContentChange(root);
      write(path.join(outDir, 'sitemap.xml'), [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...ROUTES.map((route) => `  <url><loc>${absolute(route.path)}</loc><lastmod>${route.lastmod ?? lastmod}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority.toFixed(1)}</priority></url>`),
        '</urlset>',
        '',
      ].join('\n'));

      // robots.txt: everything public is crawlable, including by AI search crawlers (no bot-specific blocks). /api/ only
      // exists on the Node server (server.ts) and has nothing to index. Disallow does not remove URLs from an index.
      write(path.join(outDir, 'robots.txt'), [
        `# robots.txt for ${SITE_URL}`,
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
        '',
      ].join('\n'));

      // llms.txt (https://llmstxt.org): a plain-language map of the site for AI assistants. Every line comes from
      // content.ts / seo.ts, the same verified copy the pages show.
      const section = (name: string) => ROUTES.filter((route) => route.group === name).map((route) => `- [${route.heading}](${absolute(route.path)}): ${route.description}`);
      write(path.join(outDir, 'llms.txt'), [
        `# ${BRAND}`,
        '',
        `> ${SHORT_DESCRIPTION}`,
        '',
        ...MEDIUM_DESCRIPTION.flatMap((paragraph) => [paragraph, '']),
        '## Company facts',
        `- Name: ${BRAND} (also written ${BRAND_ALIASES.join(', ')})`,
        `- Website: ${absolute('/')}`,
        `- Type: AI, software engineering and automation company; custom development is the core offering`,
        `- Founder: ${FOUNDER.name} (${FOUNDER.role}); focus: ${FOUNDER.focus}`,
        `- Email: ${COMPANY.email}`,
        `- Contact page: ${absolute('/contact')}`,
        ...(COMPANY.phone ? [`- Phone: ${COMPANY.phone}`] : []),
        ...(COMPANY.address ? [`- Address: ${COMPANY.address}`] : []),
        `- Markets: ${MARKETS.join(', ')} (India is the primary market)`,
        ...COMPANY.socials.map((social) => `- ${social.label}: ${social.href}`),
        '',
        '## Services',
        ...SERVICES.map((service, i) => `- [${service.title}](${absolute(`/services/${serviceSlug(i)}`)}): ${SERVICE_SEO[i].answer}`),
        '',
        '## Solutions (systems built by combining services; engineered per customer, not sold off the shelf)',
        ...SOLUTIONS.map((solution, i) => `- [${solution.title}](${absolute('/solutions')}#solution-${i + 1}): ${solution.description}`),
        '',
        '## Industries',
        `Details: ${absolute('/industries')}`,
        ...INDUSTRIES.map((industry) => `- ${industry}`),
        '',
        '## Work (products and projects in development; no client results are claimed)',
        ...PROJECTS.map((project) => `- ${project.name} (${project.category}): ${project.description}`),
        '',
        '## Delivery process',
        `Details: ${absolute('/process')}`,
        ...LIFECYCLE.map((stage, i) => `${i + 1}. ${stage.title}: ${stage.items.join(', ')}`),
        '',
        '## Commitments (how the company describes its work)',
        ...COMMITMENTS.map((item) => `- ${item.title}: ${item.detail}`),
        '',
        '## Main pages',
        ...section('Main'),
        '',
        ...(ARTICLES.length ? ['## Guides', ...section('Resources'), ''] : []),
        '## Company pages',
        ...section('Company'),
        '',
        '## Optional',
        ...section('Legal'),
        `- [Sitemap](${SITE_URL}/sitemap.xml)`,
        `- [Full text for AI assistants](${SITE_URL}/llms-full.txt): every service, FAQ and guide in plain text`,
        '',
      ].join('\n'));

      // llms-full.txt: the same facts plus the full text of service pages (scope, definitions, FAQs, comparisons) and guides.
      const table = (caption: string, columns: readonly string[], rows: readonly (readonly string[])[]) =>
        [`${caption}:`, `| ${columns.join(' | ')} |`, `| ${columns.map(() => '---').join(' | ')} |`, ...rows.map((row) => `| ${row.join(' | ')} |`)];
      write(path.join(outDir, 'llms-full.txt'), [
        `# ${BRAND}: full reference`,
        '',
        `> ${SHORT_DESCRIPTION}`,
        '',
        `Official website: ${absolute('/')}. Short version: ${SITE_URL}/llms.txt. Everything below is the text published on the website.`,
        `Markets: ${MARKETS.join(', ')} (India is the primary market). Office: ${COMPANY.address || 'not published'}. Email: ${COMPANY.email}.`,
        '',
        ...SERVICES.flatMap((service, i) => {
          const seo = SERVICE_SEO[i];
          return [
            `## ${service.title}`,
            `URL: ${absolute(`/services/${serviceSlug(i)}`)}`,
            '',
            `${seo.question} ${seo.answer}`,
            '',
            ...service.groups.map((group) => `- ${group.heading}: ${group.items.join(', ')}`),
            ...(service.note ? ['', `Note: ${service.note}`] : []),
            ...(seo.compare ? ['', ...table(seo.compare.caption, seo.compare.columns, seo.compare.rows)] : []),
            '',
            'Frequently asked questions:',
            ...seo.faqs.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`]),
            '',
          ];
        }),
        '## General questions',
        ...QUESTIONS.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`]),
        '',
        ...ARTICLES.flatMap((article) => [
          `## Guide: ${article.title}`,
          `URL: ${absolute(`/resources/${article.slug}`)} (published ${article.published}, updated ${article.updated}, by ${BRAND})`,
          '',
          plainText(article.summary),
          '',
          ...article.sections.flatMap((section) => [
            `### ${section.heading}`,
            ...section.blocks.flatMap((block) => block.type === 'p' ? [plainText(block.text)]
              : block.type === 'list' ? block.items.map((item, n) => `${block.ordered ? `${n + 1}.` : '-'} ${plainText(item)}`)
              : table(block.caption, block.columns, block.rows)),
            '',
          ]),
          'Frequently asked questions:',
          ...article.faqs.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`]),
          '',
        ]),
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
