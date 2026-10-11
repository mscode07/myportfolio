import assert from "node:assert/strict";
import test from "node:test";
import endpoint from "../api/podcast.js";
import { parsePlaylistFeed, playlistId } from "../server/podcast.js";

const feed = entries => `<feed><yt:playlistId>${playlistId}</yt:playlistId>${entries}</feed>`;
const entry = (id, title) => `<entry><yt:videoId>${id}</yt:videoId><title>${title}</title></entry>`;

test("playlist parser preserves feed order and decodes titles", () => {
  const result = parsePlaylistFeed(feed(entry("uDcYqI4c0EE", "Build &amp; learn") + entry("bhh6kkVWMEk", "<![CDATA[Q & A]]>")));
  assert.deepEqual(result.map(v => [v.id, v.title]), [["uDcYqI4c0EE", "Build & learn"], ["bhh6kkVWMEk", "Q & A"]]);
  assert.throws(() => parsePlaylistFeed("<feed><yt:playlistId>another</yt:playlistId></feed>"));
  assert.deepEqual(parsePlaylistFeed(feed(entry("invalid", "No"))), []);
});
test("endpoint fetches only configured playlist and accepts a genuinely empty feed", async t => {
  t.mock.method(globalThis, "fetch", async url => {
    assert.equal(url, `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
    return new Response(feed(""));
  });
  const response = await endpoint.fetch(new Request("https://example.com/api/podcast?playlist_id=other"));
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).videos, []);
  assert.match(response.headers.get("cache-control"), /s-maxage=900/);
});
test("upstream failure stays distinguishable from an empty playlist", async t => {
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  const response = await endpoint.fetch(new Request("https://example.com/api/podcast"));
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json()).videos, undefined);
});
test("playlist endpoint rejects writes", async () => {
  assert.equal((await endpoint.fetch(new Request("https://example.com/api/podcast", { method: "POST" }))).status, 405);
});
