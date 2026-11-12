// Background particle field shared by the home page and the inner pages.
// Soft dots drift upward, stretch with scroll speed and move away from the pointer.
// Glows are pre-rendered sprites drawn with drawImage: canvas shadowBlur per dot was the main cost on phones.

type Particle = { x: number; y: number; size: number; depth: number; red: boolean; phase: number; vx: number; vy: number };

export interface ParticleField {
  /** Advance and draw one frame. `velocity` is scroll speed in px/s (adds depth parallax). */
  step: (dt: number, velocity?: number) => void;
  dispose: () => void;
}

const sprite = (core: string, glow: string, size: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, core);
  gradient.addColorStop(0.18, core);
  gradient.addColorStop(0.35, glow);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, size, size);
  return canvas;
};

export function createParticles(canvas: HTMLCanvasElement, reduced: boolean): ParticleField {
  const context = canvas.getContext('2d')!;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const red = sprite('rgba(255,40,80,1)', 'rgba(255,0,51,0.35)', 48);
  const white = sprite('rgba(255,240,240,1)', 'rgba(255,220,220,0.12)', 32);
  const pointer = { x: -9999, y: -9999 };
  let particles: Particle[] = [];
  let time = 0;

  const onPointer = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
  const setup = () => {
    // Phones get a 1x canvas and far fewer dots; the field reads the same at a fraction of the fill cost.
    const dpr = coarse ? 1 : Math.min(window.devicePixelRatio, 1.25);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const area = window.innerWidth * window.innerHeight;
    const count = coarse ? Math.min(60, Math.round(area / 9000)) : Math.min(170, Math.round(area / 10000));
    particles = Array.from({ length: count }, () => {
      const depth = Math.pow(Math.random(), 1.8);
      const isRed = Math.random() < 0.28;
      return {
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, depth, red: isRed,
        phase: Math.random() * Math.PI * 2, size: (isRed ? 6 : 3) + depth * (isRed ? 14 : 6), vx: 0, vy: 0,
      };
    });
  };
  setup();
  window.addEventListener('resize', setup);
  if (!coarse) window.addEventListener('pointermove', onPointer, { passive: true });

  const step = (dt: number, velocity = 0) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    time += dt;
    context.clearRect(0, 0, w, h);
    for (const p of particles) {
      if (!reduced) {
        p.y -= (6 + p.depth * 18) * dt + velocity * dt * (0.08 + p.depth * 0.35);
        p.x += Math.sin(time * 0.6 + p.phase) * (4 + p.depth * 8) * dt;
        if (!coarse) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / 140) * 90 * (0.4 + p.depth);
            p.vx += (dx / d) * force * dt;
            p.vy += (dy / d) * force * dt;
          }
          p.vx *= 0.94; p.vy *= 0.94;
          p.x += p.vx; p.y += p.vy;
        }
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
      }
      const twinkle = 0.65 + 0.35 * Math.sin(time * 1.6 + p.phase);
      context.globalAlpha = (0.2 + p.depth * 0.7) * twinkle;
      context.drawImage(p.red ? red : white, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    context.globalAlpha = 1;
  };

  return {
    step,
    dispose: () => {
      window.removeEventListener('resize', setup);
      window.removeEventListener('pointermove', onPointer);
    },
  };
}
