# Aarav’s Agent Skills

A small, curated collection of development skills for Claude Code, Codex, and other compatible coding agents. Each skill is self-contained under `skills/<skill-name>/`. This repository contains the selected skill instructions only.

## Install

Install selected skills globally for Claude Code and Codex with the Skills CLI:

```sh
npx skills add atpugvaraa/skills \
  --skill native-swift-performance \
  --skill write-swift \
  --agent claude-code \
  --agent codex \
  --global
```

Use `--list` to inspect available skills first, or pass different `--skill` names. To install all listed skills, review the list and then run `npx skills add atpugvaraa/skills --skill '*' --agent claude-code --agent codex --global`.

## Collection

- **Web and reverse engineering:** `web-clone`\n- **Swift and Apple platforms:** `native-swift-performance`, `write-swift`, `ios-code-audit`
- **Animation and design craft:** `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`
- **Workflow and code quality:** `i-have-adhd`, `ponytail`, `ponytail-audit`, `ponytail-review`

The animation skills are useful for motion judgment, but some examples and mechanics are web-oriented. Translate their design principles to SwiftUI/UIKit and verify native behavior rather than applying CSS or browser advice literally.

## Adding a skill

Put each skill in `skills/<skill-name>/SKILL.md`; keep only needed references, scripts, and assets beside it. See [CONTRIBUTING.md](CONTRIBUTING.md) for source, licensing, privacy, and cross-language conventions.

## Sources and licenses

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). First-party files are MIT licensed; vendored skills retain their upstream licenses and attribution.
