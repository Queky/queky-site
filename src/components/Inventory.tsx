import { useState } from "react";
import { useLang } from "../i18n";

export default function Inventory() {
  const { t } = useLang();
  const categories = t.inventory.categories;
  const [category, setCategory] = useState(0);
  const [picked, setPicked] = useState(0);
  const [categoryName, items] = categories[category];
  const [, name, description] = items[picked];

  const openCategory = (i: number) => { setCategory(i); setPicked(0); };

  return (
    <section id="inventory">
      <div className="wrap">
        <h2>{t.inventory.title} <span className="tag">{t.inventory.tag}</span></h2>
        <div className="tabs" role="tablist" aria-label={t.inventory.aria}>
          {categories.map(([c], i) => (
            <button key={c} className="tab" role="tab" aria-selected={i === category} onClick={() => openCategory(i)}>{c}</button>
          ))}
        </div>
        <div className="inv">
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
