import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { site } from "../src/site.js";

const outputDirectory = "dist/client";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderDocument(template, markup, route, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = escapeHtml(`${site.origin}${route}`);
  const hideFromSearch = metadata.noindex || route === "/404/";
  const headTags = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${canonical}" />`,
    hideFromSearch ? '<meta name="robots" content="noindex,follow" />' : "",
  ].join("");

  return template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace("</head>", `${headTags}</head>`);
}

// Vite loads JSX and MDX for Node without opening a development server port.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});

try {
  const { App } = await server.ssrLoadModule("/src/App.jsx");
  const { routes, routeMeta } = await server.ssrLoadModule("/src/routes.js");
  const template = await fs.readFile(path.join(outputDirectory, "index.html"), "utf8");

  for (const route of [...routes, "/404/"]) {
    const markup = renderToString(React.createElement(App, { path: route }));
    const html = renderDocument(template, markup, route, routeMeta(route));
    const destination = route === "/404/"
      ? path.join(outputDirectory, "404.html")
      : path.join(outputDirectory, route, "index.html");

    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html);
  }

  const sitemapEntries = routes
    .filter((route) => !routeMeta(route).noindex)
    .map((route) => `<url><loc>${escapeHtml(site.origin + route)}</loc></url>`)
    .join("");
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>'
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`;

  await fs.writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);
  await fs.writeFile(
    path.join(outputDirectory, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`,
  );
  console.log(`Pre-rendered ${routes.length} pages and 404; generated sitemap.`);
} finally {
  await server.close();
}
