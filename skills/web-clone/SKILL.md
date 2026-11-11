---
name: web-clone
description: Use when the user asks to clone, recreate, or study a website or web interaction. Find real source first, choose a path from evidence, respect licensing, and verify the result in a browser.
metadata:
  author: Jane (Xiaoer)
  version: "1.6.0"
  upstream: https://github.com/Jane-xiaoer/claude-skill-web-clone
---

# Web Clone: website cloning methodology

Turn website recreation into a repeatable, evidence-led workflow. The upstream author’s companion workspace was ~/projects/website-clones; choose a suitable local workspace for the user.

## Core rule: real source is the reference

Treat executable code in AI-generated analyses as unverified. Use prose as hypotheses, then confirm architecture, algorithms, constants, coordinate systems, and state transitions against the actual source or direct runtime evidence. Do not copy a guessed implementation just because its output looks similar.

Start by locating the original source. Search the site or product name, inspect public repositories and source maps, and identify deployed static assets. If source is found, verify its license and attribution terms before copying it.

## Workflow

1. Create a project folder and record the original URL, evidence, intended scope, and any legal or access boundaries. The optional initializer is in scripts/init-clone.mjs.
2. Search GitHub and public source maps before scraping. For a single-file site, inspect the raw source. If source is available and permitted, use it as the baseline.
3. If source is unavailable, inspect the site in a real browser. Capture desktop, tablet, and mobile layouts; identify frameworks, fonts, canvases, routes, scroll behavior, network calls, and interaction states. Use the optional scripts under scripts/ when their dependencies are installed. Do not use authenticated browser state for public reconnaissance.
4. Write a pre-clone assessment before implementation: complexity L1–L6, recommended mode, reproducible parts, approximations, excluded behavior, and risks. See references/assessment.md.
5. Choose the implementation path from evidence:
   - Static HTML/CSS: mirror permitted assets or rebuild the simple page.
   - React/Vue/Next content sites: use a suitable template and move content into data.
   - API-backed SPA or SaaS: capture authorized public/demo fixtures and mock locally; do not reproduce private business logic.
   - Multi-page sites: map routes and page templates before implementing.
   - Interaction-heavy sites: record important states and verify each interaction, not only the first viewport.
   - WebGL/Canvas: locate actual source or source maps first; otherwise extract runtime rendering evidence and establish a baseline before refactoring. See references/reverse-engineering.md and references/effect-extraction.md.
   - Static-built sites: mirror deployed same-origin assets only when permitted; see references/static-mirror.md.
   - L4–L6 work: follow references/complex-playbooks.md.
6. For visual clones or content overhauls, a structured design identity can help preserve the visual language while replacing content. See references/design-dna.md. Do not use it to dilute a faithful source restoration.
7. Verify in a real browser. Check console errors, representative routes, responsive widths, and interactions. Compare screenshots when practical. Record what was and was not verified; synthetic events may not prove a real drag or gesture worked.
8. Keep notes with source, license, tech stack, replacement map, differences, evidence, and known gaps. Complex work should include a technical teardown with source locations and evidence grades. See references/deliverables.md.

## WebGL and Canvas evidence discipline

Tag important findings SOURCE (direct source or runtime capture), PARTIAL (a clue needing confirmation), or GUESS (visual inference or fitted values). Untagged conclusions are guesses. Do not present guesses as source facts.

Do not compensate for unknown timing, coordinates, state, or compositing by tuning brightness, speed, noise, or position. Keep fitted parameters marked as guesses and state what evidence would confirm them.

Build the smallest as-is replay from captured shaders, draw calls, uniforms, resources, and input state. Compare sampled frames with the original before refactoring or changing frameworks. If the baseline does not match, document the gap and continue investigating; do not claim a verified clone.

A transferable pattern from the upstream marbles case is using a WebGL pass to produce a displacement map and an SVG filter to distort live DOM content. Do not assume a similar-looking effect uses ray marching, DOM textures, or the same filter chain: verify each layer against real evidence. See references/marbles-case.md.

## License, authorization, and privacy

A public repository or public website is not automatically free to copy. Check the repository license, asset terms, and site terms. No declared license means all rights are reserved; limit work to analysis or local learning and do not publicly redeploy copied material without permission. Preserve required notices and attribution.

Only inspect systems and accounts the user is authorized to access. Do not bypass authentication, paywalls, or access controls. Treat captured network fixtures, URLs, and page data as potentially sensitive; do not use authenticated sessions for captures and inspect outputs before sharing. The network capture helper omits request headers and bodies, but response fixtures may still contain user or account data.

Do not promise a full clone of login, payments, orders, permissions, recommendations, or proprietary APIs. Build a clearly labeled front-end demo or mock when that is the authorized scope.

## Optional helpers

Scripts are convenience tools, not proof of correctness. They use Playwright; install it in the working project and install its Chromium browser as documented by Playwright. From this skill folder, run the chosen script with node scripts/<name>.mjs. Review each command’s --help and confirm output paths before running it.

Available helpers: init-clone, recon-site, asset-harvest, network-capture, route-crawl, interaction-probe, sourcemap-hunt, mirror-site, compare-recon, visual-diff, audit-clone, and dna-scaffold. Capture and mirror scripts make network requests and write local files. Use them only for authorized targets and inspect generated files before publishing.

For an actual clone, first state the assessment and licensing/access boundaries. Then implement only the agreed scope, run local verification, and report evidence and remaining gaps.
