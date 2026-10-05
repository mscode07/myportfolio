# Abhishek’s portfolio

Responsive React + Vite + Tailwind CSS portfolio, based on the approved dark typographic design. All primary pages are pre-rendered to HTML at build time. Inter and Anton are self-hosted; no font CDN, YouTube player, analytics, or live feed calls are needed to render the homepage.

## Run

- `npm install`
- `npm run dev` — local development
- `npm run build` — optimized static HTML, assets, sitemap, and Sites-compatible worker
- `npm test` — static route/content checks, asset validation, size budgets, and worker tests
- `npm run preview` — inspect the production output

Run `npm run build` before `npm test`: the production tests read generated HTML
in `dist/client`, so an old build can give misleading results.

## Start here

Read `src/App.jsx` first to see how URLs select pages and share a header/footer.
Follow the page import for the area you want to change:

| Location | Responsibility |
| --- | --- |
| `src/main.jsx` | Browser entry; hydrates production HTML or renders development UI |
| `src/App.jsx` | Route selection and shared page layout |
| `src/pages/` | Home, blog index, article, about/resume, and missing-page UI |
| `src/components/` | Shared navigation, links, post list, and media carousel |
| `src/hooks/useLatestVideos.js` | Optional video feed request and local fallback |
| `src/hooks/useCarousel.js` | Scroll measurements, resize handling, and carousel navigation |
| `src/routes.js` | Build-time route list and search/social metadata |
| `src/site.js` | Personal links and curated media |
| `src/posts.js`, `src/content/` | Article loading/order and MDX content |
| `src/styles.css` | Fonts, theme tokens, shared styles, responsive/accessibility rules |
| `scripts/prerender.mjs` | Generates HTML for each route, sitemap, and robots.txt |
| `worker/index.js` | Deployed asset serving and YouTube feed endpoint |
| `api/youtube.js` | Vercel function adapter for the same YouTube feed handler |
| `vercel.json` | Vercel build command and static output directory |
| `tests/` | Generated-site checks and worker behavior tests |

Navigation uses normal links with full page loads; there is no client-side router.
The build renders React pages to HTML, then the browser hydrates that HTML to
enable interactions. Browser-only work belongs in effects or event handlers so
the same components can render during the build.

To add a page, create it in `src/pages/`, select it in `App.jsx`, and add its
path and metadata in `src/routes.js`. To change a shared element, edit its
component rather than each page. Keep abstractions small and names descriptive.

The Sites integration files listed in `AGENTS.md` must remain intact.

Deploy `dist/client` on a static host supporting directory index pages. The generated worker/hosting metadata also preserves compatibility with Sites.

For Vercel, deploy the repository root (not just the `dist/client` folder).
`vercel.json` selects the build output and `api/youtube.js` supplies the feed
function. Vercel does not execute `worker/index.js` automatically; the adapter
reuses its feed logic without changing the Sites packaging. After redeploying,
check `/api/youtube`: it should return JSON with a nonempty `videos` array.
A 404 means the function was not deployed; a 502 means YouTube could not be
reached. These changes must be deployed before they affect mscodee.com.

## Add real content

Edit `src/site.js` for social accounts, email, and channel links. Edit `src/projects.js` for the four product entries rendered by `ProjectList`. Their names and descriptions come from the supplied product sites and resume. Curated uploads and three podcast episodes were verified against the public channel Videos tab on 2026-10-05.

The homepage now fetches your latest regular uploads from the public YouTube uploads feed at runtime through `/api/youtube`. It refreshes with a 15-minute cache and falls back to the verified local video links if the feed is unavailable. No API key is needed.

Update the curated video entries to change the local fallback content:

```js
{ id: 'YOUR_YOUTUBE_VIDEO_ID', title: 'Your exact video title', kind: 'video' }
```

Real entries automatically get a YouTube thumbnail and open the exact watch URL in a new tab. Use `videos` for ordinary uploads and `episodes` for the podcast. Mark curated Shorts with `kind: 'short'` to exclude them. The feed also filters explicit `/shorts/` links, but cannot identify Shorts supplied as regular watch URLs. Sample entries display a preview dialog.

Vite development and preview serve the frontend only, without `/api/youtube`.
They therefore use local fallback videos. On the deployed worker, a successful
nonempty feed replaces that fallback; curated entries are not pinned ahead of
the feed. The worker currently has its own channel ID, which must match
`site.youtubeChannelId` if the channel changes.

## Blog

The Pasha interview is the first original article, featured ahead of the sample
posts. Optional `image`, `imageAlt`, `imageWidth`, and `imageHeight` metadata
display a cover inside the article only. Blog lists remain text-only. The Medium
profile link is configured in `src/site.js` and appears in writing sections. Store
optimized images in `public/images/`; keep the original artwork outside the build.

Add an `.mdx` file to `src/content/`. Export `meta` with `slug`, `title`, `excerpt`, `category`, `readingTime`, and `sample: false`. Write the article below that export. Rebuild to generate `/blog/your-slug/`. The three included articles are explicitly marked samples and excluded from the sitemap and search indexing.

`src/posts.js` sets the order; update its `featuredOrder` array to control the featured articles. Unlisted articles follow featured ones. Homepage shows the first three. Never place secrets in MDX or site configuration: they ship to the browser.

## Interaction and accessibility

The current portrait and official show poster live in `public/images/portfolio-portrait.jpg`
and `public/images/underdog-show.png`. Originals are left untouched.
`TypingHeading.jsx` uses a CSS-only, one-time character reveal; the full heading
is available to screen readers and remains visible without animation support.
Reduced motion skips typing, and the decorative caret stops after 1.5 seconds.

- Native horizontal scroll and CSS snap preserve touch momentum, with arrow and keyboard controls.
- A 300ms staggered hero entrance and subtle 160ms link feedback live in `src/styles/motion.css`. Motion is decorative, uses transform/opacity, and respects reduced-motion settings. No autoplay or scroll hijacking.
- Theme is saved locally; dark is the default design.
- Keyboard focus, skip link, labeled controls, reduced motion/transparency/contrast handling.
- Responsive at phone, tablet, and desktop widths; 44px main touch controls.
- Images use fixed aspect ratios, lazy loading, and small WebP files.

## Before publishing

Review the curated video links, replace sample articles, and review the resume text for current accuracy. Professional details were updated from the supplied Resume_EU.pdf; its phone number and original PDF are not copied into public assets. The sample media assets are generated concept art. This local build is not a statement that sample videos or articles are already published.
