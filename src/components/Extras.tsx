import { useLang } from "../i18n";

export default function Extras() {
  const { t } = useLang();
  const x = t.extras;
  return (
    <section id="extras">
      <div className="wrap">
        <h2>{x.title}</h2>
        <div className="two">
          <div className="card pixel-box">
            <h3>{x.languagesTitle}</h3>
            {x.languages.map(([lang, level, label]) => (
              <div className="bar" key={lang}>
                <span>{lang}</span>
                <span className="cells">
                  {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < level ? "on" : undefined} />)}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="card pixel-box">
            <h3>{x.educationTitle}</h3>
            <p style={{ margin: 0 }}>
              {x.degree}<br />
              <span className="label" style={{ fontSize: 18 }}>{x.degreeMeta}</span>
            </p>
          </div>
          <div className="card pixel-box">
            <h3>{x.sideTitle}</h3>
            {x.repos.map(([name, url, text]) => (
              <div className="repo" key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
