// Minimal client-side router: real URLs (/about, /services/...) on top of the History API, no dependency.
// The dev server (appType 'spa') and server.ts in production both fall back to index.html for unknown paths.
import React, { useEffect, useState } from 'react';

const EVENT = 'app:navigate';

/** Current pathname without a trailing slash (except the root). */
const readPath = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '' ? '/' : path;
};

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  if (url.pathname === window.location.pathname && url.hash) {
    document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(EVENT));
}

export function usePath() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const update = () => setPath(readPath());
    window.addEventListener('popstate', update);
    window.addEventListener(EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(EVENT, update);
    };
  }, []);
  return path;
}

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/** Internal link: a real <a href> (works with new tabs, crawlers, no-JS) that navigates in-app on a plain click. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    />
  );
}
