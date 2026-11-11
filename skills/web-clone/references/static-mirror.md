# Mirroring static-built sites

Applies to sites whose client runtime is served as downloadable static assets, such as Astro, Vite SSG, Hugo, or Eleventy. It does not apply to server-rendered business data or authenticated SPAs.

For static sites, deployed HTML, JS, CSS, fonts, images, video, and runtime-loaded binary assets may be the available source. A real browser can reveal assets loaded only after scrolling; a static link crawler may miss these. Mirror same-origin assets only when permitted, retain their paths, and record third-party dependencies separately.

The upstream mirror helper records requests while scrolling and downloads same-origin assets. It does not automatically rewrite third-party resources or make the result offline. Review third-party font/CDN/license terms, remove tracking only from files you are authorized to modify, and keep a record of what remains online.

Serve from the correct web root and verify key scroll positions, responsive layouts, browser console, and visual differences. A matching screenshot is not proof that interactions, remote dependencies, or offline behavior work.
