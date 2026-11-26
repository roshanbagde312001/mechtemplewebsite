# SEO Audit Report

- Audited: `https://www.primptech.com`
- Mode: live production (domain and redirect checks included)
- Run at: 2026-11-26T04:51:14.306Z
- Pages crawled: 23 (sitemap lists 23)

## Score

**Technical SEO checks passed: 690 of 690 applicable (100.0%).**

| Status | Count |
| --- | --- |
| PASS | 690 |
| FAIL | 0 |
| WARNING | 1 |
| NOT APPLICABLE | 2 |
| NOT VERIFIED | 23 |

The score is the share of applicable PASS/FAIL checks that passed. WARNING, NOT APPLICABLE and NOT VERIFIED are excluded from it and listed below. It measures technical compliance only; it says nothing about rankings or traffic.

## Site-level checks

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| S1 | robots.txt returns 200 | PASS | HTTP 200 |
| S2 | robots.txt declares canonical sitemap | PASS | https://www.primptech.com/sitemap.xml |
| S3 | robots.txt does not block the site | PASS | Allow: /; Disallow: /api/ |
| S4 | Search and AI crawlers not blocked (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) | PASS | No user-agent specific blocks |
| S5 | sitemap.xml returns 200 | PASS | HTTP 200 |
| S6 | sitemap.xml is well-formed sitemap XML | PASS | 23 <url> entries |
| S7 | Sitemap lists only canonical-origin URLs | PASS | All 23 on https://www.primptech.com |
| S8 | Sitemap URLs are 200, indexable and self-canonical | PASS | 23/23 OK |
| S9 | Sitemap has no duplicate URLs | PASS | none |
| S10 | llms.txt returns 200 with a title and summary | PASS | HTTP 200, 92 lines |
| S11 | llms.txt links resolve on the canonical origin | PASS | 34 links OK |
| S12 | Unknown URL returns a real HTTP 404 (no soft 404, no redirect to home) | PASS | HTTP 404 |
| S13 | 404 page is noindex and has no canonical | PASS | robots="noindex, follow", canonical=none |
| S14 | 404 page links to Home, Services, Solutions and Contact | PASS | Found: /, /services, /solutions, /contact |
| S15 | 404 page has a useful H1 | PASS | This page does not exist. |
| S16 | Trailing-slash duplicate redirects permanently (/services/ -> /services) | PASS | HTTP 308 -> /services |
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
| (site) | S23 | http://primptech.com/ redirects to https://www.primptech.com/ | WARNING | 308 https://primptech.com/ -> 308 https://www.primptech.com/ (2-hop chain) |

## Per-page summary

| Page | PASS | FAIL | WARNING | Title |
| --- | --- | --- | --- | --- |
| https://www.primptech.com/ | 28 | 0 | 0 | Primptech \| AI, Software Engineering & Automation Company |
| https://www.primptech.com/services | 29 | 0 | 0 | Software Development, AI & Automation Services \| Primptech |
| https://www.primptech.com/services/website-development | 29 | 0 | 0 | Website Development Services for Businesses \| Primptech |
| https://www.primptech.com/services/web-application-development | 29 | 0 | 0 | Web Application Development: CRM, SaaS & Portals \| Primptech |
| https://www.primptech.com/services/custom-software-development | 29 | 0 | 0 | Custom Software Development Services \| Primptech |
| https://www.primptech.com/services/artificial-intelligence-development | 29 | 0 | 0 | AI Development: Assistants, Chatbots & AI Integration \| Primptech |
| https://www.primptech.com/services/machine-learning-solutions | 29 | 0 | 0 | Machine Learning Solutions & Predictive Models \| Primptech |
| https://www.primptech.com/services/intelligent-process-automation | 29 | 0 | 0 | Intelligent Process Automation Services \| Primptech |
| https://www.primptech.com/services/data-engineering-and-analytics | 29 | 0 | 0 | Data Engineering & Analytics Services \| Primptech |
| https://www.primptech.com/services/mobile-app-development | 29 | 0 | 0 | Mobile App Development: Android, iOS & Cross-Platform \| Primptech |
| https://www.primptech.com/services/api-development-and-integration | 29 | 0 | 0 | API Development & System Integration Services \| Primptech |
| https://www.primptech.com/services/cloud-deployment-and-infrastructure | 29 | 0 | 0 | Cloud Deployment & Infrastructure Services \| Primptech |
| https://www.primptech.com/services/ui-ux-and-digital-product-design | 29 | 0 | 0 | UI/UX & Digital Product Design Services \| Primptech |
| https://www.primptech.com/services/consulting-and-digital-transformation | 29 | 0 | 0 | Technology Consulting & Digital Transformation \| Primptech |
| https://www.primptech.com/solutions | 29 | 0 | 0 | Business Solutions: CRM, ERP, AI Assistants & More \| Primptech |
| https://www.primptech.com/industries | 29 | 0 | 0 | Industries We Serve: Software & AI by Sector \| Primptech |
| https://www.primptech.com/work | 29 | 0 | 0 | Our Work: Projects & Product Concepts \| Primptech |
| https://www.primptech.com/process | 29 | 0 | 0 | How We Work: Our 7-Step Development Process \| Primptech |
| https://www.primptech.com/about | 29 | 0 | 0 | About Us: AI & Software Engineering Company \| Primptech |
| https://www.primptech.com/careers | 29 | 0 | 0 | Careers in Software, AI & Data Engineering \| Primptech |
| https://www.primptech.com/contact | 29 | 0 | 0 | Contact Us: Start a Software or AI Project \| Primptech |
| https://www.primptech.com/privacy | 29 | 0 | 0 | Privacy Policy: How We Handle Your Data \| Primptech |
| https://www.primptech.com/terms | 29 | 0 | 0 | Terms of Use for the Website \| Primptech |
