# Performance Audit Playbook

## 1. Define a reproducible workload

Write down the user action and expected outcome before opening Instruments. Examples: cold launch to first useful screen; scroll a 1,000-item library at a fixed speed; type a search query against a fixed local dataset; open and dismiss a detail screen repeatedly; play audio while browsing. Use realistic data, the same app state, the same device/OS, and the same build settings for before/after. Separate cold and warm launch, cached and uncached paths, and idle from interaction. Repeat enough to expose variability; retain the trace.

For runtime performance claims, use a physical device where possible and an optimized Profile/Release-equivalent build. Debug instrumentation, sanitizers, the Simulator, thermal state, background activity, and network variation can change results. They are useful for diagnosis but must be identified and not presented as shipping performance. Check that the release build actually includes the same code path and feature flags.

## 2. Select the instrument from the symptom

| Symptom | Start with | Follow-up |
|---|---|---|
| SwiftUI updates feel slow or views update too often | SwiftUI instrument (Xcode 26+ where available): long body/platform/other updates, update groups, causes | Time Profiler over a selected update; source-level dependency narrowing |
| Scroll, transition, or animation hitches | Animation Hitches/Core Animation; SwiftUI instrument for SwiftUI surfaces | Time Profiler for CPU; Core Animation/GPU tools if render-bound |
| Tap/input delay, freeze, hang | Hangs; Time Profiler | Swift Concurrency/Executors for actor contention; System Trace when main thread is blocked or CPU is low |
| CPU use or battery drain | Time Profiler; Energy Log / power tools available in the installed Xcode | Swift Concurrency/Executors; repeat with representative foreground/background use |
| Memory growth, pressure, or termination | Allocations and memory graph; Leaks for retained cycles | Mark generations around one feature; test on device because Simulator memory pressure differs |
| Slow launch/resume in the field | App Launch instrument / launch metrics | MetricKit, Organizer, then a local launch trace |
| Slow API or disk path | Network instrument or File Activity/System Trace | Add bounded signpost intervals around owned request/decode/storage boundaries |
| Regression threshold in a stable code path | XCTest performance test with the relevant `XCTMetric` | Use baseline management and a consistent destination; corroborate UI behavior in Instruments |

Names and bundled instruments vary by Xcode version and platform. Use the installed tool’s closest equivalent and record it. The table guides diagnosis; running every instrument at once can add overhead and obscure the signal.

### Reading traces with `xctrace`

The supplied Xcode 27.2 export includes an Apple-authored `xctrace` skill. Before using `xctrace`, consult the installed export's `xctrace/references/xctrace-overview.md` and refresh the local command surface with `xctrace help`, the relevant `xctrace help <command>`, and `man xctrace` as needed; command options change between tool versions. Explore a trace in the order `xctrace toc` → `xctrace list tracks` for a concrete dynamic track → `xctrace show` for the relevant detail. Prefer curated `show` output to large raw XML from `export`, and preserve the matching build's dSYM for symbolication. Treat sampled Time Profiler call trees as statistical evidence, not a complete trace of every call.

For hang triage, `xctrace triage --style hangs` uses duration bands beginning above 33 ms, then 100 ms, 250 ms, 500 ms, and 2 seconds. Those are triage severity categories, not universal interaction budgets and not Animation Hitches thresholds. First distinguish a busy main thread from a blocked/low-CPU main thread; use System Trace and the appropriate concurrency instruments to identify waits and contention.

### Reading SwiftUI evidence

Inspect long body updates and the Time Profiler call tree for work owned by the app. Inspect update groups and cause-and-effect graphs when many individually short updates keep the system busy. Inspect long platform updates separately: UIKit/AppKit hosted by SwiftUI can be the slow layer. Inspect “other updates” for layout/geometry/text work. Re-record after a fix: the same visible result can have another update cause, and reducing one cause may reveal another.

Apple’s SwiftUI instrument currently marks body updates over 500 µs orange and over 1 ms red. These are investigation cues in that instrument/version, not universal quality budgets or proof that the view is a bottleneck.

### Reading hang and concurrency evidence

First decide whether the main thread is busy or blocked. A busy main thread calls for reducing or moving work. Low CPU during an unresponsive interval suggests waiting; use System Trace to identify the blocking system call or lock. `await` and `Task` do not guarantee background execution: async functions can inherit actor isolation. Verify the executor and preserve actor correctness when moving CPU work.

## 3. Instrument narrowly

Prefer `Logger` for structured events and `OSSignposter`/signposts for intervals that need correlation in Instruments. Use XCTest metrics (`XCTClockMetric`, `XCTCPUMetric`, `XCTMemoryMetric`, `XCTHitchMetric`, `XCTOSSignpostMetric`, or launch/storage metrics as supported) to catch repeatable regressions. Use MetricKit for real-world distributions and diagnostics, not immediate per-session feedback.

An app-specific logger can answer “how long did this awaited operation take?” and add file/function context. Its async measurement spans suspension and external waits; a log line cannot explain which part consumed CPU or caused a hitch. It is not a substitute for signposts, Time Profiler, SwiftUI, Hangs, or MetricKit. Add measurements only at stable boundaries, use low-cardinality names, avoid personally identifying data, and verify the logger’s release behavior rather than assuming it is zero-cost.

Avoid print/log calls in `View.body`, `onAppear` as a render counter, and instrumentation in hot loops. SwiftUI value/view evaluation is not equivalent to creating a platform view or drawing a frame. If you need to understand update frequency, use the SwiftUI instrument; if you need a code path interval, signpost that operation.

## 4. Turn observations into a bounded change

1. State the measured event, time range, and instrument evidence.
2. Identify the actual caller/cause and code you own; separate framework or SDK time from app time.
3. Form one explanation that predicts a specific trace change.
4. Make one narrow change. Avoid opportunistic cleanup that confounds the comparison.
5. Re-run the identical workload and compare repeated measurements, distributions, and energy/memory side effects.
6. Check behavior, cancellation, data freshness, accessibility, and adjacent navigation/playback flows.

Do not promote a code smell to a performance finding without evidence. Conversely, a lack of body time does not rule out update frequency, platform-view work, render/GPU cost, blocking, or memory pressure.

## 5. Finding template

```markdown
### [P1/P2/P3] Short observed symptom
- **Scenario:** exact steps, data shape, device/OS, build/configuration
- **Evidence:** trace/instrument/metric and selected interval; baseline value/distribution
- **Source:** confirmed file and symbol, or “framework/third-party”
- **Cause:** what the evidence shows (mark any inference)
- **Action:** smallest change that tests the cause
- **Verification:** same scenario and measurement after change; behavior checked
- **Confidence:** measured / strongly indicated / hypothesis
```

Prioritize user-visible, reproducible issues. Do not invent severity from an arbitrary time threshold. Explicitly list unprofiled areas and missing device coverage.
