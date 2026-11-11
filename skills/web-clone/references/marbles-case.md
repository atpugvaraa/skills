# Case study: glass marbles

Original: https://chiuhans111.github.io/marbles/ by Hans Chiu. The source site declares no license. This case study is for analysis; it does not grant permission to copy or redeploy its code or assets.

The upstream analysis describes an architecture where a WebGL shader analytically solves ray-sphere intersections and encodes optical displacement/Fresnel data. An SVG filter then distorts live DOM content. Other details include multiple offscreen canvases, chained SVG filters, hand-written physics, and procedural audio.

The second-hand analysis incorrectly described ray marching, an SDF, sampling the DOM as a texture, and a simplified filter chain. These are materially different implementations. Verify each architecture claim and constant against source or direct runtime evidence; do not infer a pipeline from appearance alone.

Use this example to remember the distinction between a glass-like visual and the actual implementation. No license on the original site means its code and assets remain all rights reserved by default.
