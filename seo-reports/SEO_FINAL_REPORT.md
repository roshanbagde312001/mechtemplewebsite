# SEO Final Report: primptech.com

Phase 2, 26 November 2026. Rollback point: git tag `seo-rollback-2026-11-26` (the deployed commit `3009e9e`).

## Result

| Measure | Production (deployed phase 1) | Local build (phase 2) |
| --- | --- | --- |
| Pages audited | 23 | 27 (+ SaaS service, guide hub, 2 guides) |
| Automated technical SEO checks | 690 PASS · 0 FAIL · 1 WARNING (`seo-reports/production/`) | 806 PASS · 0 FAIL · 0 WARNING (`seo-reports/SEO_AUDIT_REPORT.md`) |
| Score (applicable PASS/FAIL checks) | 100% | 100% |
| Lab CLS on inner pages (mobile) | 0.69–0.71 | 0.001–0.004 |
| Home page transfer (mobile) | 1,211 KB | 922 KB |

The 100% is technical compliance against the 30+ checks in `scripts/seo-audit.ts`, not a ranking or traffic prediction. 31 checks are NOT VERIFIED and excluded from the score: Google Rich Results eligibility (27, needs Google's tool) and the domain/HTTPS redirect checks (4, run only against production). The production warning is Vercel's 2-hop `http://primptech.com` redirect (http → https → www), which can't be changed from the repository.

## Status key

**Implemented** = in the code. **Tested locally** = passed `npm run seo:test` and browser checks on a local production build. **Verified in production** = passed `npm run seo:audit:live`. **External** = needs an account or setting outside the code. **Business input** = needs information only PrimpTech has.

## Changes in this phase

| What was wrong | What changed | Files | SEO / AEO / GEO benefit | How tested | Status |
| --- | --- | --- | --- | --- | --- |
| Brand spelled 3 ways | "PrimpTech" everywhere visible; "Primptech"/"PRIMPTECH" only as schema alternateName; legacy "Korvantage" README title and comment removed | `content.ts`, `seo.ts`, `index.html`, `site.webmanifest`, `metadata.json`, `server.ts`, `README.md`, `CompanyPages.tsx`, `materials.ts` | One consistent entity name for Google and AI systems | Audit S27 (fails on any legacy name or mismatch) PASS | Tested locally |
| Home title did not lead with the main commercial term | "PrimpTech \| Software Development, AI & Automation Company"; new description mentioning India and worldwide | `seo.ts` | Matches the "software development company" cluster | P3/P5 PASS | Tested locally |
| No SaaS page; SaaS terms in the web-app title | New `/services/saas-application-development` (scope, definition, FAQs, comparison table, share image); web-app title narrowed to CRM/ERP/portals | `content.ts`, `seo.ts`, `public/og/` | Dedicated URL for the SaaS cluster, no cannibalisation | Full audit on the page PASS | Tested locally |
| Titles lacked commercial-intent wording | "Website Development Company…", "AI Development Company…", "Business Process Automation & AI Workflow Services", "SaaS Application Development Company" | `content.ts` | Keyword-to-URL map in `SEO_KEYWORD_MAPPING.csv` | Unique titles 30–65 chars, P3/P4 PASS | Tested locally |
| Brief questions unanswered | New FAQs: why a business needs a website, website cost, AI implementation steps, what BPA is, AI vs automation, web-app timeline, SaaS MVP | `content.ts` | Answer-engine coverage | FAQ markup matches visible text (P19) | Tested locally |
| No comparison content | 6 comparison tables on service pages + 1 in a guide (semantic `<table>`) | `content.ts`, `ServicePages.tsx`, `pages.css` | Extractable "X vs Y" answers | Visual check desktop/mobile | Tested locally |
| Service pages did not link to industries or guides | "Where this service is often used" industry links; guides listed with solutions and work | `ServicePages.tsx` | Entity relationships and internal linking | Internal link report: 0 orphans, max depth ≤ 3 | Tested locally |
| No content hub | `/resources` hub and guide pages with table of contents, dates, FAQs, related services; 2 published guides; draft support | `resources.ts`, `pages/ResourcePages.tsx`, `pages/index.tsx`, `chrome.tsx` (footer "Guides"), `pages.css` | Topical authority, informational queries | Article schema checks (P19) PASS; no hydration errors | Tested locally |
| No market signals | `areaServed` (India + 5 markets) on Organization, ProfessionalService, ContactPoint, Services; `og:locale en_IN`; description says Nagpur, India | `content.ts` (MARKETS), `seo.ts`, `index.html` | Geographic relevance without fake country pages | Schema check PASS | Tested locally |
| No Article markup | Article with dates, author/publisher (Organization), image, about → Services; ItemList on the hub; `dateModified` on WebPage | `seo.ts` | Eligibility for article features; clear authorship | P19 PASS | Tested locally |
| Sitemap used one date for all URLs | Per-route `lastmod` (guides use their real updated date) | `vite.config.ts`, `seo.ts` | Accurate freshness signal | S6–S9 PASS | Tested locally |
| `llms.txt` only | `llms.txt` gains markets and guides; new `llms-full.txt` with full service, FAQ and guide text | `vite.config.ts` | AI-readable reference generated from the same data as the pages | S10, S11, S28 PASS | Tested locally |
| **CLS ~0.7 on inner pages** (regression from phase-1 prerendering) | Page-chunk CSS and modulepreloads written into each prerendered `<head>`, after the entry CSS | `vite.config.ts` | Core Web Vitals (CLS) | Lab CLS 0.001–0.004 (`cwv-lab-local-after.json`) | Tested locally |
| 300 KB hero image on phones | 1200 px WebP via `srcset` | `Site.tsx`, `public/assets/hero/hero-circuit-1200.webp` | LCP and data use on mobile | Lab home transfer −289 KB vs production | Tested locally |
| No analytics or conversion tracking | GA4 module, cookieless consent mode, page views + `generate_lead`, `cta_click`, `email_click`, `phone_click`, `whatsapp_click`, `map_click`; privacy policy text switches automatically | `analytics.ts`, `App.tsx`, `ContactPage.tsx`, `content.ts`, `seo.ts` | Measure organic enquiries | Build with test ID loads gtag; without ID loads nothing | Implemented; **External** (measurement ID) |
| Audit coverage | New checks: entity consistency (S27), `llms-full.txt` (S28), external links (S29), Article requirements; new `INTERNAL_LINK_REPORT.md` (click depth, inbound links, anchors) | `scripts/seo-audit.ts` | Regression protection | Runs in `npm run seo:test` | Tested locally |
| No Core Web Vitals tooling | `scripts/cwv-lab.ts` (mobile throttling via local Chrome) | `scripts/cwv-lab.ts` | Repeatable performance checks | Used for this report | Tested locally |

Phase-1 work (www canonicals, prerendering, heading spacing, `vercel.json` redirects and headers, service definitions and FAQs, schema graph, 404, address and map) is **verified in production**: 690 PASS, 0 FAIL on 26 November.

## Commands run

| Command | Result |
| --- | --- |
| `npm install` | Not re-run; dependencies already installed and unchanged (no new dependencies added) |
| `npm run lint` (`tsc --noEmit`) | Pass |
| `npm run build` (via `seo:test`) | Pass |
| `npm run seo:test` | 27 pages, 806 PASS, 0 FAIL, 0 WARNING |
| `npm run seo:audit:live` | 23 pages, 690 PASS, 0 FAIL, 1 WARNING (production still runs phase 1 until you deploy) |
| Headless Chrome: production build | No hydration or app console errors on /, a service, SaaS, /resources, a guide, /contact; WebGL 3D active on home |
| Headless Chrome: dev server (`npm run dev`) | All tested routes render; only Vite hot-reload websocket messages |
| Crawler user agents against production | Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended: HTTP 200 with full HTML |
| Lighthouse | Not run (npm download not permitted); replaced by `scripts/cwv-lab.ts` |

## Reports

| File | Content |
| --- | --- |
| `SEO_INITIAL_AUDIT.md` | Findings with severity before each phase |
| `SEO_IMPLEMENTATION_PLAN.md` | Architecture, stages, editorial roadmap |
| `SEO_AUDIT_REPORT.md`, `SEO_VALIDATION_REPORT.md`, `SEO_PAGE_INVENTORY.csv`, `INTERNAL_LINK_REPORT.md` | Generated by the audit (local build) |
| `production/`, `baseline-production/` | Live audits: after phase 1, and the original baseline |
| `SEO_KEYWORD_MAPPING.csv` | Keyword clusters → one URL each (seed keywords; volumes not measured) |
| `AEO_IMPLEMENTATION_REPORT.md`, `GEO_IMPLEMENTATION_REPORT.md` | Answer and generative engine work, crawler policy |
| `CORE_WEB_VITALS_REPORT.md` | Lab measurements and performance changes |
| `STRUCTURED_DATA_REPORT.md` | Every schema entity and why others were not used |
| `GOOGLE_SEARCH_CONSOLE_SETUP.md` | Search Console, GA4, conversion and monitoring steps |
| `REMAINING_ACTIONS.md` | What needs deployment, external setup or business input |

## Separating technical SEO from rankings

Technical compliance is measured and complete for every page on the site. Rankings, traffic, AI citations and rich results depend on competition, links from other sites, brand mentions, content depth over time and Google's own systems; none of these can be verified or promised from this work. Track them in Search Console after deploying.
