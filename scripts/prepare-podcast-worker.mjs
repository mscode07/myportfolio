// Extend the packaged worker without changing the shared Sites hosting inputs.
import { copyFileSync, writeFileSync } from "node:fs";
copyFileSync("dist/server/index.js", "dist/server/base-worker.js");
copyFileSync("server/podcast.js", "dist/server/podcast.js");
writeFileSync("dist/server/index.js", `import base from './base-worker.js';
import { podcastResponse } from './podcast.js';
export default { fetch(request, env) {
  if (new URL(request.url).pathname === '/api/podcast') return podcastResponse(request);
  return base.fetch(request, env);
}};
`);
