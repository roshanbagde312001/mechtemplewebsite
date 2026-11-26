# Remaining Actions

Ordered by impact. "You" means someone at PrimpTech; none of these can be completed from the codebase alone.

## Do now (deployment and setup)

| # | Action | Type | Why |
| --- | --- | --- | --- |
| 1 | Review the two published guides, the new SaaS service page and the new FAQs/comparison tables, then commit and push to deploy | Requires your approval | Content is published under PrimpTech's name |
| 2 | After deploying, run `npm run seo:audit:live` and check 0 FAIL | Requires deploy | Phase-2 changes are tested locally only, not yet verified in production |
| 3 | Search Console: domain property, sitemap, request indexing (see `GOOGLE_SEARCH_CONSOLE_SETUP.md`) | Requires external configuration | |
| 4 | Create GA4 and set `VITE_GA_MEASUREMENT_ID` in Vercel; mark `generate_lead` as a key event | Requires external configuration | Enquiries cannot be measured until then |
| 5 | Create or claim a **Google Business Profile** with exactly the website address and the name PrimpTech | Requires external configuration | Strongest signal for local results in Nagpur/India |

## Business information needed

| # | Item | Where it goes | Impact |
| --- | --- | --- | --- |
| 6 | Official **LinkedIn company page** and other social profiles | `COMPANY.socials` in `src/site/content.ts` (becomes schema `sameAs`, footer, contact page, llms files) | Entity recognition by Google and AI systems |
| 7 | **Phone number** (and WhatsApp if used) | `COMPANY.phone` | Click-to-call conversions, local SEO, phone_click tracking |
| 8 | **Business hours** | `COMPANY.hours` | Contact page, Google Business Profile consistency |
| 9 | Real **price ranges** for websites and software (even "starting from") | Enables the "Website development cost in India" guide | High-intent query in the primary market |
| 10 | **Approved case studies** (EduPilot, SalonSphere, CityTwin Nagpur): problem, approach, technologies, status | New `/resources` category | Proof of expertise; currently projects have one paragraph each |
| 11 | **Genuine client testimonials** with permission | About/service pages (no rating markup) | Trust and conversion |
| 12 | **Technologies used** (languages, frameworks, cloud providers) per service | Service pages ("Technologies" section) | Technology-related searches; not added because the stack is not documented on the site |
| 13 | Named **authors** for future guides (e.g. the founder), if wanted | `resources.ts` (Person author) | Stronger E-E-A-T than company bylines |
| 14 | Exact **map pin** (Google Maps → Share → Embed a map) | `COMPANY.mapEmbed` | The current search resolves to "Prism Tower, 323" |

## Content and code (can be done next)

| # | Action | Notes |
| --- | --- | --- |
| 15 | Publish the next guides from the roadmap in `SEO_IMPLEMENTATION_PLAN.md` | One per target query; review before publishing |
| 16 | Compress the 19.5 MB desktop 3D model with meshopt/WebP (no simplification), compare visually | `CORE_WEB_VITALS_REPORT.md` |
| 17 | WebP variants (~800 px) for page-hero photos; self-host Google Fonts | Lab LCP on /contact is 2.4 s |
| 18 | Real form backend (e.g. an email API on a Vercel function) instead of `mailto:` | Enquiries currently depend on the visitor's email app; tracking counts app opens, not sent emails |
| 19 | Decide the AI training-crawler policy (GPTBot, ClaudeBot, Google-Extended) | Currently all allowed; trade-offs in `GEO_IMPLEMENTATION_REPORT.md` |
| 20 | Decide on `public/assets/aistudio/` (WhatsApp images, screenshots, original logo files): delete if unused | Publicly reachable, marked noindex; only one file is referenced, by an unused component |
| 21 | Optional: `npm run seo:test` as the Vercel build gate (`"vercel-build": "npm run seo:test"`) | Blocks deploys that fail the audit |

## Not recommended

- Country or city landing pages (USA, UK, UAE…) or hreflang: there is one English site and no country-specific content or offers. Pages that only swap the country name are thin duplicates.
- Buying links, directory spam, AI-generated articles without review, or rating markup without real reviews.
