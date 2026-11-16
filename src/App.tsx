import React, { Suspense, lazy, useEffect } from 'react';
import { usePath } from './site/router';

// Two separate chunks: the cinematic home page and the lightweight inner pages.
const Home = lazy(() => import('./site/Site').then((module) => ({ default: module.Site })));
const InnerPages = lazy(() => import('./site/pages'));

export default function App() {
  const path = usePath();
  // Title, description, canonical, social tags and page structured data follow the route (see src/site/seo.ts).
  // Each built HTML file already carries its own head, so this module loads on demand and only matters after navigation.
  useEffect(() => {
    let current = true;
    import('./site/seo').then(({ applyHead }) => { if (current) applyHead(path); }).catch(() => { /* head stays as served */ });
    return () => { current = false; };
  }, [path]);
  return (
    <Suspense fallback={<div className="boot" aria-hidden="true" />}>
      {path === '/' ? <Home /> : <InnerPages path={path} />}
    </Suspense>
  );
}
