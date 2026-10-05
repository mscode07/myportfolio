import { EnvelopeSimple, LinkedinLogo } from "@phosphor-icons/react";
import { site } from "../site.js";
import { Socials } from "./Socials.jsx";

export function Footer() {
  return (
    <footer className="shell">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-line py-9 text-sm">
        <p className="text-muted">Let’s connect.</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <a className="social-link" href={`mailto:${site.email}`}>
            <EnvelopeSimple size={20} />
            Email me
          </a>
          <Socials compact />
          <a
            href={site.linkedin}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
          >
            <LinkedinLogo size={21} />
          </a>
        </div>
        <a href="/" className="text-xs text-muted">
          mscodee.com
        </a>
      </div>
    </footer>
  );
}
