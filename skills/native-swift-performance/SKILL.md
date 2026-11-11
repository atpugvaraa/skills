---
name: native-swift-performance
description: Use when profiling, auditing, or optimizing a native Swift app on iOS, iPadOS, macOS, watchOS, or visionOS; investigating launch delays, hangs, hitches, excessive SwiftUI updates, CPU/GPU or memory use; or deciding whether a SwiftUI surface should use UIKit or AppKit.
---

# Native Swift Performance

Optimize measured user-visible work in real native builds. A logging guide, static code smell, or framework preference can generate hypotheses; none establishes a bottleneck. Keep the UI framework that meets the measured need with the least complexity, and replace an individual surface only when evidence shows a material improvement.

## Workflow

1. **Set the target.** Identify platform, deployment targets, Swift/Xcode versions, configuration, device class, and the user-visible symptom. Agree on a metric and acceptable outcome; do not invent universal millisecond cutoffs.
2. **Reproduce and baseline.** Define a short repeatable scenario, including data volume and app state. Prefer a physical device and optimized/Profile configuration for runtime conclusions. Record device/OS, build, steps, repetitions, and relevant noise. Preserve a trace or metric export.
3. **Classify with evidence.** Choose Instruments for the symptom (see `references/performance-audit.md`). Separate CPU-bound work from waiting, view-update frequency from duration, app code from framework/platform updates, and CPU from GPU/rendering. Add narrowly scoped signposts only when they clarify a gap in the trace. For SwiftUI source review, use `references/swiftui-runtime-hotspots.md` as a hypothesis checklist, not a rewrite checklist.
4. **Trace to cause.** Follow the hot stack, update cause, blocking call, allocation source, or rendering lane to owned source. A suspicious pattern in code is a hypothesis until its effect is tied to the measured scenario.
5. **Choose the smallest fix.** Consider algorithm/data volume, state dependencies, work placement, caching, image/layout/rendering, API choice, then a UIKit/AppKit surface when relevant. Use `references/ui-framework-decision.md` before recommending a framework swap.
6. **Change one cause at a time.** Preserve behavior, accessibility, identity, cancellation, and lifecycle. Explain what should change in the trace before coding.
7. **Verify the same workload.** Repeat the baseline on the same device/configuration, then exercise correctness and adjacent flows. Compare distributions and regressions, not one lucky sample. Keep runtime measurement separate from debug logging and build-time claims. XCTest performance measurements based on `measure`/`XCTMetric` remain in XCTest; do not migrate them to Swift Testing just for consistency.
8. **Report what was proved.** State symptom, reproduction, baseline, evidence and source location, change, before/after metrics, verification environment, regressions checked, and remaining uncertainty. Mark unprofiled concerns as hypotheses.

## Instrumentation rules

- Use Instruments and MetricKit/XCTest metrics for performance evidence. Use logs to mark semantic events or bounded operations; logs are not a frame-time, CPU-sample, or hitch analysis.
- Do not log from SwiftUI `body`, tight loops, or per-frame paths. Avoid lifecycle logging as a proxy for rendered view count: SwiftUI may evaluate view values repeatedly, and that count alone does not show user-visible cost.
- Do not use a universal "over 100 ms" rule. Judge interaction work against its frame, input, launch, and product expectations; use system hitch/hang evidence and the target device.
- Time an `async` operation to answer elapsed latency only. It can include network, disk, executor queueing, and suspension; it does not establish CPU time. Add intervals around meaningful boundaries, not every helper.
- `Task {}` inherits its surrounding actor context. Confirm executor/isolation behavior in a trace; creating a task alone does not move synchronous work off `MainActor`.
- Consult current Apple documentation for APIs and thresholds that vary by OS/Xcode/Swift version. Prefer current official documentation and WWDC sessions; label community techniques as hypotheses and validate them.

## Deliverable shape

Use a concise, evidence-ranked list. Each finding has: **observation**, **evidence**, **user impact**, **root cause**, **smallest next action**, **verification**, and **confidence**. Separate measured defects from unmeasured risks and framework migration ideas. Include “no UIKit/AppKit swap recommended” when the trace does not show a framework limitation.

## References

- `references/performance-audit.md` — repeatable profiling workflow, instrument selection, telemetry, and report template.
- `references/swiftui-runtime-hotspots.md` — version-aware SwiftUI list, observation, body-work, environment, image, and task-lifecycle audit cues.
- `references/ui-framework-decision.md` — evidence required for SwiftUI/UIKit/AppKit decisions and interop costs.
- `references/apple-source-index.md` — primary source links and freshness guidance.
