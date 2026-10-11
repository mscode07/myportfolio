import { podcastResponse } from "./server/podcast.js";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
export default defineConfig({
  build: { outDir: 'dist/client' },
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
  plugins: [{ name: 'podcast-feed', configureServer(server) {
    server.middlewares.use('/api/podcast', async (req, res) => {
      const response = await podcastResponse(new Request('http://localhost/api/podcast', { method: req.method }));
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(await response.text());
    });
  } },{ ...mdx(), enforce: 'pre' }, react({ include: /\.(jsx|tsx|mdx)$/ }), tailwindcss()],
});
