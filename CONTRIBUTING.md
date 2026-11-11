# Contributing skills

This repository is intended to grow across Swift, C, Objective-C, Rust, Go, and other development work.

- Keep one portable skill per `skills/<skill-name>/` folder. Use a lowercase, hyphenated directory that matches the `name` in `SKILL.md` frontmatter.
- Keep `SKILL.md` focused on decisions and workflow. Put long, task-specific details in linked `references/`; include scripts/assets only when the skill needs them.
- State platform, compiler, and toolchain assumptions when advice is version-sensitive. Separate measured evidence from hypotheses and avoid universal performance rules without evidence.
- Never add personal notes, memory files, credentials, private project data, or local home-directory paths. Review the staged diff and scan before publishing.
- For third-party material, verify the upstream license, preserve its copyright/license notice, and record the source URL and any modifications in `THIRD_PARTY_NOTICES.md`. Do not vendor content without redistribution permission. Link to it instead.
- First-party repository content is under the root MIT license. Third-party skill folders keep their own licensing terms.
- Keep install instructions compatible with the current Skills CLI; verify command syntax against its official documentation when it changes.
