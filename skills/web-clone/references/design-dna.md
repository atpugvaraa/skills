# Design DNA for visual clones and content overhauls

Use this only when the goal is to create a new site with a consistent style. Do not use it to replace real source in a faithful restoration.

A design-dna.json captures three layers:

- design_system: measurable color, typography, spacing, layout, shape, elevation, icons, motion, and component tokens.
- design_style: mood, visual language, composition, imagery, interaction feel, and UI voice.
- visual_effects: backgrounds, particles, 3D, shaders, scroll, text, cursor, image, glass, Canvas, and SVG effects.

Analyze evidence from recon output and responsive screenshots. Use detected CSS variables and section styles for candidate colors, font records for font roles, section geometry for spacing, and framework/Canvas signals for possible effects. Mark missing evidence as TODO. Separate measured facts from subjective judgment.

Map design_system values to tokens, use design_style to guide subjective decisions, and choose visual effect complexity only when it supports the experience. Keep content and asset licensing separate from visual style. Prefer authorized original assets over approximations when reuse is allowed.

For heavy WebGL/WebGPU or shader effects, design DNA should describe the surrounding design only. Route the effect itself through source/runtime reverse engineering and the baseline gate in effect-extraction.md.

This method is adapted from zanwei/design-dna (MIT): https://github.com/zanwei/design-dna
