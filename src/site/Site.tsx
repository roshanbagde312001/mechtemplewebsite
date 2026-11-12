import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Boxes, Briefcase, Building2, Factory, GraduationCap, Plus, Rocket, Store, Users, X } from 'lucide-react';
import { initMotion, scrollToId } from './motion';
import { Link } from './router';
import { SiteFooter, SiteHeader, SiteMenu } from './chrome';
import { Label, Pill, Rise, pad, usePageMeta } from './ui';
import {
  AREAS, BRAND, BRAND_STATEMENT, CAPABILITIES, CUSTOMERS_B2B, CUSTOMERS_B2C, DIFFERENTIATORS, ECOSYSTEM, ENGAGEMENT, FACTS, FOUNDER, INDUSTRIES, INDUSTRY_PHOTOS, INTERSECTION, JOURNEY, JOURNEY_PHOTOS, LEAD_LINES, LEAD_STEPS, LIFECYCLE, LOGO, MARQUEE, MONOGRAM, OUTCOMES, PHILOSOPHY, PROBLEMS, PROJECTS, QUESTIONS, REEL, ROTATING_WORDS, SERVICES, SHORT_DESCRIPTION, SOLUTIONS, SUPPORTING, TAGLINE, WORKFLOW, serviceSlug,
} from './content';

const INDUSTRY_ICONS = [Building2, GraduationCap, Store, Users, Briefcase, Factory, Rocket];

let introPlayed = false;

function Preloader({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<'run' | 'leave' | 'gone'>(introPlayed ? 'gone' : 'run');
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (introPlayed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setState('gone'); onDone(); return; }
    introPlayed = true;
    document.documentElement.classList.add('scroll-lock');
    let frame = 0;
    let fontsReady = false;
    const started = performance.now();
    document.fonts.ready.then(() => { fontsReady = true; });
    const run = (now: number) => {
      const elapsed = now - started;
      // Fonts are the only blocker; the 3D model streams in afterwards. The timeout means a stalled font never traps the visitor.
      const ceiling = fontsReady || elapsed > 3500 ? 100 : 86;
      const t = Math.min(1, elapsed / 1300);
      const shown = Math.min(ceiling, (1 - Math.pow(1 - t, 3)) * 100);
      if (counter.current) counter.current.textContent = String(Math.round(shown)).padStart(3, '0');
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`;
      if (shown >= 100) { setState('leave'); return; }
      frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => { cancelAnimationFrame(frame); document.documentElement.classList.remove('scroll-lock'); };
  }, [onDone]);

  useEffect(() => {
    if (state !== 'leave') return;
    document.documentElement.classList.remove('scroll-lock');
    onDone();
    const timer = window.setTimeout(() => setState('gone'), 1000);
    return () => window.clearTimeout(timer);
  }, [state, onDone]);

  if (state === 'gone') return null;
  return (
    <div className={`loader ${state === 'leave' ? 'loader--leave' : ''}`} aria-hidden="true">
      <img className="loader__brand" src={LOGO} alt="" />
      <span className="loader__count" ref={counter}>000</span>
      <span className="loader__bar"><span ref={bar} /></span>
    </div>
  );
}

/** Small interface mock-ups for each project. They illustrate the concept only; they are not product screenshots. */
function ProjectScreen({ kind }: { kind: 'edu' | 'city' | 'salon' }) {
  if (kind === 'city') {
    return (
      <svg className="screen__city" viewBox="0 0 640 360" aria-hidden="true">
        <g stroke="#3a2424" strokeWidth="1" fill="none">
          {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 50 - 20} 0 L${i * 50 + 60} 360`} />)}
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M0 ${i * 50} L640 ${i * 50 - 40}`} />)}
        </g>
        <path className="route" d="M20 300 C140 260 170 150 300 170 S470 110 620 50" />
        <path className="route route--b" d="M40 60 C150 90 220 240 340 250 S520 270 620 320" />
        {[[300, 170], [190, 170], [470, 112], [340, 250], [120, 262]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#fff" stroke="var(--accent)" strokeWidth="4" />)}
      </svg>
    );
  }
  if (kind === 'salon') {
    return (
      <div className="screen__salon" aria-hidden="true">
        {['Branch A', 'Branch B', 'Branch C', 'Branch D'].map((branch, column) => (
          <div key={branch}>
            <small>{branch}</small>
            {Array.from({ length: 5 }, (_, row) => <i key={row} className={(row * 3 + column * 2) % 4 === 0 ? 'on' : (row + column) % 3 === 0 ? 'mid' : ''} />)}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="screen__edu" aria-hidden="true">
      <div className="screen__bars">{[46, 72, 58, 88, 64, 94, 76, 52, 82].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
      <div className="screen__rows">{['Admissions', 'Attendance', 'Fees', 'Batches'].map((row, i) => <p key={row}><span>{row}</span><b style={{ width: `${82 - i * 15}%` }} /></p>)}</div>
    </div>
  );
}

function ProjectDialog({ index, onClose }: { index: number | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (index === null) return;
    document.documentElement.classList.add('scroll-lock');
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('scroll-lock'); };
  }, [index, onClose]);
  if (index === null) return null;
  const project = PROJECTS[index];
  return (
    <div className="dialog" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button ref={closeButton} className="dialog__close" type="button" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
        <img className="dialog__photo" src={project.photo} alt="" />
        <p className="label">{project.category}</p>
        <h3 id="dialog-title">{project.name}</h3>
        <p>{project.details}</p>
        <p className="dialog__note">Interface and photo shown are illustrations. Feature-level specifications and product imagery were not included in the available brief. No commercial deployment or client result is implied.</p>
      </section>
    </div>
  );
}

function ServiceDialog({ index, onClose }: { index: number | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (index === null) return;
    document.documentElement.classList.add('scroll-lock');
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('scroll-lock'); };
  }, [index, onClose]);
  if (index === null) return null;
  const service = SERVICES[index];
  return (
    <div className="dialog" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="dialog__panel dialog__panel--wide glass" role="dialog" aria-modal="true" aria-labelledby="service-title">
        <button ref={closeButton} className="dialog__close" type="button" onClick={onClose} aria-label="Close service details"><X size={18} /></button>
        <p className="label">Service {pad(index + 1)}</p>
        <h3 id="service-title">{service.title}</h3>
        <p>{service.intro}</p>
        {service.groups.map((group) => (
          <div className="dialog__group" key={group.heading}>
            <h4>{group.heading}</h4>
            <ul className="chips">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
        {service.note && <p className="dialog__note">{service.note}</p>}
        <div className="hero__cta"><Pill to={`/services/${serviceSlug(index)}`}>Full service details</Pill><Pill to="/contact" variant="ghost">Discuss this service</Pill></div>
      </section>
    </div>
  );
}

function Depth({ shot, id, figure, title, caption, signals, poster }: { shot: 0 | 1; id: string; figure: string; title: string; caption: string; signals: string[]; poster: string }) {
  return (
    <section className="depth pin" data-depth={shot} aria-labelledby={id}>
      <div className="pin__inner">
        <img className="depth__poster" src={poster} alt="" aria-hidden="true" />
        <div className="depth__slices" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <span key={i} data-slice />)}</div>
        <p className="depth__meta"><span className="label">{figure}</span><span className="label" data-frame>000</span></p>
        <ul className="depth__signals">{signals.map((signal, i) => <li key={signal} data-signal><small>{pad(i + 1)}</small>{signal}</li>)}</ul>
        <h2 className="depth__title" id={id} data-depth-title>{title}</h2>
        <p className="depth__caption label">{caption}</p>
        <div className="depth__veil" data-veil aria-hidden="true" />
      </div>
    </section>
  );
}

function LeadDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const advance = useCallback(() => {
    if (typing) return;
    setTyping(true);
    window.setTimeout(() => { setStep((value) => (value + 1) % (LEAD_STEPS.length + 1)); setTyping(false); }, 620);
  }, [typing]);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }); }, [step, typing]);

  return (
    <div className="browser" data-rv>
      <div className="browser__bar"><i /><i /><i /><span>{BRAND} · Lead workflow</span></div>
      <div className="browser__body" ref={scroller} aria-live="polite">
        <div className="browser__logo">{MONOGRAM}</div>
        <p className="browser__hello">One lead, moving through a connected process.</p>
        {LEAD_STEPS.slice(0, step).map((name, i) => (
          <div className="chat" key={name}><small>{pad(i + 1)} · {name}</small><p>{LEAD_LINES[i]}</p></div>
        ))}
        {typing && <div className="chat chat--typing" aria-label="Working"><i /><i /><i /></div>}
      </div>
      <div className="browser__foot">
        <button type="button" className="chip" onClick={advance} disabled={typing}>
          {step === LEAD_STEPS.length ? 'Start again' : step === 0 ? 'Run the example' : `Next: ${LEAD_STEPS[step]}`}<ArrowUpRight size={13} />
        </button>
        <span>Illustrative workflow · not a client result</span>
      </div>
    </div>
  );
}

function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="faq__side">
        <Label>Questions</Label>
        <Rise text={'Worth asking\nfirst.'} id="faq-title" className="t-h1" />
        <p className="faq__count"><b key={open}>{pad(open + 1)}</b><span>/ {pad(QUESTIONS.length)}</span></p>
      </div>
      <div className="faq__list">
        {QUESTIONS.map((item, index) => (
          <div className={`faq__item ${open === index ? 'is-open' : ''}`} key={item.q} data-rv>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
              <small>{pad(index + 1)}</small><span>{item.q}</span><Plus size={18} />
            </button>
            <div className="faq__answer"><div><p>{item.a}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Site() {
  usePageMeta('', `${BRAND} is an AI, software engineering and automation company. We design, develop, integrate, automate and deploy software and intelligent systems.`);
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<number | null>(null);
  const [service, setService] = useState<number | null>(null);
  const closeService = useCallback(() => setService(null), []);
  const markReady = useCallback(() => setReady(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeProject = useCallback(() => setProject(null), []);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return initMotion(root.current!);
  }, []);

  const heroLine = (text: string, offset = 0) => text.split('').map((char, i) => (
    <span className="hero__char" key={i} style={{ '--i': i + offset } as React.CSSProperties}>{char === ' ' ? ' ' : char}</span>
  ));

  return (
    <div className="site" data-ready={ready} ref={root}>
      <a className="skip" href="#main">Skip to content</a>
      <Preloader onDone={markReady} />
      <canvas className="particles" data-particles aria-hidden="true" />
      <canvas className="stage" data-stage aria-hidden="true" />
      <span className="progress" data-progress aria-hidden="true" />
      <div className="cursor" data-cursor-el aria-hidden="true"><span data-cursor-label /></div>

      <SiteHeader path="/" onMenu={() => setMenuOpen(true)} onHome={() => scrollToId('top')} />
      <SiteMenu open={menuOpen} onClose={closeMenu} path="/" />
      <ProjectDialog index={project} onClose={closeProject} />
      <ServiceDialog index={service} onClose={closeService} />

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top" data-hero aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden="true"><img src="/assets/hero/hero-circuit.jpg" alt="" fetchPriority="high" /></div>
          <div className="hero__glow" data-hero-glow aria-hidden="true" />
          <div className="hero__copy">
            <h1 className="hero__title" id="hero-title" aria-label={TAGLINE}>
              <span aria-hidden="true">{heroLine('Engineering')}</span>
              <span aria-hidden="true">{heroLine('what comes', 11)}</span>
              <span aria-hidden="true">{heroLine('next', 21)}<span className="hero__char hero__dot" style={{ '--i': 25 } as React.CSSProperties}>.</span></span>
            </h1>
            <p className="hero__sub glass"><span>{SUPPORTING}</span></p>
            <div className="hero__cta">
              <Pill to="/contact">Start a conversation</Pill>
              <Pill variant="ghost" to="/services">Explore services</Pill>
            </div>
          </div>
          {/* The background art replaces the 3D shape here; data-hidden keeps the stage from drawing it. */}
          <div className="hero__shape" data-shape="morph" data-hero-shape data-hidden="1" aria-hidden="true" />
          <p className="hero__foot"><span className="label">Scroll</span><span className="label">AI · Software · Automation · Data</span></p>
        </section>

        {/* Statement */}
        <section className="statement pin" id="approach" data-statement aria-label="Our philosophy">
          <div className="pin__inner statement__inner">
            <Label className="statement__tag">Our philosophy</Label>
            {PHILOSOPHY.map((item, i) => (
              <div className={`orbiter orbiter--${i}`} key={item.label} data-orbiter>
                <div className="orbiter__shape" data-shape={item.shape} data-drag aria-hidden="true" />
                <p className="label"><b>{pad(i + 1)}</b>{item.label}</p>
              </div>
            ))}
            <div className="statement__copy">
              <h2 className="statement__title" aria-label={`Technology engineered around your ${ROTATING_WORDS[0]}`}>
                <span aria-hidden="true">{'Technology engineered around your'.split(' ').map((word, i) => <React.Fragment key={i}><span data-word>{word}</span>{' '}</React.Fragment>)}</span>
                <span className="rotor" aria-hidden="true"><span className="rotor__track" data-rotor>{ROTATING_WORDS.map((word) => <span key={word}>{word}</span>)}</span></span>
              </h2>
              <div data-statement-details>
                <ul className="statement__tags"><li>Understand the problem</li><li>Engineer the solution</li><li>Automate the process</li><li>Deliver the outcome</li></ul>
                <p className="statement__body">We identify processes that can be improved, design the right technical solution, build and connect the systems, and deploy something that works.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section about" id="about" aria-labelledby="about-title">
          <Label>Who we are</Label>
          <Rise text={'An AI and technology\nengineering company.'} id="about-title" className="t-h1" />
          <div className="about__grid">
            <div className="glass about__card" data-rv>
              <p className="about__lead">{SHORT_DESCRIPTION}</p>
              <p>Our objective is to help businesses and individuals solve real-world problems through technology. We don't focus only on writing code or creating websites. We engineer systems that solve problems and deliver practical value.</p>
              <p className="about__statement">{BRAND_STATEMENT}</p>
            </div>
            <div className="glass about__card" data-rv style={{ '--d': '120ms' } as React.CSSProperties}>
              <p className="label">We work at the intersection of</p>
              <ol className="about__list">{INTERSECTION.map((item, i) => <li key={item}><small>{pad(i + 1)}</small>{item}</li>)}</ol>
            </div>
          </div>
          <div className="section__more" data-rv><Pill variant="ghost" to="/about">More about us</Pill></div>
        </section>

        <Depth shot={0} id="depth-a" figure="Fig. 01 · The challenge" title="Work should move forward." caption="Not get stuck in spreadsheets and disconnected systems" signals={PROBLEMS} poster="/assets/posters/fig-01.jpg" />

        {/* Services */}
        <section className="services pin" id="capabilities" data-services aria-labelledby="services-title">
          <div className="pin__inner services__inner">
            <div className="services__left">
              <Label>Capabilities</Label>
              <Rise text={'Core\ncapabilities.'} id="services-title" className="t-h2" />
              <ol className="services__rows">
                {CAPABILITIES.map((group, i) => (
                  <li key={group.title}>
                    <button type="button" data-service-row data-cursor="Explore"><small>{pad(i + 1)}</small><span>{group.title}</span><ArrowUpRight size={15} /></button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="services__card">
              <div className="services__photos" aria-hidden="true">
                {CAPABILITIES.map((group, i) => <img key={group.title} src={group.image} alt="" loading={i === 0 ? 'eager' : 'lazy'} data-service-photo />)}
              </div>
              <span className="services__number" data-service-number aria-hidden="true">01</span>
              {/* Photos replace the 3D shape in this card; data-hidden keeps the stage from drawing it. */}
              <div className="services__shape" data-shape="morph" data-service-shape data-hidden="1" aria-hidden="true" />
              <div className="services__panels">
                {CAPABILITIES.map((group) => (
                  <div className="services__panel" key={group.title} data-service-panel data-shape-index={group.shape}>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Four business areas */}
        <section className="section areas" aria-labelledby="areas-title">
          <Label>What we actually do</Label>
          <Rise text={'Four areas.\nOne engineering mindset.'} id="areas-title" className="t-h1" />
          <div className="areas__grid">
            {AREAS.map((area, i) => (
              <article className="glass areas__card" key={area.title} data-rv style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                <span className="areas__letter">{area.letter}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul className="chips">{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        {/* Service catalog */}
        <section className="section catalog" id="services" aria-labelledby="catalog-title">
          <div className="catalog__head">
            <div>
              <Label>Complete service catalog</Label>
              <Rise text={'Twelve services.\nBuilt to connect.'} id="catalog-title" className="t-h1" />
            </div>
            <Pill variant="ghost" to="/services">All services</Pill>
          </div>
          <ul className="catalog__grid" data-spot>
            {SERVICES.map((item, i) => (
              <li key={item.title} data-rv style={{ '--d': `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <button type="button" className="glass catalog__card" onClick={() => setService(i)} data-cursor="Open">
                  <small>{pad(i + 1)}</small>
                  <strong>{item.title}</strong>
                  <span>{item.intro}</span>
                  <em>View scope <ArrowUpRight size={14} /></em>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track" data-marquee>
            {[0, 1, 2, 3].flatMap((set) => MARQUEE.map((phrase) => <span key={`${set}${phrase}`}>{phrase}<i /></span>))}
          </div>
        </div>

        {/* Reel */}
        <section className="reel pin" data-reel aria-label="Technology at work">
          <div className="pin__inner reel__inner">
            <div className="reel__frame" data-reel-frame aria-hidden="true">
              {REEL.map((item, i) => (
                <video
                  className={`reel__clip reel__clip--${item.clip} ${i === 0 ? 'is-active' : ''}`}
                  key={item.clip}
                  data-reel-clip
                  data-src={`/assets/stock/reel-${item.clip}.mp4`}
                  poster={`/assets/stock/reel-${item.clip}.jpg`}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              ))}
              <span className="reel__shade" />
            </div>
            <p className="label reel__tag">Technology at work</p>
            <div className="reel__captions">
              {REEL.map((item, i) => (
                <div className={`reel__caption ${i === 0 ? 'is-active' : ''}`} key={item.clip} data-reel-caption>
                  <h2>{item.title}</h2>
                  <p className="label">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="section solutions" id="solutions" aria-labelledby="solutions-title">
          <Label>Complete business solutions</Label>
          <div className="industries__head">
            <Rise text={'Services, combined into\nsystems that run a business.'} id="solutions-title" className="t-h1" />
            <p className="label">Examples of what we can engineer, not off-the-shelf products</p>
          </div>
          <div className="solutions__grid">
            {SOLUTIONS.map((item, i) => (
              <article className={`glass solutions__card ${item.flow ? 'solutions__card--flow' : ''}`} key={item.title} data-rv style={{ '--d': `${(i % 2) * 80}ms` } as React.CSSProperties}>
                <small>Solution {pad(i + 1)}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.flow
                  ? <ol className="flow">{item.flow.map((step) => <li key={step}>{step}</li>)}</ol>
                  : <ul className="chips">{item.modules!.map((module) => <li key={module}>{module}</li>)}</ul>}
              </article>
            ))}
          </div>
          <div className="section__more" data-rv><Pill variant="ghost" to="/solutions">Explore all solutions</Pill></div>
        </section>

        {/* Work */}
        <section className="work pin" id="work" data-work aria-labelledby="work-title">
          <div className="pin__inner work__inner">
            <div className="work__head">
              <Label>Products and projects</Label>
              <h2 className="sr-only" id="work-title">A closer look at selected work</h2>
              <Link className="label work__hint" to="/work">All work →</Link>
            </div>
            <div className="work__view">
              <div className="work__track" data-work-track>
                {PROJECTS.map((item, i) => (
                  <button type="button" className="screen" key={item.name} data-work-screen data-cursor="Open" onClick={() => setProject(i)}>
                    <span className="screen__bar"><i /><i /><i /><em>{item.name}</em></span>
                    <span className="screen__body"><img className="screen__photo" src={item.photo} alt="" loading="lazy" /><span className="screen__mock"><ProjectScreen kind={item.screen} /></span></span>
                    <span className="screen__info"><strong>{item.name}</strong><small>{item.description}</small></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Depth shot={1} id="depth-b" figure="Fig. 02 · AI inside business" title="Intelligence inside." caption="Every automated workflow, from trigger to monitoring" signals={WORKFLOW} poster="/assets/posters/fig-02.jpg" />

        {/* Spiral */}
        <section className="spiral pin" id="journey" data-spiral aria-labelledby="spiral-title">
          <div className="pin__inner spiral__inner">
            <p className="spiral__meta"><span className="label">From idea to working product</span><span className="label">{JOURNEY.length} stages · {ECOSYSTEM.length} connected systems</span></p>
            <div className="spiral__space">
              <h2 className="spiral__title" id="spiral-title" data-spiral-title>Every step<br />in view.</h2>
              {JOURNEY.map((stage, i) => <div className="card card--photo" key={stage} data-spiral-card><img src={JOURNEY_PHOTOS[i]} alt="" loading="lazy" /><small>Stage {pad(i + 1)}</small><strong>{stage}</strong></div>)}
              {ECOSYSTEM.map((node) => <div className="card card--system" key={node} data-spiral-card><small>Connected</small><strong>{node}</strong><Boxes size={18} /></div>)}
            </div>
            <p className="spiral__meta"><span className="label">Websites, CRM, ERP, AI and analytics working as one system</span></p>
          </div>
        </section>

        {/* Customers */}
        <section className="section customers" id="customers" aria-labelledby="customers-title">
          <Label>Who we work with</Label>
          <Rise text={'Built for businesses.\nAnd the people they serve.'} id="customers-title" className="t-h1" />
          <div className="customers__grid">
            {CUSTOMERS_B2B.map((group, i) => (
              <article className="glass customers__card" key={group.title} data-rv style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <small>B2B</small>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
            <article className="glass customers__card customers__card--b2c" data-rv>
              <small>B2C</small>
              <h3>Individual users</h3>
              <p>Digital products and applications for individual consumers, presented once they are ready to offer.</p>
              <ul className="chips">{CUSTOMERS_B2C.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <div className="section__more" data-rv><Pill variant="ghost" to="/industries">Industries we serve</Pill></div>
        </section>

        {/* Industries */}
        <section className="section industries" id="industries" aria-labelledby="industries-title">
          <Label>Industries we serve</Label>
          <div className="industries__head">
            <Rise text={'Different industries.\nDistinct ways of working.'} id="industries-title" className="t-display" />
            <p className="label">Applications built around each domain's requirements</p>
          </div>
          <ul className="grid" data-spot>
            {INDUSTRIES.map((name, i) => {
              const Icon = INDUSTRY_ICONS[i];
              return <li key={name} data-rv style={{ '--d': `${i * 50}ms` } as React.CSSProperties}><img className="grid__photo" src={INDUSTRY_PHOTOS[i]} alt="" loading="lazy" /><Icon size={26} strokeWidth={1.4} /><span>{name}</span></li>;
            })}
          </ul>
        </section>

        {/* Lifecycle */}
        <section className="section process" id="process" aria-labelledby="process-title">
          <Label>How we work with customers</Label>
          <Rise text={'Seven steps, from\nproblem to production.'} id="process-title" className="t-h1" />
          <ol className="process__list">
            {LIFECYCLE.map((stage, i) => (
              <li className="glass process__step" key={stage.title} data-rv style={{ '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}>
                <small>Step {pad(i + 1)}</small>
                <h3>{stage.title}</h3>
                <p className="label">{stage.verb}</p>
                <ul>{stage.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            ))}
          </ol>
          <div className="section__more" data-rv><Pill variant="ghost" to="/process">See how we work</Pill></div>
        </section>

        {/* Warp */}
        <section className="warp pin" id="how" data-warp aria-labelledby="warp-title">
          <div className="pin__inner warp__inner">
            {['pyramid', 'cube', 'torus', 'spring', 'cone', 'pill', 'torus', 'orb'].map((kind, i) => (
              <div className="warp__shape" key={i} data-shape={kind} data-warp-shape data-hidden="1" aria-hidden="true" />
            ))}
            <div className="warp__intro" data-warp-intro>
              <Label>Our core philosophy</Label>
              <h2 className="t-h1" id="warp-title">Understand the problem.<br />Deliver the outcome.</h2>
              <ol>
                {ENGAGEMENT.map((step, i) => <li key={step.title} data-warp-step><small>{pad(i + 1)} / {step.title}</small><p>{step.detail}</p></li>)}
              </ol>
            </div>
            <div className="warp__flash" data-warp-flash aria-hidden="true" />
            <p className="warp__stack" data-warp-stack>
              <span data-warp-word>Engineer.</span><span data-warp-word>Automate.</span><span data-warp-word className="warp__last">Deliver.</span>
            </p>
          </div>
        </section>

        {/* Studio */}
        <section className="section studio" aria-labelledby="studio-title">
          <Label>What makes us different</Label>
          <Rise text={'A technology engineering company.\nNot merely a website agency.'} id="studio-title" className="t-h1" />
          <ol className="facts">
            {FACTS.map((fact, i) => (
              <li key={fact.label} data-rv style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <small>{pad(i + 1)}</small><b data-count={fact.value}>{fact.value}</b><p>{fact.label}</p>
              </li>
            ))}
          </ol>
          <div className="relay">
            <div className="relay__copy" data-rv>
              <h3>Connected, not scattered.</h3>
              <p>We design, develop, integrate, automate and deploy software and intelligent systems that solve real business and consumer problems.</p>
            </div>
            <div className="relay__panel glass" data-rv>
              <p className="label relay__head">Our core philosophy <em>No guaranteed outcomes implied</em></p>
              <div className="relay__line" aria-hidden="true"><i /><i /><i /></div>
              <ol>{OUTCOMES.map((item) => <li key={item.title}><b>{item.title}</b><span>{item.detail}</span></li>)}</ol>
            </div>
          </div>
          <div className="diff">
            {DIFFERENTIATORS.map((item, i) => (
              <article className="glass diff__card" key={item.title} data-rv style={{ '--d': `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <small>{pad(i + 1)}</small><h3>{item.title}</h3><p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="founder glass" data-rv>
            <figure className="founder__photo"><img src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.role}`} width={400} height={400} loading="lazy" decoding="async" /></figure>
            <div>
              <p className="label">Our {FOUNDER.role.toLowerCase()}</p>
              <h3>{FOUNDER.name}</h3>
              <p>{FOUNDER.focus}</p>
              <ul className="chips">{FOUNDER.expertise.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* Lead workflow demo */}
        <section className="section platform" aria-labelledby="platform-title">
          <div className="platform__glow" aria-hidden="true" />
          <div className="platform__copy">
            <Label>Illustrative example</Label>
            <Rise text={'Automated lead\nmanagement, in motion.'} id="platform-title" className="t-h2" />
            <p>This fictional example illustrates a process, not a client result or deployment claim. Step through it to watch an inquiry move from website form to reporting.</p>
            <div className="hero__cta"><Pill to="/contact">Start a conversation</Pill></div>
          </div>
          <LeadDemo />
        </section>

        <Questions />

        {/* Closing */}
        <section className="closing pin" id="contact" data-closing aria-labelledby="closing-title">
          <div className="pin__inner closing__inner">
            <Label>The next step</Label>
            <Rise text={'What should we\nbuild together?'} id="closing-title" className="closing__title" />
            <p data-rv>{SUPPORTING} Start a conversation about the problem you want to solve.</p>
            <div className="hero__cta" data-rv>
              <Pill to="/contact">Start a conversation</Pill>
              <Pill variant="ghost" to="/services">Explore our services</Pill>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
