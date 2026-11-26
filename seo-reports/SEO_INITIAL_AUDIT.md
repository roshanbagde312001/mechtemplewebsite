# SEO Initial Audit: primptech.com

What the site looked like before each phase of work, with evidence. Phase 1 was 16 November 2026; phase 2 started 26 November 2026.

## Is this repository the live site?

Yes. Production (https://www.primptech.com) is served by **Vercel** (`server: Vercel`, `x-vercel-id` headers) from this repository's `dist/` build. Commit `3009e9e` went live on 16 November 2026: the live audit on 26 November found the canonicals, `vercel.json` redirects and prerendered pages from that commit. `server.ts` (Express) is not used in production; it serves local production tests and the `/api/generate-video` endpoint during development.

## Architecture

| Area | Finding |
| --- | --- |
| Framework | React 19 + TypeScript, Vite 8, Tailwind 4 plugin (styles are hand-written CSS), Three.js 0.187 for the home-page 3D scene |
| Routing | Custom History-API router (`src/site/router.tsx`), real URLs, crawlable `<a href>` links |
| Rendering | Client-side app. Phase 1 added build-time prerendering (`src/entry-server.tsx`, React `prerenderToNodeStream`) and hydration |
| SEO data | Central `src/site/seo.ts` (titles, descriptions, canonicals, JSON-LD) used both at build time and on client navigation |
| Generated files | `sitemap.xml`, `robots.txt`, `llms.txt`, `404.html`, `.br/.gz` copies, all from `vite.config.ts` |
| Hosting | Vercel static; no `vercel.json` before phase 1 |
| Tests | None before phase 1 (only `tsc --noEmit`) |
| Analytics | None. Search Console verified by meta tag (`google-site-verification`) |

## Phase 1 findings (16 November 2026, production)

Live audit baseline: **64% of applicable checks; only 1 page reachable** by a crawler that does not run JavaScript (`seo-reports/baseline-production/`).

| Severity | Issue | Evidence |
| --- | --- | --- |
| CRITICAL | Canonicals, `og:url`, sitemap, robots `Sitemap:` and every JSON-LD `@id` used `https://primptech.com`, which 308-redirects to www | Canonical on `/services/website-development` was `https://primptech.com/...` |
| CRITICAL | Page bodies were empty (`<div id="root"></div>`): no H1, text or links without JavaScript | 0 characters of body text in served HTML |
| HIGH | Animated headings had no spaces between words in the DOM ("Servicesbuiltaroundyourbusiness.") | `Rise` component in `src/site/ui.tsx` |
| MEDIUM | `/services/` and `/services` both returned 200 (duplicate URLs) | HTTP 200 on both |
| MEDIUM | Same 4 generic FAQs on all 12 service pages | `QUESTIONS.slice(0, 4)` |
| MEDIUM | `ProfessionalService` (a LocalBusiness type) without an address | JSON-LD |
| LOW | Uploads in `public/assets/aistudio/` publicly reachable and indexable | HTTP 200 |

All of these were fixed in phase 1 and verified live: **690 PASS, 0 FAIL** on 26 November (`seo-reports/production/`).

## Phase 2 findings (26 November 2026)

| Severity | Issue | Evidence |
| --- | --- | --- |
| HIGH | Inner pages had a large layout shift on load: **CLS 0.69–0.71** (lab, mobile). The prerendered HTML painted before `pages.css` arrived with the lazy JavaScript chunk. Introduced by phase-1 prerendering | `seo-reports/cwv-lab-production-before.json` |
| HIGH | Brand written three ways: "Primptech" (site), "PrimpTech" (logo), "PRIMPTECH" (business documents) | `BRAND` constant, logo file |
| MEDIUM | No page for SaaS development, a listed business service; SaaS terms sat in the web-application title (cannibalisation risk) | `SERVICE_SEO[1].title` |
| MEDIUM | No India or market signals although India is the primary market (no `areaServed`, `og:locale en_US`) | JSON-LD, `index.html` |
| MEDIUM | No educational content (no guides, no Article markup) to build topical authority | Route list |
| MEDIUM | No analytics or conversion tracking: enquiries could not be measured | No tag in `index.html` |
| MEDIUM | Several brief questions unanswered: "Why does a business need a website?", "How much does website development cost?", "What is the difference between AI and automation?", "How do businesses implement AI solutions?", "What is business process automation?" | Page content |
| LOW | Legacy names: README titled "Korvantage Solutions", a code comment, logo files named "Preemptech" | `README.md`, `materials.ts`, `public/assets/aistudio/` |
| LOW | Home hero image: 2400 px, 300 KB JPEG sent to phones | `public/assets/hero/hero-circuit.jpg` |
| LOW | Home-page main thread busy: lab total blocking time ~1.37 s (3D scene, scroll effects) | Lab measurement |
| INFO | No crawler is blocked: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended all receive HTTP 200 and the full HTML | Tested with each user agent |

## Not available for this audit

- Keyword volumes and difficulty: no keyword-research tool or Search Console data was available. `SEO_KEYWORD_MAPPING.csv` lists seed keywords and says so.
- Field Core Web Vitals (CrUX) and INP: need real-user data.
- Lighthouse: running it needed downloading an npm package, which was not permitted here. A local Chrome DevTools-protocol script (`scripts/cwv-lab.ts`) was used instead.
