# SEO Audit Report

- Audited: `http://localhost:4173` (canonical origin `https://www.primptech.com`)
- Mode: local build (domain/redirect checks NOT VERIFIED)
- Run at: 2026-11-26T05:24:25.058Z
- Pages crawled: 27 (sitemap lists 27)

## Score

**Technical SEO checks passed: 806 of 806 applicable (100.0%).**

| Status | Count |
| --- | --- |
| PASS | 806 |
| FAIL | 0 |
| WARNING | 0 |
| NOT APPLICABLE | 2 |
| NOT VERIFIED | 31 |

The score is the share of applicable PASS/FAIL checks that passed. WARNING, NOT APPLICABLE and NOT VERIFIED are excluded from it and listed below. It measures technical compliance only; it says nothing about rankings or traffic.

## Site-level checks

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| S1 | robots.txt returns 200 | PASS | HTTP 200 |
| S2 | robots.txt declares canonical sitemap | PASS | https://www.primptech.com/sitemap.xml |
| S3 | robots.txt does not block the site | PASS | Allow: /; Disallow: /api/ |
| S4 | Search and AI crawlers not blocked (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) | PASS | No user-agent specific blocks |
| S5 | sitemap.xml returns 200 | PASS | HTTP 200 |
| S6 | sitemap.xml is well-formed sitemap XML | PASS | 27 <url> entries |
| S7 | Sitemap lists only canonical-origin URLs | PASS | All 27 on https://www.primptech.com |
| S8 | Sitemap URLs are 200, indexable and self-canonical | PASS | 27/27 OK |
| S9 | Sitemap has no duplicate URLs | PASS | none |
| S10 | llms.txt returns 200 with a title and summary | PASS | HTTP 200, 100 lines |
| S11 | llms.txt links resolve on the canonical origin | PASS | 39 links OK |
| S12 | Unknown URL returns a real HTTP 404 (no soft 404, no redirect to home) | PASS | HTTP 404 |
| S13 | 404 page is noindex and has no canonical | PASS | robots="noindex, follow", canonical=none |
| S14 | 404 page links to Home, Services, Solutions and Contact | PASS | Found: /, /services, /solutions, /contact |
| S15 | 404 page has a useful H1 | PASS | This page does not exist. |
| S16 | Trailing-slash duplicate redirects permanently (/services/ -> /services) | PASS | HTTP 301 -> /services |
| S17 | /favicon.ico returns 200 | PASS | HTTP 200, image/x-icon |
| S18 | /assets/brand/favicon-32.png returns 200 | PASS | HTTP 200, image/png |
| S19 | /assets/brand/apple-touch-icon.png returns 200 | PASS | HTTP 200, image/png |
| S20 | /site.webmanifest returns 200 | PASS | HTTP 200, application/manifest+json |
| S21 | Web manifest icons resolve | PASS | /assets/brand/icon-192.png 200, /assets/brand/icon-512.png 200 |
| S22 | favicon.svg | NOT APPLICABLE | No vector source of the logo exists in the project; PNG and ICO favicons are provided |
| S23 | Domain/HTTPS redirect and HSTS checks | NOT VERIFIED | Run with --live against production to verify |
| S24 | Domain/HTTPS redirect and HSTS checks | NOT VERIFIED | Run with --live against production to verify |
| S25 | Domain/HTTPS redirect and HSTS checks | NOT VERIFIED | Run with --live against production to verify |
| S26 | Domain/HTTPS redirect and HSTS checks | NOT VERIFIED | Run with --live against production to verify |
| S27 | Entity consistency (brand "PrimpTech", website, email) across schema, meta, text and llms.txt | PASS | 27 pages consistent; email contact@primptech.com |
| S28 | llms-full.txt returns 200 and covers every service | PASS | HTTP 200, 40812 bytes |
| S29 | External links resolve | PASS | 1 external links OK: https://www.google.com/maps/search/?api=1&query=The%20Prism%2C%20Shastri%20Nagar%2C%20Wardhaman%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440008 |

## Failures and warnings

None.

## Per-page summary

| Page | PASS | FAIL | WARNING | Title |
| --- | --- | --- | --- | --- |
| https://www.primptech.com/ | 28 | 0 | 0 | PrimpTech \| Software Development, AI & Automation Company |
| https://www.primptech.com/services | 29 | 0 | 0 | Software Development, AI & Automation Services \| PrimpTech |
| https://www.primptech.com/services/website-development | 29 | 0 | 0 | Website Development Company for Businesses \| PrimpTech |
| https://www.primptech.com/services/web-application-development | 29 | 0 | 0 | Web Application Development: CRM, ERP & Portals \| PrimpTech |
| https://www.primptech.com/services/custom-software-development | 29 | 0 | 0 | Custom Software Development Services \| PrimpTech |
| https://www.primptech.com/services/artificial-intelligence-development | 29 | 0 | 0 | AI Development Company: Assistants & AI Integration \| PrimpTech |
| https://www.primptech.com/services/machine-learning-solutions | 29 | 0 | 0 | Machine Learning Solutions & Predictive Models \| PrimpTech |
| https://www.primptech.com/services/intelligent-process-automation | 29 | 0 | 0 | Business Process Automation & AI Workflow Services \| PrimpTech |
| https://www.primptech.com/services/data-engineering-and-analytics | 29 | 0 | 0 | Data Engineering & Analytics Services \| PrimpTech |
| https://www.primptech.com/services/mobile-app-development | 29 | 0 | 0 | Mobile App Development: Android, iOS & Cross-Platform \| PrimpTech |
| https://www.primptech.com/services/api-development-and-integration | 29 | 0 | 0 | API Development & System Integration Services \| PrimpTech |
| https://www.primptech.com/services/cloud-deployment-and-infrastructure | 29 | 0 | 0 | Cloud Deployment & Infrastructure Services \| PrimpTech |
| https://www.primptech.com/services/ui-ux-and-digital-product-design | 29 | 0 | 0 | UI/UX & Digital Product Design Services \| PrimpTech |
| https://www.primptech.com/services/consulting-and-digital-transformation | 29 | 0 | 0 | Technology Consulting & Digital Transformation \| PrimpTech |
| https://www.primptech.com/services/saas-application-development | 29 | 0 | 0 | SaaS Application Development Company \| PrimpTech |
| https://www.primptech.com/solutions | 29 | 0 | 0 | Business Solutions: CRM, ERP, AI Assistants & More \| PrimpTech |
| https://www.primptech.com/industries | 29 | 0 | 0 | Industries We Serve: Software & AI by Sector \| PrimpTech |
| https://www.primptech.com/work | 29 | 0 | 0 | Our Work: Projects & Product Concepts \| PrimpTech |
| https://www.primptech.com/process | 29 | 0 | 0 | How We Work: Our 7-Step Development Process \| PrimpTech |
| https://www.primptech.com/about | 29 | 0 | 0 | About Us: AI & Software Engineering Company \| PrimpTech |
| https://www.primptech.com/careers | 29 | 0 | 0 | Careers in Software, AI & Data Engineering \| PrimpTech |
| https://www.primptech.com/contact | 29 | 0 | 0 | Contact Us: Start a Software or AI Project \| PrimpTech |
| https://www.primptech.com/privacy | 29 | 0 | 0 | Privacy Policy: How We Handle Your Data \| PrimpTech |
| https://www.primptech.com/resources | 29 | 0 | 0 | Guides: Software Development, AI & Automation \| PrimpTech |
| https://www.primptech.com/resources/custom-software-vs-off-the-shelf-software | 29 | 0 | 0 | Custom Software vs Off-the-Shelf Software \| PrimpTech |
| https://www.primptech.com/resources/how-to-automate-repetitive-business-processes | 29 | 0 | 0 | How to Automate Repetitive Business Processes \| PrimpTech |
| https://www.primptech.com/terms | 29 | 0 | 0 | Terms of Use for the Website \| PrimpTech |
