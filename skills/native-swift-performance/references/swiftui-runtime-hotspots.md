# SwiftUI Runtime Hotspots

Use this as a code-review hypothesis list when a user reports a measured SwiftUI problem, or plans a focused audit. A suspicious pattern is not a performance finding until connected to the workload and evidence. Check target OS, SDK, Swift mode, and installed Xcode before applying version-specific behavior.

## Lists, identity, and row work

- Confirm data-driven rows have stable, unique identity across inserts, deletes, sorting, and refreshes. Identity churn can cause state loss and extra update/animation work. Do not use a transient UUID or array position unless position truly defines the item.
- Inspect row work and data flow: synchronous I/O, decoding, image preparation, formatting, filtering, and sorting can dominate regardless of framework. Move expensive work to the layer that owns its inputs and keep invalidation correct.
- For large `List`/`ForEach`, inspect row shape and installed SwiftUI guidance. Current Xcode guidance describes fast paths sensitive to stable identity and a single top-level row view; some conditional, type-erased, or multi-root shapes can take a different path. This is a targeted diagnostic, not a universal ban: confirm OS applicability and trace evidence before restructuring rows.
- Avoid wrapping `enumerated()` in `Array` solely out of habit when the toolchain already satisfies the collection requirements. Check the Swift version and initializer overload.
- Do not precompute every filter/sort or add caches by default. Establish that collection size and update cadence make the work material, then keep cache invalidation explicit and test data freshness.

## Observation and invalidation scope

- With `@Observable` reference models, SwiftUI tracks properties read by a view. Reading several properties is not itself a reason to split the view/model. A computed property can depend on every stored property it reads, so follow those reads.
- A nested struct stored as one property is generally one observation dependency; changing one field can invalidate readers of that stored value. Consider narrower stored properties or smaller observable models only when update evidence shows meaningful extra work.
- Keep `@State` for view-owned state, not as a general cache. Expensive derived state needs a clear owner, complete update paths, and demonstrated benefit.
- Review `@Environment` by form and usage. Key-path reads can subscribe a view to changes of that key; typed observable models track properties actually read. Remove genuinely unused subscriptions, but do not equate an unused typed model declaration with an unused key-path subscription.
- `.equatable()` can skip subtree work only when equality is cheaper than recomputation and represents every input that affects output. It can also add cost or hide a missing dependency; measure first.

## View construction, layout, and animation

- Keep view initializers and `body` cheap and deterministic. Look for repeated sorting, formatting, large value construction, parsing, allocation, and synchronous I/O on frequently evaluated paths. View value construction is not platform-view creation or drawing a frame.
- A separate `View` type creates an invalidation boundary when it receives narrow inputs; a computed property or `@ViewBuilder` helper inside the same type generally does not. Extract only where it limits real work or improves ownership.
- When a view updates often, determine whether state, environment, animation, or a parent dependency caused it. Inspect update groups and cause graphs instead of counting `body` evaluations or logging inside `body`.
- For geometry, preference, and animation-driven updates, check whether high-frequency values are written to state read by a large subtree. Narrow the consumer only if the trace shows fan-out; do not remove these APIs by pattern alone.

## Images and asynchronous work

- If scrolling evidence points to image cost, inspect decode size, repeated resizing, cache behavior, duplicate requests, and when work occurs. Prepare appropriately sized images or add cancellation-aware prefetch only when those costs are demonstrated.
- `AsyncImage` caching and request/session controls vary by OS/SDK. Verify current Apple docs and deployment availability before adding a custom cache or relying on newer behavior.
- `Task {}` inherits surrounding actor isolation. Wrapping synchronous CPU-heavy work in a task does not by itself move it off `MainActor`; verify executor placement and preserve actor safety.
- Prefer structured concurrency and view-scoped `.task` where it fits. Cancellation is cooperative, so long loops and bridged APIs must observe or forward cancellation. `Task.detached` discards inherited actor context and priority; use it only when that change is intended and necessary.
- After each `await`, re-check assumptions about actor-owned state and in-flight work. Prevent duplicate expensive requests or stale cache writes when callers can interleave.

## Source basis and limits

This reference distills the Xcode 27.2 `swiftui-specialist`, `xctrace`, and `modernize-tests` exports supplied by the user, Apple Instruments/SwiftUI guidance, and focused performance references from Twostraws and Dimillian. The Xcode 27.2 export used during research is a versioned source snapshot, not a dependency future projects need.

Community audit lists generate questions and report structure; they do not replace profiling. Deeper structural changes should address an established problem. Multiple property reads from one `@Observable` model are not automatically over-broad observation.
