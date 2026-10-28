import { useRef, useState } from "react";
import { EMAIL, GITHUB } from "../data";

export default function SavePoint() {
  const [toast, setToast] = useState("");
  const emailRef = useRef<HTMLElement>(null);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL)
      .then(() => setToast("Email copied. Game saved!"))
      .catch(() => {
        if (emailRef.current) getSelection()?.selectAllChildren(emailRef.current);
        setToast("Press Ctrl/Cmd + C to copy.");
      });
  };

  return (
    <section id="contact">
      <div className="wrap">
        <h2>Save point</h2>
        <div className="save pixel-box">
          <p style={{ margin: 0, maxWidth: "60ch" }}>Looking for a backend or full-stack engineer who knows payments? I'd be happy to talk.</p>
          <div className="row">
            <span>Email</span><code ref={emailRef}>{EMAIL}</code>
            <button className="btn ghost" onClick={copy}>Copy</button>
            <a className="btn" href={`mailto:${EMAIL}`}>Write me</a>
          </div>
          <div className="row">
            <span>GitHub</span><a href={GITHUB} target="_blank" rel="noopener">github.com/queky</a>
            <span>CV</span><a href="/inaki-sanchez-cv.pdf">Download PDF</a>
          </div>
          <div className="toast" role="status">{toast}</div>
        </div>
      </div>
    </section>
  );
}
