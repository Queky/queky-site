import { LANGS } from "../content";
import { useLang } from "../i18n";

export default function Hud() {
  const { lang, setLang, t } = useLang();
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
        <nav aria-label="Sections">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="lang-switch" role="group" aria-label={t.nav.languages}>
          {LANGS.map(l => (
            <button key={l} lang={l} aria-pressed={l === lang} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
