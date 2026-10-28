const LINKS = [
  ["#map", "Career"],
  ["#inventory", "Skills"],
  ["#extras", "Extras"],
  ["#skyrun", "Sky run"],
  ["#contact", "Contact"],
];

export default function Hud() {
  return (
    <header className="hud">
      <div className="wrap">
        <a className="logo" href="#top">QUEKY.ES</a>
        <nav aria-label="Sections">
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </div>
    </header>
  );
}
