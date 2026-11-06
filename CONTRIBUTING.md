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

- **Featured**: the flagship projects (currently the StuxieDev Website, RoboStux, and SNAIRK)
- **More projects**: other apps, mods, and sites with their own home
- **Scripts & smaller bits**: scripts, bot cogs, and small utilities, shown as compact cards (44px icons)
- **Discontinued**: retired projects (see step 4)

1. Add/update the entry in the README's project table
2. Add/update the matching `<article class="project-card">` block in `index.html`
3. Drop a logo/icon into `assets/img/projects/` if the project doesn't already have a suitable square icon there
4. **One badge per card**, above the description, from the card's `data-state` (space-separated; the first that applies wins: `discontinued`, `template`, `maintenance`, `soon`). Render the matching badge in the HTML, e.g. `<span class="badge-status soon"><i class="badge-ico" aria-hidden="true"></i>Coming soon</span>` (Maintenance uses `maintenance`, Template `template`, Discontinued `discontinued`; `main.js` re-resolves it if a card lists several). Each badge shows exactly one icon: Coming soon a rocket, Maintenance a wrench, the live states a status dot, Template and Discontinued none.
5. **Live status:** with no `data-state`, a card with `data-monitor="<slug>"` (a monitor slug from `StuxieDev/Status`'s `.githup.yml`) gets one live badge from `main.js`, read from `https://raw.githubusercontent.com/StuxieDev/Status/main/data/summary.json`: Online, Degraded or Offline. Add `<span class="badge-status live" hidden></span>` above the description; don't hard-code a "Live" badge. No monitor, or status unavailable: no badge.
6. **The hero eyebrow is a live status badge too:** `data-status-eyebrow="stuxiedev:*"` (the whole status page, or `<source>:<slug>` for one monitor) gives it a status badge's colour and pulsing dot and appends the state ("StuxieDev · All operational"), linking to status.stuxie.dev. It keeps the eyebrow's size and shape, and stays a plain eyebrow if the status can't load. Keep its `<span class="eyebrow-state" hidden></span>`.
7. When a project is discontinued, move its card into the "Discontinued" section: add the `discontinued` class, set `data-state="discontinued"` on the card and use the `<span class="badge-status discontinued">` badge, drop any dead Website link, and add a one-line `<p class="discontinued-note">` saying why

## Legal pages

All six live under `legal/` (`privacy`, `terms`, `cookies`, `imprint`, `disclaimer`, `opt-out`), each its own folder with an `index.html`, linked from the hub at `legal/index.html`. Keep the six in sync with what the site actually does — if analytics or a form is ever added, the privacy/cookies pages need a real update, not a copy-paste from another project.

## Branches and pull requests

- `main` is what's live. Nothing is pushed to it directly: it only changes when a pull request is merged, and GitHub
  protects it so that can't be skipped.
- `test` is the working branch. Commit there (or on a branch off it) and push it; CI runs on every push and on every
  pull request.
- To release, follow the release steps on `test`, push `test` with its tag, and open a pull request from `test` into
  `main`. When it's merged, GitHub Pages publishes it.

## Versioning

This project uses [Date Versioning](https://datevers.ing). To release:

1. Add a `## vYY.MM.DD` entry at the top of `CHANGELOG.md`, with its sections in this order: Added, Changed, Fixed, Removed, Security, Deprecated.
2. Set `VERSION.md` to the same bare version (no `v`): today's **UTC** date as `YY.MM.DD`, or `YY.MM.DD-1`, `-2`… for later releases the same UTC day. Never a future date. Use UTC, not local time: just after midnight in the UK it is still the previous day in UTC.
3. Run `bash tests/version.sh`.
4. Run `./commit.sh` (or `commit.bat` on Windows). It checks the version, commits and tags `vYY.MM.DD`, and never pushes.

## Before committing

- Run `node tests/site.test.js` (favicons, embeds, icon files and the changelog renderer) and `bash tests/version.sh`; CI runs both, along with its HTML and local link checks
- Open changed pages in a browser via `./dev-server.sh` and click through: the tests don't cover layout or content, so a live check is still the real verification
- Check both the dev-mode banner (default) and `--no-dev-mode` behave as expected if you touched `dev-server.js` or `assets/js/dev-mode.js`
- Only link a repository if it is public: no "Repository" link on a card for a private or missing repo. Run `scripts/check-repo-links.sh` (needs `gh`) to list linked repos that are not public
