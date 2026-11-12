# Portfolio launch film

22-second 1920×1080 Hyperframes composition. Main source: composition/index.html.
Local fonts, portrait, official podcast artwork, GSAP, music, and sound effects are in composition/assets.
The single paused GSAP timeline contains four scenes. Each has a readable settled hold.
Music is an edited 22-second segment of the bundled ende.app vol-12 track, with fades baked in. No voiceover.

From composition/, npm run check verifies the composition; npm run dev opens Studio; npm run render -- --quality delivery --output ../brag.mp4 exports after final preview approval.

Check passed with zero errors and all 49 contrast checks passing. Five advisory lint warnings recommend splitting the four small scenes into sub-compositions; the single-file structure is deliberate for this short film.
Audio-reactive extraction was unavailable (numpy missing); the edit uses precomputed music cues instead.

Preview: http://localhost:3002/#project/composition
Final MP4 and extracted poster are pending preview approval. preview.png is a checked still, not the final extracted video poster.
