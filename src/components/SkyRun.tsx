import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLang } from "../i18n";

const DURATION = 45;
const LIVES = 3;
const BEST_KEY = "queky-sky-best";
const W = 320, H = 140;

const PLANE = [
  "....11......",
  "....111.....",
  "1...1111....",
  "11111111111.",
  "111111111111",
  "1...1111....",
  "....111.....",
  "....11......",
];
const BIRD_UP = ["1......1", ".1....1.", "..1..1..", "...11..."];
const BIRD_DOWN = ["........", "...11...", "..1..1..", ".1....1."];
const COIN = [".11.", "1111", "1111", ".11."];

type Phase = "idle" | "flying" | "landed" | "crashed" | "aborted";
interface Thing { kind: "bird" | "coin"; x: number; y: number; vx: number; wobble: number }
interface Cloud { x: number; y: number; w: number; speed: number }

const color = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function sprite(g: CanvasRenderingContext2D, map: string[], x: number, y: number, fill: string, size = 2) {
  g.fillStyle = fill;
  map.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === "1") g.fillRect(Math.round(x + i * size), Math.round(y + j * size), size, size);
  }));
}

function readBest() {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
}

function newClouds(): Cloud[] {
  return Array.from({ length: 5 }, (_, i) => ({ x: i * 70 + Math.random() * 40, y: 8 + Math.random() * (H - 40), w: 18 + Math.random() * 26, speed: 8 + Math.random() * 10 }));
}

function drawSky(g: CanvasRenderingContext2D, clouds: Cloud[]) {
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, color("--air"));
  grad.addColorStop(1, color("--air-low"));
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  g.fillStyle = color("--cloud");
  g.globalAlpha = 0.35;
  clouds.forEach(c => { g.fillRect(Math.round(c.x), Math.round(c.y), Math.round(c.w), 6); g.fillRect(Math.round(c.x + 6), Math.round(c.y - 4), Math.round(c.w - 12), 4); });
  g.globalAlpha = 1;
}


export default function SkyRun() {
  const { t } = useLang();
  const txt = t.game;
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [left, setLeft] = useState(DURATION);
  const [best, setBest] = useState(readBest);
  const world = useRef({ y: H / 2, target: H / 2, things: [] as Thing[], clouds: newClouds(), spawn: 0, elapsed: 0, hurt: 0, score: 0, lives: LIVES });

  // Title and end screens
  useEffect(() => {
    if (phase === "flying") return;
    const g = canvas.current?.getContext("2d");
    if (!g) return;
    const draw = () => {
      drawSky(g, world.current.clouds);
      sprite(g, PLANE, W / 2 - 12, 22, color("--ink"));
      const title = txt.messages[phase];
      g.font = "8px 'Press Start 2P', monospace"; g.textAlign = "center";
      g.fillStyle = color("--coin");
      g.fillText(title, W / 2, H / 2 + 6);
      g.fillStyle = color("--ink");
      if (phase === "idle") {
        g.font = "6px 'Press Start 2P', monospace";
        txt.howTo.forEach((line, i) => g.fillText(line, W / 2, H / 2 + 24 + i * 12));
      } else {
        g.fillText(txt.collected(score), W / 2, H / 2 + 24);
      }
    };
    draw();
    document.fonts?.ready.then(draw);
  }, [phase, score, txt]);

  // Flight loop
  useEffect(() => {
    if (phase !== "flying") return;
    const g = canvas.current?.getContext("2d");
    if (!g) return;
    let last = performance.now();
    let raf = 0;

    const keys = (e: KeyboardEvent) => {
      const w = world.current;
      if (e.key === "ArrowUp" || e.key === "w") { w.target = Math.max(8, w.target - 18); e.preventDefault(); }
      if (e.key === "ArrowDown" || e.key === "s") { w.target = Math.min(H - 8, w.target + 18); e.preventDefault(); }
    };
    addEventListener("keydown", keys);

    const frame = (t: number) => {
      const w = world.current;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      w.elapsed += dt;
      w.hurt = Math.max(0, w.hurt - dt);
      w.y += (w.target - w.y) * Math.min(1, dt * 8);

      w.spawn -= dt;
      if (w.spawn <= 0) {
        const speed = 70 + w.elapsed * 3;
        w.things.push({ kind: Math.random() < 0.45 ? "coin" : "bird", x: W + 8, y: 8 + Math.random() * (H - 24), vx: speed + Math.random() * 30, wobble: Math.random() * 6 });
        w.spawn = Math.max(0.3, 0.9 - w.elapsed * 0.012);
      }

      w.clouds.forEach(c => { c.x -= c.speed * dt; if (c.x + c.w < 0) { c.x = W + Math.random() * 40; c.y = 8 + Math.random() * (H - 40); } });
      drawSky(g, w.clouds);

      const px = 24, py = w.y - 8;
      w.things = w.things.filter(o => {
        o.x -= o.vx * dt;
        o.wobble += dt * 6;
        const oy = o.kind === "bird" ? o.y + Math.sin(o.wobble) * 4 : o.y;
        const hit = o.x < px + 22 && o.x + 14 > px + 2 && oy < py + 14 && oy + 8 > py + 2;
        if (hit && o.kind === "coin") { w.score++; setScore(w.score); return false; }
        if (hit && o.kind === "bird" && w.hurt === 0) {
          w.lives--; w.hurt = 1.2; setLives(w.lives);
          if (w.lives <= 0) setPhase("crashed");
          return false;
        }
        if (o.kind === "coin") sprite(g, COIN, o.x, oy, color("--coin"));
        else sprite(g, Math.floor(o.wobble) % 2 ? BIRD_UP : BIRD_DOWN, o.x, oy, color("--edge"));
        return o.x > -20;
      });

      const blink = w.hurt > 0 && Math.floor(w.hurt * 10) % 2 === 0;
      if (!blink) sprite(g, PLANE, px, py, color("--ink"));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const clock = window.setInterval(() => setLeft(l => l - 1), 1000);
    return () => { cancelAnimationFrame(raf); clearInterval(clock); removeEventListener("keydown", keys); };
  }, [phase]);

  // Out of time
  useEffect(() => {
    if (phase === "flying" && left <= 0) setPhase("landed");
  }, [left, phase]);

  // Record best score when a flight ends
  useEffect(() => {
    if (phase === "flying" || phase === "idle") return;
    const final = world.current.score;
    if (final > best) {
      setBest(final);
      try { localStorage.setItem(BEST_KEY, String(final)); } catch { /* storage unavailable */ }
    }
  }, [phase]);

  const start = () => {
    world.current = { y: H / 2, target: H / 2, things: [], clouds: newClouds(), spawn: 0.5, elapsed: 0, hurt: 0, score: 0, lives: LIVES };
    setScore(0); setLives(LIVES); setLeft(DURATION); setPhase("flying");
  };

  const steer = (e: PointerEvent<HTMLCanvasElement>) => {
    if (phase !== "flying") return;
    const r = e.currentTarget.getBoundingClientRect();
    world.current.target = Math.max(8, Math.min(H - 8, (e.clientY - r.top) * H / r.height));
  };

  const flying = phase === "flying";

  return (
    <section id="skyrun">
      <div className="wrap">
        <h2>{txt.title} <span className="tag">{txt.tag}</span></h2>
        <div className="game pixel-box">
          <div className="game-bar">
            <span>{txt.coins} <b>{score}</b></span>
            <span>{txt.lives} <b aria-label={`${lives}`}>{"♥".repeat(lives) || "–"}</b></span>
            <span>{txt.time} <b>{left}</b></span>
            <span>{txt.best} <b>{best}</b></span>
          </div>
          <canvas ref={canvas} id="arena" width={W} height={H} onPointerMove={steer} onPointerDown={steer}
            aria-label={txt.aria} />
          <div className="game-controls">
            <button className="btn" onClick={start}>{flying ? txt.restart : phase === "idle" ? txt.takeOff : txt.again}</button>
            {flying && <button className="btn stop" onClick={() => setPhase("aborted")}>{txt.stop}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
