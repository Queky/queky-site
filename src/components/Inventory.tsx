import { useState } from "react";
import { INVENTORY } from "../data";

const CATEGORIES = Object.keys(INVENTORY);

export default function Inventory() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [picked, setPicked] = useState(0);
  const items = INVENTORY[category];
  const [, name, description] = items[picked];

  const openCategory = (c: string) => { setCategory(c); setPicked(0); };

  return (
    <section id="inventory">
      <div className="wrap">
        <h2>Inventory <span className="tag">inspect an item</span></h2>
        <div className="tabs" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map(c => (
            <button key={c} className="tab" role="tab" aria-selected={c === category} onClick={() => openCategory(c)}>{c}</button>
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
            <span className="label">{category}</span>
            <h3>{name}</h3>
            <p>{description}</p>
            <span className="rarity">★ Equipped</span>
          </aside>
        </div>
      </div>
    </section>
  );
}
