import { GITHUB } from "../data";

const LANGUAGES: [string, number, string][] = [
  ["Spanish", 5, "Native"],
  ["Basque", 5, "Native"],
  ["English", 4, "C1"],
];

const REPOS: [string, string, string][] = [
  ["android-package-uninstaller", `${GITHUB}/android-package-uninstaller`, "Python tool to remove Android packages over ADB."],
  ["PythonAI", `${GITHUB}/PythonAI`, "Computer-vision experiments with OpenCV."],
  ["More on GitHub", GITHUB, "Telegram bots, Advent of Code, Android tinkering."],
];

export default function Extras() {
  return (
    <section id="extras">
      <div className="wrap">
        <h2>Extras</h2>
        <div className="two">
          <div className="card pixel-box">
            <h3>Languages</h3>
            {LANGUAGES.map(([lang, level, label]) => (
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
            <h3>Education</h3>
            <p style={{ margin: 0 }}>
              BSc in Computer Management &amp; Information Systems Engineering<br />
              <span className="label" style={{ fontSize: 18 }}>UPV/EHU · 2012 – 2018</span>
            </p>
            <p style={{ margin: 0, color: "var(--dim)", fontSize: 14 }}>
              Developing on AWS and AWS Technical Essentials (2019) · Smart Cities Week, UCLL &amp; KU Leuven (2018) · CERN Spring Campus (2014)
            </p>
          </div>
          <div className="card pixel-box">
            <h3>Side quests</h3>
            {REPOS.map(([name, url, text]) => (
              <div className="repo" key={name}>
                <a href={url} target="_blank" rel="noopener">{name}</a>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
