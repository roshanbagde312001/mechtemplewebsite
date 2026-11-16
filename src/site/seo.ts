// Single source of truth for every public URL: title, description, canonical, share image, breadcrumbs and
// structured data. Used in the browser (applyHead on navigation) and at build time (vite.config.ts writes a
// static HTML file per route plus sitemap.xml, robots.txt, llms.txt and 404.html from the same data).
// Keep this file free of browser-only globals at module level: it also runs in Node during the build.
import { BRAND, CAPABILITIES, COMPANY, FOUNDER, QUESTIONS, SERVICES, SHORT_DESCRIPTION, TAGLINE, serviceSlug } from './content';

/** Production origin, without a trailing slash. Change here if the site moves to another domain. */
export const SITE_URL = 'https://primptech.com';
export const DEFAULT_OG = '/og/home.jpg';

export type Crumb = { name: string; path: string };
export type RouteMeta = {
  path: string;
  /** Text before " | Primptech" in the browser tab; the home page uses its own full title. */
  title: string;
  description: string;
  /** Share image path (1200x630). */
  image: string;
  /** Text-only heading used in llms.txt and the share image. */
  heading: string;
  crumbs: Crumb[];
  /** Section for llms.txt grouping. */
  group: 'Main' | 'Services' | 'Company' | 'Legal';
  kind?: 'service' | 'faq';
  index?: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

export const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** Trim to a meta-description length at a word boundary. */
const clip = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '')}…`;
};

/** Service intros vary in length; short ones get a closing line so every description carries enough detail. */
const serviceDescription = (intro: string) => clip(intro.length < 110 ? `${intro} Designed, built and deployed end to end by ${BRAND}.` : intro);

const page = (path: string, title: string, heading: string, description: string, group: RouteMeta['group'], extra: Partial<RouteMeta> = {}): RouteMeta => ({
  path, title, heading, description, group,
  image: `/og/${path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')}.jpg`,
  crumbs: path === '/' ? [] : [{ name: title, path }],
  changefreq: 'monthly',
  priority: 0.7,
  ...extra,
});

export const ROUTES: RouteMeta[] = [
  page('/', `${BRAND} | AI, Software Engineering & Automation Company`, TAGLINE.replace(/\.$/, ''),
    `${BRAND} designs, develops and deploys custom software, web and mobile apps, AI assistants, automated workflows and data systems for businesses and startups.`,
    'Main', { changefreq: 'weekly', priority: 1 }),
  page('/services', 'Software, AI & Automation Services', 'Services built around your business',
    'Twelve services: websites and web apps, custom software, AI and machine learning, process automation, data engineering, mobile apps, APIs, cloud and consulting.',
    'Main', { priority: 0.9 }),
  ...SERVICES.map((service, i) => page(`/services/${serviceSlug(i)}`, service.title, service.title, serviceDescription(service.intro), 'Services', {
    crumbs: [{ name: 'Services', path: '/services' }, { name: service.title, path: `/services/${serviceSlug(i)}` }],
    kind: 'service', index: i, priority: 0.8,
  })),
  page('/solutions', 'Business Solutions: CRM, ERP, AI Assistants & More', 'Services combined into systems that run a business',
    'Business management systems, CRM, education management, AI business assistants, automated lead management, e-commerce, BI dashboards, SaaS and workflow tools.',
    'Main', { priority: 0.8 }),
  page('/industries', 'Industries We Serve', 'Different industries, distinct ways of working',
    'Software, AI and automation for construction, education, retail and e-commerce, recruitment, professional services, small and medium businesses and startups.',
    'Main'),
  page('/work', 'Work & Projects', 'Selected work and concepts',
    `Products and projects ${BRAND} is building: EduPilot for education, CityTwin Nagpur for intelligent mobility and SalonSphere for multi-branch salons.`,
    'Main'),
  page('/process', 'How We Work: Our 7-Step Process', 'Seven steps, from problem to production',
    'Our project lifecycle: discovery, requirement analysis, architecture and design, development, testing, deployment, then ongoing support and improvement.',
    'Company', { kind: 'faq' }),
  page('/about', 'About Us', 'An AI and technology engineering company', clip(SHORT_DESCRIPTION), 'Company', { priority: 0.8 }),
  page('/careers', 'Careers', `Build what comes next with ${BRAND}`,
    `Careers at ${BRAND} in software engineering, AI and machine learning, data engineering, UI/UX design and cloud. Send an open application with your CV.`,
    'Company', { priority: 0.5 }),
  page('/contact', 'Contact Us', 'Let\'s talk about what you need',
    `Contact ${BRAND} about a software, AI, automation or data project. Tell us the problem you want to solve and we will reply with questions and a next step.`,
    'Company', { priority: 0.8 }),
  page('/privacy', 'Privacy Policy', 'Privacy policy', `How the ${BRAND} website handles personal information: no accounts, no analytics trackers, and a contact form that opens your own email app.`, 'Legal', { changefreq: 'yearly', priority: 0.3 }),
  page('/terms', 'Terms of Use', 'Terms of use', `The terms that apply when you use the ${BRAND} website, including intellectual property, acceptable use and limitation of liability.`, 'Legal', { changefreq: 'yearly', priority: 0.3 }),
].map((route) => (route.path === '/privacy' || route.path === '/terms' ? { ...route, image: DEFAULT_OG } : route));

export const NOT_FOUND: RouteMeta = {
  path: '/404', title: 'Page Not Found', heading: 'Page not found', description: `The page you are looking for does not exist on the ${BRAND} website.`,
  image: DEFAULT_OG, crumbs: [], group: 'Legal', changefreq: 'yearly', priority: 0,
};

const byPath = new Map(ROUTES.map((route) => [route.path, route]));
export const getRouteMeta = (path: string) => byPath.get(path) ?? null;

export const fullTitle = (route: RouteMeta) => (route.path === '/' ? route.title : `${route.title} | ${BRAND}`);

// ---------- Structured data (schema.org JSON-LD) ----------
const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#business`;

/** Organization, local business and website entities, present on every page. */
export function siteSchema() {
  const sameAs = COMPANY.socials.map((social) => social.href);
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    url: absolute('/'),
    logo: { '@type': 'ImageObject', url: absolute('/assets/brand/logo.png'), width: 720, height: 337 },
    image: absolute(DEFAULT_OG),
    email: COMPANY.email,
    description: SHORT_DESCRIPTION,
    slogan: TAGLINE,
    founder: { '@type': 'Person', name: FOUNDER.name, jobTitle: FOUNDER.role, image: absolute(FOUNDER.photo) },
    knowsAbout: CAPABILITIES.map((cap) => cap.title),
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: COMPANY.email, url: absolute('/contact') },
  };
  if (sameAs.length) organization.sameAs = sameAs;
  if (COMPANY.phone) organization.telephone = COMPANY.phone;

  // ProfessionalService is a LocalBusiness subtype. Address and phone are added automatically once they are filled in
  // COMPANY (content.ts); Google needs a street address before it can show local-business results.
  const business: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: BRAND,
    url: absolute('/'),
    image: absolute(DEFAULT_OG),
    logo: absolute('/assets/brand/logo.png'),
    email: COMPANY.email,
    description: SHORT_DESCRIPTION,
    parentOrganization: { '@id': ORG_ID },
    founder: { '@type': 'Person', name: FOUNDER.name },
    knowsAbout: CAPABILITIES.map((cap) => cap.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${BRAND} services`,
      itemListElement: SERVICES.map((service, i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, url: absolute(`/services/${serviceSlug(i)}`) },
      })),
    },
  };
  if (COMPANY.address) business.address = COMPANY.address;
  if (COMPANY.phone) business.telephone = COMPANY.phone;
  if (sameAs.length) business.sameAs = sameAs;

  const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: BRAND, url: absolute('/'), publisher: { '@id': ORG_ID }, inLanguage: 'en' };
  return { '@context': 'https://schema.org', '@graph': [organization, business, website] };
}

/** Page-level entities: WebPage, BreadcrumbList, plus Service or FAQPage where they apply. */
export function routeSchema(route: RouteMeta) {
  const url = absolute(route.path);
  const graph: Record<string, unknown>[] = [{
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: fullTitle(route),
    description: route.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': ORG_ID },
    primaryImageOfPage: absolute(route.image),
    inLanguage: 'en',
    ...(route.crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  }];
  if (route.crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [{ name: 'Home', path: '/' }, ...route.crumbs].map((crumb, i) => ({
        '@type': 'ListItem', position: i + 1, name: crumb.name, item: absolute(crumb.path),
      })),
    });
  }
  if (route.kind === 'service' && route.index !== undefined) {
    const service = SERVICES[route.index];
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.intro,
      url,
      provider: { '@id': BUSINESS_ID },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.title,
        itemListElement: service.groups.map((group) => ({ '@type': 'OfferCatalog', name: group.heading, itemListElement: group.items.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } })) })),
      },
    });
  }
  if (route.kind === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: QUESTIONS.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Escape JSON for safe embedding inside a <script> element. */
export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Route-specific <head> markup written into each static HTML file at build time (see vite.config.ts). */
export function renderHead(route: RouteMeta) {
  const isMissing = route === NOT_FOUND;
  const title = escapeHtml(fullTitle(route));
  const description = escapeHtml(route.description);
  const url = absolute(isMissing ? '/' : route.path);
  const image = absolute(route.image);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${isMissing ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    isMissing ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${route.heading} | ${BRAND}`)}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script id="ld-site" type="application/ld+json">${jsonForScript(siteSchema())}</script>`,
    `<script id="ld-page" type="application/ld+json">${isMissing ? '{}' : jsonForScript(routeSchema(route))}</script>`,
  ].filter(Boolean).join('\n    ');
}

/** Updates <head> in the browser after client-side navigation, mirroring what the build writes into each HTML file. */
export function applyHead(path: string) {
  const route = getRouteMeta(path) ?? NOT_FOUND;
  const isMissing = route === NOT_FOUND;
  document.title = fullTitle(route);
  const set = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (!el) { el = create(); document.head.appendChild(el); }
    el.setAttribute(attr, value);
  };
  const meta = (key: 'name' | 'property', name: string, value: string) =>
    set(`meta[${key}="${name}"]`, () => { const m = document.createElement('meta'); m.setAttribute(key, name); return m; }, 'content', value);
  meta('name', 'description', route.description);
  meta('name', 'robots', isMissing ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (isMissing) canonical?.remove();
  else set('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, 'href', absolute(route.path));
  if (!document.getElementById('ld-site')) {
    const site = document.createElement('script');
    site.id = 'ld-site';
    site.type = 'application/ld+json';
    site.textContent = jsonForScript(siteSchema());
    document.head.appendChild(site);
  }
  meta('property', 'og:title', fullTitle(route));
  meta('property', 'og:description', route.description);
  meta('property', 'og:url', absolute(isMissing ? '/' : route.path));
  meta('property', 'og:image', absolute(route.image));
  meta('property', 'og:image:alt', `${route.heading} | ${BRAND}`);
  meta('name', 'twitter:title', fullTitle(route));
  meta('name', 'twitter:description', route.description);
  meta('name', 'twitter:image', absolute(route.image));
  set('script#ld-page', () => { const s = document.createElement('script'); s.id = 'ld-page'; s.setAttribute('type', 'application/ld+json'); return s; }, 'data-path', route.path);
  const ld = document.head.querySelector('script#ld-page');
  if (ld) ld.textContent = isMissing ? '{}' : jsonForScript(routeSchema(route));
}
