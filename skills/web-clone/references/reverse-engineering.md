# Reverse-engineering WebGL and Canvas sites

Treat rendering as separate technical pillars: rendering/shaders, compositing/post-processing, physics, interaction, audio, and resource loading. Find source, source maps, and public repositories before analyzing minified bundles. Record file and line locations or runtime evidence for each conclusion.

For shaders, identify inputs, coordinate conventions, uniforms, passes, framebuffer formats, and draw order. For interactions, trace pointer/state updates into rendering. For physics, separate integration, collision, and resting behavior. Avoid writing a complex shader from appearance alone: make a minimal scene and add verified layers one at a time.

If the real source is unavailable, use a frame capture or instrumentation at the WebGL/WebGPU boundary and follow references/effect-extraction.md. Keep source facts separate from hypotheses.
