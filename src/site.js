// All personal links and featured content live here. Add your actual video IDs
// and titles below; the carousel never loads a YouTube player or API client.
export const site = {
  name: "mscode07",
  handle: "mscode07",
  origin: "https://mscodee.com",
  email: "msabhithakur7777@gmail.com",
  x: "https://x.com/mscode07",
  github: "https://github.com/mscode07",
  linkedin: "www.linkedin.com/in/mscode07",
  medium: "https://medium.com/@mscode07",
  youtube: "https://www.youtube.com/@mscode07",
  youtubeChannelId: "UCbHEWkcF1mequ_LpYLY7fBQ",
  podcast: null,
  resume: "/resume/",
  followers: "7,800",
};

// Use { id: 'YOUTUBE_VIDEO_ID', title: 'Actual video title', kind: 'video' } for
// regular uploads. Keep Shorts out of this curated list; entries with kind
// 'short' are filtered defensively before the carousel renders.
// Verified against the channel's Videos tab on 2026-10-05. These links
// remain usable when the optional RSS feed is unavailable.
export const videos = [
  {
    "id": "bhh6kkVWMEk",
    "title": "Freelancing at 12, Building Apps at 18: Why He Builds in Private",
    "kind": "video"
  },
  {
    "id": "3bxRU51kT-k",
    "title": "A man who said not to Forbes for building products.",
    "kind": "video"
  },
  {
    "id": "h9yfHjoHSBs",
    "title": "My Indie Hacking Journey and First Customer Win",
    "kind": "video"
  },
  {
    "id": "3VHglTcP8EA",
    "title": "Indie hacker with a 9-to-5 job.Why he rejected an offer from Forbes",
    "kind": "video"
  }
];
export const regularVideos = videos.filter((video) => video.kind !== "short");
export const episodes = [
  {
    "id": "bhh6kkVWMEk",
    "title": "Freelancing at 12, Building Apps at 18: Why He Builds in Private",
    "kind": "video"
  },
  {
    "id": "41tvkcwg31s",
    "title": "🎙️ EP. 2 - The Underdog ShowStory of a Man who never said 'No' to Risks.",
    "kind": "video"
  },
  {
    "id": "B0zv4T_Hg-o",
    "title": "🎙️ EP. 1 — The Underdog ShowAt 20, he built a game that made a $1M exit.",
    "kind": "video"
  }
];
