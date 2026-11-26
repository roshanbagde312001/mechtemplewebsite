# Google Search Console, Analytics and Conversion Tracking Setup

Search Console and Google Analytics are not connected to this project, so nothing has been submitted and no Search Console data is quoted anywhere in these reports. These are the manual steps.

## 1. Deploy and verify

1. Push to `main` (Vercel deploys it). Then run `npm run seo:audit:live` and confirm **0 FAIL** in `seo-reports/production/SEO_AUDIT_REPORT.md`.
2. Spot-check structured data on https://search.google.com/test/rich-results for `/`, `/services/saas-application-development` and `/resources/custom-software-vs-off-the-shelf-software`.

## 2. Search Console property

- Add a **Domain property** for `primptech.com` (DNS TXT record at your domain registrar). It covers www, the apex, http and https together.
- The existing `google-site-verification` meta tag in `index.html` keeps the URL-prefix property `https://www.primptech.com/` verified too; keep it.

## 3. Sitemap

Sitemaps → submit `https://www.primptech.com/sitemap.xml` (27 URLs). Remove any older submission of `https://primptech.com/sitemap.xml`. The sitemap rebuilds on every deploy; new guides and services appear automatically.

## 4. URL inspection and indexing

Inspect and **Request indexing** for the new and changed pages first:
`/`, `/services/saas-application-development`, `/resources`, both guides, then the 12 other service pages. For each, confirm:
- "Page is indexable" and HTTP 200.
- User-declared canonical = Google-selected canonical = the `https://www.primptech.com/...` URL.
- The rendered HTML shows the page content (it is prerendered, so it does not depend on JavaScript).

## 5. Monitoring (weekly for the first two months, then monthly)

| Report | What to look for |
| --- | --- |
| Pages (Indexing) | All 27 sitemap URLs indexed. "Page with redirect" should only list apex/http/trailing-slash variants. Investigate any "Crawled – currently not indexed". |
| Performance → Search results | Queries: which keywords from `SEO_KEYWORD_MAPPING.csv` get impressions, and which page ranks for them (if two pages rank for one keyword, merge or differentiate them). Pages: clicks and CTR per page; low CTR with high impressions means the title or description needs work. Countries: India vs the secondary markets. Devices: mobile vs desktop. |
| Core Web Vitals | Field LCP, INP and CLS once there is enough traffic. INP on the home page is the main risk (see `CORE_WEB_VITALS_REPORT.md`). |
| Enhancements | Breadcrumbs and FAQ markup errors (should be zero). |
| Links | Internal links: every page should have inbound links; external links show who links to PrimpTech. |

Also add the site to **Bing Webmaster Tools** (import from Search Console, submit the same sitemap). Bing powers Copilot and part of other AI search results.

## 6. Google Analytics 4 and conversions

The tracking code is already in the site; it switches on when a measurement ID is provided at build time.

1. In Google Analytics, create a GA4 property and a **Web data stream** for `https://www.primptech.com`. Copy the measurement ID (`G-XXXXXXXXXX`).
2. In Vercel → Project → Settings → Environment Variables, add `VITE_GA_MEASUREMENT_ID` = that ID for Production, then redeploy. (Locally: put it in `.env`.)
3. The privacy policy switches automatically to describe cookieless Google Analytics measurement. Have it reviewed.
4. In GA4 → Admin → Events, mark **`generate_lead`** as a key event (conversion). Optionally also `email_click` and `phone_click`.
5. Link GA4 to Search Console (GA4 Admin → Product links) to see organic landing pages with their conversions.

Events sent:

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | Every page, including client-side navigation | page_path, page_title |
| `generate_lead` | Contact form submitted (it opens the visitor's email app) | interest, timeline |
| `cta_click` | Any link to the contact page (includes "Discuss this service" with the service in the URL) | link_text, link_url |
| `email_click` | Any `mailto:` link | link_text |
| `phone_click` | Any `tel:` link (once a phone number is added) | link_text |
| `whatsapp_click` | Any WhatsApp link (none on the site yet) | link_text |
| `map_click` | "Open in Google Maps" | link_text |

Privacy design: Google consent mode defaults all storage to **denied**, so GA4 sets no cookies and Google models the totals. If you later add a cookie banner, call `grantAnalyticsConsent()` from `src/site/analytics.ts` after the visitor opts in, for full measurement. No API keys or secrets are in the frontend; a GA measurement ID is public by design.

**Limitation:** `generate_lead` fires when the visitor's email app opens, not when the email is actually sent; the site has no mail backend. A form backend (see `REMAINING_ACTIONS.md`) would make lead tracking exact.

Google Tag Manager is not used: with one tag and a few events, gtag.js is lighter and simpler. Switch to GTM only if marketing will add several tags.

## 7. Organic performance dashboard

The site has no admin area, so no dashboard was built into it. Use Looker Studio (free) with the Search Console and GA4 connectors: one page each for queries/pages (Search Console), organic landing pages with `generate_lead` (GA4), and countries/devices.
