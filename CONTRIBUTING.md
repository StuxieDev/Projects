<p align="center">
  <img src="assets/img/logo.svg" width="300" alt="StuxieDev Projects">
</p>

# Contributing to StuxieDev Projects

This is a personal project — the repository isn't open to public pull requests, and per the [License](README.md#license) section it isn't licensed for redistribution or reuse. This document exists for future-me (or anyone with write access) working on it consistently.

Questions: [hello@stuxie.dev](mailto:hello@stuxie.dev).

## Local setup

```
git clone https://github.com/StuxieDev/Projects.git
cd Projects
./dev-server.sh
```

No install step — there's no `package.json`, no dependencies, nothing to build. `dev-server.js` is a single dependency-free Node script; the only requirement is having Node itself installed. Pass `--no-dev-mode` to test the site as it behaves in production (no dev banner).

## Project conventions

- **Plain HTML/CSS/JS, no framework, no build step.** Every page is a real `.html` file — no templating engine, no client-side router.
- The sitemap (`sitemap.xml`, `sitemap/index.html`, `robots.txt`) is generated: after adding or removing a page, edit the `PAGES` list in `scripts/build-sitemap.py` and run `python scripts/build-sitemap.py`, then commit the result.
- Clean URLs use a folder-per-page layout (`legal/privacy/index.html` → `/legal/privacy/`), not a `.html` suffix.
- Shared styles live in `assets/css/style.css`; shared behaviour in `assets/js/main.js`. There's enough page-to-page duplication (header/footer markup) that a real templating system isn't worth the added tooling for a site this size — copy the existing header/footer block when adding a page rather than introducing one.
- `assets/js/dev-mode.js` is the production default (`DEV_MODE = false`), committed as-is. `dev-server.js` intercepts that one path locally and serves a generated version instead — see the comment at the top of `dev-server.js`.

## Adding or retiring a project card

The projects list has four sections, in this order:

- **Featured**: the flagship projects (currently the StuxieDev Website, RoboStux, and Sm.lol)
- **More projects**: other apps, mods, and sites with their own home
- **Scripts & smaller bits**: scripts, bot cogs, and small utilities, shown as compact cards (44px icons)
- **Discontinued**: retired projects (see step 4)

1. Add/update the entry in the README's project table
2. Add/update the matching `<article class="project-card">` block in `index.html`
3. Drop a logo/icon into `assets/img/projects/` if the project doesn't already have a suitable square icon there
4. **One badge per card**, above the description, from the card's `data-state` (space-separated; the first that applies wins: `discontinued`, `template`, `maintenance`, `soon`). Render the matching badge in the HTML, e.g. `<span class="badge-status soon"><i class="badge-ico" aria-hidden="true"></i>Coming soon</span>` (Maintenance uses `maintenance`, Template `template`, Discontinued `discontinued`; `main.js` re-resolves it if a card lists several). Each badge shows exactly one icon: Coming soon a rocket, Maintenance a wrench, the live states a status dot, Template and Discontinued none.
5. **Live status:** with no `data-state`, a card with `data-monitor="<slug>"` (a monitor slug from `StuxieDev/Status`'s `.githup.yml`) gets one live badge from `main.js`, read from `https://raw.githubusercontent.com/StuxieDev/Status/main/data/summary.json`: Online, Degraded or Offline. Add `<span class="badge-status live" hidden></span>` above the description; don't hard-code a "Live" badge. No monitor, or status unavailable: no badge.
6. When a project is discontinued, move its card into the "Discontinued" section: add the `discontinued` class, set `data-state="discontinued"` on the card and use the `<span class="badge-status discontinued">` badge, drop any dead Website link, and add a one-line `<p class="discontinued-note">` saying why

## Legal pages

All six live under `legal/` (`privacy`, `terms`, `cookies`, `imprint`, `disclaimer`, `opt-out`), each its own folder with an `index.html`, linked from the hub at `legal/index.html`. Keep the six in sync with what the site actually does — if analytics or a form is ever added, the privacy/cookies pages need a real update, not a copy-paste from another project.

## Versioning and changelog

- The version lives in `VERSION.md` (a bare version string) — bump it on every release
- Every release gets a `CHANGELOG.md` entry using `### Added` / `### Changed` / `### Fixed` subsections — never a bare bullet list directly under a version heading
- `commit.sh` (bash) and `commit.bat` (Windows) read `VERSION.md` and handle the commit + `git tag` for you — don't hand-write the release commit or tag

## Before committing

- Open changed pages in a browser via `./dev-server.sh` and click through — this project has no automated test suite, so a live check is the only real verification
- Check both the dev-mode banner (default) and `--no-dev-mode` behave as expected if you touched `dev-server.js` or `assets/js/dev-mode.js`
- Only link a repository if it is public: no "Repository" link on a card for a private or missing repo. Run `scripts/check-repo-links.sh` (needs `gh`) to list linked repos that are not public
