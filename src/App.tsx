import Hud from "./components/Hud";
import SkyBackground from "./components/SkyBackground";
import Hero from "./components/Hero";
import CareerMap from "./components/CareerMap";
import Inventory from "./components/Inventory";
import Extras from "./components/Extras";
import SkyRun from "./components/SkyRun";
import SavePoint from "./components/SavePoint";
import { useKonami } from "./hooks/useKonami";
import { useLang } from "./i18n";

export default function App() {
  const { t } = useLang();
  const crt = useKonami();
  return (
    <>
      <SkyBackground />
      <Hud />
      <main id="top">
        <Hero />
        <CareerMap />
        <Inventory />
        <Extras />
        <SkyRun />
        <SavePoint />
      </main>
      <footer>
        <div className="wrap">© {new Date().getFullYear()} Iñaki Sánchez · {t.footer} · ↑↑↓↓←→←→BA</div>
      </footer>
      {crt !== null && <div className="banner pixel-box">{crt ? t.konami.on : t.konami.off}</div>}
    </>
  );
}
