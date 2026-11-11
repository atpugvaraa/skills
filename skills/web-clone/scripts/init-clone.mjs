#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function usage() {
  console.log(`Usage:
  node scripts/init-clone.mjs <slug> [--url <url>] [--mode <mode>] [--level <L1-L6>]

Creates:
  ~/projects/website-clones/<slug>-clone/
  ~/projects/website-clones/<slug>-clone/NOTES.md
  ~/projects/website-clones/<slug>-clone/RECON/screenshots/
`);
}

function parseArgs(argv) {
  const out = { slug: null, url: "", mode: "", level: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg === "--url") out.url = argv[++i] || "";
    else if (arg === "--mode") out.mode = argv[++i] || "";
    else if (arg === "--level") out.level = argv[++i] || "";
    else if (!out.slug) out.slug = arg;
    else throw new Error(`Unexpected argument: ${arg}`);
  }
  return out;
}

function cleanSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function notesTemplate({ name, url, mode, level }) {
  return `# ${name} - Clone Notes

## Source info
- Original URL: ${url}
- Source repo:
- Original author:
- License:
- Attribution requirements:

## Tech stack
- Framework / key libraries / Node version:

## Pre-clone assessment
- Complexity level: ${level}
- Recommended mode: ${mode}
- Parts that can be high-fidelity:
- Parts that need approximation or substitution:
- Parts that will not be cloned:
- Main risks:

## Run it
~~~bash
cd ~/projects/website-clones/${name}
python3 -m http.server 8123
~~~

## What changed (vs. the original)
-

## Original vs clone
| Module | Original behavior | Clone implementation | Difference / trade-off | Evidence |
|---|---|---|---|---|
| Hero |  |  |  |  |
| Navigation |  |  |  |  |
| Core motion |  |  |  |  |
| Content sections |  |  |  |  |
| Mobile |  |  |  |  |

## Clone score
- Source evidence: /5
- Structural fidelity: /5
- Visual fidelity: /5
- Motion/interaction: /5
- Responsive: /5
- Functional completeness: /5
- Content replacement: /5
- Legal/deployment risk: /5
- Overall:

## Replacement map
- Text -> file, line
- Images/media -> directory
- Colors -> CSS variables / theme
- 3D models / fonts ->

## Verification
- [ ] Runs locally, console 0 errors
- [ ] Screenshots compared against the original (RECON/screenshots/)
- Things that could not be verified (record truthfully):
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.slug) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const slug = cleanSlug(args.slug);
  if (!slug) throw new Error("Slug is empty after normalization.");
  const name = slug.endsWith("-clone") ? slug : `${slug}-clone`;
  const root = path.join(os.homedir(), "projects", "website-clones");
  const project = path.join(root, name);

  if (fs.existsSync(project)) {
    throw new Error(`Project already exists: ${project}`);
  }

  fs.mkdirSync(path.join(project, "RECON", "screenshots"), { recursive: true });
  fs.writeFileSync(
    path.join(project, "NOTES.md"),
    notesTemplate({
      name,
      url: args.url,
      mode: args.mode,
      level: args.level,
    })
  );
  fs.writeFileSync(path.join(project, ".gitignore"), "node_modules/\n.DS_Store\n");

  console.log(project);
} catch (error) {
  console.error(`init-clone failed: ${error.message}`);
  process.exit(1);
}
