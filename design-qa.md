# GitHub activity design QA

final result: passed

Source: /Users/mscode07/.codex/generated_images/01a11ff7-6336-7071-985d-f2cecf553b79/exec-60feed1a-6a7c-4828-91f0-3dd8ca3204bc.png

Implementation: qa/github-desktop.png; responsive evidence: qa/github-mobile.png.
Desktop comparison: 1435 × 1100 CSS viewport, screenshot 1435 × 1100; source 1435 × 1100. Both images displayed together in the comparison tool output at native dimensions. Dark homepage, loaded real data, completed entrance animation. Mobile: 390 × 844. Browser output also verified the light theme.

## Findings and iterations

- Initial calendar inspection found uneven column widths caused by month-label minimum widths. Set each week to a minmax(0,1fr) column; the revised capture shows an aligned seven-row calendar.
- First combined comparison found undersized hero and product display headings. Increased desktop type scale. The second combined comparison shows the intended hierarchy and side-by-side composition with the original uncropped portrait.
- No remaining P0/P1/P2 findings. The original desktop navigation remains available instead of replacing it with the mock's hamburger; this preserves existing navigation outside the requested feature.

## Fidelity surfaces

- Typography: existing Anton and Inter preserved; headline enlarged, mono eyebrows retained. Small labels remain legible. Mobile heading fits without horizontal page overflow.
- Layout: larger square portrait beside introduction, activity immediately beneath it, products below. Dividers, spacing and page surface follow the selected mock. Mobile stacks the portrait and introduction and scrolls the calendar inside its region.
- Colors: dark page/off-white copy, yellow link underline, five green activity levels; light theme uses a light zero-activity cell.
- Assets: existing portrait reused without cropping; existing icon library retained. Calendar is interactive data UI, not a raster asset.
- Copy: live count replaces sample data; rolling-year label corrects the mock's ambiguous “this year”. Sync date replaces preview label. Real graph dates use Sunday-first weeks and the current partial week.
- Full-view comparison clearly exposes the hero, labels and complete calendar; no additional focused crop needed.

## Verification

Live browser feed returned 480 contributions. ArrowLeft from October 9 focused October 2 with its accessible day count. Mobile document width equals viewport width (390); only calendar overflows horizontally. Theme toggle works. Browser error/warning log was empty. Reduced-motion animation override checked in source; OS preference was not changed. Loading/unavailable messages and cache behavior are implemented; prolonged upstream outages were not simulated in browser. Date validation and UTC alignment have unit coverage.

Build and all tests passed, including existing hosting/package checks. Hosting worker and packaging inputs remain intact.
