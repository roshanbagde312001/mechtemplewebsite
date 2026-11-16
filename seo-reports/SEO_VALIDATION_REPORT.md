# SEO Validation Report

Every check on every page, with the evidence it was decided on. Audited `http://localhost:4173` at 2026-11-16T10:38:09.498Z.

## Check matrix

| ID | Check | PASS | FAIL | WARNING | N/A | NOT VERIFIED |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | HTTP status 200 | 23 | 0 | 0 | 0 | 0 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | 23 | 0 | 0 | 0 | 0 |
| P3 | Title present (30-65 chars) | 23 | 0 | 0 | 0 | 0 |
| P4 | Title unique | 23 | 0 | 0 | 0 | 0 |
| P5 | Meta description present (70-160 chars) | 23 | 0 | 0 | 0 | 0 |
| P6 | Meta description unique | 23 | 0 | 0 | 0 | 0 |
| P7 | H1 present in served HTML | 23 | 0 | 0 | 0 | 0 |
| P8 | Exactly one H1 | 23 | 0 | 0 | 0 | 0 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | 23 | 0 | 0 | 0 | 0 |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | 23 | 0 | 0 | 0 | 0 |
| P10 | Canonical present, absolute, HTTPS, canonical origin | 23 | 0 | 0 | 0 | 0 |
| P11 | Canonical is self-referencing and resolves 200 | 23 | 0 | 0 | 0 | 0 |
| P12 | Included in sitemap.xml | 23 | 0 | 0 | 0 | 0 |
| P13 | Robots meta allows indexing and following | 23 | 0 | 0 | 0 | 0 |
| P14 | Has crawlable internal links (<a href>) | 23 | 0 | 0 | 0 | 0 |
| P15 | No broken internal links | 23 | 0 | 0 | 0 | 0 |
| P15b | Internal links point at final URLs (no redirects) | 23 | 0 | 0 | 0 | 0 |
| P16 | Every image has an alt attribute | 23 | 0 | 0 | 0 | 0 |
| P17 | Images load (200) | 23 | 0 | 0 | 0 | 0 |
| P18 | Open Graph and Twitter metadata complete | 23 | 0 | 0 | 0 | 0 |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | 23 | 0 | 0 | 0 | 0 |
| P19b | Rich result eligibility (Google Rich Results Test) | 0 | 0 | 0 | 0 | 23 |
| P20 | Visible breadcrumbs plus BreadcrumbList | 22 | 0 | 0 | 1 | 0 |
| P21 | Mobile viewport meta | 23 | 0 | 0 | 0 | 0 |
| P22 | HTTPS only (no http:// resources or links) | 23 | 0 | 0 | 0 | 0 |
| P23 | Served without redirect | 23 | 0 | 0 | 0 | 0 |
| P24 | Not an orphan (linked from another page) | 23 | 0 | 0 | 0 | 0 |
| P25 | Social image returns 200 on canonical origin (1200x630) | 23 | 0 | 0 | 0 | 0 |
| P26 | <html lang> set | 23 | 0 | 0 | 0 | 0 |
| P27 | Body content present without JavaScript (prerendered) | 23 | 0 | 0 | 0 | 0 |

## https://www.primptech.com/

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 57 chars: Primptech \| AI, Software Engineering & Automation Company |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 158 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Engineering what comes next. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 69 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/ |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/, canonical https://www.primptech.com/ |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 49 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 32 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 30 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/ |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | NOT APPLICABLE | home page |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | home page |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/home.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 16787 characters of text in served HTML |

## https://www.primptech.com/services

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 58 chars: Software Development, AI & Automation Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 160 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Services built around your business. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 18 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services, canonical https://www.primptech.com/services |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 56 internal links, 23 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 10 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 9 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, CollectionPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 5113 characters of text in served HTML |

## https://www.primptech.com/services/website-development

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 55 chars: Website Development Services for Businesses \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 151 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Website Development |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 17 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/website-development |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/website-development, canonical https://www.primptech.com/services/website-development |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 22 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 3 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/website-development |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-website-development.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4683 characters of text in served HTML |

## https://www.primptech.com/services/web-application-development

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 60 chars: Web Application Development: CRM, SaaS & Portals \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 153 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Web Application Development |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 15 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/web-application-development |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/web-application-development, canonical https://www.primptech.com/services/web-application-development |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 53 internal links, 23 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 3 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/web-application-development |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-web-application-development.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4792 characters of text in served HTML |

## https://www.primptech.com/services/custom-software-development

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 48 chars: Custom Software Development Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 151 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Custom Software Development |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 15 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/custom-software-development |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/custom-software-development, canonical https://www.primptech.com/services/custom-software-development |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 53 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/custom-software-development |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-custom-software-development.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4778 characters of text in served HTML |

## https://www.primptech.com/services/artificial-intelligence-development

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 65 chars: AI Development: Assistants, Chatbots & AI Integration \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 139 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Artificial Intelligence Development |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 19 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/artificial-intelligence-development |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/artificial-intelligence-development, canonical https://www.primptech.com/services/artificial-intelligence-development |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/artificial-intelligence-development |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-artificial-intelligence-development.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 5430 characters of text in served HTML |

## https://www.primptech.com/services/machine-learning-solutions

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 58 chars: Machine Learning Solutions & Predictive Models \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 153 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Machine Learning Solutions |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 16 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/machine-learning-solutions |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/machine-learning-solutions, canonical https://www.primptech.com/services/machine-learning-solutions |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 49 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 3 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/machine-learning-solutions |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-machine-learning-solutions.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4637 characters of text in served HTML |

## https://www.primptech.com/services/intelligent-process-automation

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 51 chars: Intelligent Process Automation Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 157 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Intelligent Process Automation |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 19 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/intelligent-process-automation |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/intelligent-process-automation, canonical https://www.primptech.com/services/intelligent-process-automation |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 23 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/intelligent-process-automation |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-intelligent-process-automation.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4844 characters of text in served HTML |

## https://www.primptech.com/services/data-engineering-and-analytics

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 49 chars: Data Engineering & Analytics Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 155 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Data Engineering & Analytics |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 17 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/data-engineering-and-analytics |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/data-engineering-and-analytics, canonical https://www.primptech.com/services/data-engineering-and-analytics |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 23 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/data-engineering-and-analytics |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 6 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-data-engineering-and-analytics.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4258 characters of text in served HTML |

## https://www.primptech.com/services/mobile-app-development

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 65 chars: Mobile App Development: Android, iOS & Cross-Platform \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 147 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Mobile App Development |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 15 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/mobile-app-development |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/mobile-app-development, canonical https://www.primptech.com/services/mobile-app-development |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 52 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/mobile-app-development |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 7 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-mobile-app-development.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4403 characters of text in served HTML |

## https://www.primptech.com/services/api-development-and-integration

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 57 chars: API Development & System Integration Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 143 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | API Development & Integration |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 15 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/api-development-and-integration |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/api-development-and-integration, canonical https://www.primptech.com/services/api-development-and-integration |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 23 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/api-development-and-integration |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 4 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-api-development-and-integration.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4123 characters of text in served HTML |

## https://www.primptech.com/services/cloud-deployment-and-infrastructure

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 54 chars: Cloud Deployment & Infrastructure Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 159 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Cloud, Deployment & Infrastructure |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 14 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/cloud-deployment-and-infrastructure |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/cloud-deployment-and-infrastructure, canonical https://www.primptech.com/services/cloud-deployment-and-infrastructure |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 49 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/cloud-deployment-and-infrastructure |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 3 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-cloud-deployment-and-infrastructure.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 3967 characters of text in served HTML |

## https://www.primptech.com/services/ui-ux-and-digital-product-design

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 51 chars: UI/UX & Digital Product Design Services \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 149 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | UI/UX & Digital Product Design |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 14 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/ui-ux-and-digital-product-design |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/ui-ux-and-digital-product-design, canonical https://www.primptech.com/services/ui-ux-and-digital-product-design |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 21 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 3 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/ui-ux-and-digital-product-design |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 6 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-ui-ux-and-digital-product-design.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4032 characters of text in served HTML |

## https://www.primptech.com/services/consulting-and-digital-transformation

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 58 chars: Technology Consulting & Digital Transformation \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 155 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Consulting & Digital Transformation |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 14 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/services/consulting-and-digital-transformation |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/services/consulting-and-digital-transformation, canonical https://www.primptech.com/services/consulting-and-digital-transformation |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 50 internal links, 20 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 4 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/services/consulting-and-digital-transformation |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, Service, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 3 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/services-consulting-and-digital-transformation.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4229 characters of text in served HTML |

## https://www.primptech.com/solutions

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 62 chars: Business Solutions: CRM, ERP, AI Assistants & More \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 158 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Services, combined into systems that run a business. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 19 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/solutions |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/solutions, canonical https://www.primptech.com/solutions |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 51 internal links, 19 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 12 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 11 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/solutions |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/solutions.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 4758 characters of text in served HTML |

## https://www.primptech.com/industries

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 56 chars: Industries We Serve: Software & AI by Sector \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 157 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Different industries. Distinct ways of working. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 14 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/industries |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/industries, canonical https://www.primptech.com/industries |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 43 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 9 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 8 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/industries |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/industries.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 2433 characters of text in served HTML |

## https://www.primptech.com/work

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 49 chars: Our Work: Projects & Product Concepts \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 150 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Selected work and concepts. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 9 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/work |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/work, canonical https://www.primptech.com/work |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 44 internal links, 18 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 5 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 4 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/work |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, CollectionPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/work.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 2283 characters of text in served HTML |

## https://www.primptech.com/process

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 55 chars: How We Work: Our 7-Step Development Process \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 152 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Seven steps, from problem to production. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 19 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/process |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/process, canonical https://www.primptech.com/process |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 46 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 9 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 8 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/process |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList, FAQPage |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/process.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 3933 characters of text in served HTML |

## https://www.primptech.com/about

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 55 chars: About Us: AI & Software Engineering Company \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 141 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | An AI and technology engineering company. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 35 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/about |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/about, canonical https://www.primptech.com/about |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 43 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 8 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 7 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/about |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, AboutPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/about.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 6687 characters of text in served HTML |

## https://www.primptech.com/careers

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 54 chars: Careers in Software, AI & Data Engineering \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 151 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Build what comes next with us. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 18 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/careers |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/careers, canonical https://www.primptech.com/careers |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 39 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 6 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 5 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/careers |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/careers.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 2381 characters of text in served HTML |

## https://www.primptech.com/contact

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 54 chars: Contact Us: Start a Software or AI Project \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 155 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Let's talk about what you need. |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 10 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/contact |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/contact, canonical https://www.primptech.com/contact |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 40 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 3 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 2 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/contact |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, ContactPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/contact.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 3112 characters of text in served HTML |

## https://www.primptech.com/privacy

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 51 chars: Privacy Policy: How We Handle Your Data \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 141 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Privacy policy |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 14 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/privacy |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/privacy, canonical https://www.primptech.com/privacy |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 39 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 2 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 1 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/privacy |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/home.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 2998 characters of text in served HTML |

## https://www.primptech.com/terms

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" |
| P3 | Title present (30-65 chars) | PASS | 40 chars: Terms of Use for the Website \| Primptech |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 133 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | PASS | Terms of use |
| P8 | Exactly one H1 | PASS | 1 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | PASS | 13 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | PASS | https://www.primptech.com/terms |
| P11 | Canonical is self-referencing and resolves 200 | PASS | page https://www.primptech.com/terms, canonical https://www.primptech.com/terms |
| P12 | Included in sitemap.xml | PASS | listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| P14 | Has crawlable internal links (<a href>) | PASS | 39 internal links, 17 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | PASS | 2 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | PASS | 1 unique images OK |
| P18 | Open Graph and Twitter metadata complete | PASS | og:url https://www.primptech.com/terms |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | PASS | Organization, Person, WebSite, ProfessionalService, WebPage, BreadcrumbList |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | PASS | nav=true, schema=true |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | 22 linking pages |
| P25 | Social image returns 200 on canonical origin (1200x630) | PASS | HTTP 200, 1200x630, https://www.primptech.com/og/home.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | PASS | 2714 characters of text in served HTML |
