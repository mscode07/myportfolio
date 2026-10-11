import { useEffect, useState } from "react";
import { episodes } from "../site.js";

export function usePodcastEpisodes() {
  const [videos, setVideos] = useState(episodes);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch("/api/podcast", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        if (!controller.signal.aborted && Array.isArray(data.videos)) {
          // An empty public playlist is valid; never substitute unrelated episodes.
          setVideos(data.videos.filter(video => /^[\w-]{11}$/.test(video.id) && typeof video.title === "string"));
        }
      } catch {
        // Network failures retain the last verified playlist snapshot.
      }
    }
    refresh();
    const timer = setInterval(refresh, 15 * 60 * 1000);
    return () => { controller.abort(); clearInterval(timer); };
  }, []);
  return videos;
}
