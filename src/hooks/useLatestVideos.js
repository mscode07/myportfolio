import { useEffect, useState } from "react";
import { regularVideos } from "../site.js";

// Local content renders immediately, including during server-side rendering.
// The deployed worker supplies the optional feed; Vite alone does not.
export function useLatestVideos() {
  const [videos, setVideos] = useState(regularVideos);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVideos() {
      try {
        const response = await fetch("/api/youtube", { signal: controller.signal });
        if (!response.ok) return;

        const data = await response.json();
        const latestVideos = (data.videos || [])
          .filter((video) => video.id && !video.link?.includes("/shorts/"))
          .map((video) => ({ ...video, kind: "video" }));

        if (!controller.signal.aborted && latestVideos.length) {
          setVideos(latestVideos);
        }
      } catch {
        // Keep curated content when offline, when unmounted, or without a worker.
      }
    }

    loadVideos();
    return () => controller.abort();
  }, []);

  return videos;
}
