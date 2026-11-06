# Korvantage Solutions website

A scroll-driven marketing site built with React, TypeScript, Vite and Three.js.

## Run locally

Requires Node.js 20.19 or newer (Vite 8).

```sh
npm install --legacy-peer-deps
npm run dev
```

The site opens at `http://localhost:3000`. To type-check and create a production build:

```sh
npm run lint
npm run build
```

`--legacy-peer-deps` is needed because `package.json` pins `esbuild` to 0.25 while Vite 8 expects 0.27 or newer as an optional peer.

## Where things live

- `src/site/content.ts`: all site copy, services, projects, contact email.
- `src/site/Site.tsx`: page structure, menu, project dialog, FAQ, lead workflow demo.
- `src/site/motion.ts`: smooth scrolling and every scroll or pointer effect, run from one animation loop.
- `src/site/stage.ts`: the single WebGL canvas: chrome shapes, robot tunnel, closing terrain.
- `src/index.css`: all styling. Section scroll lengths are the `.pin` heights near the top.

## Changing the accent colour

Update `--accent` and `--accent-rgb` in `src/index.css`, and `ACCENT` in `src/site/stage.ts`. The fallback stills in `public/assets/posters` are renders of the 3D scene, so re-render them if the accent changes.

## 3D model

`public/models/protector_nemesis__the_fallen_seraph.glb` is about 19.5 MB. It loads after the page appears, and only on screens at least 900px wide with a hardware GPU. Other devices see the stills in `public/assets/posters`. Add `?model=1` to the URL to force it on.

## Stock media

`public/assets/stock` holds Pexels photos and video (about 10 MB of files, loaded only as they are needed). `CREDITS.md` there lists every source and the licence limits. Replace them with your own photography and footage when you can: keep the file names and nothing else needs to change.

## Content rules

Figures in the "How we work" section are counts of what is listed on the page. Do not add client names, client logos or performance numbers without evidence.
