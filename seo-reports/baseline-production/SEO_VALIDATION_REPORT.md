# SEO Validation Report

Every check on every page, with the evidence it was decided on. Audited `https://www.primptech.com` at 2026-11-16T10:32:49.387Z.

## Check matrix

| ID | Check | PASS | FAIL | WARNING | N/A | NOT VERIFIED |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | HTTP status 200 | 1 | 0 | 0 | 0 | 0 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | 1 | 0 | 0 | 0 | 0 |
| P3 | Title present (30-65 chars) | 1 | 0 | 0 | 0 | 0 |
| P4 | Title unique | 1 | 0 | 0 | 0 | 0 |
| P5 | Meta description present (70-160 chars) | 1 | 0 | 0 | 0 | 0 |
| P6 | Meta description unique | 1 | 0 | 0 | 0 | 0 |
| P7 | H1 present in served HTML | 0 | 1 | 0 | 0 | 0 |
| P8 | Exactly one H1 | 0 | 1 | 0 | 0 | 0 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | 0 | 1 | 0 | 0 | 0 |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | 1 | 0 | 0 | 0 | 0 |
| P10 | Canonical present, absolute, HTTPS, canonical origin | 0 | 1 | 0 | 0 | 0 |
| P11 | Canonical is self-referencing and resolves 200 | 0 | 1 | 0 | 0 | 0 |
| P12 | Included in sitemap.xml | 0 | 1 | 0 | 0 | 0 |
| P13 | Robots meta allows indexing and following | 1 | 0 | 0 | 0 | 0 |
| P14 | Has crawlable internal links (<a href>) | 0 | 1 | 0 | 0 | 0 |
| P15 | No broken internal links | 1 | 0 | 0 | 0 | 0 |
| P15b | Internal links point at final URLs (no redirects) | 1 | 0 | 0 | 0 | 0 |
| P16 | Every image has an alt attribute | 0 | 0 | 0 | 1 | 0 |
| P17 | Images load (200) | 0 | 0 | 0 | 1 | 0 |
| P18 | Open Graph and Twitter metadata complete | 0 | 1 | 0 | 0 | 0 |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | 0 | 1 | 0 | 0 | 0 |
| P19b | Rich result eligibility (Google Rich Results Test) | 0 | 0 | 0 | 0 | 1 |
| P20 | Visible breadcrumbs plus BreadcrumbList | 0 | 0 | 0 | 1 | 0 |
| P21 | Mobile viewport meta | 1 | 0 | 0 | 0 | 0 |
| P22 | HTTPS only (no http:// resources or links) | 1 | 0 | 0 | 0 | 0 |
| P23 | Served without redirect | 1 | 0 | 0 | 0 | 0 |
| P24 | Not an orphan (linked from another page) | 1 | 0 | 0 | 0 | 0 |
| P25 | Social image returns 200 on canonical origin (1200x630) | 0 | 1 | 0 | 0 | 0 |
| P26 | <html lang> set | 1 | 0 | 0 | 0 | 0 |
| P27 | Body content present without JavaScript (prerendered) | 0 | 1 | 0 | 0 | 0 |

## https://www.primptech.com/

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| P1 | HTTP status 200 | PASS | HTTP 200 |
| P2 | Indexable (no noindex in meta or X-Robots-Tag) | PASS | meta robots="index, follow, max-image-preview:large" |
| P3 | Title present (30-65 chars) | PASS | 57 chars: Primptech \| AI, Software Engineering & Automation Company |
| P4 | Title unique | PASS | unique |
| P5 | Meta description present (70-160 chars) | PASS | 158 chars |
| P6 | Meta description unique | PASS | unique |
| P7 | H1 present in served HTML | FAIL | none |
| P8 | Exactly one H1 | FAIL | 0 H1 |
| P9 | Heading hierarchy (starts at H1, no skipped levels) | FAIL | 0 headings in order |
| P9b | Heading text has real word spacing (no "wordsRunTogether") | PASS | ok |
| P10 | Canonical present, absolute, HTTPS, canonical origin | FAIL | https://primptech.com/ |
| P11 | Canonical is self-referencing and resolves 200 | FAIL | page https://www.primptech.com/, canonical https://primptech.com/ |
| P12 | Included in sitemap.xml | FAIL | not listed |
| P13 | Robots meta allows indexing and following | PASS | index, follow, max-image-preview:large |
| P14 | Has crawlable internal links (<a href>) | FAIL | 0 internal links, 0 unique |
| P15 | No broken internal links | PASS | all 200 |
| P15b | Internal links point at final URLs (no redirects) | PASS | no redirecting links |
| P16 | Every image has an alt attribute | NOT APPLICABLE | 0 images, 0 without alt, 0 empty alt outside decorative containers |
| P17 | Images load (200) | NOT APPLICABLE | 0 unique images OK |
| P18 | Open Graph and Twitter metadata complete | FAIL | og:url https://primptech.com/ |
| P19 | Structured data valid JSON-LD, connected @ids, matches visible content | FAIL | @id off canonical origin: https://primptech.com/#organization, https://primptech.com/#business, https://primptech.com/#website, https://primptech.com/#webpage; ProfessionalService without address |
| P19b | Rich result eligibility (Google Rich Results Test) | NOT VERIFIED | Requires Google's Rich Results Test / Search Console; this audit validates JSON syntax, @id graph and content parity only |
| P20 | Visible breadcrumbs plus BreadcrumbList | NOT APPLICABLE | home page |
| P21 | Mobile viewport meta | PASS | width=device-width, initial-scale=1, viewport-fit=cover |
| P22 | HTTPS only (no http:// resources or links) | PASS | none |
| P23 | Served without redirect | PASS | HTTP 200 |
| P24 | Not an orphan (linked from another page) | PASS | home page |
| P25 | Social image returns 200 on canonical origin (1200x630) | FAIL | HTTP 308, size unknown, https://primptech.com/og/home.jpg |
| P26 | <html lang> set | PASS | present |
| P27 | Body content present without JavaScript (prerendered) | FAIL | 0 characters of text in served HTML |
