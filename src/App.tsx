import React, { Suspense, lazy } from 'react';
import { usePath } from './site/router';

// Two separate chunks: the cinematic home page (with three.js) and the lightweight inner pages.
const Home = lazy(() => import('./site/Site').then((module) => ({ default: module.Site })));
const InnerPages = lazy(() => import('./site/pages'));

export default function App() {
  const path = usePath();
  return (
    <Suspense fallback={<div className="boot" aria-hidden="true" />}>
      {path === '/' ? <Home /> : <InnerPages path={path} />}
    </Suspense>
  );
}
