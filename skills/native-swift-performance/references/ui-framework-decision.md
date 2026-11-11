# SwiftUI, UIKit, and AppKit Decision Guide

## Default

Keep a surface in the framework already used if it meets the measured responsiveness, memory, and product requirements. SwiftUI is not inherently slow, and UIKit is not inherently faster. Do not replace a view because `body` runs often, because an internet post says a modifier is expensive, or because UIKit offers a familiar optimization. Identify which layer is expensive first.

## Evidence for considering a replacement

Consider a UIKit/AppKit implementation for one surface only when all relevant points are true:

1. A repeatable workload shows a user-visible problem on the target device/build.
2. Instruments ties a material part of that problem to SwiftUI’s platform-update/layout/collection behavior, or a required control/performance feature is unavailable or inadequate in the supported SwiftUI API.
3. App-owned work, excessive state dependencies, image preparation, blocking I/O, data volume, and misuse of the current API have been investigated; there is a specific reason those are not the root cause.
4. A small prototype can reproduce equivalent data, interactions, accessibility, and update semantics in UIKit/AppKit.
5. An apples-to-apples before/after profile shows improvement large enough to justify bridge and maintenance cost.

If any point is unknown, label the migration as an experiment, not a recommendation.

## Comparison protocol

- Keep the data source, assets, item count, interaction sequence, device, OS, build configuration, and visual/accessibility requirements equivalent.
- Measure the original and prototype using the same launch, scroll, update, memory, and hitch workload. Capture traces and repeated values.
- Include bridge overhead and lifecycle behavior: data-to-view updates, identity/selection, reuse, cancellation, sizing, scrolling position, Dynamic Type, VoiceOver, and state restoration.
- Check feature maintenance cost: two implementations, OS-specific paths, testing, coordinator/delegate ownership, and regressions when requirements change.
- Adopt only the smallest proven surface. Re-profile the integrated version; a standalone prototype may hide costs at the real app boundary.

## Where UIKit may fit

UIKit provides explicit reuse and prefetching mechanisms for collection/table content, and diffable data sources manage identifier-based changes. These can help when the measured problem is large collection preparation or data/image prefetching. They do not make expensive cell configuration, main-thread file I/O, unstable identity, or unnecessary full snapshots free. Keep identifiers lightweight and stable; prepare expensive data outside cell creation; cancel or reuse prefetch work correctly.

Other reasons to prototype UIKit include precise control over an interaction/rendering path or access to a required API absent from the supported SwiftUI deployment range. Name the needed capability and prove it matters to this use case; “more control” alone is not a performance result.

## Bridge costs and correctness

`UIViewRepresentable` / `UIViewControllerRepresentable` and AppKit equivalents are interoperability tools, not automatic speedups. Account for `make` versus repeated `update`, coordinator lifetime, identity, teardown, reuse, delegate callbacks, SwiftUI state synchronization, actor isolation, and ownership. Avoid feedback loops where UIKit callbacks mutate state that immediately causes redundant representable updates. Ensure the wrapper propagates every meaningful input update and dismantles observers/tasks.

For a mixed screen, retain SwiftUI around a UIKit component when that keeps the hot path narrow. Do not migrate whole navigation stacks or app architecture to address one slow list or control.

## Decision table

| Finding | Next move |
|---|---|
| Heavy work in body or synchronous model update | Hoist/cache/compute off the UI actor as isolation permits; profile again |
| Too many views observe broad model changes | Narrow dependencies/state ownership; inspect update-cause graph |
| Image decode/file access in scrolling path | Prepare/downsample/cache or prefetch away from cell/body update |
| Slow SwiftUI list due to unstable identity or expensive row content | Fix identity/content and profile before comparing frameworks |
| SwiftUI platform update itself dominates after app-owned causes are excluded | Prototype the specific UIKit/AppKit surface and compare |
| GPU/render-bound work with similar CPU behavior | Investigate effects, overdraw, drawing/animation; UIKit is not presumed to fix GPU cost |
| No reproducible impact or trace evidence | Do not recommend a framework swap |
