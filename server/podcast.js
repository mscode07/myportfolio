export const playlistId = "PLXOmtQsp0Vgc";

function decodeXml(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, value) => String.fromCodePoint(
      value[0].toLowerCase() === "x" ? parseInt(value.slice(1), 16) : Number(value)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[entity]);
}

export function parsePlaylistFeed(xml) {
  if (!xml.includes(`<yt:playlistId>${playlistId}</yt:playlistId>`)) throw new Error("Unexpected playlist");
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    if (!/^[\w-]{11}$/.test(id || "") || !title) return [];
    return [{ id, title: decodeXml(title).trim(), kind: "video" }];
  });
}

export async function podcastResponse(request) {
  if (request.method !== "GET") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET" } });
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`, {
      signal: AbortSignal.timeout(8000),
      cf: { cacheTtl: 900, cacheEverything: true },
    });
    if (!response.ok) throw new Error("Playlist unavailable");
    const videos = parsePlaylistFeed(await response.text());
    return Response.json({ videos, playlistId }, { headers: { "cache-control": "public, max-age=900, s-maxage=900" } });
  } catch {
    return Response.json({ error: "Playlist temporarily unavailable" }, { status: 502, headers: { "cache-control": "no-store" } });
  }
}
