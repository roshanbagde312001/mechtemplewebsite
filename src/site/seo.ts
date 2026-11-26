// Single source of truth for every public URL: title, description, canonical, share image, breadcrumbs and
// structured data. Used in the browser (applyHead on navigation) and at build time (vite.config.ts writes a
// static HTML file per route plus sitemap.xml, robots.txt, llms.txt and 404.html from the same data).
// Keep this file free of browser-only globals at module level: it also runs in Node during the build.
import { ANALYTICS_ENABLED, BRAND, MARKETS, CAPABILITIES, COMPANY, FOUNDER, QUESTIONS, SERVICES, SERVICE_COUNT, SERVICE_SEO, SHORT_DESCRIPTION, TAGLINE, serviceSlug } from './content';
import { ARTICLES, plainText } from './resources';

/**
 * Production origin, without a trailing slash. This must be the host that answers 200: the apex
 * (https://primptech.com) redirects to www on Vercel, so canonicals, sitemap and schema all use www.
 */
export const SITE_URL = 'https://www.primptech.com';
export const DEFAULT_OG = '/og/home.jpg';
/** Spellings of the brand used elsewhere (logo file, documents). Declared so search engines treat them as one entity. */
export const BRAND_ALIASES = ['Primptech', 'PRIMPTECH'];

export type Crumb = { name: string; path: string };
export type RouteMeta = {
  path: string;
  /** Text before " | PrimpTech" in the browser tab; the home page uses its own full title. */
  title: string;
  description: string;
  /** Share image path (1200x630). */
  image: string;
  /** Visible page heading (H1 wording), used in llms.txt and the share image. */
  heading: string;
  crumbs: Crumb[];
  /** Section for llms.txt grouping. */
  group: 'Main' | 'Services' | 'Resources' | 'Company' | 'Legal';
  kind?: 'service' | 'faq' | 'article';
  /** ISO date the content last changed (sitemap lastmod, dateModified). Falls back to the last content commit. */
  lastmod?: string;
  /** schema.org WebPage subtype for this URL. */
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  index?: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

export const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const page = (path: string, title: string, heading: string, description: string, group: RouteMeta['group'], extra: Partial<RouteMeta> = {}): RouteMeta => ({
  path, title, heading, description, group,
  image: `/og/${path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')}.jpg`,
  crumbs: path === '/' ? [] : [{ name: heading, path }],
  changefreq: 'monthly',
  priority: 0.7,
  ...extra,
});

export const ROUTES: RouteMeta[] = [
  page('/', `${BRAND} | Software Development, AI & Automation Company`, TAGLINE.replace(/\.$/, ''),
    `${BRAND} builds custom software, business websites, AI applications and intelligent automation that help businesses in India and worldwide innovate and scale.`,
    'Main', { changefreq: 'weekly', priority: 1 }),
  page('/services', 'Software Development, AI & Automation Services', 'Services',
    `${SERVICE_COUNT} services: websites, web apps, SaaS and custom software, AI and machine learning, process automation, data, mobile apps, APIs, cloud and consulting.`,
    'Main', { priority: 0.9, pageType: 'CollectionPage' }),
  ...SERVICES.map((service, i) => page(`/services/${serviceSlug(i)}`, SERVICE_SEO[i].title, service.title, SERVICE_SEO[i].description, 'Services', {
    crumbs: [{ name: 'Services', path: '/services' }, { name: service.title, path: `/services/${serviceSlug(i)}` }],
    kind: 'service', index: i, priority: 0.8,
  })),
  page('/solutions', 'Business Solutions: CRM, ERP, AI Assistants & More', 'Solutions',
    'Business management systems, CRM, education management, AI business assistants, automated lead management, e-commerce, BI dashboards, SaaS and workflow tools.',
    'Main', { priority: 0.8 }),
  page('/industries', 'Industries We Serve: Software & AI by Sector', 'Industries',
    'Software, AI and automation for construction, education, retail and e-commerce, recruitment, professional services, small and medium businesses and startups.',
    'Main'),
  page('/work', 'Our Work: Projects & Product Concepts', 'Work',
    `Products and projects ${BRAND} is building: EduPilot for education, CityTwin Nagpur for intelligent mobility and SalonSphere for multi-branch salons.`,
    'Main', { pageType: 'CollectionPage' }),
  page('/process', 'How We Work: Our 7-Step Development Process', 'Process',
    'Our project lifecycle: discovery, requirement analysis, architecture and design, development, testing, deployment, then ongoing support and improvement.',
    'Company', { kind: 'faq' }),
  page('/about', 'About Us: AI & Software Engineering Company', 'About',
    `${BRAND} is an AI, software engineering and automation company. Meet the founder and see how we turn business problems into working systems.`,
    'Company', { priority: 0.8, pageType: 'AboutPage' }),
  page('/careers', 'Careers in Software, AI & Data Engineering', 'Careers',
    `Careers at ${BRAND} in software engineering, AI and machine learning, data engineering, UI/UX design and cloud. Send an open application with your CV.`,
    'Company', { priority: 0.5 }),
  page('/contact', 'Contact Us: Start a Software or AI Project', 'Contact',
    `Contact ${BRAND} about a software, AI, automation or data project. Tell us the problem you want to solve and we will reply with questions and a next step.`,
    'Company', { priority: 0.8, pageType: 'ContactPage' }),
  page('/privacy', 'Privacy Policy: How We Handle Your Data', 'Privacy policy', ANALYTICS_ENABLED
    ? `How the ${BRAND} website handles personal information: no accounts, cookieless Google Analytics measurement, and a contact form that opens your own email app.`
    : `How the ${BRAND} website handles personal information: no accounts, no analytics trackers, and a contact form that opens your own email app.`, 'Legal', { changefreq: 'yearly', priority: 0.3 }),
  ...(ARTICLES.length ? [
    page('/resources', 'Guides: Software Development, AI & Automation', 'Resources',
      `Practical guides from ${BRAND} on custom software, business process automation, AI and web development: plain-language answers for business owners and teams.`,
      'Resources', { pageType: 'CollectionPage', lastmod: ARTICLES[0].updated }),
    ...ARTICLES.map((article) => page(`/resources/${article.slug}`, article.seoTitle, article.title, article.description, 'Resources', {
      crumbs: [{ name: 'Resources', path: '/resources' }, { name: article.title, path: `/resources/${article.slug}` }],
      kind: 'article' as const, lastmod: article.updated, priority: 0.6,
    })),
  ] : []),
  page('/terms', 'Terms of Use for the Website', 'Terms of use', `The terms that apply when you use the ${BRAND} website, including intellectual property, acceptable use and limitation of liability.`, 'Legal', { changefreq: 'yearly', priority: 0.3 }),
].map((route) => (route.path === '/privacy' || route.path === '/terms' ? { ...route, image: DEFAULT_OG } : route));

export const NOT_FOUND: RouteMeta = {
  path: '/404', title: 'Page Not Found', heading: 'Page not found', description: `The page you are looking for does not exist on the ${BRAND} website. Try the home page, our services or the contact page.`,
  image: DEFAULT_OG, crumbs: [], group: 'Legal', changefreq: 'yearly', priority: 0,
};

const byPath = new Map(ROUTES.map((route) => [route.path, route]));
export const getRouteMeta = (path: string) => byPath.get(path) ?? null;

export const fullTitle = (route: RouteMeta) => (route.path === '/' ? route.title : `${route.title} | ${BRAND}`);

// ---------- Structured data (schema.org JSON-LD) ----------
// Stable @id values connect the entities across pages: every WebPage is part of the WebSite, which the Organization publishes.
export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;
export const FOUNDER_ID = `${SITE_URL}/about#founder`;
const LOGO_PNG = '/assets/brand/logo.png';
/** Markets from the business brief: India first, then international. Used as schema.org areaServed. */
const AREA_SERVED = MARKETS.map((name) => ({ '@type': 'Country', name }));

/** Organization, founder and website entities, present on every page. */
export function siteSchema() {
  const sameAs = COMPANY.socials.map((social) => social.href);
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    alternateName: BRAND_ALIASES,
    url: absolute('/'),
    logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: absolute(LOGO_PNG), contentUrl: absolute(LOGO_PNG), width: 720, height: 337, caption: BRAND },
    image: { '@id': `${SITE_URL}/#logo` },
    email: COMPANY.email,
    description: SHORT_DESCRIPTION,
    slogan: TAGLINE,
    founder: { '@id': FOUNDER_ID },
    knowsAbout: CAPABILITIES.map((cap) => cap.title),
    areaServed: AREA_SERVED,
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: COMPANY.email, url: absolute('/contact'), availableLanguage: 'English', areaServed: AREA_SERVED },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${BRAND} services`,
      itemListElement: SERVICES.map((_, i) => ({ '@type': 'Offer', itemOffered: { '@id': `${absolute(`/services/${serviceSlug(i)}`)}#service` } })),
    },
  };
  if (sameAs.length) organization.sameAs = sameAs;
  if (COMPANY.phone) organization.telephone = COMPANY.phone;
  const postalAddress = COMPANY.address ? { '@type': 'PostalAddress', ...COMPANY.postalAddress } : null;
  if (postalAddress) organization.address = postalAddress;

  const founder = {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    image: absolute(FOUNDER.photo),
    url: `${absolute('/about')}#founder`,
    worksFor: { '@id': ORG_ID },
    knowsAbout: FOUNDER.expertise,
  };

  const website = { '@type': 'WebSite', '@id': WEBSITE_ID, name: BRAND, alternateName: BRAND_ALIASES, url: absolute('/'), description: SHORT_DESCRIPTION, publisher: { '@id': ORG_ID }, inLanguage: 'en' };
  const graph: Record<string, unknown>[] = [organization, founder, website];

  // ProfessionalService is a LocalBusiness subtype, which requires a real, verified street address. It is emitted only
  // once COMPANY.address (content.ts) is filled in, so the site never claims a location it cannot show.
  if (COMPANY.address) {
    graph.push({
      '@type': 'ProfessionalService', '@id': BUSINESS_ID, name: BRAND, url: absolute('/'), image: absolute(DEFAULT_OG), logo: absolute(LOGO_PNG),
      email: COMPANY.email, description: SHORT_DESCRIPTION, parentOrganization: { '@id': ORG_ID }, address: postalAddress,
      hasMap: COMPANY.mapLink, areaServed: AREA_SERVED, knowsAbout: CAPABILITIES.map((cap) => cap.title),
      ...(COMPANY.phone ? { telephone: COMPANY.phone } : {}), ...(sameAs.length ? { sameAs } : {}),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Page-level entities: WebPage (or a subtype), BreadcrumbList, plus Service and FAQPage where they apply. */
export function routeSchema(route: RouteMeta) {
  const url = absolute(route.path);
  const isService = route.kind === 'service' && route.index !== undefined;
  const article = route.kind === 'article' ? ARTICLES.find((a) => `/resources/${a.slug}` === route.path) ?? null : null;
  const webPage: Record<string, unknown> = {
    '@type': route.pageType ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: fullTitle(route),
    headline: route.heading,
    description: route.description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    about: { '@id': isService ? `${url}#service` : ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absolute(route.image), width: 1200, height: 630 },
    inLanguage: 'en',
    ...(route.crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };
  if (isService) webPage.mainEntity = { '@id': `${url}#service` };
  if (route.pageType === 'AboutPage') webPage.mainEntity = { '@id': ORG_ID };
  if (article) { webPage.mainEntity = { '@id': `${url}#article` }; webPage.about = { '@id': `${url}#article` }; }
  if (route.lastmod) webPage.dateModified = route.lastmod;
  if (route.path === '/resources') {
    webPage.mainEntity = { '@type': 'ItemList', itemListElement: ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absolute(`/resources/${a.slug}`), name: a.title })) };
  }
  const graph: Record<string, unknown>[] = [webPage];

  if (route.crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [{ name: 'Home', path: '/' }, ...route.crumbs].map((crumb, i) => ({
        '@type': 'ListItem', position: i + 1, name: crumb.name, item: absolute(crumb.path),
      })),
    });
  }

  const faqs = isService ? SERVICE_SEO[route.index!].faqs : article ? article.faqs : route.kind === 'faq' ? QUESTIONS : [];
  if (article) {
    // Article: the guide itself. Author is the company (no individual byline has been approved).
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.description,
      abstract: plainText(article.summary),
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: { '@type': 'ImageObject', url: absolute(route.image), width: 1200, height: 630 },
      datePublished: article.published,
      dateModified: article.updated,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
      articleSection: article.category,
      keywords: article.keyword,
      about: article.services.map((i) => ({ '@id': `${absolute(`/services/${serviceSlug(i)}`)}#service` })),
      ...(article.sources?.length ? { citation: article.sources.map((source) => source.url) } : {}),
    });
  }
  if (isService) {
    const service = SERVICES[route.index!];
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      serviceType: service.title,
      description: SERVICE_SEO[route.index!].answer,
      url,
      image: absolute(route.image),
      provider: { '@id': ORG_ID },
      areaServed: AREA_SERVED,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.title,
        itemListElement: service.groups.map((group) => ({ '@type': 'OfferCatalog', name: group.heading, itemListElement: group.items.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } })) })),
      },
    });
  }
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Escape JSON for safe embedding inside a <script> element. */
export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

/** Route-specific <head> markup written into each static HTML file at build time (see vite.config.ts). */
export function renderHead(route: RouteMeta) {
  const isMissing = route === NOT_FOUND;
  const title = escapeHtml(fullTitle(route));
  const description = escapeHtml(route.description);
  const url = absolute(route.path);
  const image = absolute(route.image);
  const imageAlt = escapeHtml(`${route.heading} | ${BRAND}`);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${isMissing ? ROBOTS_NOINDEX : ROBOTS_INDEX}" />`,
    isMissing ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    isMissing ? '' : `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${imageAlt}" />`,
    `<script id="ld-site" type="application/ld+json">${jsonForScript(siteSchema())}</script>`,
    isMissing ? '' : `<script id="ld-page" type="application/ld+json">${jsonForScript(routeSchema(route))}</script>`,
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
  const imageAlt = `${route.heading} | ${BRAND}`;
  meta('name', 'description', route.description);
  meta('name', 'robots', isMissing ? ROBOTS_NOINDEX : ROBOTS_INDEX);
  if (isMissing) {
    document.head.querySelector('link[rel="canonical"]')?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
  } else {
    set('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, 'href', absolute(route.path));
    meta('property', 'og:url', absolute(route.path));
  }
  if (!document.getElementById('ld-site')) {
    const site = document.createElement('script');
    site.id = 'ld-site';
    site.type = 'application/ld+json';
    site.textContent = jsonForScript(siteSchema());
    document.head.appendChild(site);
  }
  meta('property', 'og:title', fullTitle(route));
  meta('property', 'og:description', route.description);
  meta('property', 'og:image', absolute(route.image));
  meta('property', 'og:image:alt', imageAlt);
  meta('name', 'twitter:title', fullTitle(route));
  meta('name', 'twitter:description', route.description);
  meta('name', 'twitter:image', absolute(route.image));
  meta('name', 'twitter:image:alt', imageAlt);
  if (isMissing) { document.getElementById('ld-page')?.remove(); return; }
  set('script#ld-page', () => { const s = document.createElement('script'); s.id = 'ld-page'; s.setAttribute('type', 'application/ld+json'); return s; }, 'data-path', route.path);
  const ld = document.head.querySelector('script#ld-page');
  if (ld) ld.textContent = jsonForScript(routeSchema(route));
}
