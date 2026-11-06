import { useRef, useState } from "react";
import { EMAIL, GITHUB } from "../content";
import { useLang } from "../i18n";

export default function SavePoint() {
  const { t } = useLang();
  const c = t.contact;
  const [toast, setToast] = useState<"copied" | "fallback" | "">("");
  const emailRef = useRef<HTMLElement>(null);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL)
      .then(() => setToast("copied"))
      .catch(() => {
        if (emailRef.current) getSelection()?.selectAllChildren(emailRef.current);
        setToast("fallback");
      });
  };

  return (
    <section id="contact">
      <div className="wrap">
        <h2>{c.title}</h2>
        <div className="save pixel-box">
          <p style={{ margin: 0, maxWidth: "60ch" }}>{c.pitch}</p>
          <div className="row">
            <span>{c.email}</span><code ref={emailRef}>{EMAIL}</code>
            <button className="btn ghost" onClick={copy}>{c.copy}</button>
            <a className="btn" href={`mailto:${EMAIL}`}>{c.write}</a>
          </div>
          <div className="row">
            <span>GitHub</span><a href={GITHUB} target="_blank" rel="noopener">github.com/queky</a>
          </div>
          <div className="toast" role="status">{toast && c[toast]}</div>
        </div>
      </div>
    </section>
  );
}
