# Core Web Vitals Report

## How it was measured

Lab measurements with `scripts/cwv-lab.ts`, which drives the local Google Chrome through the DevTools protocol with a mobile profile similar to Lighthouse's: 412×823 viewport, 4× CPU slowdown, ~1.6 Mbps download and 150 ms latency, cache disabled, median of 3 runs. Raw data: `cwv-lab-production-before.json` and `cwv-lab-local-after.json`.

Lighthouse itself was not run: it would have needed downloading an npm package, which was not permitted in this session. **These are lab numbers, not field data.** Google ranks on field data (Chrome UX Report), which appears in Search Console once the site has enough traffic. **INP cannot be measured in the lab**; total blocking time (TBT) is shown as a proxy for main-thread responsiveness.

Thresholds (good): LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.

## Results

| Page | Before (production, 26 Nov) | After (local build) | Change |
| --- | --- | --- | --- |
| Home `/` | LCP 1.23 s · CLS 0.018 · TBT 1.37 s · 1,211 KB | LCP 0.79 s · CLS 0.018 · TBT 0.90 s · 922 KB | −289 KB on mobile, ~240 KB of it from the responsive WebP hero (local build before that change: 1,162 KB) |
| `/services/website-development` | LCP 1.20 s · **CLS 0.709** · TBT 0 | LCP 1.52 s · **CLS 0.001** · TBT 0 | Layout shift fixed |
| `/contact` | LCP 2.37 s · **CLS 0.690** · TBT 0 | LCP 2.40 s · **CLS 0.001** · TBT 0 | Layout shift fixed; LCP close to the limit |
| `/resources/custom-software-vs-off-the-shelf-software` | (new page) | LCP 2.16 s · CLS 0.004 · TBT 0 | |

Production TTFB was ~55 ms (Vercel edge) against ~3 ms locally, so small LCP differences between the columns are not meaningful; the CLS and byte changes are.

## Changes made

| Problem | Fix | Files |
| --- | --- | --- |
| **CLS ~0.7 on all inner pages**: prerendered HTML painted before `pages.css`, which only arrived with the lazy JavaScript chunk, so the whole layout jumped | The build reads the bundle graph and links each page type's CSS in `<head>` (after the entry CSS, keeping the cascade order), plus `modulepreload` for its JavaScript chunks so hydration starts without a request waterfall | `vite.config.ts` (`writeBundle`, route loop) |
| Home hero: 2400 px / 300 KB JPEG on phones | 1200 px WebP (62 KB) via `srcset`/`sizes`, original JPEG kept for large screens; explicit `width`/`height` | `public/assets/hero/hero-circuit-1200.webp`, `src/site/Site.tsx` |
| Logos without dimensions | `width`/`height` on footer and loader logos (phase 1) | `src/site/chrome.tsx`, `src/site/Site.tsx` |
| Analytics weight | GA4 code is a separate chunk loaded only when a measurement ID is configured; nothing extra otherwise | `src/App.tsx`, `src/site/analytics.ts` |
| Caching | Hashed JS/CSS cached for a year (immutable); images, video and 3D models for a week | `vercel.json` (phase 1) |

## Preserved, not changed

- The Three.js scene, preloader, scroll effects and animations are unchanged. They are the main source of the home page's TBT (~0.9 s lab), which is the biggest INP risk. Visual checks confirmed WebGL still renders.
- The desktop 3D model (`protector_nemesis__the_fallen_seraph.glb`, ~19.5 MB) still loads after the page appears, only on large screens with a mouse. It does not affect LCP, but it is a large download.

## Recommended next steps (not done; trade-offs need your review)

1. **Compress the desktop 3D model** without simplifying it: `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-compress webp` (no `--simplify`), then compare visually. This can cut its size several times over.
2. **Contact page LCP (2.4 s lab)**: give page-hero photos WebP variants at ~800 px for phones, as was done for the home hero.
3. **Self-host the two Google Fonts** (Archivo, Space Grotesk; ~110 KB) to remove the render-blocking third-party stylesheet request.
4. **Home TBT**: defer starting the particle and 3D loops until after first input or idle time; check INP in Search Console field data once available.
