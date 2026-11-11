# Complexity grading and clone scoring

Use this assessment before promising scope and after implementation to explain what evidence supports the result.

## Modes

| Mode | Goal | Use when |
|---|---|---|
| Faithful clone | Preserve permitted source, layout, and interactions | The source is legally usable or the task is local study |
| Visual clone | Recreate the look with a different implementation | Source is unavailable or rebuilding is preferred |
| Content overhaul | Keep information architecture and visual grammar while replacing content | Turning a reference into the user's own site |
| Technical teardown | Understand the real implementation before rebuilding | WebGL, Canvas, complex interactions, or conflicting analyses |

## Complexity levels

| Level | Typical signals | Typical boundary |
|---|---|---|
| L1 | Static HTML/CSS, few pages | Close visual reproduction may be practical; asset rights remain separate |
| L2 | CMS or corporate content site | Front end can be recreated; CMS backend is out of scope |
| L3 | React/Vue/Next content frontend | API data may be represented by local fixtures |
| L4 | Animation-heavy brand site | Main visual rhythm may be recreated; micro-interactions may differ |
| L5 | WebGL/Canvas/Three.js | Fidelity depends heavily on source/runtime evidence and GPU behavior |
| L6 | SaaS, ecommerce, login-based system | Presentation and demo flows only; backend business logic is not cloned by default |

## Pre-clone assessment

Record complexity, recommended mode, high-fidelity areas, approximations, excluded areas, and risks such as license, assets, login state, APIs, performance, WebGL, and responsive behavior.

## Post-clone scoring

Score each dimension from 0–5 only when screenshots, source, or browser runs support the score: source evidence, structural fidelity, visual fidelity, motion and interaction, responsive behavior, functional completeness, content replacement, and legal/deployment risk. State the evidence for each score and identify gaps. A score is a summary, not proof by itself.
