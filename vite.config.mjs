import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
export default defineConfig({
  build: { outDir: 'dist/client' },
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
  plugins: [{ ...mdx(), enforce: 'pre' }, react({ include: /\.(jsx|tsx|mdx)$/ }), tailwindcss()],
});
