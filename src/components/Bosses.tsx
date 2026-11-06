import { useState } from "react";
import { useLang } from "../i18n";

export default function Bosses() {
  const { t } = useLang();
  const b = t.bosses;
  const [replay, setReplay] = useState<Record<string, number>>({});

  return (
    <section id="bosses">
      <div className="wrap">
        <h2>{b.title} <span className="tag">{b.tag}</span></h2>
        {b.list.map((boss, i) => (
          <article className="boss pixel-box" key={boss.id}>
            <header className="boss-head">
              <div>
                <p className="label" style={{ margin: 0 }}>Boss {i + 1} · {boss.when}</p>
                <h3>{boss.name}</h3>
              </div>
              <button
                className="hp"
                onClick={() => setReplay(r => ({ ...r, [boss.id]: (r[boss.id] ?? 0) + 1 }))}
                aria-label={`${b.defeated}: ${boss.name}`}
              >
                <span className="hp-bar"><i key={replay[boss.id] ?? 0} className={replay[boss.id] ? "drain" : undefined} /></span>
                <span className="stamp">{b.defeated}</span>
              </button>
            </header>
            <div className="boss-body">
              <div><span className="label">{b.challenge}</span><p>{boss.challenge}</p></div>
              <div><span className="label">{b.strategy}</span><p>{boss.strategy}</p></div>
              <div><span className="label">{b.result}</span><p>{boss.result}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
