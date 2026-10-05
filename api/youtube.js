import worker from "../worker/index.js";

// Vercel discovers functions in api/; it does not execute the Sites worker.
// Reuse its feed handler so both hosts return the same videos and cache headers.
export default {
  fetch(request) {
    if (request.method !== "GET") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET" },
      });
    }

    const url = new URL(request.url);
    url.pathname = "/api/youtube";
    return worker.fetch(new Request(url, request));
  },
};
