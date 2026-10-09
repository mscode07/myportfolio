# Prototype Instructions

## Maintainability

Use the same current portfolio portrait for the browser-tab favicon.

The Underdog Show artwork must feel integrated: pair it with the introduction on one dark branded surface, side by side on larger screens and stacked compactly on phones. Avoid a standalone large poster with empty space beside it.

Use the latest supplied imp_portfolio.png portrait as the profile image, displayed clearly in a larger square frame without cropping. Use the official black/yellow Underdog Show poster for the podcast. The hero greeting should type once, keep its layout stable, expose the complete text to assistive technology, and render immediately with reduced motion.

Use subtle, purposeful animation while preserving the typographic portfolio design. Respect reduced motion and keep animation logic easy to maintain. Feature the user's four supplied products; use their resume for professional background without inventing roles, dates, or claims.

Keep the code approachable for new contributors. Put route-level UI in `src/pages/`, reusable UI in `src/components/`, and browser effects/data loading in `src/hooks/`. Keep `App.jsx` focused on route selection and the shared layout. Prefer descriptive names and straightforward functions over nested conditionals or unnecessary abstractions. Document non-obvious fallback behavior and update README.md when architecture or workflows change.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Keep blog lists text-only, including the homepage. Show supplied blog thumbnails only inside the article after it is opened. Include a “Read more on Medium” link to https://medium.com/@mscode07 in writing sections.

The selected GitHub activity design places a compact full-year contribution graph immediately below the hero and above Products & small experiments. Match the selected mock's desktop hero with a larger uncropped square portrait beside the introduction; stack on phones. Use real automatically refreshed contribution counts, green intensity cells, a View GitHub link, accessible day details, and a subtle one-time reveal that respects reduced motion. Never present the mock's 480 contributions as live data.
