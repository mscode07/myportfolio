import { GithubLogo, YoutubeLogo, XLogo } from "@phosphor-icons/react";
import { site } from "../site.js";

export function Socials({ compact = false }) {
  return (
    <div
      className={`flex flex-wrap items-center ${compact ? "gap-5" : "gap-x-7 gap-y-3 sm:gap-x-9"}`}
    >
      <a
        className="social-link"
        href={site.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`X, ${site.followers} followers (opens in a new tab)`}
      >
        <XLogo size={22} />
        <span className={compact ? "sr-only" : "text-sm"}></span>
      </a>
      {site.youtube && (
        <a
          className="social-link"
          href={site.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube channel (opens in a new tab)"
        >
          <YoutubeLogo size={24} weight="fill" />
          {!compact && <span className="text-sm">YouTube</span>}
        </a>
      )}
      <a
        className="social-link"
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub (opens in a new tab)"
      >
        <GithubLogo size={23} weight="fill" />
        {!compact && <span className="text-sm">GitHub</span>}
      </a>
    </div>
  );
}
