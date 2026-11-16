# SEO Audit Report

- Audited: `https://www.primptech.com`
- Mode: live production (domain and redirect checks included)
- Run at: 2026-11-16T10:32:49.387Z
- Pages crawled: 1 (sitemap lists 23)

## Score

**Technical SEO checks passed: 32 of 50 applicable (64.0%).**

| Status | Count |
| --- | --- |
| PASS | 32 |
| FAIL | 18 |
| WARNING | 1 |
| NOT APPLICABLE | 4 |
| NOT VERIFIED | 1 |

The score is the share of applicable PASS/FAIL checks that passed. WARNING, NOT APPLICABLE and NOT VERIFIED are excluded from it and listed below. It measures technical compliance only; it says nothing about rankings or traffic.

## Site-level checks

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| S1 | robots.txt returns 200 | PASS | HTTP 200 |
| S2 | robots.txt declares canonical sitemap | FAIL | https://primptech.com/sitemap.xml |
| S3 | robots.txt does not block the site | PASS | Allow: /; Disallow: /api/ |
| S4 | Search and AI crawlers not blocked (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) | PASS | No user-agent specific blocks |
| S5 | sitemap.xml returns 200 | PASS | HTTP 200 |
| S6 | sitemap.xml is well-formed sitemap XML | PASS | 23 <url> entries |
| S7 | Sitemap lists only canonical-origin URLs | FAIL | https://primptech.com/, https://primptech.com/services, https://primptech.com/services/website-development, https://primptech.com/services/web-application-development, https://primptech.com/services/custom-software-development, https://primptech.com/services/artificial-intelligence-development, https://primptech.com/services/machine-learning-solutions, https://primptech.com/services/intelligent-process-automation, https://primptech.com/services/data-engineering-and-analytics, https://primptech.com/services/mobile-app-development, https://primptech.com/services/api-development-and-integration, https://primptech.com/services/cloud-deployment-and-infrastructure, https://primptech.com/services/ui-ux-and-digital-product-design, https://primptech.com/services/consulting-and-digital-transformation, https://primptech.com/solutions, https://primptech.com/industries, https://primptech.com/work, https://primptech.com/process, https://primptech.com/about, https://primptech.com/careers, https://primptech.com/contact, https://primptech.com/privacy, https://primptech.com/terms |
| S8 | Sitemap URLs are 200, indexable and self-canonical | FAIL | https://primptech.com/ (not crawled); https://primptech.com/services (not crawled); https://primptech.com/services/website-development (not crawled); https://primptech.com/services/web-application-development (not crawled); https://primptech.com/services/custom-software-development (not crawled); https://primptech.com/services/artificial-intelligence-development (not crawled); https://primptech.com/services/machine-learning-solutions (not crawled); https://primptech.com/services/intelligent-process-automation (not crawled); https://primptech.com/services/data-engineering-and-analytics (not crawled); https://primptech.com/services/mobile-app-development (not crawled); https://primptech.com/services/api-development-and-integration (not crawled); https://primptech.com/services/cloud-deployment-and-infrastructure (not crawled); https://primptech.com/services/ui-ux-and-digital-product-design (not crawled); https://primptech.com/services/consulting-and-digital-transformation (not crawled); https://primptech.com/solutions (not crawled); https://primptech.com/industries (not crawled); https://primptech.com/work (not crawled); https://primptech.com/process (not crawled); https://primptech.com/about (not crawled); https://primptech.com/careers (not crawled); https://primptech.com/contact (not crawled); https://primptech.com/privacy (not crawled); https://primptech.com/terms (not crawled) |
| S9 | Sitemap has no duplicate URLs | PASS | none |
| S10 | llms.txt returns 200 with a title and summary | PASS | HTTP 200, 39 lines |
| S11 | llms.txt links resolve on the canonical origin | FAIL | https://primptech.com/ (off-origin); https://primptech.com/services (off-origin); https://primptech.com/solutions (off-origin); https://primptech.com/industries (off-origin); https://primptech.com/work (off-origin); https://primptech.com/services/website-development (off-origin); https://primptech.com/services/web-application-development (off-origin); https://primptech.com/services/custom-software-development (off-origin); https://primptech.com/services/artificial-intelligence-development (off-origin); https://primptech.com/services/machine-learning-solutions (off-origin); https://primptech.com/services/intelligent-process-automation (off-origin); https://primptech.com/services/data-engineering-and-analytics (off-origin); https://primptech.com/services/mobile-app-development (off-origin); https://primptech.com/services/api-development-and-integration (off-origin); https://primptech.com/services/cloud-deployment-and-infrastructure (off-origin); https://primptech.com/services/ui-ux-and-digital-product-design (off-origin); https://primptech.com/services/consulting-and-digital-transformation (off-origin); https://primptech.com/process (off-origin); https://primptech.com/about (off-origin); https://primptech.com/careers (off-origin); https://primptech.com/contact (off-origin); https://primptech.com/privacy (off-origin); https://primptech.com/terms (off-origin) |
| S12 | Unknown URL returns a real HTTP 404 (no soft 404, no redirect to home) | PASS | HTTP 404 |
| S13 | 404 page is noindex and has no canonical | PASS | robots="noindex, follow", canonical=none |
| S14 | 404 page links to Home, Services, Solutions and Contact | FAIL | Found: none |
| S15 | 404 page has a useful H1 | FAIL | no h1 |
| S16 | Trailing-slash duplicate redirects permanently (/services/ -> /services) | FAIL | HTTP 200 |
| S17 | /favicon.ico returns 200 | PASS | HTTP 200, image/vnd.microsoft.icon |
| S18 | /assets/brand/favicon-32.png returns 200 | PASS | HTTP 200, image/png |
| S19 | /assets/brand/apple-touch-icon.png returns 200 | PASS | HTTP 200, image/png |
| S20 | /site.webmanifest returns 200 | PASS | HTTP 200, application/manifest+json; charset=utf-8 |
| S21 | Web manifest icons resolve | PASS | /assets/brand/icon-192.png 200, /assets/brand/icon-512.png 200 |
| S22 | favicon.svg | NOT APPLICABLE | No vector source of the logo exists in the project; PNG and ICO favicons are provided |
| S23 | http://primptech.com/ redirects to https://www.primptech.com/ | WARNING | 308 https://primptech.com/ -> 308 https://www.primptech.com/ (2-hop chain) |
| S24 | https://primptech.com/ redirects to https://www.primptech.com/ | PASS | 308 https://www.primptech.com/ |
| S25 | http://www.primptech.com/ redirects to https://www.primptech.com/ | PASS | 308 https://www.primptech.com/ |
| S26 | HSTS header on the canonical origin | PASS | max-age=63072000 |

## Failures and warnings

| Page | ID | Check | Status | Evidence |
| --- | --- | --- | --- | --- |
| (site) | S2 | robots.txt declares canonical sitemap | FAIL | https://primptech.com/sitemap.xml |
| (site) | S7 | Sitemap lists only canonical-origin URLs | FAIL | https://primptech.com/, https://primptech.com/services, https://primptech.com/services/website-development, https://primptech.com/services/web-application-development, https://primptech.com/services/custom-software-development, https://primptech.com/services/artificial-intelligence-development, https://primptech.com/services/machine-learning-solutions, https://primptech.com/services/intelligent-process-automation, https://primptech.com/services/data-engineering-and-analytics, https://primptech.com/services/mobile-app-development, https://primptech.com/services/api-development-and-integration, https://primptech.com/services/cloud-deployment-and-infrastructure, https://primptech.com/services/ui-ux-and-digital-product-design, https://primptech.com/services/consulting-and-digital-transformation, https://primptech.com/solutions, https://primptech.com/industries, https://primptech.com/work, https://primptech.com/process, https://primptech.com/about, https://primptech.com/careers, https://primptech.com/contact, https://primptech.com/privacy, https://primptech.com/terms |
| (site) | S8 | Sitemap URLs are 200, indexable and self-canonical | FAIL | https://primptech.com/ (not crawled); https://primptech.com/services (not crawled); https://primptech.com/services/website-development (not crawled); https://primptech.com/services/web-application-development (not crawled); https://primptech.com/services/custom-software-development (not crawled); https://primptech.com/services/artificial-intelligence-development (not crawled); https://primptech.com/services/machine-learning-solutions (not crawled); https://primptech.com/services/intelligent-process-automation (not crawled); https://primptech.com/services/data-engineering-and-analytics (not crawled); https://primptech.com/services/mobile-app-development (not crawled); https://primptech.com/services/api-development-and-integration (not crawled); https://primptech.com/services/cloud-deployment-and-infrastructure (not crawled); https://primptech.com/services/ui-ux-and-digital-product-design (not crawled); https://primptech.com/services/consulting-and-digital-transformation (not crawled); https://primptech.com/solutions (not crawled); https://primptech.com/industries (not crawled); https://primptech.com/work (not crawled); https://primptech.com/process (not crawled); https://primptech.com/about (not crawled); https://primptech.com/careers (not crawled); https://primptech.com/contact (not crawled); https://primptech.com/privacy (not crawled); https://primptech.com/terms (not crawled) |
| (site) | S11 | llms.txt links resolve on the canonical origin | FAIL | https://primptech.com/ (off-origin); https://primptech.com/services (off-origin); https://primptech.com/solutions (off-origin); https://primptech.com/industries (off-origin); https://primptech.com/work (off-origin); https://primptech.com/services/website-development (off-origin); https://primptech.com/services/web-application-development (off-origin); https://primptech.com/services/custom-software-development (off-origin); https://primptech.com/services/artificial-intelligence-development (off-origin); https://primptech.com/services/machine-learning-solutions (off-origin); https://primptech.com/services/intelligent-process-automation (off-origin); https://primptech.com/services/data-engineering-and-analytics (off-origin); https://primptech.com/services/mobile-app-development (off-origin); https://primptech.com/services/api-development-and-integration (off-origin); https://primptech.com/services/cloud-deployment-and-infrastructure (off-origin); https://primptech.com/services/ui-ux-and-digital-product-design (off-origin); https://primptech.com/services/consulting-and-digital-transformation (off-origin); https://primptech.com/process (off-origin); https://primptech.com/about (off-origin); https://primptech.com/careers (off-origin); https://primptech.com/contact (off-origin); https://primptech.com/privacy (off-origin); https://primptech.com/terms (off-origin) |
| (site) | S14 | 404 page links to Home, Services, Solutions and Contact | FAIL | Found: none |
| (site) | S15 | 404 page has a useful H1 | FAIL | no h1 |
| (site) | S16 | Trailing-slash duplicate redirects permanently (/services/ -> /services) | FAIL | HTTP 200 |
| (site) | S23 | http://primptech.com/ redirects to https://www.primptech.com/ | WARNING | 308 https://primptech.com/ -> 308 https://www.primptech.com/ (2-hop chain) |
| https://www.primptech.com/ | P7 | H1 present in served HTML | FAIL | none |
| https://www.primptech.com/ | P8 | Exactly one H1 | FAIL | 0 H1 |
| https://www.primptech.com/ | P9 | Heading hierarchy (starts at H1, no skipped levels) | FAIL | 0 headings in order |
| https://www.primptech.com/ | P10 | Canonical present, absolute, HTTPS, canonical origin | FAIL | https://primptech.com/ |
| https://www.primptech.com/ | P11 | Canonical is self-referencing and resolves 200 | FAIL | page https://www.primptech.com/, canonical https://primptech.com/ |
| https://www.primptech.com/ | P12 | Included in sitemap.xml | FAIL | not listed |
| https://www.primptech.com/ | P14 | Has crawlable internal links (<a href>) | FAIL | 0 internal links, 0 unique |
| https://www.primptech.com/ | P18 | Open Graph and Twitter metadata complete | FAIL | og:url https://primptech.com/ |
| https://www.primptech.com/ | P19 | Structured data valid JSON-LD, connected @ids, matches visible content | FAIL | @id off canonical origin: https://primptech.com/#organization, https://primptech.com/#business, https://primptech.com/#website, https://primptech.com/#webpage; ProfessionalService without address |
| https://www.primptech.com/ | P25 | Social image returns 200 on canonical origin (1200x630) | FAIL | HTTP 308, size unknown, https://primptech.com/og/home.jpg |
| https://www.primptech.com/ | P27 | Body content present without JavaScript (prerendered) | FAIL | 0 characters of text in served HTML |

## Per-page summary

| Page | PASS | FAIL | WARNING | Title |
| --- | --- | --- | --- | --- |
| https://www.primptech.com/ | 15 | 11 | 0 | Primptech \| AI, Software Engineering & Automation Company |
