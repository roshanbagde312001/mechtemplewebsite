# SEO, AEO and GEO Implementation Plan

## Architecture

One source of truth per concern, so every new page is SEO-complete by default:

| Concern | Where | What it produces |
| --- | --- | --- |
| Copy and company facts | `src/site/content.ts` | Page text, services, `SERVICE_SEO` (titles, descriptions, definitions, FAQs, comparisons, industries), company details, markets |
| Guides | `src/site/resources.ts` | `/resources` and `/resources/<slug>` pages, Article markup, llms files. `status: 'draft'` keeps a guide out of everything |
| URLs and metadata | `src/site/seo.ts` | `ROUTES` (title, description, canonical, OG image, breadcrumbs, lastmod), JSON-LD graph, head tags |
| Prerender | `src/entry-server.tsx` + `vite.config.ts` | One HTML file per route with full body content, page CSS and module preloads in `<head>` |
| Crawl files | `vite.config.ts` | `sitemap.xml` (only ROUTES), `robots.txt`, `llms.txt`, `llms-full.txt`, `404.html` |
| Redirects and headers | `vercel.json` | Trailing slash → no slash (308), cache and security headers, `noindex` on raw uploads |
| Measurement | `src/site/analytics.ts` | GA4 page views and conversion events, only when `VITE_GA_MEASUREMENT_ID` is set |
| Regression tests | `scripts/seo-audit.ts`, `scripts/seo-test.ts`, `scripts/cwv-lab.ts` | Audit reports, internal-link report, lab Core Web Vitals |

URL policy: `https://www.primptech.com`, lowercase, hyphenated, no trailing slash, no query strings in canonicals. One URL per primary keyword (see `SEO_KEYWORD_MAPPING.csv`).

Entity graph (JSON-LD `@id`s): `Organization` (`/#organization`) → publishes `WebSite` (`/#website`) → contains each `WebPage` (`<url>#webpage`) → whose main entity is a `Service` (`#service`), `Article` (`#article`) or the Organization (About). `Person` (`/about#founder`) works for the Organization. `ProfessionalService` (`/#business`) carries the Nagpur address and map link. All link to each other by `@id`; no entity is duplicated.

## Stages and status

| Stage | Work | Status |
| --- | --- | --- |
| 1 Discovery | Codebase and production audit | Done: `SEO_INITIAL_AUDIT.md` |
| 2 Architecture | This document | Done |
| 3 Technical SEO | www canonicals, prerendering, redirects, sitemap with real lastmod, robots, 404 | Done in phase 1, verified live |
| 4 On-page | Keyword-mapped titles and descriptions, heading fixes, new SaaS page, brand spelling PrimpTech | Done, tested locally |
| 5 AEO | Definitions first, question-cluster FAQs, comparison tables, FAQPage markup | Done, tested locally |
| 6 GEO | Entity consistency, `areaServed`, `llms.txt` + `llms-full.txt`, crawler policy | Done, tested locally |
| 7 Performance | CLS fix (page CSS in head), module preloads, responsive WebP hero | Done, measured in lab |
| 8 Content | `/resources` hub, Article markup, 2 published guides, roadmap below | Done, tested locally |
| 9 Analytics | GA4 (cookieless consent mode), lead and click events | Implemented; needs a measurement ID |
| 10 QA | `npm run lint`, `npm run seo:test`, `npm run seo:audit:live`, browser checks | Done; live audit of phase 2 needs a deploy |
| 11 Reports | `seo-reports/` | Done |

## Editorial roadmap

Rules for every guide: one target query per guide, a direct answer in the first paragraph, no statistics or prices without a cited source, links to the related service, Article + FAQPage markup (automatic), reviewed by someone at PrimpTech before publishing.

| # | Title | Intent | Target keyword | Supporting keywords | Meta description (draft) | Outline | Internal links | CTA | Related service | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Custom software vs off-the-shelf software: how to choose | Informational | custom software vs off-the-shelf software | build vs buy software | Published | Definitions, comparison table, when to choose each, middle path, decision steps, cost factors, FAQs | Custom software, consulting, API, automation | Contact | Custom software development | **Published** |
| 2 | How to automate repetitive business processes | Informational | how to automate business processes | workflow automation, automate repetitive tasks | Published | Candidates, 9 steps, workflow anatomy, lead-management example, mistakes, FAQs | Automation, AI, API, solutions | Contact | Intelligent process automation | **Published** |
| 3 | Website development cost in India | Informational / commercial | website development cost in India | ecommerce website cost, business website price | What a business website, e-commerce store or custom web platform costs in India, and what drives the price. | Cost drivers, typical project types, what is included, hidden costs, how to get an accurate estimate | Website development, web apps, contact | Get an estimate | Website development | **Needs PrimpTech's real price ranges** |
| 4 | How AI automation helps small businesses | Informational | AI automation for small business | AI for SMEs, AI chatbot for business | Where AI automation saves small businesses time, where it does not, and how to start safely. | Use cases (enquiries, documents, support), rules vs AI, costs and risks, first project | AI development, automation | Contact | AI development | Planned |
| 5 | SaaS application development explained | Informational | SaaS application development | multi-tenant architecture, SaaS MVP | How a SaaS product is designed and built: tenants, billing, permissions, MVP scope and launch. | What SaaS is, architecture choices, MVP, billing, security, launch and iteration | SaaS page, web apps, cloud | Discuss your product | SaaS application development | Planned (must go deeper than the service page) |
| 6 | Web application development process | Informational | web application development process | web app development steps | The stages of building a web application, from requirements to deployment and support. | Lifecycle with deliverables per stage, roles, timelines factors | Web apps, process page | Start with discovery | Web application development | Planned |
| 7 | Business website development checklist | Informational | business website checklist | website launch checklist | A practical checklist for planning, building and launching a business website. | Planning, content, design, SEO, performance, security, launch | Website development | Contact | Website development | Planned |
| 8 | AI integration in business applications | Informational | AI integration in business applications | add AI to existing software | How to add AI features to software you already use, safely and with measurable value. | Use cases, data access, model choice, testing accuracy, monitoring | AI development, API | Contact | AI development | Planned |
| 9 | How to choose a software development company | Commercial investigation | how to choose a software development company | questions to ask a software company | The questions to ask, the warning signs and what a good proposal includes. | Criteria, questions, contracts and IP, red flags | About, process, contact | Talk to us | Consulting | Planned |
| 10 | Case studies (EduPilot, SalonSphere, CityTwin Nagpur) | Commercial | — | — | — | Problem, approach, architecture, what was delivered, status | Work, related services | Contact | Several | **Needs real project details approved for publishing** |

Publishing a guide: add it to `ARTICLES_DATA` in `src/site/resources.ts`, generate its share image (`npx tsx scripts/og-routes.ts > og.json && python3 scripts/generate-og-images.py og.json`), run `npm run seo:test`, deploy, then request indexing in Search Console. The route, sitemap entry with its real date, Article and FAQPage markup, llms files, service-page links and hub listing are all automatic.

The roadmap starts with `/resources` only. Sub-sections such as `/resources/blog` or `/resources/case-studies` should be added only once they have their own published articles, so there are no empty indexable pages.
