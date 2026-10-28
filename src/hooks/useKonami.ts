import { useEffect, useState } from "react";

const CODE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

/** Toggles CRT mode on the Konami code and returns the banner text to show, if any. */
export function useKonami() {
  const [banner, setBanner] = useState("");

  useEffect(() => {
    let pos = 0;
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
      if (pos < CODE.length) return;
      pos = 0;
      const on = document.body.classList.toggle("crt");
      setBanner(on ? "CHEAT CODE ACCEPTED · CRT MODE ON" : "CRT MODE OFF");
      clearTimeout(timer);
      timer = window.setTimeout(() => setBanner(""), 2200);
    };
    addEventListener("keydown", onKey);
    return () => { removeEventListener("keydown", onKey); clearTimeout(timer); };
  }, []);

  return banner;
}
