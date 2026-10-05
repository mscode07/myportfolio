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
  youtube: "https://www.youtube.com/@mscode07",
  youtubeChannelId: "UCbHEWkcF1mequ_LpYLY7fBQ",
  podcast: null,
  resume: "/resume/",
  followers: "7,800",
};

// Use { id: 'YOUTUBE_VIDEO_ID', title: 'Actual video title', kind: 'video' } for
// regular uploads. Keep Shorts out of this curated list; entries with kind
// 'short' are filtered defensively before the carousel renders.
export const videos = [
  {
    key: "build",
    title: "Building a product from scratch",
    image: "/images/code-editor.webp",
    sample: true,
  },
  {
    key: "workflow",
    title: "My developer workflow",
    image: "/images/developer-desk.webp",
    sample: true,
  },
  {
    key: "create",
    title: "Creating alongside coding",
    image: "/images/creator-desk.webp",
    sample: true,
  },
  {
    key: "shipping",
    title: "From idea to something real",
    image: "/images/developer-desk.webp",
    sample: true,
  },
];
export const regularVideos = videos.filter((video) => video.kind !== "short");
export const episodes = [
  {
    key: "builders",
    title: "Conversations with builders",
    image: "/images/underdog-cover.webp",
    sample: true,
  },
  {
    key: "journey",
    title: "Stories behind the journey",
    image: "/images/underdog-cover-light.webp",
    sample: true,
  },
  {
    key: "lessons",
    title: "Lessons from starting small",
    image: "/images/underdog-cover.webp",
    sample: true,
  },
];
