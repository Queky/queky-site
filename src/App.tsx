import Hud from "./components/Hud";
import SkyBackground from "./components/SkyBackground";
import Hero from "./components/Hero";
import CareerMap from "./components/CareerMap";
import Inventory from "./components/Inventory";
import Extras from "./components/Extras";
import SkyRun from "./components/SkyRun";
import SavePoint from "./components/SavePoint";
import { useKonami } from "./hooks/useKonami";

export default function App() {
  const banner = useKonami();
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
        <div className="wrap">© {new Date().getFullYear()} Iñaki Sánchez · Bilbao · Built pixel by pixel · ↑↑↓↓←→←→BA</div>
      </footer>
      {banner && <div className="banner pixel-box">{banner}</div>}
    </>
  );
}
