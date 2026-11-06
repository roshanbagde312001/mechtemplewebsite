import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Boxes, Building2, Factory, GraduationCap, HeartPulse, Landmark, Plus, Rocket, ShoppingBag, Store, Workflow, X } from 'lucide-react';
import { initMotion, scrollToId } from './motion';
import {
  BRAND, CAPABILITIES, ECOSYSTEM, EMAIL, ENGAGEMENT, FACTS, INDUSTRIES, INDUSTRY_PHOTOS, JOURNEY, JOURNEY_PHOTOS, LEAD_STEPS, MAILTO, MARQUEE,
  NAV_LINKS, OUTCOMES, PHILOSOPHY, PROBLEMS, PROJECTS, PROMISES, QUESTIONS, REEL, ROTATING_WORDS, WORKFLOW,
} from './content';

const INDUSTRY_ICONS = [GraduationCap, Workflow, Store, ShoppingBag, Building2, HeartPulse, Landmark, Factory, Rocket];
const pad = (value: number) => String(value).padStart(2, '0');

/** Headline whose words rise from behind a mask as it enters view. */
function Rise({ text, as: Tag = 'h2', className = '', id }: { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; id?: string }) {
  const lines = text.split('\n');
  let index = 0;
  return (
    <Tag className={`rise ${className}`} id={id} data-h aria-label={text.replace('\n', ' ')}>
      {lines.map((line, lineIndex) => (
        <span className="rise__line" key={lineIndex} aria-hidden="true">
          {line.split(' ').map((word, wordIndex) => (
            <span className="rise__mask" key={wordIndex}>
              <span className="rise__word" style={{ transitionDelay: `${index++ * 55}ms` }}>{word}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Pill button: the label rolls on hover and the whole button leans toward the pointer. */
function Pill({ children, href, onClick, variant = 'solid' }: { children: string; href?: string; onClick?: () => void; variant?: 'solid' | 'ghost' | 'light' }) {
  const inner = (
    <>
      <span className="pill__roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      <span className="pill__icon"><ArrowUpRight size={14} /></span>
    </>
  );
  const className = `pill pill--${variant}`;
  if (href) return <a className={className} href={href} data-magnetic>{inner}</a>;
  return <button type="button" className={className} onClick={onClick} data-magnetic>{inner}</button>;
}

function Label({ children, className = '' }: { children: string; className?: string }) {
  return <p className={`label ${className}`} data-scramble>{children}</p>;
}

function Preloader({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<'run' | 'leave' | 'gone'>('run');
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setState('gone'); onDone(); return; }
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
      <span className="loader__brand">K/V</span>
      <span className="loader__count" ref={counter}>000</span>
      <span className="loader__bar"><span ref={bar} /></span>
    </div>
  );
}

function Menu({ open, onClose, onGo }: { open: boolean; onClose: () => void; onGo: (id: string) => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.documentElement.classList.toggle('scroll-lock', open);
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`menu ${open ? 'menu--open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
      <button ref={closeButton} className="menu__close" type="button" onClick={onClose}>Close <X size={15} /></button>
      <nav className="menu__list" aria-label="All sections">
        {NAV_LINKS.map((link, index) => (
          <button type="button" key={link.target} style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }} onClick={() => onGo(link.target)}>
            <small>{pad(index + 1)}</small><span>{link.label}</span><ArrowUpRight size={26} />
          </button>
        ))}
      </nav>
      <p className="menu__foot"><a href={MAILTO}>{EMAIL}</a><span>AI · Software · Automation</span></p>
    </div>
  );
}

/** Small interface mock-ups for each project. They illustrate the concept only; they are not product screenshots. */
function ProjectScreen({ kind }: { kind: 'edu' | 'city' | 'salon' }) {
  if (kind === 'city') {
    return (
      <svg className="screen__city" viewBox="0 0 640 360" aria-hidden="true">
        <g stroke="#3a2a3a" strokeWidth="1" fill="none">
          {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 50 - 20} 0 L${i * 50 + 60} 360`} />)}
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M0 ${i * 50} L640 ${i * 50 - 40}`} />)}
        </g>
        <path className="route" d="M20 300 C140 260 170 150 300 170 S470 110 620 50" />
        <path className="route route--b" d="M40 60 C150 90 220 240 340 250 S520 270 620 320" />
        {[[300, 170], [190, 170], [470, 112], [340, 250], [120, 262]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#fff" stroke="#ff10e8" strokeWidth="4" />)}
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
  const lines = [
    'A new enquiry arrives from your website.',
    'Details are captured in one place, with nothing retyped.',
    'The lead is assigned to the right person.',
    'A follow-up is scheduled so the conversation keeps moving.',
    'Every step is tracked and visible to the team.',
  ];
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
        <div className="browser__logo">K/V</div>
        <p className="browser__hello">One lead, moving through a connected process.</p>
        {LEAD_STEPS.slice(0, step).map((name, i) => (
          <div className="chat" key={name}><small>{pad(i + 1)} · {name}</small><p>{lines[i]}</p></div>
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
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<number | null>(null);
  const markReady = useCallback(() => setReady(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const go = useCallback((id: string) => { setMenuOpen(false); requestAnimationFrame(() => scrollToId(id)); }, []);

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
      <canvas className="streaks" data-streaks aria-hidden="true" />
      <canvas className="stage" data-stage aria-hidden="true" />
      <span className="progress" data-progress aria-hidden="true" />
      <div className="cursor" data-cursor-el aria-hidden="true"><span data-cursor-label /></div>

      <header className="nav" data-nav>
        <button type="button" className="nav__logo" onClick={() => scrollToId('top')} aria-label={`${BRAND}, back to top`}>
          <b>K/V</b><span>{BRAND}<br />Solutions</span>
        </button>
        <div className="nav__right">
          <span className="nav__status"><i />AI · Software · Automation</span>
          <Pill href={MAILTO} variant="light">Let's talk</Pill>
          <button type="button" className="nav__menu" onClick={() => setMenuOpen(true)} aria-haspopup="dialog">Menu <span aria-hidden="true"><i /><i /></span></button>
        </div>
      </header>
      <Menu open={menuOpen} onClose={closeMenu} onGo={go} />
      <ProjectDialog index={project} onClose={closeProject} />

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top" data-hero aria-labelledby="hero-title">
          <div className="hero__glow" data-hero-glow aria-hidden="true" />
          <div className="hero__copy">
            <h1 className="hero__title" id="hero-title" aria-label="Build smarter.">
              <span aria-hidden="true">{heroLine('Build')}</span>
              <span aria-hidden="true">{heroLine('smarter', 5)}<span className="hero__char hero__dot" style={{ '--i': 12 } as React.CSSProperties}>.</span></span>
            </h1>
            <p className="hero__sub"><span>Automate better.</span><span className="outline">Grow faster.</span></p>
            <div className="hero__cta">
              <Pill href={MAILTO}>Start a conversation</Pill>
              <Pill variant="ghost" onClick={() => scrollToId('work')}>See the work</Pill>
            </div>
          </div>
          <div className="hero__shape" data-shape="morph" data-hero-shape data-drag aria-hidden="true" />
          <p className="hero__foot"><span className="label">Scroll</span><span className="label">Intelligent digital solutions for modern businesses</span></p>
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
              <h2 className="statement__title" aria-label={`Technology shaped around your ${ROTATING_WORDS[0]}`}>
                <span aria-hidden="true">{'Technology shaped around your'.split(' ').map((word, i) => <React.Fragment key={i}><span data-word>{word}</span>{' '}</React.Fragment>)}</span>
                <span className="rotor" aria-hidden="true"><span className="rotor__track" data-rotor>{ROTATING_WORDS.map((word) => <span key={word}>{word}</span>)}</span></span>
              </h2>
              <div data-statement-details>
                <ul className="statement__tags"><li>Start with the business</li><li>Build toward what matters</li><li>Leave room to grow</li></ul>
                <p className="statement__body">A clear progression connects the real need to a practical solution, then leaves room for the business to grow.</p>
              </div>
            </div>
          </div>
        </section>

        <Depth shot={0} id="depth-a" figure="Fig. 01 · The challenge" title="Work should move forward." caption="Not get stuck between systems" signals={PROBLEMS} poster="/assets/posters/fig-01.jpg" />

        {/* Services */}
        <section className="services pin" id="capabilities" data-services aria-labelledby="services-title">
          <div className="pin__inner services__inner">
            <div className="services__left">
              <Label>Capabilities</Label>
              <Rise text={'Built around\nyour business.'} id="services-title" className="t-h2" />
              <ol className="services__rows">
                {CAPABILITIES.map((group, i) => (
                  <li key={group.title}>
                    <button type="button" data-service-row data-cursor="Explore"><small>{pad(i + 1)}</small><span>{group.title}</span><ArrowUpRight size={15} /></button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="services__card">
              <span className="services__number" data-service-number aria-hidden="true">01</span>
              <div className="services__shape" data-shape="morph" data-service-shape data-drag aria-hidden="true" />
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

        {/* Work */}
        <section className="work pin" id="work" data-work aria-labelledby="work-title">
          <div className="pin__inner work__inner">
            <div className="work__head">
              <Label>Products and projects</Label>
              <h2 className="sr-only" id="work-title">A closer look at selected work</h2>
              <p className="label work__hint">Open a project to see its purpose</p>
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

        <Depth shot={1} id="depth-b" figure="Fig. 02 · AI inside business" title="Intelligence inside." caption="Connect the moments from first contact to useful insight" signals={WORKFLOW} poster="/assets/posters/fig-02.jpg" />

        {/* Spiral */}
        <section className="spiral pin" id="journey" data-spiral aria-labelledby="spiral-title">
          <div className="pin__inner spiral__inner">
            <p className="spiral__meta"><span className="label">From idea to working product</span><span className="label">{JOURNEY.length} stages · {ECOSYSTEM.length} connected systems</span></p>
            <div className="spiral__space">
              <h2 className="spiral__title" id="spiral-title" data-spiral-title>Every step<br />in view.</h2>
              {JOURNEY.map((stage, i) => <div className="card card--photo" key={stage} data-spiral-card><img src={JOURNEY_PHOTOS[i]} alt="" loading="lazy" /><small>Stage {pad(i + 1)}</small><strong>{stage}</strong></div>)}
              {ECOSYSTEM.map((node) => <div className="card card--system" key={node} data-spiral-card><small>Connected</small><strong>{node}</strong><Boxes size={18} /></div>)}
            </div>
            <p className="spiral__meta"><span className="label">Make the tools you rely on work as one system</span></p>
          </div>
        </section>

        {/* Industries */}
        <section className="section industries" id="industries" aria-labelledby="industries-title">
          <Label>Industries we serve</Label>
          <div className="industries__head">
            <Rise text={'Different industries.\nDistinct ways of working.'} id="industries-title" className="t-display" />
            <p className="label">Shaped for the context, people and processes of each organization</p>
          </div>
          <ul className="grid" data-spot>
            {INDUSTRIES.map((name, i) => {
              const Icon = INDUSTRY_ICONS[i];
              return <li key={name} data-rv style={{ '--d': `${i * 50}ms` } as React.CSSProperties}><img className="grid__photo" src={INDUSTRY_PHOTOS[i]} alt="" loading="lazy" /><Icon size={26} strokeWidth={1.4} /><span>{name}</span></li>;
            })}
          </ul>
        </section>

        {/* Warp */}
        <section className="warp pin" id="how" data-warp aria-labelledby="warp-title">
          <div className="pin__inner warp__inner">
            {['pyramid', 'cube', 'torus', 'spring', 'cone', 'pill', 'torus', 'orb'].map((kind, i) => (
              <div className="warp__shape" key={i} data-shape={kind} data-warp-shape data-hidden="1" aria-hidden="true" />
            ))}
            <div className="warp__intro" data-warp-intro>
              <Label>Our engagement model</Label>
              <h2 className="t-h1" id="warp-title">Begin focused.<br />Expand when it makes sense.</h2>
              <ol>
                {ENGAGEMENT.map((step, i) => <li key={step.title} data-warp-step><small>{pad(i + 1)} / {step.title}</small><p>{step.detail}</p></li>)}
              </ol>
            </div>
            <div className="warp__flash" data-warp-flash aria-hidden="true" />
            <p className="warp__stack" data-warp-stack>
              <span data-warp-word>Build.</span><span data-warp-word>Automate.</span><span data-warp-word className="warp__last">Grow.</span>
            </p>
          </div>
        </section>

        {/* Studio */}
        <section className="section studio" aria-labelledby="studio-title">
          <Label>How we work</Label>
          <Rise text={'Technology decisions\ngrounded in business needs.'} id="studio-title" className="t-h1" />
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
              <p>A connected workflow can carry customer interactions through capture, qualification, follow-up and analytics, so better processes reduce repetitive effort and make it easier to scale.</p>
            </div>
            <div className="relay__panel" data-rv>
              <p className="label relay__head">Business outcomes <em>No performance figures implied</em></p>
              <div className="relay__line" aria-hidden="true"><i /><i /><i /></div>
              <ol>{OUTCOMES.map((item) => <li key={item.title}><b>{item.title}</b><span>{item.detail}</span></li>)}</ol>
            </div>
          </div>
          <div className="promises">
            <Label>Our promise</Label>
            <ol>{PROMISES.map((promise, i) => <li key={promise} data-rv><small>{pad(i + 1)}</small>{promise}</li>)}</ol>
          </div>
        </section>

        {/* Lead workflow demo */}
        <section className="section platform" aria-labelledby="platform-title">
          <div className="platform__glow" aria-hidden="true" />
          <div className="platform__copy">
            <Label>Illustrative example</Label>
            <Rise text={'See one lead\nworkflow in motion.'} id="platform-title" className="t-h2" />
            <p>This fictional example illustrates a process, not a client result or deployment claim. Step through it to watch a lead move from first contact to tracked follow-up.</p>
            <div className="hero__cta"><Pill href={MAILTO}>Start a conversation</Pill></div>
          </div>
          <LeadDemo />
        </section>

        <Questions />

        {/* Closing */}
        <section className="closing pin" id="contact" data-closing aria-labelledby="closing-title">
          <div className="pin__inner closing__inner">
            <Label>The next step</Label>
            <Rise text={'What should we\nbuild together?'} id="closing-title" className="closing__title" />
            <p data-rv>Build. Automate. Grow. Start a conversation about the business problem you want to solve.</p>
            <div className="hero__cta" data-rv>
              <Pill href={MAILTO}>Start a conversation</Pill>
              <Pill variant="ghost" onClick={() => scrollToId('top')}>Back to the beginning</Pill>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__planet" aria-hidden="true" />
        <div className="foot__top">
          <p className="foot__title"><span>{BRAND} Solutions.</span><span>Build. Automate. Grow.</span></p>
          <Pill href={MAILTO}>Let's talk</Pill>
        </div>
        <div className="foot__cols">
          <div><h2>Studio</h2><p>Founded by Sanket and Atharva.<br />Engineering intelligent digital solutions for modern businesses.</p></div>
          <div><h2>Explore</h2>{NAV_LINKS.slice(0, 4).map((link) => <button type="button" key={link.target} onClick={() => scrollToId(link.target)}>{link.label}</button>)}</div>
          <div><h2>More</h2>{NAV_LINKS.slice(4).map((link) => <button type="button" key={link.target} onClick={() => scrollToId(link.target)}>{link.label}</button>)}</div>
          <div><h2>Contact</h2><a href={MAILTO}>{EMAIL}</a></div>
        </div>
        <p className="foot__base"><span>© {new Date().getFullYear()} {BRAND} Solutions</span><span>Stock photography and footage: Pexels</span><span>AI · Software · Automation</span></p>
      </footer>
    </div>
  );
}
