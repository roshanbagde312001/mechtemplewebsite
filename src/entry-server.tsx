// Build-time prerender entry (loaded by vite.config.ts through Vite's SSR loader, never shipped to browsers).
// Renders a route to static HTML so crawlers that do not run JavaScript, including most AI search crawlers, receive
// the full page content. src/main.tsx then hydrates that markup instead of rendering from scratch.
import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';
import { setServerPath } from './site/router';

export async function render(path: string): Promise<string> {
  setServerPath(path);
  const { prelude } = await prerenderToNodeStream(<App />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks).toString('utf8');
}
