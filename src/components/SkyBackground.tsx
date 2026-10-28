import { useEffect, useRef } from "react";

const SCALE = 3;
const PLANE_RIGHT = [
  "...1.....",
  "1..11....",
  "111111111",
  "...11....",
  "...1.....",
];
const PLANE_LEFT = PLANE_RIGHT.map(row => [...row].reverse().join(""));

interface Star { x: number; y: number; phase: number; speed: number; big: boolean }
interface Cloud { x: number; y: number; w: number; speed: number }
interface Plane { x: number; y: number; vx: number; age: number; trail: { x: number; y: number; ttl: number }[] }
interface Meteor { x: number; y: number; ttl: number }

const color = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function SkyBackground() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [], clouds: Cloud[] = [];
    const planes: Plane[] = [];
    let meteor: Meteor | null = null;
    let nextPlane = 1.5, nextMeteor = 6;

    const resize = () => {
      c.width = Math.ceil(innerWidth / SCALE);
      c.height = Math.ceil(innerHeight / SCALE);
      const count = Math.round(c.width * c.height / 320);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 1.8, big: Math.random() < 0.08,
      }));
      clouds = Array.from({ length: 4 }, () => ({
        x: Math.random() * c.width, y: c.height * (0.25 + Math.random() * 0.65), w: 30 + Math.random() * 50, speed: 1 + Math.random() * 2,
      }));
    };

    const spawnPlane = () => {
      const right = Math.random() < 0.5;
      planes.push({ x: right ? -12 : c.width + 12, y: 6 + Math.random() * c.height * 0.7, vx: (right ? 1 : -1) * (8 + Math.random() * 10), age: 0, trail: [] });
    };

    const draw = (dt: number, t: number) => {
      const { width: w, height: h } = c;
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, color("--edge"));
      grad.addColorStop(1, color("--night"));
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);

      const drift = (scrollY / SCALE) * 0.08;
      const ink = color("--ink");
      stars.forEach(s => {
        const glow = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed));
        g.globalAlpha = glow;
        g.fillStyle = ink;
        const y = ((s.y - drift) % h + h) % h;
        g.fillRect(Math.round(s.x), Math.round(y), 1, 1);
        if (s.big && glow > 0.8) {
          g.globalAlpha = glow * 0.5;
          g.fillRect(Math.round(s.x) - 1, Math.round(y), 3, 1);
          g.fillRect(Math.round(s.x), Math.round(y) - 1, 1, 3);
        }
      });

      g.fillStyle = color("--panel-2");
      clouds.forEach(cl => {
        cl.x -= cl.speed * dt;
        if (cl.x + cl.w < 0) { cl.x = w + Math.random() * 40; cl.y = h * (0.25 + Math.random() * 0.65); }
        g.globalAlpha = 0.35;
        g.fillRect(Math.round(cl.x), Math.round(cl.y), Math.round(cl.w), 3);
        g.fillRect(Math.round(cl.x + cl.w * 0.2), Math.round(cl.y - 2), Math.round(cl.w * 0.5), 2);
      });

      if (meteor) {
        meteor.x += 90 * dt; meteor.y += 45 * dt; meteor.ttl -= dt;
        g.fillStyle = ink;
        for (let i = 0; i < 6; i++) {
          g.globalAlpha = Math.max(0, meteor.ttl) * (1 - i / 6);
          g.fillRect(Math.round(meteor.x - i * 2), Math.round(meteor.y - i), 1, 1);
        }
        if (meteor.ttl <= 0) meteor = null;
      }

      const dim = color("--dim"), red = color("--berry"), gold = color("--coin");
      for (let i = planes.length - 1; i >= 0; i--) {
        const p = planes[i];
        p.x += p.vx * dt; p.age += dt;
        const tail = p.vx > 0 ? p.x : p.x + 9;
        if (Math.random() < 0.6) p.trail.push({ x: tail, y: p.y + 2, ttl: 2.5 });
        p.trail = p.trail.filter(d => (d.ttl -= dt) > 0);
        g.fillStyle = dim;
        p.trail.forEach(d => { g.globalAlpha = d.ttl / 2.5 * 0.35; g.fillRect(Math.round(d.x), Math.round(d.y), 1, 1); });
        g.globalAlpha = 0.9;
        const map = p.vx > 0 ? PLANE_RIGHT : PLANE_LEFT;
        map.forEach((row, j) => [...row].forEach((ch, k) => { if (ch === "1") g.fillRect(Math.round(p.x + k), Math.round(p.y + j), 1, 1); }));
        if (Math.floor(p.age * 2) % 2 === 0) {
          g.globalAlpha = 1;
          g.fillStyle = red; g.fillRect(Math.round(p.x + 4), Math.round(p.y), 1, 1);
          g.fillStyle = gold; g.fillRect(Math.round(p.x + 4), Math.round(p.y + 4), 1, 1);
        }
        if (p.x < -40 || p.x > w + 40) planes.splice(i, 1);
      }
      g.globalAlpha = 1;
    };

    resize();
    addEventListener("resize", resize);

    if (still) {
      spawnPlane();
      planes[0].x = c.width * 0.3;
      draw(0, 0);
      return () => removeEventListener("resize", resize);
    }

    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      nextPlane -= dt; nextMeteor -= dt;
      if (nextPlane <= 0 && planes.length < 3) { spawnPlane(); nextPlane = 5 + Math.random() * 8; }
      if (nextMeteor <= 0 && !meteor) { meteor = { x: Math.random() * c.width * 0.6, y: Math.random() * c.height * 0.3, ttl: 0.9 }; nextMeteor = 8 + Math.random() * 12; }
      draw(dt, now / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvas} className="sky-bg" aria-hidden="true" />;
}
