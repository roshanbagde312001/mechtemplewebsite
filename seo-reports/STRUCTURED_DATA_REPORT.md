# Structured Data Report

All structured data is JSON-LD, generated in one place (`src/site/seo.ts`: `siteSchema()` and `routeSchema()`), written into every prerendered page at build time and updated on client-side navigation. Two blocks per page: `#ld-site` (entities shared by every page) and `#ld-page` (this page).

## Entities

| Type | `@id` | On | Key properties | Source of truth |
| --- | --- | --- | --- | --- |
| Organization | `/#organization` | Every page | name PrimpTech, alternateName, url, logo (720×337), email, description, slogan, founder, knowsAbout, areaServed (6 countries), address (PostalAddress), contactPoint, hasOfferCatalog → 13 Services | `content.ts` (BRAND, COMPANY, MARKETS) |
| Person | `/about#founder` | Every page | Sanket Sonone, jobTitle Founder, image, worksFor → Organization, knowsAbout | `FOUNDER` (already visible on /about) |
| WebSite | `/#website` | Every page | name, alternateName, url, publisher → Organization, inLanguage | |
| ProfessionalService | `/#business` | Every page | Nagpur PostalAddress, hasMap, areaServed, parentOrganization → Organization | Emitted only because a verified address exists |
| WebPage / AboutPage / ContactPage / CollectionPage | `<url>#webpage` | Each page | name, headline, description, isPartOf → WebSite, about, mainEntity, breadcrumb, primaryImageOfPage, dateModified (guides) | `ROUTES` |
| BreadcrumbList | `<url>#breadcrumb` | All but home | Positions 1…n, ends at the page itself | Matches the visible breadcrumb |
| Service | `<url>#service` | 13 service pages | name, serviceType, description (visible definition), provider → Organization, areaServed, hasOfferCatalog (visible scope groups) | `SERVICES`, `SERVICE_SEO` |
| Article | `<url>#article` | 2 guides | headline, description, abstract, datePublished, dateModified, author/publisher → Organization, image 1200×630, about → Services, keywords | `resources.ts`; dates are shown on the page with `<time>` |
| ItemList | inside `/resources` WebPage | Guide hub | List of published guides | |
| FAQPage | `<url>#faq` | 13 service pages, 2 guides, /process | Questions and answers identical to the visible text | |

## Types evaluated and not used

| Type | Why not |
| --- | --- |
| LocalBusiness (generic) | ProfessionalService is the more specific LocalBusiness subtype and is used |
| Product, SoftwareApplication | No product is offered as available; projects are in development (site rule: products are listed only once ready) |
| BlogPosting | Guides are evergreen how-to articles; `Article` fits |
| Review, AggregateRating | No genuine reviews exist. Fake or self-written ratings violate Google's guidelines |
| HowTo | Google no longer shows HowTo rich results; the steps are in semantic `<ol>` lists instead |

## Validation

Automated (every `npm run seo:test`, check P19): JSON parses, `@context` present, no duplicate `@id`s, all `@id`s on the canonical origin, FAQ questions visible on the page, BreadcrumbList valid and ending at the page, required types present, Service has a provider, Article has headline/dates/author/publisher/image and its datePublished is shown on the page, and no LocalBusiness type without an address. **Result: PASS on all 27 pages.**

**NOT VERIFIED:** Google's Rich Results Test and the Schema.org validator (https://validator.schema.org) need a public URL and Google's service. Run them on a service page, a guide and the home page after deploying (steps in `GOOGLE_SEARCH_CONSOLE_SETUP.md`). Structured data makes pages eligible for rich results; it does not guarantee them.
