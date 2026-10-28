import { useRef, useState, type KeyboardEvent } from "react";
import { LEVELS } from "../data";

export default function CareerMap() {
  const [selected, setSelected] = useState(LEVELS.length - 1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const level = LEVELS[selected];

  const move = (to: number) => {
    const next = Math.max(0, Math.min(LEVELS.length - 1, to));
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
        <h2>Career map <span className="tag">select a level</span></h2>
        <div className="map pixel-box">
          <div className="track" role="tablist" aria-label="Career levels">
            {LEVELS.map((l, i) => (
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
            Level {level.node} · {selected === LEVELS.length - 1 ? "current level" : "cleared"}
          </p>
          <h3>{level.title}</h3>
          <div className="meta">{level.meta}</div>
          <ul>
            {level.items.map(([lead, rest]) => (
              <li key={lead + rest}>{lead && <b>{lead}</b>}{rest}</li>
            ))}
          </ul>
        </article>
        <p className="hint">Tip: use ← → to move between levels.</p>
      </div>
    </section>
  );
}
