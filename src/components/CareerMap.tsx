import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLang } from "../i18n";

export default function CareerMap() {
  const { t } = useLang();
  const levels = t.map.levels;
  const [selected, setSelected] = useState(levels.length - 1);
  const mapRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const level = levels[selected];

  useEffect(() => {
    const map = mapRef.current;
    const btn = buttons.current[selected];
    if (!map || !btn) return;
    map.scrollLeft = btn.offsetLeft - (map.clientWidth - btn.clientWidth) / 2;
  }, [selected]);

  const move = (to: number) => {
    const next = Math.max(0, Math.min(levels.length - 1, to));
    setSelected(next);
    buttons.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") move(selected + 1);
    if (e.key === "ArrowLeft") move(selected - 1);
  };

  return (
    <section id="map">
      <div className="wrap">
        <h2>{t.map.title} <span className="tag">{t.map.tag}</span></h2>
        <div className="map pixel-box" ref={mapRef}>
          <div className="track" role="tablist" aria-label={t.map.aria}>
            {levels.map((l, i) => (
              <button
                key={l.id}
                ref={el => { buttons.current[i] = el; }}
                className="level"
                role="tab"
                aria-selected={i === selected}
                aria-controls="quest"
                tabIndex={i === selected ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={onKey}
              >
                <span className="node">{l.node}</span>
                <span className="when">{l.when}</span>
                <span className="where">{l.where}</span>
              </button>
            ))}
          </div>
        </div>
        <article className="quest pixel-box" id="quest" role="tabpanel" aria-live="polite">
          <p className="label" style={{ margin: 0 }}>
            {t.map.level} {level.node} · {selected === levels.length - 1 ? t.map.current : t.map.cleared}
          </p>
          <h3>{level.title}</h3>
          <div className="meta">{level.meta}</div>
          <ul>
            {level.items.map(([lead, rest]) => (
              <li key={lead + rest}>{lead && <b>{lead}</b>}{rest}</li>
            ))}
          </ul>
        </article>
        <p className="hint">{t.map.hint}</p>
      </div>
    </section>
  );
}
