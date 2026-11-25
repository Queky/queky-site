import { useRef, useState, type KeyboardEvent } from "react";
import { useLang } from "../i18n";

export default function Inventory() {
  const { t } = useLang();
  const categories = t.inventory.categories;
  const [category, setCategory] = useState(0);
  const [picked, setPicked] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [categoryName, items] = categories[category];
  const [, name, description] = items[picked];

  const openCategory = (i: number) => { setCategory(i); setPicked(0); };
  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (category + (e.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length;
    openCategory(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="inventory">
      <div className="wrap">
        <h2>{t.inventory.title} <span className="tag">{t.inventory.tag}</span></h2>
        <div className="tabs" role="tablist" aria-label={t.inventory.aria}>
          {categories.map(([c], i) => (
            <button
              key={c}
              ref={el => { tabs.current[i] = el; }}
              className="tab"
              role="tab"
              aria-selected={i === category}
              aria-controls="inventory-panel"
              tabIndex={i === category ? 0 : -1}
              onClick={() => openCategory(i)}
              onKeyDown={onTabKey}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="inv" id="inventory-panel" role="tabpanel">
          <div className="slots pixel-box">
            {items.map(([icon, itemName], i) => (
              <button
                key={itemName}
                className="slot"
                aria-pressed={i === picked}
                onClick={() => setPicked(i)}
                onMouseEnter={() => setPicked(i)}
                onFocus={() => setPicked(i)}
              >
                <span><span className="ico">{icon}</span>{itemName}</span>
              </button>
            ))}
          </div>
          <aside className="item-card pixel-box" aria-live="polite">
            <span className="label">{categoryName}</span>
            <h3>{name}</h3>
            <p>{description}</p>
            <span className="rarity">{t.inventory.equipped}</span>
          </aside>
        </div>
      </div>
    </section>
  );
}
