# Evidence discipline and baseline gate

## Evidence grades

- SOURCE: target source, source map, runtime object dump, captured shader/WGSL, frame capture, or response body directly tied to the target.
- PARTIAL: a name, fragment, or shader without uniforms, passes, inputs, or state.
- GUESS: visual fitting, inferred defaults, or hand-tuned constants without direct evidence.

Treat untagged findings as GUESS. Upgrade a guess before presenting it as source-derived fact.

## No compensation

Do not adjust brightness, speed, position, or noise to mask unknown timing, coordinates, resource state, or compositing. A fitted constant stays a guess even if the image looks closer. Record what evidence would resolve it.

## Baseline first

Locate the render surface, capture the minimum truth, and create a small as-is replay using actual shaders, uniforms, draw calls, and relevant input. Compare sampled frames. Only after a baseline is verified should you refactor or productionize. If gaps remain, label them clearly.

## If source and source maps are unavailable

Capture at the rendering boundary: draw calls, bound programs, shader sources, uniforms, framebuffer/texture sizes, blend/depth state, and relevant inputs. A frame capture or equivalent direct runtime capture can be SOURCE evidence. Do not claim that a visual approximation is an exact reconstruction.

This discipline is inspired by lixiaolin94/skills web-shader-extractor: https://github.com/lixiaolin94/skills. The source repository does not declare a license; this reference uses rewritten method summaries only and includes no copied code or prose.

The upstream skill may delegate specialized extraction to web-shader-extractor when installed. It is optional; the evidence and baseline discipline can be followed without it.
