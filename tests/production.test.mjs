import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const root = new URL('../dist/client/', import.meta.url);
test('homepage is useful before JavaScript and has metadata', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  for (const text of ['id="intro-title"', 'bot4U', 'Sponsor My Screens', 'Roast My SaaS', 'CodeINN', 'The Underdog Show', 'Latest from the blog', 'rel="canonical"']) assert.ok(html.includes(text),text);
  assert.ok(!html.includes('<div id="root"></div>'));
});
test('blog URLs have distinct rendered articles; sample posts are not indexed', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', root),'utf8');
  for (const slug of ['building-in-public','idea-to-product','full-stack-journey']) {
    const html = await readFile(new URL(`blog/${slug}/index.html`, root),'utf8');
    assert.ok(html.includes('Sample article'));
    assert.ok(html.includes('content="noindex,follow"'));
    assert.ok(html.includes(`https://mscodee.com/blog/${slug}/`));
    assert.ok(!sitemap.includes(`/blog/${slug}/`));
  }
});
test('all local homepage links and assets resolve in the static output', async () => {
  const html = await readFile(new URL('index.html',root),'utf8');
  const paths = [...html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)].map(m=>m[1]);
  for (const p of paths) { const file = p.endsWith('/') ? `${p}index.html` : p; await access(new URL(file.slice(1),root)); }
});
test('compressed first-party JS and CSS stay within lightweight budgets', async () => {
  const assets = await readdir(new URL('assets/',root));
  let js=0,css=0;
  for (const file of assets) { const size=gzipSync(await readFile(new URL(`assets/${file}`,root))).length; if(file.endsWith('.js'))js+=size; if(file.endsWith('.css'))css+=size; }
  assert.ok(js<110000,`${js} bytes JS`); assert.ok(css<15000,`${css} bytes CSS`);
});
test('unknown routes have a dedicated recovery page', async () => {
  const html = await readFile(new URL('404.html',root),'utf8');
  assert.ok(html.includes('This page wandered off.')); assert.ok(html.includes('Back home'));
});
