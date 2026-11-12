// Header, full-screen menu and footer shared by every page, including the home page.
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { BRAND, COMPANY, LOGO, PAGES, SERVICES, TAGLINE, serviceSlug } from './content';
import { Link } from './router';
import { Pill, pad } from './ui';

const isActive = (path: string, to: string) => path === to || path.startsWith(`${to}/`);

export function SiteHeader({ path, onMenu, onHome }: { path: string; onMenu: () => void; onHome?: () => void }) {
  return (
    <header className="nav" data-nav>
      <Link
        className="nav__logo"
        to="/"
        aria-label={`${BRAND} home`}
        onClick={(event) => { if (path === '/' && onHome) { event.preventDefault(); onHome(); } }}
      >
        <img src={LOGO} alt={BRAND} width={1000} height={494} />
      </Link>
      <nav className="nav__links" aria-label="Main">
        {PAGES.map((page) => (
          <Link key={page.to} to={page.to} className={isActive(path, page.to) ? 'is-active' : undefined} aria-current={isActive(path, page.to) ? 'page' : undefined}>
            {page.label}
          </Link>
        ))}
      </nav>
      <div className="nav__right">
        <Pill to="/contact" variant="light">Contact us</Pill>
        <button type="button" className="nav__menu" onClick={onMenu} aria-haspopup="dialog">Menu <span aria-hidden="true"><i /><i /></span></button>
      </div>
    </header>
  );
}

export function SiteMenu({ open, onClose, path }: { open: boolean; onClose: () => void; path: string }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.documentElement.classList.toggle('scroll-lock', open);
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  // Close the menu when the route changes (back/forward included).
  useEffect(() => { onClose(); }, [path, onClose]);

  const items = [{ label: 'Home', to: '/' }, ...PAGES, { label: 'Contact', to: '/contact' }];
  return (
    <div className={`menu ${open ? 'menu--open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
      <button ref={closeButton} className="menu__close" type="button" onClick={onClose}>Close <X size={15} /></button>
      <nav className="menu__list" aria-label="All pages">
        {items.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={path === item.to ? 'is-active' : undefined}
            style={{ transitionDelay: open ? `${80 + index * 40}ms` : '0ms' }}
            onClick={onClose}
          >
            <small>{pad(index + 1)}</small><span>{item.label}</span><ArrowUpRight size={26} />
          </Link>
        ))}
      </nav>
      <p className="menu__foot"><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><span>AI · Software · Automation</span></p>
    </div>
  );
}

export function SiteFooter({ inner = false }: { inner?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`foot ${inner ? 'foot--inner' : ''}`}>
      <div className="foot__planet" aria-hidden="true" />
      <div className="foot__top">
        <div className="foot__brand">
          <img className="foot__logo" src={LOGO} alt={BRAND} loading="lazy" />
          <p className="foot__title"><span>{TAGLINE}</span></p>
        </div>
        <Pill to="/contact">Start a project</Pill>
      </div>
      <div className="foot__cols">
        <div>
          <h2>Company</h2>
          <Link to="/about">About us</Link>
          <Link to="/process">How we work</Link>
          <Link to="/work">Work</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h2>Services</h2>
          {SERVICES.slice(0, 6).map((service, i) => <Link key={service.title} to={`/services/${serviceSlug(i)}`}>{service.title}</Link>)}
          <Link to="/services" className="foot__more">All services →</Link>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/solutions">Solutions</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/process">Process</Link>
          <Link to="/services/artificial-intelligence-development">AI development</Link>
          <Link to="/services/intelligent-process-automation">Automation</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          {COMPANY.phone && <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>}
          {COMPANY.address && <p>{COMPANY.address}</p>}
          {COMPANY.hours && <p>{COMPANY.hours}</p>}
          {COMPANY.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
        </div>
      </div>
      <div className="foot__base">
        <span>© {year} {BRAND}. All rights reserved.</span>
        <span className="foot__legal"><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of use</Link></span>
        <span>Stock photography: Pexels</span>
      </div>
    </footer>
  );
}
