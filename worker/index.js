export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/youtube" && request.method === "GET") {
      const channelId = "UCbHEWkcF1mequ_LpYLY7fBQ";
      try {
        const feed = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
          headers: { "User-Agent": "mscodee.com portfolio feed" },
          cf: { cacheTtl: 900, cacheEverything: true },
        });
        if (!feed.ok) throw new Error(`YouTube feed returned ${feed.status}`);
        const xml = await feed.text();
        const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(match => match[1]).map(entry => {
          const text = tag => entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1] || "";
          const id = text("yt:videoId");
          const title = text("title").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
          const link = entry.match(/<link[^>]+href="([^"]+)"/)?.[1] || `https://www.youtube.com/watch?v=${id}`;
          return { id, title, link };
        }).filter(video => video.id && !video.link.includes("/shorts/")).slice(0, 8);
        return new Response(JSON.stringify({ videos: entries, fetchedAt: new Date().toISOString() }), {
          headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=900, s-maxage=900" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ videos: [], error: "YouTube feed temporarily unavailable" }), {
          status: 502, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
        });
      }
    }
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
