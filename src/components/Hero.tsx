import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";

const PHOTO = "/photo.jpg";

function Avatar() {
  const { t } = useLang();
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
      <button onClick={() => setHd(!hd)} aria-label={t.hero.avatarAria}>
        <canvas ref={canvas} width={48} height={64} aria-hidden="true" hidden={hd} />
        <img src={PHOTO} alt={t.hero.photoAlt} hidden={!hd} />
      </button>
      <span className="label">{hd ? t.hero.to8bit : t.hero.toHd}</span>
    </div>
  );
}

function Dialog() {
  const { t } = useLang();
  const [page, setPage] = useState(0);
  const [title, text] = t.hero.intro[page];
  return (
    <div className="dialog pixel-box" aria-live="polite">
      <span className="speaker">{title}</span>
      <p>{text}</p>
      <button className="next" onClick={() => setPage((page + 1) % t.hero.intro.length)} aria-label={t.hero.nextAria}>
        {t.hero.next} <span>▼</span>
      </button>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="wrap">
        <Avatar />
        <div>
          <p className="label">{t.hero.player}</p>
          <h1>Iñaki <span>Sánchez</span></h1>
          <p className="class-line">{t.hero.classLine}</p>
          <div className="stats">
            {t.hero.stats.map(([label, value]) => (
              <div className="stat" key={label}><span className="label">{label}</span><b>{value}</b></div>
            ))}
          </div>
          <Dialog />
          <div className="hero-cta">
            <a className="btn" href="#map">{t.hero.start}</a>
            <a className="btn ghost" href="#contact">{t.hero.contact}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
