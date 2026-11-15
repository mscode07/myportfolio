import { TextLink } from "./TextLink.jsx";
import { site } from "../site.js";

export function PodcastIntro() {
  return (
    <div className="podcast-intro">
      <img
        src="/images/underdog-show.png"
        alt="The Underdog Show with mscode07 — Real People. Bigger Stories."
        width="1000"
        height="1000"
        loading="lazy"
        decoding="async"
        className="podcast-artwork"
      />
      <div className="podcast-copy">
        <p className="eyebrow">The Underdog Show</p>
        <h2 id="podcast-title" className="podcast-heading">
          Conversations about building, creating, and figuring it out.
        </h2>
        <p className="podcast-caption">Real people. Bigger stories. Hosted by mscode07.</p>
        <div className="podcast-platforms" aria-label="Watch or listen to The Underdog Show">
          <TextLink href={site.podcast} external>Watch on YouTube</TextLink>
          <TextLink href={site.spotify} external>Listen on Spotify</TextLink>
          <TextLink href={site.applePodcasts} external>Apple Podcasts</TextLink>
        </div>
      </div>
    </div>
  );
}
