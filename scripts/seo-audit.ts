// Automated technical SEO audit. Crawls every discoverable public page over HTTP and writes:
//   <out>/SEO_AUDIT_REPORT.md       summary, score, site-level checks, every FAIL/WARNING
//   <out>/SEO_VALIDATION_REPORT.md  every check on every page, with evidence
//   <out>/SEO_PAGE_INVENTORY.csv    one row per page (title, description, canonical, headings, schema, ...)
//
// Usage:
//   npx tsx scripts/seo-audit.ts --base http://localhost:4173          (a local production build: npm run seo:test)
//   npx tsx scripts/seo-audit.ts --base https://www.primptech.com --live   (production; adds domain/redirect checks)
// Options: --origin <canonical origin> (default https://www.primptech.com), --out <dir> (default seo-reports)
// Exit code 1 when any check FAILs, so it can gate a deployment. No dependencies beyond Node 20+.

import fs from 'node:fs';
import path from 'node:path';

type Status = 'PASS' | 'FAIL' | 'WARNING' | 'NOT APPLICABLE' | 'NOT VERIFIED';
type Result = { id: string; check: string; status: Status; evidence: string };
type Fetched = { url: string; status: number; location: string | null; headers: Headers; body: string; bytes: Buffer };

const args = process.argv.slice(2);
const arg = (name: string, fallback = '') => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
const BASE = arg('base', 'http://localhost:4173').replace(/\/$/, '');
const ORIGIN = arg('origin', 'https://www.primptech.com').replace(/\/$/, '');
const OUT = arg('out', 'seo-reports');
const LIVE = args.includes('--live');

// ---------- HTTP ----------
const cache = new Map<string, Promise<Fetched>>();
function get(url: string): Promise<Fetched> {
  if (!cache.has(url)) {
    cache.set(url, (async () => {
      for (let attempt = 0; ; attempt++) {
        try {
          const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'primptech-seo-audit/1.0', 'Accept-Encoding': 'gzip, br' } });
          const bytes = Buffer.from(await res.arrayBuffer());
          return { url, status: res.status, location: res.headers.get('location'), headers: res.headers, body: bytes.toString('utf8'), bytes };
        } catch (error) {
          if (attempt >= 2) return { url, status: 0, location: null, headers: new Headers(), body: String(error), bytes: Buffer.alloc(0) };
        }
      }
    })());
  }
  return cache.get(url)!;
}
/** Canonical-origin URL -> URL on the server being audited. */
const toBase = (url: string) => (url.startsWith(ORIGIN) ? BASE + url.slice(ORIGIN.length) : url);
const toOrigin = (url: string) => (url.startsWith(BASE) ? ORIGIN + url.slice(BASE.length) : url);
const pathOf = (url: string) => new URL(url).pathname;

// ---------- HTML helpers (the site's own markup is regular enough for targeted parsing) ----------
const decode = (text: string) => text
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const stripTags = (html: string) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const attr = (tag: string, name: string) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i')); return m ? decode(m[2] ?? m[3] ?? '') : null; };
const tags = (html: string, name: string) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => m[0]);
const metaContent = (head: string, key: 'name' | 'property', value: string) => {
  const tag = tags(head, 'meta').find((t) => (attr(t, key) ?? '').toLowerCase() === value.toLowerCase());
  return tag ? attr(tag, 'content') : null;
};
const headOf = (html: string) => html.split(/<\/head>/i)[0];
const bodyOf = (html: string) => (html.split(/<body[^>]*>/i)[1] ?? '').replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

function jpegSize(buf: Buffer): [number, number] | null {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return null;
}

// ---------- Page model ----------
type Page = {
  url: string; // canonical-origin URL
  fetched: Fetched;
  title: string; description: string; canonical: string | null; robots: string; xRobots: string;
  h1: string[]; headings: { level: number; text: string }[]; links: string[]; images: { src: string; alt: string | null; hidden: boolean }[];
  schemas: unknown[]; schemaErrors: string[]; text: string; html: string;
};

function parsePage(url: string, fetched: Fetched): Page {
  const html = fetched.body;
  const head = headOf(html);
  const body = bodyOf(html);
  const headings = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: stripTags(m[2]) }));
  const links = tags(body, 'a').map((t) => attr(t, 'href')).filter((h): h is string => !!h);
  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => {
    const before = body.slice(Math.max(0, m.index! - 300), m.index);
    const hidden = /aria-hidden="true"[^<]*>\s*(<[^/][^>]*>\s*)?$/.test(before) || /aria-hidden="true"/.test(m[0]);
    return { src: attr(m[0], 'src') ?? '', alt: attr(m[0], 'alt'), hidden };
  });
  const schemas: unknown[] = [];
  const schemaErrors: string[] = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { schemas.push(JSON.parse(m[1])); } catch (error) { schemaErrors.push(`Invalid JSON-LD: ${(error as Error).message}`); }
  }
  const canonicalTag = tags(head, 'link').find((t) => (attr(t, 'rel') ?? '').toLowerCase() === 'canonical');
  return {
    url, fetched, html,
    title: stripTags((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1] ?? ''),
    description: metaContent(head, 'name', 'description') ?? '',
    canonical: canonicalTag ? attr(canonicalTag, 'href') : null,
    robots: (metaContent(head, 'name', 'robots') ?? '').toLowerCase(),
    xRobots: (fetched.headers.get('x-robots-tag') ?? '').toLowerCase(),
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    headings, links, images, schemas, schemaErrors,
    text: stripTags(body),
  };
}

const graphOf = (schemas: unknown[]) => schemas.flatMap((s) => {
  const obj = s as Record<string, unknown>;
  return Array.isArray(obj['@graph']) ? (obj['@graph'] as Record<string, unknown>[]) : [obj];
});
const typesOf = (schemas: unknown[]) => graphOf(schemas).flatMap((node) => [node['@type']].flat()).filter(Boolean) as string[];

// ---------- Crawl ----------
async function crawl() {
  const sitemap = await get(`${BASE}/sitemap.xml`);
  const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
  const queue = [`${ORIGIN}/`, ...sitemapUrls];
  const seen = new Set<string>();
  const pages: Page[] = [];
  const inbound = new Map<string, Set<string>>();
  const linkTargets = new Set<string>();

  while (queue.length) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);
    const fetched = await get(toBase(url));
    if (!(fetched.headers.get('content-type') ?? '').includes('text/html')) continue;
    const page = parsePage(url, fetched);
    pages.push(page);
    for (const href of page.links) {
      if (/^(mailto:|tel:|javascript:|#)/i.test(href)) continue;
      let target: URL;
      try { target = new URL(href, url); } catch { continue; }
      const abs = toOrigin(target.href);
      if (!abs.startsWith(ORIGIN)) continue;
      const withQuery = abs.split('#')[0];
      linkTargets.add(withQuery);
      const clean = withQuery.split('?')[0];
      if (!inbound.has(clean)) inbound.set(clean, new Set());
      inbound.get(clean)!.add(url);
      if (!seen.has(clean) && !/\.[a-z0-9]{2,5}$/i.test(pathOf(clean))) queue.push(clean);
    }
  }
  return { pages, sitemap, sitemapUrls, inbound, linkTargets };
}

// ---------- Checks ----------
async function main() {
  const started = new Date();
  const { pages, sitemap, sitemapUrls, inbound, linkTargets } = await crawl();
  const site: Result[] = [];
  const perPage = new Map<string, Result[]>();
  const add = (list: Result[], id: string, check: string, status: Status, evidence: string) => list.push({ id, check, status, evidence });

  // --- Site-level ---
  const robots = await get(`${BASE}/robots.txt`);
  add(site, 'S1', 'robots.txt returns 200', robots.status === 200 ? 'PASS' : 'FAIL', `HTTP ${robots.status}`);
  const sitemapLine = robots.body.match(/^Sitemap:\s*(\S+)/im)?.[1] ?? '';
  add(site, 'S2', 'robots.txt declares canonical sitemap', sitemapLine === `${ORIGIN}/sitemap.xml` ? 'PASS' : 'FAIL', sitemapLine || 'no Sitemap line');
  const blocksAll = /^User-agent:\s*\*[\s\S]*?^Disallow:\s*\/\s*$/im.test(robots.body);
  add(site, 'S3', 'robots.txt does not block the site', blocksAll ? 'FAIL' : 'PASS', blocksAll ? 'Disallow: / for *' : robots.body.split('\n').filter((l) => /^(dis)?allow/i.test(l)).join('; '));
  const blockedBots = [...robots.body.matchAll(/^User-agent:\s*(\S+)\s*\n\s*Disallow:\s*\/\s*$/gim)].map((m) => m[1]);
  add(site, 'S4', 'Search and AI crawlers not blocked (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended)', blockedBots.length ? 'WARNING' : 'PASS', blockedBots.length ? `Blocked: ${blockedBots.join(', ')}` : 'No user-agent specific blocks');

  add(site, 'S5', 'sitemap.xml returns 200', sitemap.status === 200 ? 'PASS' : 'FAIL', `HTTP ${sitemap.status}`);
  const xmlOk = /^<\?xml[^>]*\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"[^>]*>[\s\S]*<\/urlset>\s*$/.test(sitemap.body.trim())
    && (sitemap.body.match(/<url>/g) ?? []).length === (sitemap.body.match(/<\/url>/g) ?? []).length;
  add(site, 'S6', 'sitemap.xml is well-formed sitemap XML', xmlOk ? 'PASS' : 'FAIL', `${sitemapUrls.length} <url> entries`);
  const offOrigin = sitemapUrls.filter((u) => !u.startsWith(`${ORIGIN}/`));
  add(site, 'S7', 'Sitemap lists only canonical-origin URLs', offOrigin.length ? 'FAIL' : 'PASS', offOrigin.length ? offOrigin.join(', ') : `All ${sitemapUrls.length} on ${ORIGIN}`);
  const badSitemap: string[] = [];
  for (const u of sitemapUrls) {
    const page = pages.find((p) => p.url === u);
    if (!page) { badSitemap.push(`${u} (not crawled)`); continue; }
    if (page.fetched.status !== 200) badSitemap.push(`${u} (HTTP ${page.fetched.status})`);
    else if (page.robots.includes('noindex')) badSitemap.push(`${u} (noindex)`);
    else if (page.canonical !== u) badSitemap.push(`${u} (canonical ${page.canonical})`);
  }
  add(site, 'S8', 'Sitemap URLs are 200, indexable and self-canonical', badSitemap.length ? 'FAIL' : 'PASS', badSitemap.length ? badSitemap.join('; ') : `${sitemapUrls.length}/${sitemapUrls.length} OK`);
  const dupSitemap = sitemapUrls.filter((u, i) => sitemapUrls.indexOf(u) !== i);
  add(site, 'S9', 'Sitemap has no duplicate URLs', dupSitemap.length ? 'FAIL' : 'PASS', dupSitemap.join(', ') || 'none');

  const llms = await get(`${BASE}/llms.txt`);
  add(site, 'S10', 'llms.txt returns 200 with a title and summary', llms.status === 200 && /^# .+\n\n> .+/m.test(llms.body) ? 'PASS' : 'FAIL', `HTTP ${llms.status}, ${llms.body.split('\n').length} lines`);
  const llmsLinks = [...llms.body.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1]);
  const badLlms: string[] = [];
  for (const link of llmsLinks) {
    if (!link.startsWith(ORIGIN)) { badLlms.push(`${link} (off-origin)`); continue; }
    const r = await get(toBase(link.split('#')[0]));
    if (r.status !== 200) badLlms.push(`${link} (HTTP ${r.status})`);
  }
  add(site, 'S11', 'llms.txt links resolve on the canonical origin', badLlms.length ? 'FAIL' : 'PASS', badLlms.join('; ') || `${llmsLinks.length} links OK`);

  const missing = await get(`${BASE}/this-page-should-not-exist-${Date.now()}`);
  const missingPage = parsePage(`${ORIGIN}/404`, missing);
  add(site, 'S12', 'Unknown URL returns a real HTTP 404 (no soft 404, no redirect to home)', missing.status === 404 ? 'PASS' : 'FAIL', `HTTP ${missing.status}${missing.location ? ` -> ${missing.location}` : ''}`);
  add(site, 'S13', '404 page is noindex and has no canonical', missingPage.robots.includes('noindex') && !missingPage.canonical ? 'PASS' : 'FAIL', `robots="${missingPage.robots}", canonical=${missingPage.canonical ?? 'none'}`);
  const notFoundLinks = ['/', '/services', '/solutions', '/contact'].filter((p) => missingPage.links.includes(p));
  add(site, 'S14', '404 page links to Home, Services, Solutions and Contact', notFoundLinks.length === 4 ? 'PASS' : 'FAIL', `Found: ${notFoundLinks.join(', ') || 'none'}`);
  add(site, 'S15', '404 page has a useful H1', missingPage.h1.length === 1 ? 'PASS' : 'FAIL', missingPage.h1.join(' | ') || 'no h1');

  const slash = await get(`${BASE}/services/`);
  const slashOk = [301, 308].includes(slash.status) && (slash.location ?? '').replace(BASE, '').replace(ORIGIN, '').startsWith('/services') && !(slash.location ?? '').endsWith('/services/');
  add(site, 'S16', 'Trailing-slash duplicate redirects permanently (/services/ -> /services)', slashOk ? 'PASS' : 'FAIL', `HTTP ${slash.status}${slash.location ? ` -> ${slash.location}` : ''}`);

  for (const [id, asset] of [['S17', '/favicon.ico'], ['S18', '/assets/brand/favicon-32.png'], ['S19', '/assets/brand/apple-touch-icon.png'], ['S20', '/site.webmanifest']] as const) {
    const r = await get(`${BASE}${asset}`);
    add(site, id, `${asset} returns 200`, r.status === 200 ? 'PASS' : 'FAIL', `HTTP ${r.status}, ${r.headers.get('content-type') ?? ''}`);
  }
  try {
    const manifest = JSON.parse((await get(`${BASE}/site.webmanifest`)).body) as { icons?: { src: string }[] };
    const icons = await Promise.all((manifest.icons ?? []).map(async (icon) => [icon.src, (await get(`${BASE}${icon.src}`)).status] as const));
    const bad = icons.filter(([, s]) => s !== 200);
    add(site, 'S21', 'Web manifest icons resolve', bad.length || !icons.length ? 'FAIL' : 'PASS', icons.map(([s, c]) => `${s} ${c}`).join(', '));
  } catch (error) { add(site, 'S21', 'Web manifest icons resolve', 'FAIL', `Manifest is not JSON: ${(error as Error).message}`); }
  add(site, 'S22', 'favicon.svg', 'NOT APPLICABLE', 'No vector source of the logo exists in the project; PNG and ICO favicons are provided');

  if (LIVE) {
    const host = new URL(ORIGIN).host.replace(/^www\./, '');
    for (const [id, variant] of [['S23', `http://${host}/`], ['S24', `https://${host}/`], ['S25', `http://www.${host}/`]] as const) {
      const hops: string[] = [];
      let current: string = variant;
      let r = await get(current);
      while ([301, 302, 307, 308].includes(r.status) && r.location && hops.length < 6) {
        hops.push(`${r.status} ${r.location}`);
        current = new URL(r.location, current).href;
        r = await get(current);
      }
      const ends = current === `${ORIGIN}/` && r.status === 200;
      const permanent = hops.every((h) => /^(301|308)/.test(h));
      add(site, id, `${variant} redirects to ${ORIGIN}/`, !ends || !permanent ? 'FAIL' : hops.length > 1 ? 'WARNING' : 'PASS',
        `${hops.join(' -> ') || `HTTP ${r.status}`}${hops.length > 1 ? ` (${hops.length}-hop chain)` : ''}`);
    }
    const hsts = (await get(`${ORIGIN}/`)).headers.get('strict-transport-security');
    add(site, 'S26', 'HSTS header on the canonical origin', hsts ? 'PASS' : 'WARNING', hsts ?? 'missing');
  } else {
    for (const id of ['S23', 'S24', 'S25', 'S26']) add(site, id, 'Domain/HTTPS redirect and HSTS checks', 'NOT VERIFIED', 'Run with --live against production to verify');
  }

  // --- Per page ---
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  for (const p of pages) {
    titles.set(p.title, [...(titles.get(p.title) ?? []), p.url]);
    descriptions.set(p.description, [...(descriptions.get(p.description) ?? []), p.url]);
  }
  const linkStatus = new Map<string, Fetched>();
  for (const target of linkTargets) linkStatus.set(target, await get(toBase(target)));

  for (const p of pages) {
    const r: Result[] = [];
    perPage.set(p.url, r);
    const isHome = pathOf(p.url) === '/';
    const ok200 = p.fetched.status === 200;
    add(r, 'P1', 'HTTP status 200', ok200 ? 'PASS' : 'FAIL', `HTTP ${p.fetched.status}`);
    const noindex = p.robots.includes('noindex') || p.xRobots.includes('noindex');
    add(r, 'P2', 'Indexable (no noindex in meta or X-Robots-Tag)', noindex ? 'FAIL' : 'PASS', `meta robots="${p.robots}"${p.xRobots ? `, X-Robots-Tag="${p.xRobots}"` : ''}`);
    add(r, 'P3', 'Title present (30-65 chars)', !p.title ? 'FAIL' : p.title.length < 30 || p.title.length > 65 ? 'WARNING' : 'PASS', `${p.title.length} chars: ${p.title}`);
    const sameTitle = titles.get(p.title)!.filter((u) => u !== p.url);
    add(r, 'P4', 'Title unique', sameTitle.length ? 'FAIL' : 'PASS', sameTitle.length ? `Also on ${sameTitle.join(', ')}` : 'unique');
    add(r, 'P5', 'Meta description present (70-160 chars)', !p.description ? 'FAIL' : p.description.length < 70 || p.description.length > 160 ? 'WARNING' : 'PASS', `${p.description.length} chars`);
    const sameDesc = descriptions.get(p.description)!.filter((u) => u !== p.url);
    add(r, 'P6', 'Meta description unique', sameDesc.length ? 'FAIL' : 'PASS', sameDesc.length ? `Also on ${sameDesc.join(', ')}` : 'unique');
    add(r, 'P7', 'H1 present in served HTML', p.h1.length ? 'PASS' : 'FAIL', p.h1[0] ?? 'none');
    add(r, 'P8', 'Exactly one H1', p.h1.length === 1 ? 'PASS' : 'FAIL', `${p.h1.length} H1`);
    const skips: string[] = [];
    p.headings.forEach((h, i) => { if (i > 0 && h.level > p.headings[i - 1].level + 1) skips.push(`h${p.headings[i - 1].level}->h${h.level} ("${h.text.slice(0, 40)}")`); });
    const firstIsH1 = p.headings[0]?.level === 1;
    add(r, 'P9', 'Heading hierarchy (starts at H1, no skipped levels)', !firstIsH1 ? 'FAIL' : skips.length ? 'WARNING' : 'PASS', skips.join('; ') || `${p.headings.length} headings in order`);
    const glued = p.headings.filter((h) => /[a-z][A-Z]/.test(h.text.replace(/(UI\/UX|iOS|SaaS|DevOps|EduPilot|CityTwin|SalonSphere|PrimpTech)/g, '')));
    add(r, 'P9b', 'Heading text has real word spacing (no "wordsRunTogether")', glued.length ? 'FAIL' : 'PASS', glued.map((h) => h.text).join(' | ') || 'ok');
    add(r, 'P10', 'Canonical present, absolute, HTTPS, canonical origin', !p.canonical ? 'FAIL' : p.canonical.startsWith(`${ORIGIN}/`) ? 'PASS' : 'FAIL', p.canonical ?? 'missing');
    add(r, 'P11', 'Canonical is self-referencing and resolves 200', p.canonical === p.url && (await get(toBase(p.canonical))).status === 200 ? 'PASS' : 'FAIL', `page ${p.url}, canonical ${p.canonical}`);
    add(r, 'P12', 'Included in sitemap.xml', sitemapUrls.includes(p.url) ? 'PASS' : noindex ? 'NOT APPLICABLE' : 'FAIL', sitemapUrls.includes(p.url) ? 'listed' : 'not listed');
    add(r, 'P13', 'Robots meta allows indexing and following', /noindex|nofollow|none/.test(p.robots) ? 'FAIL' : p.robots ? 'PASS' : 'WARNING', p.robots || 'no robots meta (defaults to index, follow)');
    const internal = p.links.filter((h) => h.startsWith('/') || h.startsWith(ORIGIN));
    add(r, 'P14', 'Has crawlable internal links (<a href>)', internal.length >= 5 ? 'PASS' : 'FAIL', `${internal.length} internal links, ${new Set(internal).size} unique`);
    const broken: string[] = [];
    const redirected: string[] = [];
    for (const href of new Set(internal)) {
      const target = toOrigin(new URL(href, p.url).href).split('#')[0];
      const res = linkStatus.get(target) ?? await get(toBase(target));
      if ([301, 302, 307, 308].includes(res.status)) redirected.push(`${href} (${res.status})`);
      else if (res.status !== 200) broken.push(`${href} (HTTP ${res.status})`);
    }
    add(r, 'P15', 'No broken internal links', broken.length ? 'FAIL' : 'PASS', broken.join(', ') || 'all 200');
    add(r, 'P15b', 'Internal links point at final URLs (no redirects)', redirected.length ? 'WARNING' : 'PASS', redirected.join(', ') || 'no redirecting links');
    const noAlt = p.images.filter((img) => img.alt === null);
    const emptyAltVisible = p.images.filter((img) => img.alt === '' && !img.hidden);
    add(r, 'P16', 'Every image has an alt attribute', noAlt.length ? 'FAIL' : p.images.length ? (emptyAltVisible.length ? 'WARNING' : 'PASS') : 'NOT APPLICABLE',
      `${p.images.length} images, ${noAlt.length} without alt, ${emptyAltVisible.length} empty alt outside decorative containers`);
    const badImages: string[] = [];
    for (const src of new Set(p.images.map((img) => img.src))) {
      const res = await get(toBase(new URL(src, p.url).href));
      if (res.status !== 200) badImages.push(`${src} (HTTP ${res.status})`);
    }
    add(r, 'P17', 'Images load (200)', badImages.length ? 'FAIL' : p.images.length ? 'PASS' : 'NOT APPLICABLE', badImages.join(', ') || `${new Set(p.images.map((i) => i.src)).size} unique images OK`);
    const head = headOf(p.html);
    const og = { title: metaContent(head, 'property', 'og:title'), description: metaContent(head, 'property', 'og:description'), url: metaContent(head, 'property', 'og:url'), image: metaContent(head, 'property', 'og:image'), type: metaContent(head, 'property', 'og:type'), site: metaContent(head, 'property', 'og:site_name'), w: metaContent(head, 'property', 'og:image:width'), h: metaContent(head, 'property', 'og:image:height') };
    const tw = { card: metaContent(head, 'name', 'twitter:card'), title: metaContent(head, 'name', 'twitter:title'), description: metaContent(head, 'name', 'twitter:description'), image: metaContent(head, 'name', 'twitter:image') };
    const missingOg = Object.entries({ ...og, ...Object.fromEntries(Object.entries(tw).map(([k, v]) => [`twitter:${k}`, v])) }).filter(([, v]) => !v).map(([k]) => k);
    add(r, 'P18', 'Open Graph and Twitter metadata complete', missingOg.length ? 'FAIL' : og.url === p.url ? 'PASS' : 'FAIL', missingOg.length ? `missing ${missingOg.join(', ')}` : `og:url ${og.url}`);
    const graph = graphOf(p.schemas);
    const ids = graph.map((n) => n['@id']).filter(Boolean) as string[];
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    const noContext = p.schemas.filter((s) => (s as Record<string, unknown>)['@context'] !== 'https://schema.org');
    const offIds = ids.filter((id) => !id.startsWith(ORIGIN));
    const schemaProblems = [...p.schemaErrors, ...(dupIds.length ? [`duplicate @id ${dupIds.join(', ')}`] : []), ...(noContext.length ? ['missing @context'] : []), ...(offIds.length ? [`@id off canonical origin: ${offIds.join(', ')}`] : [])];
    const types = typesOf(p.schemas);
    for (const node of graph) {
      if (node['@type'] === 'FAQPage') {
        const missingQ = (node.mainEntity as { name: string }[]).filter((q) => !p.text.includes(q.name));
        if (missingQ.length) schemaProblems.push(`FAQ questions not visible on page: ${missingQ.map((q) => q.name).join('; ')}`);
      }
      if (node['@type'] === 'BreadcrumbList') {
        const items = node.itemListElement as { position: number; item: string; name: string }[];
        if (items.some((it, i) => it.position !== i + 1 || !it.item?.startsWith(ORIGIN) || !it.name)) schemaProblems.push('BreadcrumbList positions/items invalid');
        if (items[items.length - 1]?.item !== p.url) schemaProblems.push('BreadcrumbList does not end at this page');
      }
      if (['Organization', 'ProfessionalService', 'LocalBusiness'].includes(String(node['@type'])) && node['@type'] !== 'Organization' && !node.address) schemaProblems.push(`${node['@type']} without address`);
      if (node['@type'] === 'Service' && !node.provider) schemaProblems.push('Service without provider');
    }
    const required = ['Organization', 'WebSite', isHome ? null : 'BreadcrumbList', noindex ? null : 'WebPage'].filter(Boolean) as string[];
    const webPageLike = types.some((t) => /Page$/.test(t));
    const missingTypes = required.filter((t) => (t === 'WebPage' ? !webPageLike : !types.includes(t)));
    if (missingTypes.length) schemaProblems.push(`missing ${missingTypes.join(', ')}`);
    if (pathOf(p.url).startsWith('/services/') && !types.includes('Service')) schemaProblems.push('service page without Service schema');
    add(r, 'P19', 'Structured data valid JSON-LD, connected @ids, matches visible content', schemaProblems.length ? 'FAIL' : 'PASS', schemaProblems.join('; ') || types.join(', '));
    add(r, 'P19b', 'Rich result eligibility (Google Rich Results Test)', 'NOT VERIFIED', 'Requires Google\'s Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only');
    const crumbNav = /<nav[^>]*aria-label="Breadcrumb"/i.test(p.html);
    add(r, 'P20', 'Visible breadcrumbs plus BreadcrumbList', isHome ? 'NOT APPLICABLE' : crumbNav && types.includes('BreadcrumbList') ? 'PASS' : 'FAIL', isHome ? 'home page' : `nav=${crumbNav}, schema=${types.includes('BreadcrumbList')}`);
    const viewport = metaContent(head, 'name', 'viewport') ?? '';
    add(r, 'P21', 'Mobile viewport meta', /width=device-width/.test(viewport) ? 'PASS' : 'FAIL', viewport || 'missing');
    const insecure = [...p.html.matchAll(/\s(?:src|href|content)="(http:\/\/[^"]+)"/gi)].map((m) => m[1]).filter((u) => !u.startsWith('http://www.w3.org'));
    add(r, 'P22', 'HTTPS only (no http:// resources or links)', insecure.length ? 'FAIL' : 'PASS', insecure.join(', ') || 'none');
    add(r, 'P23', 'Served without redirect', [301, 302, 307, 308].includes(p.fetched.status) ? 'FAIL' : 'PASS', `HTTP ${p.fetched.status}`);
    const linkedFrom = [...(inbound.get(p.url) ?? [])].filter((u) => u !== p.url);
    add(r, 'P24', 'Not an orphan (linked from another page)', isHome || linkedFrom.length ? 'PASS' : 'FAIL', isHome ? 'home page' : `${linkedFrom.length} linking pages`);
    if (og.image) {
      const img = await get(toBase(og.image));
      const size = jpegSize(img.bytes);
      const ok = img.status === 200 && og.image.startsWith(ORIGIN);
      add(r, 'P25', 'Social image returns 200 on canonical origin (1200x630)', !ok ? 'FAIL' : size && (size[0] !== 1200 || size[1] !== 630) ? 'WARNING' : 'PASS', `HTTP ${img.status}, ${size ? `${size[0]}x${size[1]}` : 'size unknown'}, ${og.image}`);
    } else add(r, 'P25', 'Social image returns 200 on canonical origin (1200x630)', 'FAIL', 'no og:image');
    const lang = /<html[^>]*\slang="[a-z-]+"/i.test(p.html);
    add(r, 'P26', '<html lang> set', lang ? 'PASS' : 'FAIL', lang ? 'present' : 'missing');
    add(r, 'P27', 'Body content present without JavaScript (prerendered)', p.text.length > 400 ? 'PASS' : 'FAIL', `${p.text.length} characters of text in served HTML`);
  }

  // ---------- Reports ----------
  fs.mkdirSync(OUT, { recursive: true });
  const all = [...site, ...[...perPage.values()].flat()];
  const count = (s: Status) => all.filter((r) => r.status === s).length;
  const applicable = count('PASS') + count('FAIL');
  const score = applicable ? (count('PASS') / applicable) * 100 : 0;
  const md = (text: string) => text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const stamp = started.toISOString();

  const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [
    ['URL', 'HTTP status', 'Page type', 'Indexability', 'SEO title', 'Title length', 'Meta description', 'Description length', 'Canonical URL', 'H1 count', 'H1', 'H2 count', 'H2 structure', 'Schema types', 'Open Graph', 'Images', 'Images missing alt', 'Internal links', 'Breadcrumbs', 'Robots directives', 'In sitemap', 'Checks failed', 'Checks warning'],
    ...pages.map((p) => {
      const r = perPage.get(p.url)!;
      const types = typesOf(p.schemas);
      const pageType = pathOf(p.url) === '/' ? 'Home' : pathOf(p.url).startsWith('/services/') ? 'Service' : ['/privacy', '/terms'].includes(pathOf(p.url)) ? 'Legal' : 'Section';
      return [p.url, p.fetched.status, pageType, p.robots.includes('noindex') ? 'noindex' : 'indexable', p.title, p.title.length, p.description, p.description.length, p.canonical,
        p.h1.length, p.h1.join(' | '), p.headings.filter((h) => h.level === 2).length, p.headings.filter((h) => h.level === 2).map((h) => h.text).join(' | '),
        [...new Set(types)].join(' '), r.find((x) => x.id === 'P18')!.status, p.images.length, p.images.filter((i) => i.alt === null).length,
        new Set(p.links.filter((h) => h.startsWith('/'))).size, /aria-label="Breadcrumb"/.test(p.html) ? 'yes' : 'no', p.robots, sitemapUrls.includes(p.url) ? 'yes' : 'no',
        r.filter((x) => x.status === 'FAIL').length, r.filter((x) => x.status === 'WARNING').length].map(csvCell).join(',');
    }),
  ].join('\n');
  fs.writeFileSync(path.join(OUT, 'SEO_PAGE_INVENTORY.csv'), `${csv}\n`);

  const issues = [...site.map((r) => ({ page: '(site)', r })), ...[...perPage.entries()].flatMap(([page, rs]) => rs.map((r) => ({ page, r })))]
    .filter(({ r }) => r.status === 'FAIL' || r.status === 'WARNING');
  const audit = [
    '# SEO Audit Report',
    '',
    `- Audited: \`${BASE}\`${BASE === ORIGIN ? '' : ` (canonical origin \`${ORIGIN}\`)`}`,
    `- Mode: ${LIVE ? 'live production (domain and redirect checks included)' : 'local build (domain/redirect checks NOT VERIFIED)'}`,
    `- Run at: ${stamp}`,
    `- Pages crawled: ${pages.length} (sitemap lists ${sitemapUrls.length})`,
    '',
    '## Score',
    '',
    `**Technical SEO checks passed: ${count('PASS')} of ${applicable} applicable (${score.toFixed(1)}%).**`,
    '',
    '| Status | Count |', '| --- | --- |',
    ...(['PASS', 'FAIL', 'WARNING', 'NOT APPLICABLE', 'NOT VERIFIED'] as Status[]).map((s) => `| ${s} | ${count(s)} |`),
    '',
    'The score is the share of applicable PASS/FAIL checks that passed. WARNING, NOT APPLICABLE and NOT VERIFIED are excluded from it and listed below. It measures technical compliance only; it says nothing about rankings or traffic.',
    '',
    '## Site-level checks',
    '',
    '| ID | Check | Status | Evidence |', '| --- | --- | --- | --- |',
    ...site.map((r) => `| ${r.id} | ${md(r.check)} | ${r.status} | ${md(r.evidence)} |`),
    '',
    '## Failures and warnings',
    '',
    issues.length ? '| Page | ID | Check | Status | Evidence |\n| --- | --- | --- | --- | --- |\n' + issues.map(({ page, r }) => `| ${page} | ${r.id} | ${md(r.check)} | ${r.status} | ${md(r.evidence)} |`).join('\n') : 'None.',
    '',
    '## Per-page summary',
    '',
    '| Page | PASS | FAIL | WARNING | Title |', '| --- | --- | --- | --- | --- |',
    ...pages.map((p) => { const r = perPage.get(p.url)!; return `| ${p.url} | ${r.filter((x) => x.status === 'PASS').length} | ${r.filter((x) => x.status === 'FAIL').length} | ${r.filter((x) => x.status === 'WARNING').length} | ${md(p.title)} |`; }),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT, 'SEO_AUDIT_REPORT.md'), audit);

  const validation = [
    '# SEO Validation Report',
    '',
    `Every check on every page, with the evidence it was decided on. Audited \`${BASE}\` at ${stamp}.`,
    '',
    '## Check matrix',
    '',
    '| ID | Check | PASS | FAIL | WARNING | N/A | NOT VERIFIED |', '| --- | --- | --- | --- | --- | --- | --- |',
    ...[...new Map([...perPage.values()].flat().map((r) => [r.id, r.check])).entries()].map(([id, check]) => {
      const rs = [...perPage.values()].flat().filter((r) => r.id === id);
      const n = (s: Status) => rs.filter((r) => r.status === s).length;
      return `| ${id} | ${md(check)} | ${n('PASS')} | ${n('FAIL')} | ${n('WARNING')} | ${n('NOT APPLICABLE')} | ${n('NOT VERIFIED')} |`;
    }),
    '',
    ...pages.flatMap((p) => [
      `## ${p.url}`,
      '',
      '| ID | Check | Status | Evidence |', '| --- | --- | --- | --- |',
      ...perPage.get(p.url)!.map((r) => `| ${r.id} | ${md(r.check)} | ${r.status} | ${md(r.evidence)} |`),
      '',
    ]),
  ].join('\n');
  fs.writeFileSync(path.join(OUT, 'SEO_VALIDATION_REPORT.md'), validation);

  console.log(`SEO audit of ${BASE}: ${pages.length} pages, ${count('PASS')} PASS, ${count('FAIL')} FAIL, ${count('WARNING')} WARNING, ${count('NOT APPLICABLE')} N/A, ${count('NOT VERIFIED')} NOT VERIFIED -> ${score.toFixed(1)}%`);
  for (const { page, r } of issues.filter(({ r }) => r.status === 'FAIL')) console.log(`  FAIL ${page} ${r.id} ${r.check}: ${r.evidence}`);
  console.log(`Reports written to ${path.resolve(OUT)}`);
  process.exitCode = count('FAIL') ? 1 : 0;
}

main().catch((error) => { console.error(error); process.exitCode = 2; });
