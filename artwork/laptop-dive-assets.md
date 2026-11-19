# Laptop Dive asset integration

This hero adapts the user's supplied Haldoren brief to the existing portfolio. The user selected an immersive hero with access to the existing profile sections. Identity, contact details and project data remain those of Iqbal Maulana Dhiti.

The exact supplied plate, casePlate, cutout, badge and transition URLs are centralized in src/components/hero/laptopScene.ts. Images use the specified images.higgs.ai wrapper (2048px, except the 1200px badge); the camera MP4 uses the original CloudFront URL. No supplied scene image or video is stored, resized, re-encoded or rehosted in the project. The prescribed 1440x810 frame and CSS positions align the image layers with the clip.

At runtime the browser fetches the transition into a temporary Blob. Its object URL is revoked on unmount. Direct video loading is the fetch-failure fallback; if playback is unavailable, the hero moves directly to the case composition. Reduced motion skips the clip.

The supplied fictional Vell/Vasari/Mina cases are intentionally not represented as the owner's work. The laptop uses existing published project covers, titles, summaries, roles, periods and technology names from the existing project service. Video previews for the owner's actual projects were not supplied. The original profile photograph appears in the badge and remains unchanged on disk and in About.

Inter Tight, Caveat Brush and Anton Latin WOFF2 fonts are hosted under public/fonts, sourced from the Google Fonts CSS endpoint specified by the brief. Their OFL licenses are in public/fonts/licenses. Existing lower-page typefaces remain in use.
