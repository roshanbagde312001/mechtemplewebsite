// Image and video building blocks for the inner pages, written to stay light:
// videos download only when near the viewport, pause off-screen, and fall back to their poster
// for reduced motion, data saver and slow connections.
import React, { useEffect, useRef } from 'react';

export type VideoSource = { src: string; poster: string };

type Connection = { saveData?: boolean; effectiveType?: string };
/** Whether background video is appropriate for this visitor. */
export const canPlayVideo = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  if (connection?.saveData) return false;
  return !/(^|-)(2g|3g)$/.test(connection?.effectiveType ?? '');
};

/** Muted, looping background video. `eager` starts immediately (page heroes); otherwise it waits until near view. */
export function LazyVideo({ video, className = '', eager = false }: { video: VideoSource; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canPlayVideo()) return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      el.src = video.src;
      el.load();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        load();
        el.play().catch(() => { /* autoplay refused: the poster stays */ });
      } else if (loaded) {
        el.pause();
      }
    }, { rootMargin: '200px 0px' });
    if (eager) load();
    observer.observe(el);
    return () => { observer.disconnect(); el.pause(); el.removeAttribute('src'); el.load(); };
  }, [video.src, eager]);
  return <video ref={ref} className={className} poster={video.poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

/** Image that wipes into view and settles from a slight zoom. `ratio` sets the frame shape (CSS aspect-ratio). */
export function Media({ src, alt = '', ratio, className = '', parallax = false, children }: { src: string; alt?: string; ratio?: string; className?: string; parallax?: boolean; children?: React.ReactNode }) {
  return (
    <figure className={`media ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} data-rv>
      <img src={src} alt={alt} loading="lazy" decoding="async" data-parallax={parallax ? '' : undefined} />
      {children}
    </figure>
  );
}

/** Full-bleed video section with a headline, for a cinematic break between content blocks. */
export function VideoBand({ video, label, title, text }: { video: VideoSource; label: string; title: string; text?: string }) {
  return (
    <section className="video-band" data-rv>
      <div className="video-band__media" data-parallax>
        <LazyVideo video={video} />
      </div>
      <div className="video-band__copy">
        <p className="label">{label}</p>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

/** Staggered photo gallery. Items with `wide` or `tall` span two tracks. */
export function Mosaic({ items }: { items: { src: string; caption?: string; wide?: boolean; tall?: boolean }[] }) {
  return (
    <div className="mosaic">
      {items.map((item, i) => (
        <Media key={item.src + i} src={item.src} className={`mosaic__item ${item.wide ? 'is-wide' : ''} ${item.tall ? 'is-tall' : ''}`}>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </Media>
      ))}
    </div>
  );
}

/** Gentle scroll drift for [data-parallax] elements on fine-pointer screens; one rAF per scroll, off-screen elements skipped. */
export function useParallax(scope: React.RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) return;
        const progress = (box.top + box.height / 2 - vh / 2) / vh; // -1..1 around the viewport centre
        el.style.transform = `translate3d(0, ${(progress * -8).toFixed(2)}%, 0) scale(1.12)`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scope, key]);
}
