# Google Search Console: manual steps after deploying

Search Console is not connected to this project, so nothing has been submitted. Do these by hand after the
changes are deployed to Vercel.

1. **Deploy, then verify production.** Run `npm run seo:audit:live` and confirm 0 FAIL in `seo-reports/production/`.
2. **Property.** Use a *Domain property* for `primptech.com` (DNS TXT verification) so www, apex, http and https are
   all covered. The existing `google-site-verification` meta tag keeps the URL-prefix property for
   `https://www.primptech.com/` verified as well.
3. **Sitemap.** Sitemaps → submit `https://www.primptech.com/sitemap.xml`. If the old `https://primptech.com/sitemap.xml`
   was submitted earlier, remove it.
4. **URL Inspection → Request indexing** for: `/`, `/services`, the six footer service pages, `/solutions`, `/industries`,
   `/work`, `/process`, `/about`, `/contact`. Check that "User-declared canonical" and "Google-selected canonical" both
   show the `https://www.primptech.com/...` URL.
5. **Rich results.** Test a service page and `/process` at https://search.google.com/test/rich-results (BreadcrumbList,
   FAQPage, Organization). Google only shows FAQ rich results for some sites; the markup is still valid.
6. **Pages report.** After 1 to 3 weeks, check that "Page with redirect" covers only apex and trailing-slash URLs, and
   that "Alternate page with proper canonical tag" / "Duplicate without user-selected canonical" are empty.
7. **Core Web Vitals.** Field data appears once Chrome UX Report has enough traffic; until then use PageSpeed Insights.
8. **Bing Webmaster Tools.** Import the property from Search Console and submit the same sitemap (Bing also feeds
   Copilot and other AI search).

No indexing or ranking outcome is guaranteed by any of these steps.
