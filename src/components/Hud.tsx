import { useAudio } from "../audio";
import { LANGS } from "../content";
import { useLang } from "../i18n";

export default function Hud() {
  const { lang, setLang, t } = useLang();
  const { on: audioOn, toggle: toggleAudio } = useAudio();
  const links = [
    ["#map", t.nav.career],
    ["#bosses", t.nav.bosses],
    ["#inventory", t.nav.skills],
    ["#extras", t.nav.extras],
    ["#skyrun", t.nav.game],
    ["#contact", t.nav.contact],
  ];
  return (
    <header className="hud">
      <div className="wrap">
        <a className="logo" href="#top">QUEKY.ES</a>
        <nav aria-label={t.nav.sections}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="hud-actions">
          <button
            className="audio-toggle"
            aria-pressed={audioOn}
            aria-label={audioOn ? t.nav.musicOff : t.nav.musicOn}
            onClick={toggleAudio}
          >
            <svg className="note" viewBox="0 0 8 8" width="12" height="12" aria-hidden="true" shapeRendering="crispEdges">
              <rect x="2" y="1" width="6" height="1" fill="currentColor" />
              <rect x="2" y="2" width="1" height="4" fill="currentColor" />
              <rect x="7" y="2" width="1" height="4" fill="currentColor" />
              <rect x="0" y="5" width="3" height="2" fill="currentColor" />
              <rect x="5" y="5" width="3" height="2" fill="currentColor" />
            </svg>
            <span>{audioOn ? t.nav.bgmOn : t.nav.bgmOff}</span>
          </button>
          <div className="lang-switch" role="group" aria-label={t.nav.languages}>
            {LANGS.map(l => (
              <button key={l} lang={l} aria-pressed={l === lang} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
