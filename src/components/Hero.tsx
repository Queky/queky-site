import { useEffect, useRef, useState } from "react";
import { INTRO } from "../data";

const PHOTO = "/photo.jpg";

function Avatar() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [hd, setHd] = useState(false);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      const { width, height } = ctx.canvas;
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height);
      for (let i = 0; i < data.data.length; i += 4)
        for (let k = 0; k < 3; k++) data.data[i + k] = Math.round(data.data[i + k] / 51) * 51;
      ctx.putImageData(data, 0, 0);
    };
    img.src = PHOTO;
  }, []);

  return (
    <div className="avatar pixel-box">
      <button onClick={() => setHd(!hd)} aria-label="Switch between pixel and photo portrait">
        <canvas ref={canvas} width={48} height={64} aria-hidden="true" hidden={hd} />
        <img src={PHOTO} alt="Portrait of Iñaki Sánchez" hidden={!hd} />
      </button>
      <span className="label">{hd ? "Click to go back to 8-bit" : "Click to render in HD"}</span>
    </div>
  );
}

function Dialog() {
  const [page, setPage] = useState(0);
  const [title, text] = INTRO[page];
  return (
    <div className="dialog pixel-box" aria-live="polite">
      <span className="speaker">{title}</span>
      <p>{text}</p>
      <button className="next" onClick={() => setPage((page + 1) % INTRO.length)} aria-label="Next dialog">
        NEXT <span>▼</span>
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <Avatar />
        <div>
          <p className="label">Player 1</p>
          <h1>Iñaki <span>Sánchez</span></h1>
          <p className="class-line">Class: Software Engineer · Payments &amp; Growth</p>
          <div className="stats">
            <div className="stat"><span className="label">Experience</span><b>8+ YRS</b></div>
            <div className="stat"><span className="label">Main stack</span><b>JAVA·SPRING</b></div>
            <div className="stat"><span className="label">Base</span><b>BILBAO</b></div>
          </div>
          <Dialog />
          <div className="hero-cta">
            <a className="btn" href="#map">Press start</a>
            <a className="btn ghost" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
