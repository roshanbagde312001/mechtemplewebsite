// Google Analytics 4, loaded only when VITE_GA_MEASUREMENT_ID is set at build time (see GA_MEASUREMENT_ID in content.ts).
// Privacy: consent mode defaults every storage type to "denied", so GA runs cookieless (no analytics or ad cookies);
// Google models the aggregate numbers. If a consent banner is added later, call grantAnalyticsConsent() after opt-in.
//
// Events sent (mark generate_lead as a key event in GA4 to count enquiries):
//   page_view       every route change (client-side navigation included)
//   generate_lead   contact form submitted (opens the visitor's email app); params: interest, timeline
//   email_click     any mailto: link;   phone_click   any tel: link;   whatsapp_click   wa.me / WhatsApp links
//   map_click       Google Maps link (office location)
//   cta_click       any link to /contact; params: link_text, link_url (with ?interest=… for service CTAs)
import { GA_MEASUREMENT_ID, ANALYTICS_ENABLED } from './content';

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

let started = false;

const gtag: Gtag = (...args) => { if (started && window.gtag) window.gtag(...args); };

export function initAnalytics() {
  if (started || !ANALYTICS_ENABLED || typeof window === 'undefined') return;
  started = true;
  window.dataLayer = window.dataLayer ?? [];
  // gtag must push the `arguments` object itself, as Google's snippet does.
  window.gtag = function gtagShim() { window.dataLayer!.push(arguments); } as Gtag;
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
  document.addEventListener('click', onClick, { capture: true });
}

export function grantAnalyticsConsent() { gtag('consent', 'update', { analytics_storage: 'granted' }); }

export function trackPageView(path: string) {
  gtag('event', 'page_view', { page_location: window.location.origin + path + window.location.search, page_path: path, page_title: document.title });
}

export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  gtag('event', name, { page_path: window.location.pathname, ...params });
}

function onClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!link) return;
  const href = link.getAttribute('href') ?? '';
  const text = (link.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
  if (href.startsWith('mailto:')) trackEvent('email_click', { link_text: text });
  else if (href.startsWith('tel:')) trackEvent('phone_click', { link_text: text });
  else if (/wa\.me|whatsapp\.com/.test(href)) trackEvent('whatsapp_click', { link_text: text });
  else if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl/.test(href)) trackEvent('map_click', { link_text: text });
  else if (/^\/contact(\?|$)/.test(href)) trackEvent('cta_click', { link_text: text, link_url: href });
}
