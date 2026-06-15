import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Burst = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  sparks: { x: number; y: number; vx: number; vy: number; life: number }[];
};

export type ParticleSettings = {
  speed: number; // particle drift speed multiplier
  collisionRadius: number; // distance threshold for collision
  density: number; // particles per 1000px²-ish (relative)
  burstSize: number; // collision burst max radius multiplier
};

export const defaultSettings: ParticleSettings = {
  speed: 1,
  collisionRadius: 4,
  density: 1,
  burstSize: 1,
};

export function ParticleField({ settings }: { settings: ParticleSettings }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    let particles: Particle[] = [];
    const bursts: Burst[] = [];

    let rgb: [number, number, number] = [13, 13, 13];
    const updateColor = () => {
      rgb = document.documentElement.classList.contains("dark")
        ? [245, 243, 238]
        : [13, 13, 13];
    };
    updateColor();
    const themeObserver = new MutationObserver(updateColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const fg = (alpha: number) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // re-seed to match new area
      const target = Math.min(
        140,
        Math.floor(((width * height) / 22000) * settingsRef.current.density),
      );
      if (particles.length < target) {
        for (let i = particles.length; i < target; i++) {
          particles.push(makeParticle());
        }
      } else {
        particles = particles.slice(0, target);
      }
    };

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.1 + 0.5,
    });

    const collide = (a: Particle, b: Particle) => {
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      const sparks: Burst["sparks"] = [];
      const sparkCount = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 1.6;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
      bursts.push({
        x,
        y,
        radius: 0,
        maxRadius: (30 + Math.random() * 24) * settingsRef.current.burstSize,
        alpha: 1,
        sparks,
      });
      const angle = Math.random() * Math.PI * 2;
      a.vx = Math.cos(angle) * 0.6;
      a.vy = Math.sin(angle) * 0.6;
      b.vx = -a.vx;
      b.vy = -a.vy;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const s = settingsRef.current;

      // particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * s.speed;
        p.y += p.vy * s.speed;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.beginPath();
        ctx.fillStyle = fg(0.55);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // collisions
      const cr2 = s.collisionRadius * s.collisionRadius;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < cr2) {
            collide(a, b);
          }
        }
      }

      // bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        burst.radius += (burst.maxRadius - burst.radius) * 0.1;
        burst.alpha *= 0.93;

        ctx.beginPath();
        ctx.strokeStyle = fg(burst.alpha * 0.7);
        ctx.lineWidth = 0.8;
        ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
        ctx.stroke();

        for (const sp of burst.sparks) {
          sp.x += sp.vx * s.speed;
          sp.y += sp.vy * s.speed;
          sp.vx *= 0.96;
          sp.vy *= 0.96;
          sp.life *= 0.94;
          ctx.beginPath();
          ctx.strokeStyle = fg(sp.life * burst.alpha * 0.9);
          ctx.lineWidth = 0.6;
          ctx.moveTo(sp.x, sp.y);
          ctx.lineTo(sp.x - sp.vx * 4, sp.y - sp.vy * 4);
          ctx.stroke();
        }

        if (burst.alpha < 0.02) bursts.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  // adjust density at runtime
  useEffect(() => {
    // density change handled implicitly on resize; trigger one
    window.dispatchEvent(new Event("resize"));
  }, [settings.density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function ParticleControls({
  settings,
  onChange,
}: {
  settings: ParticleSettings;
  onChange: (next: ParticleSettings) => void;
}) {
  const [open, setOpen] = useState(false);
  const update = <K extends keyof ParticleSettings>(key: K, value: ParticleSettings[K]) =>
    onChange({ ...settings, [key]: value });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Particle field controls"
        className="group flex items-center gap-2 rounded-full border border-foreground/30 bg-foreground/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground shadow-sm transition-all hover:border-foreground/60 hover:bg-foreground/10"
      >
        <SlidersHorizontal
          size={12}
          strokeWidth={1.75}
          className="transition-transform group-hover:rotate-12"
          aria-hidden="true"
        />
        Tune Field
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-auto z-20 mb-3 w-[min(16rem,calc(100vw-3rem))] rounded-md border border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm md:left-auto md:right-0">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            Particle Field
          </p>
          <Slider
            label="Speed"
            value={settings.speed}
            min={0}
            max={5}
            step={0.1}
            onChange={(v) => update("speed", v)}
          />
          <Slider
            label="Collision Radius"
            value={settings.collisionRadius}
            min={1}
            max={20}
            step={0.5}
            onChange={(v) => update("collisionRadius", v)}
          />
          <Slider
            label="Density"
            value={settings.density}
            min={0.2}
            max={3}
            step={0.1}
            onChange={(v) => update("density", v)}
          />
          <Slider
            label="Burst Size"
            value={settings.burstSize}
            min={0.2}
            max={3}
            step={0.1}
            onChange={(v) => update("burstSize", v)}
          />
          <button
            type="button"
            onClick={() => onChange(defaultSettings)}
            className="mt-2 w-full rounded border border-border py-1 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="mb-3 block">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-foreground">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-foreground/15 accent-foreground"
      />
    </label>
  );
}
