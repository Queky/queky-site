import { useEffect, useState } from "react";

const CODE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

/** Toggles CRT mode on the Konami code. Returns the new mode while its banner should show, otherwise null. */
export function useKonami() {
  const [banner, setBanner] = useState<boolean | null>(null);

  useEffect(() => {
    let pos = 0;
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
      if (pos < CODE.length) return;
      pos = 0;
      setBanner(document.body.classList.toggle("crt"));
      clearTimeout(timer);
      timer = window.setTimeout(() => setBanner(null), 2200);
    };
    addEventListener("keydown", onKey);
    return () => { removeEventListener("keydown", onKey); clearTimeout(timer); };
  }, []);

  return banner;
}
