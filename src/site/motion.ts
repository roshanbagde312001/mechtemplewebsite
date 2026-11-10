// Scroll and pointer choreography. One rAF loop drives smooth scrolling, every scrub and the WebGL stage,
// so nothing can drift out of step by a frame.
import { createStage, type Stage } from './stage';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const SCRAMBLE = '!<>-_\\/[]{}=+*^?#01';

type Frame = (dt: number, time: number) => void;

let smoothTarget: ((y: number) => void) | null = null;

/** Scrolls to a section id through the same smoothing as the wheel. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  if (smoothTarget) smoothTarget(y);
  else window.scrollTo(0, y);
}

export function initMotion(root: HTMLElement): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cleanups: (() => void)[] = [];
  const frames: Frame[] = [];
  const $$ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<T>(selector));
  const listen = <K extends keyof WindowEventMap>(type: K, handler: (event: WindowEventMap[K]) => void, options?: AddEventListenerOptions) => {
    window.addEventListener(type, handler, options);
    cleanups.push(() => window.removeEventListener(type, handler, options));
  };
  const pinProgress = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
  };
  const near = (el: HTMLElement, margin = 1) => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > -window.innerHeight * margin + window.innerHeight && rect.top < window.innerHeight * margin;
  };

  document.documentElement.classList.toggle('reduced', reduced);
  cleanups.push(() => document.documentElement.classList.remove('reduced'));

  // --- Stage -----------------------------------------------------------------------------
  const canvas = root.querySelector<HTMLCanvasElement>('[data-stage]')!;
  const stage: Stage | null = createStage(canvas, root, reduced);
  if (!stage) root.classList.add('no-gl');
  cleanups.push(() => stage?.dispose());

  // --- Smooth wheel scrolling ------------------------------------------------------------
  const scroller = { current: window.scrollY, target: window.scrollY, active: false };
  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
  const locked = () => document.documentElement.classList.contains('scroll-lock');
  if (!reduced) {
    smoothTarget = (y) => { scroller.current = window.scrollY; scroller.target = clamp(y, 0, maxScroll()); scroller.active = true; };
    cleanups.push(() => { smoothTarget = null; });
    if (finePointer) {
      listen('wheel', (event) => {
        if (event.ctrlKey || locked()) return;
        event.preventDefault();
        if (!scroller.active) scroller.current = scroller.target = window.scrollY;
        const unit = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? window.innerHeight : 1;
        scroller.target = clamp(scroller.target + event.deltaY * unit, 0, maxScroll());
        scroller.active = true;
      }, { passive: false });
    }
    // Keyboard, scrollbar and touch scrolling stay native; adopt their position when we are idle.
    listen('scroll', () => { if (!scroller.active) scroller.current = scroller.target = window.scrollY; }, { passive: true });
    frames.push((dt) => {
      if (!scroller.active) return;
      scroller.current += (scroller.target - scroller.current) * (1 - Math.exp(-dt * 8.5));
      if (Math.abs(scroller.target - scroller.current) < 0.4) { scroller.current = scroller.target; scroller.active = false; }
      window.scrollTo(0, scroller.current);
    });
  }

  // --- Velocity, progress line, particle field ---------------------------------------
  let lastY = window.scrollY;
  let velocity = 0;
  const progressBar = root.querySelector<HTMLElement>('[data-progress]');
  const nav = root.querySelector<HTMLElement>('[data-nav]');
  frames.push((dt) => {
    const y = window.scrollY;
    velocity += ((y - lastY) / Math.max(dt, 0.001) - velocity) * 0.18;
    lastY = y;
    if (progressBar) progressBar.style.transform = `scaleX(${y / Math.max(1, maxScroll())})`;
    nav?.classList.toggle('nav--scrolled', y > 40);
  });

  // Particle field: soft dots drifting upward, stretched by scroll speed and nudged away from the pointer.
  const particleCanvas = root.querySelector<HTMLCanvasElement>('[data-particles]');
  const particleContext = particleCanvas?.getContext('2d');
  if (particleCanvas && particleContext) {
    type Particle = { x: number; y: number; r: number; depth: number; red: boolean; phase: number; vx: number; vy: number };
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };
    listen('pointermove', (event) => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      particleCanvas.width = window.innerWidth * dpr;
      particleCanvas.height = window.innerHeight * dpr;
      particleContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.round((window.innerWidth * window.innerHeight) / 9000));
      particles = Array.from({ length: count }, () => {
        const depth = Math.pow(Math.random(), 1.8);
        return { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, depth, red: Math.random() < 0.28, phase: Math.random() * Math.PI * 2, r: 0.6 + depth * 2.2, vx: 0, vy: 0 };
      });
    };
    setup();
    listen('resize', setup);
    let time = 0;
    frames.push((dt) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      time += dt;
      particleContext.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduced) {
          // Drift up and sway, with scroll velocity adding parallax by depth.
          p.y -= (6 + p.depth * 18) * dt + velocity * dt * (0.08 + p.depth * 0.35);
          p.x += Math.sin(time * 0.6 + p.phase) * (4 + p.depth * 8) * dt;
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 0.01) {
            const force = (1 - Math.sqrt(d2) / 140) * 90 * (0.4 + p.depth);
            const d = Math.sqrt(d2);
            p.vx += (dx / d) * force * dt;
            p.vy += (dy / d) * force * dt;
          }
          p.vx *= 0.94; p.vy *= 0.94;
          p.x += p.vx; p.y += p.vy;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
        const twinkle = 0.65 + 0.35 * Math.sin(time * 1.6 + p.phase);
        const alpha = (0.18 + p.depth * 0.7) * twinkle;
        particleContext.fillStyle = p.red ? `rgba(255,0,51,${alpha})` : `rgba(255,235,235,${alpha * 0.8})`;
        if (p.red && p.depth > 0.45) { particleContext.shadowColor = 'rgba(255,0,51,0.9)'; particleContext.shadowBlur = 10 * p.depth; } else { particleContext.shadowBlur = 0; }
        particleContext.beginPath();
        particleContext.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        particleContext.fill();
      }
      particleContext.shadowBlur = 0;
    });
  }

  // --- In-view reveals and text scramble -------------------------------------------------
  const scramble = (el: HTMLElement) => {
    const original = el.dataset.text ?? el.textContent ?? '';
    el.dataset.text = original;
    let step = 0;
    const steps = 20;
    const timer = window.setInterval(() => {
      step++;
      const done = Math.floor((original.length * step) / steps);
      el.textContent = original.slice(0, done) + original.slice(done).replace(/[^\s·/]/g, () => SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]);
      if (step >= steps) { el.textContent = original; window.clearInterval(timer); }
    }, 34);
    cleanups.push(() => window.clearInterval(timer));
  };
  const countUp = (el: HTMLElement) => {
    const value = Number(el.dataset.count);
    const started = performance.now();
    const duration = 1100;
    const run = (now: number) => {
      const t = clamp((now - started) / duration);
      el.textContent = t >= 1 ? String(value) : String(Math.floor(Math.random() * Math.max(10, value * 3)));
      if (t < 1) window.requestAnimationFrame(run);
    };
    window.requestAnimationFrame(run);
  };

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.classList.add('in');
      reveal.unobserve(el);
      if (reduced) return;
      if (el.dataset.scramble !== undefined) scramble(el);
      if (el.dataset.count !== undefined) countUp(el);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
  $$('[data-rv],[data-scramble],[data-count],[data-h]').forEach((el) => reveal.observe(el));
  cleanups.push(() => reveal.disconnect());

  // --- Hero --------------------------------------------------------------------------------
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  const heroShape = root.querySelector<HTMLElement>('[data-hero-shape]');
  const heroGlow = root.querySelector<HTMLElement>('[data-hero-glow]');
  if (hero && heroShape) {
    frames.push((_dt, time) => {
      const y = window.scrollY;
      if (y > window.innerHeight * 1.3) return;
      // Dwell on each solid, then flow to the next; scrolling also pushes it along.
      const cycle = time * 0.36 + y / 500;
      const whole = Math.floor(cycle);
      heroShape.dataset.morph = String(reduced ? 0 : whole + easeInOut(range(cycle - whole, 0.55, 1)));
      heroShape.style.transform = `translate3d(0, ${y * -0.22}px, 0) scale(${1 + y / 2400})`;
    });
  }
  if (heroGlow && finePointer) {
    listen('pointermove', (event) => {
      // Set on the hero section so both the glow and the background image follow the pointer.
      const target = heroGlow.parentElement ?? heroGlow;
      target.style.setProperty('--gx', `${(event.clientX / window.innerWidth) * 100}%`);
      target.style.setProperty('--gy', `${(event.clientY / window.innerHeight) * 100}%`);
    }, { passive: true });
  }

  // --- Statement -------------------------------------------------------------------------
  const statement = root.querySelector<HTMLElement>('[data-statement]');
  if (statement && !reduced) {
    const words = $$('[data-word]', statement);
    const rotor = statement.querySelector<HTMLElement>('[data-rotor]');
    const rotorCount = rotor?.children.length ?? 1;
    const orbiters = $$('[data-orbiter]', statement);
    const details = statement.querySelector<HTMLElement>('[data-statement-details]');
    frames.push(() => {
      if (!near(statement)) return;
      const p = pinProgress(statement);
      words.forEach((word, i) => { word.style.opacity = String(0.2 + 0.8 * range(p, 0.02 + (i / words.length) * 0.22, 0.05 + ((i + 1) / words.length) * 0.22)); });
      if (rotor) {
        const position = range(p, 0.26, 0.92) * (rotorCount - 1);
        const whole = Math.floor(position);
        const settled = whole + easeInOut(range(position - whole, 0.62, 1));
        rotor.style.transform = `translateY(${-settled * 100 / rotorCount}%)`;
        rotor.parentElement!.style.opacity = String(range(p, 0.18, 0.27));
      }
      if (details) {
        const t = easeOut(range(p, 0.2, 0.34));
        details.style.opacity = String(t);
        details.style.transform = `translateY(${(1 - t) * 34}px)`;
      }
      const enter = easeOut(range(p, 0, 0.3));
      const leave = range(p, 0.9, 1);
      orbiters.forEach((orbiter, i) => {
        const sign = i % 2 ? 1 : -1;
        const drift = (p - 0.5) * (70 + i * 26);
        orbiter.style.transform = `translate3d(${sign * (1 - enter) * 180}px, ${(1 - enter) * 150 * (i % 3 - 1) - drift - leave * 110}px, 0)`;
        orbiter.style.opacity = String(enter);
      });
    });
  }

  // --- Depth: slice-block reveal, frame counter, sequential signals ----------------------
  const depths = $$('[data-depth]');
  const depthSeeds = depths.map((depth) => $$('[data-slice]', depth).map(() => ({ delay: Math.random() * 0.5, origin: Math.random() > 0.5 ? 'left' : 'right' })));
  depths.forEach((depth, index) => {
    const slices = $$('[data-slice]', depth);
    slices.forEach((slice, i) => { slice.style.transformOrigin = depthSeeds[index][i].origin; });
  });
  frames.push(() => {
    let robotSet = false;
    depths.forEach((depth, index) => {
      const rect = depth.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible && !robotSet && stage) {
        robotSet = true;
        stage.setRobot(rect, pinProgress(depth), Number(depth.dataset.depth) as 0 | 1);
      }
      if (!visible || reduced) return;
      const p = pinProgress(depth);
      // The reveal starts while the section is still entering from below.
      const entry = clamp(1 - rect.top / window.innerHeight);
      const open = entry * 0.55 + range(p, 0, 0.16) * 0.45;
      const slices = $$('[data-slice]', depth);
      slices.forEach((slice, i) => {
        const { delay } = depthSeeds[index][i];
        const t = easeInOut(range(open, delay * 0.8, delay * 0.8 + 0.5));
        slice.style.transform = `scaleX(${1 - t})`;
      });
      const title = depth.querySelector<HTMLElement>('[data-depth-title]');
      if (title) {
        const t = easeOut(range(p, 0.05, 0.2));
        const out = range(p, 0.78, 0.92);
        title.style.opacity = String(t * (1 - out));
        title.style.transform = `translateY(${(1 - t) * 60 - out * 40}px)`;
      }
      const veil = depth.querySelector<HTMLElement>('[data-veil]');
      if (veil) veil.style.opacity = String(easeInOut(range(p, 0.86, 1)));
      const counter = depth.querySelector<HTMLElement>('[data-frame]');
      if (counter) counter.textContent = String(Math.round(p * 240)).padStart(3, '0');
      const signals = $$('[data-signal]', depth);
      signals.forEach((signal, i) => {
        const start = 0.22 + (i / signals.length) * 0.5;
        const t = range(p, start, start + 0.05);
        signal.style.opacity = String(t * (1 - range(p, 0.8, 0.88)));
        signal.style.transform = `translateX(${(1 - easeOut(t)) * 26}px)`;
      });
    });
    if (!robotSet) stage?.setRobot(null, 0, 0);
  });

  // --- Services ---------------------------------------------------------------------------
  const services = root.querySelector<HTMLElement>('[data-services]');
  if (services) {
    const rows = $$('[data-service-row]', services);
    const panels = $$('[data-service-panel]', services);
    const number = services.querySelector<HTMLElement>('[data-service-number]');
    const shape = services.querySelector<HTMLElement>('[data-service-shape]');
    let active = -1;
    const activate = (index: number) => {
      if (index === active) return;
      active = index;
      rows.forEach((row, i) => row.classList.toggle('is-active', i === index));
      panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
      if (number) number.textContent = String(index + 1).padStart(2, '0');
      if (shape) shape.dataset.morph = panels[index]?.dataset.shapeIndex ?? '0';
    };
    activate(0);
    frames.push(() => {
      if (!near(services)) return;
      activate(Math.min(rows.length - 1, Math.floor(pinProgress(services) * rows.length)));
    });
    rows.forEach((row, index) => {
      const onClick = () => {
        const top = services.getBoundingClientRect().top + window.scrollY;
        const y = top + ((index + 0.5) / rows.length) * (services.offsetHeight - window.innerHeight);
        if (smoothTarget) smoothTarget(y); else { window.scrollTo(0, y); activate(index); }
      };
      row.addEventListener('click', onClick);
      cleanups.push(() => row.removeEventListener('click', onClick));
    });
  }

  // --- Marquee: speed and direction follow scroll velocity ------------------------------
  $$('[data-marquee]').forEach((marquee) => {
    let offset = 0;
    frames.push((dt) => {
      if (reduced || !near(marquee)) return;
      const half = marquee.scrollWidth / 2;
      offset -= (70 + Math.abs(velocity) * 0.32) * dt * (velocity < -40 ? -1 : 1);
      if (offset <= -half) offset += half;
      if (offset > 0) offset -= half;
      marquee.style.transform = `translate3d(${offset}px,0,0) skewX(${clamp(velocity / 220, -7, 7)}deg)`;
    });
  });

  // --- Reel: the frame grows to full-bleed while clips crossfade. Videos fetch only as the section nears view.
  const reel = root.querySelector<HTMLElement>('[data-reel]');
  if (reel) {
    const frame = reel.querySelector<HTMLElement>('[data-reel-frame]');
    const clips = $$<HTMLVideoElement>('[data-reel-clip]', reel);
    const captions = $$('[data-reel-caption]', reel);
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const playable = !reduced && !saveData;
    let loaded = false;
    let active = -1;
    const pauseAll = () => clips.forEach((clip) => { if (!clip.paused) clip.pause(); });
    cleanups.push(pauseAll);
    frames.push(() => {
      if (reduced) return;
      if (!near(reel, 2)) { pauseAll(); active = -1; return; }
      if (playable && !loaded) {
        loaded = true;
        clips.forEach((clip) => { clip.muted = true; clip.src = clip.dataset.src!; clip.preload = 'auto'; });
      }
      const p = pinProgress(reel);
      const open = 1 - easeInOut(range(p, 0, 0.26));
      if (frame) frame.style.clipPath = `inset(${open * 17}vh ${open * 19}vw round ${open * 20}px)`;
      const index = Math.min(clips.length - 1, Math.floor(range(p, 0.04, 0.98) * clips.length));
      if (index !== active) {
        active = index;
        clips.forEach((clip, i) => clip.classList.toggle('is-active', i === index));
        captions.forEach((caption, i) => caption.classList.toggle('is-active', i === index));
      }
      if (!playable) return;
      const inView = near(reel);
      clips.forEach((clip, i) => {
        if (inView && i === index) { if (clip.paused) clip.play().catch(() => {}); }
        else if (!clip.paused) clip.pause();
      });
    });
  }

  // --- Work: curved row of screens --------------------------------------------------------
  const work = root.querySelector<HTMLElement>('[data-work]');
  if (work && !reduced) {
    const track = work.querySelector<HTMLElement>('[data-work-track]');
    const screens = $$('[data-work-screen]', work);
    frames.push(() => {
      if (!near(work) || !track) return;
      const p = pinProgress(work);
      const vw = window.innerWidth;
      const first = screens[0];
      const last = screens[screens.length - 1];
      const start = vw / 2 - (first.offsetLeft + first.offsetWidth / 2) + vw * 0.22;
      const end = vw / 2 - (last.offsetLeft + last.offsetWidth / 2) - vw * 0.05;
      const x = start + (end - start) * p;
      track.style.transform = `translate3d(${x}px,0,0)`;
      screens.forEach((screen) => {
        const center = screen.offsetLeft + screen.offsetWidth / 2 + x;
        const d = clamp((center - vw / 2) / vw, -1, 1);
        screen.style.transform = `translateZ(${-Math.abs(d) * 340}px) rotateY(${-d * 46}deg) scale(${1 - Math.abs(d) * 0.06})`;
        screen.style.opacity = String(1 - Math.max(0, Math.abs(d) - 0.55) * 1.4);
      });
    });
  }

  // --- Spiral: cards travel a helix from behind the headline, past the camera -------------
  const spiral = root.querySelector<HTMLElement>('[data-spiral]');
  if (spiral && !reduced) {
    const cards = $$('[data-spiral-card]', spiral);
    const title = spiral.querySelector<HTMLElement>('[data-spiral-title]');
    frames.push(() => {
      if (!near(spiral)) return;
      const p = pinProgress(spiral);
      const small = window.innerWidth < 720;
      cards.forEach((card, i) => {
        const t = p * 1.75 - (i / cards.length) * 1.1 + 0.02;
        if (t <= 0 || t >= 1) { card.style.visibility = 'hidden'; return; }
        card.style.visibility = 'visible';
        const angle = i * 2.399 + t * 3.4;
        const radius = (small ? 24 : 44) * easeOut(range(t, 0, 0.8)) + 3;
        const z = -900 + Math.pow(t, 1.7) * 1650;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.72;
        card.style.transform = `translate(-50%,-50%) translate3d(${x}vw,${y}vh,${z}px) rotateZ(${Math.sin(angle) * 9}deg) rotateY(${Math.cos(angle) * -20}deg)`;
        card.style.opacity = String(range(t, 0, 0.12) * (1 - range(t, 0.86, 1)));
      });
      if (title) {
        const out = range(p, 0.88, 1);
        title.style.transform = `translate3d(0,0,0) scale(${0.62 + easeOut(range(p, 0, 0.34)) * 0.5 + out * 0.08})`;
        title.style.opacity = String(1 - out);
      }
    });
  }

  // --- Industries spotlight ---------------------------------------------------------------
  const spotlight = root.querySelector<HTMLElement>('[data-spot]');
  if (spotlight && finePointer) {
    const onMove = (event: PointerEvent) => {
      const rect = spotlight.getBoundingClientRect();
      spotlight.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      spotlight.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    spotlight.addEventListener('pointermove', onMove);
    cleanups.push(() => spotlight.removeEventListener('pointermove', onMove));
  }

  // --- Warp --------------------------------------------------------------------------------
  const warp = root.querySelector<HTMLElement>('[data-warp]');
  if (warp && !reduced) {
    const intro = warp.querySelector<HTMLElement>('[data-warp-intro]');
    const steps = $$('[data-warp-step]', warp);
    const stack = warp.querySelector<HTMLElement>('[data-warp-stack]');
    const words = $$('[data-warp-word]', warp);
    const fliers = $$('[data-warp-shape]', warp);
    const flash = warp.querySelector<HTMLElement>('[data-warp-flash]');
    const flierSeeds = fliers.map((_, i) => ({ angle: (i / fliers.length) * Math.PI * 2 + 0.6, spread: 22 + (i % 3) * 8, start: (i % 4) * 0.035 }));
    frames.push(() => {
      if (!near(warp)) return;
      const p = pinProgress(warp);
      steps.forEach((step, i) => {
        const t = easeOut(range(p, 0.02 + i * 0.045, 0.1 + i * 0.045));
        step.style.opacity = String(t);
        step.style.transform = `translateY(${(1 - t) * 34}px)`;
      });
      if (intro) {
        const out = range(p, 0.3, 0.42);
        intro.style.opacity = String(1 - out);
        intro.style.transform = `translateY(${-out * 90}px) scale(${1 - out * 0.1})`;
        intro.style.visibility = out >= 1 ? 'hidden' : 'visible';
      }
      if (stack) {
        const zoom = Math.pow(range(p, 0.72, 1), 3);
        stack.style.transform = `scale(${0.82 + range(p, 0.4, 0.72) * 0.2 + zoom * 7.5})`;
        stack.style.opacity = String(range(p, 0.33, 0.4) * (1 - range(p, 0.93, 1)));
      }
      words.forEach((word, i) => {
        const t = range(p, 0.38 + i * 0.085, 0.46 + i * 0.085);
        word.style.opacity = String(0.06 + t * 0.94);
        word.classList.toggle('is-lit', t >= 1);
      });
      fliers.forEach((flier, i) => {
        const seed = flierSeeds[i];
        const t = range(p, 0.03 + seed.start, 0.98);
        const radius = seed.spread + t * 24;
        const x = 22 * (1 - t) * (1 - t) + Math.cos(seed.angle + t * 2.6) * radius;
        const y = Math.sin(seed.angle + t * 2.6) * radius * 0.62;
        flier.style.transform = `translate3d(${x}vw,${y}vh,0)`;
        flier.dataset.z = String(-8 + Math.pow(t, 2.2) * 15.5);
        flier.dataset.hidden = p <= 0.01 || p >= 0.985 ? '1' : '0';
      });
      if (flash) flash.style.opacity = String(range(p, 0.8, 0.96) * (1 - range(p, 0.97, 1)));
    });
  }

  // --- Closing terrain ---------------------------------------------------------------------
  const closing = root.querySelector<HTMLElement>('[data-closing]');
  frames.push(() => {
    if (!closing || !stage) return;
    const rect = closing.getBoundingClientRect();
    stage.setTerrain(rect.bottom > 0 && rect.top < window.innerHeight ? rect : null, pinProgress(closing));
  });

  // --- Pointer: cursor, magnetic buttons -------------------------------------------------
  const cursor = root.querySelector<HTMLElement>('[data-cursor-el]');
  const cursorLabel = root.querySelector<HTMLElement>('[data-cursor-label]');
  if (finePointer && !reduced && cursor) {
    root.classList.add('has-cursor');
    const position = { x: -100, y: -100, tx: -100, ty: -100 };
    listen('pointermove', (event) => {
      position.tx = event.clientX;
      position.ty = event.clientY;
      stage?.setPointer((event.clientX / window.innerWidth - 0.5) * 2, -(event.clientY / window.innerHeight - 0.5) * 2);
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      cursor.classList.toggle('is-label', !!labelled);
      cursor.classList.toggle('is-link', !labelled && !!target?.closest('a,button,[data-drag]'));
      if (cursorLabel && labelled) cursorLabel.textContent = labelled.dataset.cursor ?? '';
    }, { passive: true });
    frames.push((dt) => {
      const k = 1 - Math.exp(-dt * 18);
      position.x += (position.tx - position.x) * k;
      position.y += (position.ty - position.y) * k;
      cursor.style.transform = `translate3d(${position.x}px,${position.y}px,0)`;
    });

    $$('[data-magnetic]').forEach((el) => {
      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * 0.22}px,${dy * 0.3}px)`;
      };
      const onLeave = () => { el.style.transform = ''; };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      cleanups.push(() => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); });
    });
  }

  // --- Robot asset: loads after first paint. Small or touch screens get the light model. ---
  const softwareGl = (() => {
    if (!stage) return true;
    const gl = canvas.getContext('webgl2');
    const info = gl?.getExtension('WEBGL_debug_renderer_info');
    return !info || /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(gl!.getParameter(info.UNMASKED_RENDERER_WEBGL)));
  })();
  const forceModel = new URLSearchParams(window.location.search).has('model');
  const device = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const lowEnd = device.connection?.saveData === true || (device.deviceMemory ?? 8) <= 2;
  const lightModel = window.innerWidth < 900 || !finePointer;
  const robotUrl = lightModel ? '/models/robot-mobile.glb' : '/models/protector_nemesis__the_fallen_seraph.glb';
  const robotTimer = window.setTimeout(() => {
    if (!stage || (!forceModel && (softwareGl || lowEnd))) return;
    stage.loadRobot(robotUrl, (ratio) => root.style.setProperty('--robot-load', String(ratio)))
      .then(() => root.classList.add('robot-ready'))
      .catch((error) => console.error('Robot model failed to load; keeping the still image.', error));
  }, 1400);
  cleanups.push(() => window.clearTimeout(robotTimer));

  // If a phone runs out of graphics memory the browser drops the 3D canvas; bring the still image back rather than show black.
  const onContextLost = (event: Event) => { event.preventDefault(); root.classList.remove('robot-ready'); };
  canvas.addEventListener('webglcontextlost', onContextLost);
  cleanups.push(() => canvas.removeEventListener('webglcontextlost', onContextLost));

  // --- Loop --------------------------------------------------------------------------------
  let frameId = 0;
  let previous = performance.now();
  const start = previous;
  const loop = (now: number) => {
    frameId = window.requestAnimationFrame(loop);
    const dt = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    for (const frame of frames) frame(dt, (now - start) / 1000);
    stage?.render(dt, (now - start) / 1000);
  };
  frameId = window.requestAnimationFrame(loop);
  cleanups.push(() => window.cancelAnimationFrame(frameId));

  return () => cleanups.forEach((cleanup) => cleanup());
}
