// Prints the share-image jobs (one per route) as JSON for scripts/generate-og-images.py.
// Usage: npx tsx scripts/og-routes.ts [--all] > og-routes.json   (default: only routes whose image does not exist yet)
import fs from 'node:fs';
import { PAGE_IMAGES, SERVICE_IMAGES } from '../src/site/content';
import { ROUTES, SITE_URL } from '../src/site/seo';

const background = (path: string, index?: number) => {
  if (path === '/') return 'public/assets/hero/hero-circuit.jpg';
  if (index !== undefined) return `public${SERVICE_IMAGES[index]}`;
  if (path.startsWith('/resources')) return 'public/assets/capabilities/cap-software.jpg';
  const key = path.slice(1) as keyof typeof PAGE_IMAGES;
  return PAGE_IMAGES[key] ? `public${PAGE_IMAGES[key]}` : 'public/assets/hero/hero-circuit.jpg';
};

const all = process.argv.includes('--all');
const jobs = ROUTES.filter((route) => route.image.startsWith('/og/') && route.image !== '/og/home.jpg' || route.path === '/')
  .filter((route) => all || !fs.existsSync(`public${route.image}`)).map((route) => ({
  out: `public${route.image}`,
  heading: route.path === '/' ? 'Engineering what comes next.' : route.heading,
  label: route.path === '/' ? 'AI · Software · Automation' : route.path.startsWith('/resources/') ? 'Guide' : route.crumbs.length > 1 ? route.crumbs[0].name : route.title,
  background: background(route.path, route.index),
}));
console.log(JSON.stringify({ site: SITE_URL.replace(/^https?:\/\//, ''), jobs }));
