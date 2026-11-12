// Frame for every inner page: header, menu, footer, particle background, reveal-on-scroll and page metadata.
// Inner pages never load three.js; only the home page does.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SiteFooter, SiteHeader, SiteMenu } from '../chrome';
import { createParticles } from '../particles';
import { Link } from '../router';
import { Pill, Rise } from '../ui';
import { LazyVideo, useParallax, type VideoSource } from './media';
import './pages.css';

export { usePageMeta } from '../ui';

export function PageLayout({ path, children }: { path: string; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useParallax(root, path);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // New page: start at the top (or at the #hash target).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [path]);

  // Header shrink on scroll.
  useEffect(() => {
    const nav = root.current?.querySelector<HTMLElement>('[data-nav]');
    const onScroll = () => nav?.classList.toggle('nav--scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal headings and blocks as they enter the viewport; re-scan whenever the page changes.
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    document.documentElement.classList.toggle('reduced', reduced);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    const scan = () => scope.querySelectorAll('[data-rv]:not(.in), .rise:not(.in)').forEach((el) => observer.observe(el));
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(scope, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [path, reduced]);

  // Particle background with its own light loop; paused automatically when the tab is hidden.
  useEffect(() => {
    const canvas = root.current?.querySelector<HTMLCanvasElement>('[data-particles]');
    if (!canvas) return;
    const field = createParticles(canvas, reduced);
    let frame = 0;
    let previous = performance.now();
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      field.step(dt);
    };
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); field.dispose(); };
  }, [reduced]);

  return (
    <div className="site page" data-ready="true" ref={root}>
      <a className="skip" href="#main">Skip to content</a>
      <canvas className="particles" data-particles aria-hidden="true" />
      <SiteHeader path={path} onMenu={() => setMenuOpen(true)} />
      <SiteMenu open={menuOpen} onClose={closeMenu} path={path} />
      <main id="main" className="page__main">{children}</main>
      <SiteFooter inner />
    </div>
  );
}

type Crumb = { label: string; to?: string };

/** Page banner: breadcrumbs, eyebrow label, headline, intro and an optional photo behind. */
export function PageHero({ crumbs, label, title, intro, image, video, children }: { crumbs: Crumb[]; label: string; title: string; intro?: React.ReactNode; image?: string; video?: VideoSource; children?: React.ReactNode }) {
  return (
    <section className="page-hero">
      {(image || video) && (
        <div className="page-hero__bg" aria-hidden="true">
          <div className="page-hero__media" data-parallax>
            {video ? <LazyVideo video={video} eager /> : <img src={image} alt="" fetchPriority="high" />}
          </div>
        </div>
      )}
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          {crumbs.map((crumb) => <li key={crumb.label}>{crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}</li>)}
        </ol>
      </nav>
      <p className="label page-hero__label">{label}</p>
      <Rise as="h1" text={title} className="page-hero__title" />
      {intro && <div className="page-hero__intro" data-rv>{intro}</div>}
      {children && <div className="hero__cta" data-rv>{children}</div>}
    </section>
  );
}

/** Section with a label, heading and optional lead paragraph. */
export function Block({ id, label, title, lead, children, className = '' }: { id?: string; label?: string; title?: string; lead?: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <section className={`block ${className}`} id={id}>
      {(label || title || lead) && (
        <header className="block__head">
          {label && <p className="label">{label}</p>}
          {title && <Rise text={title} className="t-h2" />}
          {lead && <div className="block__lead" data-rv>{lead}</div>}
        </header>
      )}
      {children}
    </section>
  );
}

/** Closing call-to-action band used at the end of most pages. */
export function CtaBand({ title = 'Have a problem worth solving?', text = 'Tell us what you are trying to improve. We will reply with questions, an honest view of what technology can do, and a suggested next step.' }: { title?: string; text?: string }) {
  return (
    <section className="cta-band glass" data-rv>
      <div>
        <p className="label">Start a project</p>
        <h2 className="t-h2">{title}</h2>
        <p>{text}</p>
      </div>
      <div className="hero__cta">
        <Pill to="/contact">Contact us</Pill>
        <Pill to="/services" variant="ghost">Our services</Pill>
      </div>
    </section>
  );
}
