# GEO Implementation Report (Generative Engine Optimization)

Goal: make PrimpTech easy for AI search systems to understand correctly and to cite. No implementation guarantees citations, mentions or rankings in any AI product.

## Entity consistency

| Fact | Single value used everywhere | Where it appears |
| --- | --- | --- |
| Name | **PrimpTech** (alternate names "Primptech", "PRIMPTECH" declared in schema) | Titles, page text, `og:site_name`, Organization/WebSite schema, `llms.txt`, manifest |
| Website | https://www.primptech.com/ | Canonicals, schema `url`, sitemap, llms files |
| Description | "AI, software engineering and automation company based in Nagpur, India…" (`SHORT_DESCRIPTION`) | About page, schema, llms files |
| Location | The Prism, Shastri Nagar, near Ambedkar Nagar Metro Station Square, Wardhaman Nagar Colony, Nagpur, Maharashtra 440008, India | Contact page, footer, PostalAddress schema, llms files |
| Email | contact@primptech.com | Every page, schema `email` and ContactPoint, llms files |
| Founder | Sanket Sonone, Founder (already published on the About page) | About page, Person schema linked to the Organization |
| Markets | India (primary), United States, United Kingdom, UAE, Canada, Australia | `areaServed` on Organization, ProfessionalService, ContactPoint and every Service |

The audit's **S27 entity-consistency check** fails the build if any page or file uses a different brand spelling, organization URL, email, or a legacy name (Primptech, Korvantage, Preemptech) in visible text. Result: PASS on all 27 pages.

## Entity relationships

PrimpTech → 13 Services → Solutions they build → Industries they fit → Work (projects) → Guides. Each link exists both as crawlable HTML links with descriptive anchors (service pages link to their solutions, industries, projects and guides; guides link back to services) and as JSON-LD (`Organization.hasOfferCatalog` → `Service`; `Article.about` → `Service`; `Service.provider` → `Organization`).

## AI-readable files

| File | Content | Status |
| --- | --- | --- |
| `/llms.txt` | Company facts, markets, all services with definitions, solutions, industries, projects, process, commitments, guides, page index | Generated at build; tested locally |
| `/llms-full.txt` (new) | Full text of every service (scope, definition, FAQs, comparison tables), general FAQs and both guides | Generated at build; audit S28 PASS |
| `/sitemap.xml` | All 27 canonical URLs; guides use their real `updated` date | Audit S5–S9 PASS |

Both llms files are written from the same data as the pages, so they cannot drift out of date. AI systems are not required to read them.

## Crawler access policy

`robots.txt` allows all crawlers (`User-agent: * / Allow: /`) and disallows only `/api/` (which is not deployed on Vercel). Production test on 26 November 2026: each of these user agents received HTTP 200 and the full prerendered page:

| Crawler | Operator | Purpose | Allowed? |
| --- | --- | --- | --- |
| Googlebot | Google | Search indexing (also AI Overviews) | Yes |
| Google-Extended | Google | Robots token: use of content for Gemini training/grounding | Yes (no block) |
| Bingbot | Microsoft | Bing search and Copilot | Yes |
| OAI-SearchBot | OpenAI | ChatGPT search results | Yes |
| GPTBot | OpenAI | Model training | Yes (no block) |
| ClaudeBot | Anthropic | Model training / crawling | Yes (no block) |
| PerplexityBot | Perplexity | Perplexity search index | Yes |

**Business decision for you:** search-type crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot) should stay allowed for visibility. Training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) can be blocked without affecting Google rankings. Blocking them may reduce how well future AI models know PrimpTech; allowing them means public website text may be used for training. The current setting allows all, which suits a company that wants maximum discoverability. To block training only, add per-agent `Disallow: /` groups in `vite.config.ts` (robots.txt section).

## Credibility rules kept

- No client names, testimonials, ratings, awards, certifications, partnerships or results (the site's own content rules).
- Guides are attributed to PrimpTech (the organization), as you chose, with visible publication dates matching `datePublished`.
- Projects are described as products and concepts being built, with representative stock photos labelled as such.

## Needs business input (see REMAINING_ACTIONS.md)

Official LinkedIn and other social profiles (`sameAs`), a phone number, a Google Business Profile, genuine testimonials and approved case studies are the strongest remaining entity signals. None can be created from the codebase.
