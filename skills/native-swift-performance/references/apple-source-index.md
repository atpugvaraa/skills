# Apple Source Index

Use these primary sources as the stable starting set. Verify OS, Swift, and Xcode version requirements against the current page/toolchain before applying version-specific details. Prefer current Apple documentation and session transcripts over remembered rules. The index intentionally links concepts rather than copying large documentation passages.

## SwiftUI and rendering

- [Understanding and improving SwiftUI performance](https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance) — SwiftUI instrument, long updates, update groups, causes, and profiling workflow.
- [WWDC25: Optimize SwiftUI performance with Instruments](https://developer.apple.com/videos/play/wwdc2025/306/) — next-generation SwiftUI instrument and practical trace analysis.
- [Improving your app’s rendering efficiency](https://developer.apple.com/documentation/xcode/improving-your-apps-rendering-efficiency) — avoid unnecessary redraws and use the right rendering strategy.
- [WWDC26: SwiftUI Group Lab](https://developer.apple.com/videos/play/wwdc2026/8120/) — current discussion of large collections and SwiftUI performance behavior; confirm platform/OS context.

## Hangs, concurrency, and Instruments

- [Improving app responsiveness](https://developer.apple.com/documentation/xcode/improving-app-responsiveness) — main-thread work, blocking versus busy hangs, and Swift concurrency isolation.
- [WWDC23: Analyze hangs with Instruments](https://developer.apple.com/videos/play/wwdc2023/10248/) — hang detection and trace interpretation.
- [WWDC26: Profile, fix, and verify responsiveness with Instruments](https://developer.apple.com/videos/play/wwdc2026/268/) — current Swift Executors and System Trace examples; version-specific features require checking availability.
- [Instruments tutorials](https://developer.apple.com/tutorials/instruments) — hands-on trace workflows.

## UIKit collections and interop comparisons

- [UICollectionView](https://developer.apple.com/documentation/uikit/uicollectionview) — collection views, prefetching, and diffable data sources.
- [Updating collection views using diffable data sources](https://developer.apple.com/documentation/uikit/updating-collection-views-using-diffable-data-sources) — stable identifiers and snapshot behavior.
- [Improving file-system performance and stability](https://developer.apple.com/documentation/foundation/improving-performance-and-stability-when-accessing-the-file-system) — main-thread I/O and prefetching implications for large collections.
- For representable lifecycle and requirements, consult the current `UIViewRepresentable`, `UIViewControllerRepresentable`, and platform equivalents in the relevant SDK documentation.

## Metrics and memory

- [Writing and running performance tests](https://developer.apple.com/documentation/xcode/writing-and-running-performance-tests) — repeatable XCTest metrics and baselines.
- [Performance tests](https://developer.apple.com/documentation/xctest/performance-tests) — available CPU, clock, memory, hitch, signpost, launch, and storage metrics.
- [Monitoring app performance with MetricKit](https://developer.apple.com/documentation/metrickit/monitoring-app-performance-with-metrickit) — real-device daily metrics and diagnostics.
- [Gathering information about memory use](https://developer.apple.com/documentation/xcode/gathering-information-about-memory-use) — memory graph and Allocations workflows.
- [Preventing memory-use regressions](https://developer.apple.com/documentation/xcode/preventing-memory-use-regressions) — XCTest memory baselines.

## Reading rules

- Search for the newest session/page on the exact issue when behavior may have changed between OS releases.
- Treat a session demo as an example, not a universal numeric target.
- Use Apple APIs/docs as authority for API behavior; use a real trace to establish that the behavior matters in this app.
- For Swift language/concurrency details, use the Swift language documentation and current Apple concurrency guidance for the repository’s compiler mode. Do not copy isolation recipes from a different Swift version without checking.

## Xcode-exported and community skill sources

The Xcode 27.2 skill export supplied during research. Consult its `swiftui-specialist` references for `ForEach` identity/row shape, Observation data flow, view structure, environment dependencies, and animation; its `xctrace` references for CLI/trace inspection and hang triage; and `modernize-tests` for retaining XCTest measurement APIs where Swift Testing has no equivalent. This is a local snapshot: re-check the installed Xcode export when toolchain behavior changes.

Community skill sources reviewed for focused practices and report design:

- [Twostraws Swift Agent Skills](https://github.com/twostraws/swift-agent-skills) — a registry of independently authored skills, not a blanket endorsement of every listing.
- [Twostraws SwiftUI Agent Skill](https://github.com/twostraws/SwiftUI-Agent-Skill) and its [deeper performance notes](https://github.com/twostraws/SwiftUI-Agent-Skill/blob/main/swiftui-pro/references/performance-plus.md) — reserve structural/invalidation changes for explicit deep reviews or established performance evidence; avoid splitting an `@Observable` model merely because a view reads multiple properties.
- [Twostraws Swift Concurrency Agent Skill](https://github.com/twostraws/Swift-Concurrency-Agent-Skill) and its [unstructured concurrency guidance](https://github.com/twostraws/Swift-Concurrency-Agent-Skill/blob/main/swift-concurrency-pro/references/unstructured.md) — actor inheritance, cooperative cancellation, structured tasks, and caution with `Task.detached`.
- [Dimillian Skills](https://github.com/Dimillian/Skills/tree/main/swiftui-performance-audit) — symptom intake, code-smell hypotheses, trace requests, and concise before/after reporting.
- [jazzychad iOS Code Audit](https://github.com/jazzychad/ios-code-audit) — useful file/line-cited static audit discipline; it explicitly does not perform Instruments profiling, so keep static findings separate from runtime proof.
- [John Rogers Swift Engineering](https://github.com/johnrogers/claude-swift-engineering) — specialized audit and diagnostic organization. Verify prescriptions against the repository's compiler mode, deployment target, and measured workload instead of adopting broad rules without evidence.
- [Emil Kowalski skills](https://github.com/emilkowalski/skills) — motion-quality questions such as purpose, interruption, and reduced-motion behavior can inform animation review. Do not transfer browser/CSS timing or rendering claims directly to SwiftUI/UIKit.

These sources inform hypotheses and workflow; Apple documentation, the active SDK/toolchain, and the app's own repeatable measurements determine API behavior and whether a proposed optimization helps.
