import { useEffect, useRef, useState, type PointerEvent } from "react";

const DURATION = 30;
const BEST_KEY = "queky-best";
const BUG = ["..1..1..", "...11...", ".111111.", "1.1111.1", ".111111.", "1.1111.1", ".111111.", "1..11..1"];
const SPLAT = ["1..1...1", ".1.1.1..", "..111...", "11111.11", "..111...", ".1.1.1..", "1...1..1", "........"];

interface Bug { x: number; y: number; vx: number; vy: number; phase: number }
interface Splat { x: number; y: number; ttl: number }

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

export default function BugHunt() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [best, setBest] = useState(readBest);
  const [running, setRunning] = useState(false);
  const [played, setPlayed] = useState(false);
  const world = useRef({ bugs: [] as Bug[], splats: [] as Splat[], spawn: 0, elapsed: 0, score: 0 });

  // Idle / game-over screen
  useEffect(() => {
    if (running) return;
    const g = canvas.current?.getContext("2d");
    if (!g) return;
    const draw = () => {
      const { width, height } = g.canvas;
      g.fillStyle = color("--edge"); g.fillRect(0, 0, width, height);
      g.font = "8px 'Press Start 2P', monospace"; g.textAlign = "center";
      g.fillStyle = color("--coin");
      g.fillText(played ? `GAME OVER · ${score} BUGS SQUASHED` : "PRESS START GAME", width / 2, height / 2 - 6);
      g.fillStyle = color("--dim");
      g.fillText(played ? "SHIP IT!" : "CLICK THE BUGS BEFORE THEY ESCAPE", width / 2, height / 2 + 14);
      sprite(g, BUG, width / 2 - 8, 20, color("--berry"));
    };
    draw();
    document.fonts?.ready.then(draw);
  }, [running, played, score]);

  // Game loop
  useEffect(() => {
    if (!running) return;
    const g = canvas.current?.getContext("2d");
    if (!g) return;
    const w = world.current;
    let last = performance.now();
    let raf = 0;

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      w.elapsed += dt;
      w.spawn -= dt;
      const { width, height } = g.canvas;
      if (w.spawn <= 0) {
        w.bugs.push({ x: -16, y: 10 + Math.random() * (height - 30), vx: 30 + Math.random() * 40 + w.elapsed * 2, vy: (Math.random() - 0.5) * 30, phase: 0 });
        w.spawn = Math.max(0.25, 0.8 - w.elapsed * 0.015);
      }
      g.fillStyle = color("--edge"); g.fillRect(0, 0, width, height);
      g.fillStyle = color("--panel");
      for (let x = 0; x < width; x += 16) for (let y = 0; y < height; y += 16) g.fillRect(x, y, 1, 1);
      w.splats = w.splats.filter(s => (s.ttl -= dt) > 0);
      w.splats.forEach(s => sprite(g, SPLAT, s.x, s.y, color("--coin")));
      w.bugs.forEach(b => {
        b.x += b.vx * dt; b.y += b.vy * dt; b.phase += dt * 10;
        if (b.y < 4 || b.y > height - 20) b.vy *= -1;
        sprite(g, BUG, b.x, b.y + (Math.floor(b.phase) % 2), color("--berry"));
      });
      w.bugs = w.bugs.filter(b => b.x < width + 4);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const clock = window.setInterval(() => setLeft(l => l - 1), 1000);
    return () => { cancelAnimationFrame(raf); clearInterval(clock); };
  }, [running]);

  // End of game
  useEffect(() => {
    if (!running || left > 0) return;
    setRunning(false);
    setPlayed(true);
    const final = world.current.score;
    if (final > best) {
      setBest(final);
      try { localStorage.setItem(BEST_KEY, String(final)); } catch { /* storage unavailable */ }
    }
  }, [left, running, best]);

  const start = () => {
    world.current = { bugs: [], splats: [], spawn: 0, elapsed: 0, score: 0 };
    setScore(0); setLeft(DURATION); setRunning(false);
    requestAnimationFrame(() => setRunning(true));
  };

  const hit = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!running) return;
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) * c.width / r.width, y = (e.clientY - r.top) * c.height / r.height;
    const w = world.current;
    const i = w.bugs.findIndex(b => x > b.x - 4 && x < b.x + 20 && y > b.y - 4 && y < b.y + 20);
    if (i < 0) return;
    const [b] = w.bugs.splice(i, 1);
    w.splats.push({ x: b.x, y: b.y, ttl: 0.6 });
    w.score++;
    setScore(w.score);
  };

  return (
    <section id="bughunt">
      <div className="wrap">
        <h2>Bug hunt <span className="tag">30 seconds · squash as many as you can</span></h2>
        <div className="game pixel-box">
          <div className="game-bar">
            <span>Score <b>{score}</b></span>
            <span>Time <b>{left}</b></span>
            <span>Best <b>{best}</b></span>
          </div>
          <canvas ref={canvas} id="arena" width={320} height={140} onPointerDown={hit}
            aria-label="Bug hunt mini-game. Click or tap bugs to squash them." />
          <div>
            <button className="btn" onClick={start}>{running ? "Restart" : played ? "Play again" : "Start game"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
