import assert from "node:assert/strict";
import test from "node:test";
import endpoint from "../api/youtube.js";

test("Vercel serves the YouTube feed as cacheable JSON", async (t) => {
  t.mock.method(globalThis, "fetch", async (url) => {
    assert.match(url, /youtube\.com\/feeds\/videos\.xml\?channel_id=/);
    return new Response(`<feed><entry><yt:videoId>abcdefghijk</yt:videoId>
      <title>My published video</title>
      <link href="https://www.youtube.com/watch?v=abcdefghijk"/>
      </entry></feed>`);
  });
  const response = await endpoint.fetch(new Request("https://www.mscodee.com/api/youtube"));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  assert.match(response.headers.get("cache-control"), /s-maxage=900/);
  assert.deepEqual((await response.json()).videos, [{
    id: "abcdefghijk", title: "My published video",
    link: "https://www.youtube.com/watch?v=abcdefghijk",
  }]);
});

test("upstream failures return uncached JSON instead of an HTML page", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  const response = await endpoint.fetch(new Request("https://www.mscodee.com/api/youtube"));
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual((await response.json()).videos, []);
});

test("unsupported methods never enter the worker asset handler", async () => {
  const response = await endpoint.fetch(new Request("https://www.mscodee.com/api/youtube", { method: "POST" }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET");
});
