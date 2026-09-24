# Changelog

All notable changes to StuxieDev Projects are documented here. The format is
based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v0.3.1

### Changed
- The StuxieDev Website card's tagline changed from "stuxie.dev · Always Developing!" to the fuller "Websites, Games & Apps, Always Developing!", in line with the other featured cards.

## v0.3.0

### Added
- A Featured section of flagship projects: the StuxieDev Website (stuxie.dev), RoboStux, and Sm.lol. Their icons (`stuxiedev-icon.png`, `robostux-icon.png`, `smlol-icon.png`) come from each project's own site, and all three are in the README project table.

### Changed
- StuxieDev Archives, TIGHC, TS4RLS, and TWRAR moved out of Featured into a new "More projects" section.
- Featured cards get a larger icon and an accent border. More projects shows two cards per row.
- Fix Blank Steam Icons moved from Featured to "Scripts & smaller bits", since it's a set of scripts rather than an app. Like the other script cards, it has no status badge, and the section now fits four compact cards per row on desktop.
- Hero project count updated from 9 to 12.

## v0.2.2

### Changed
- PokeFusion's badge changed from "Discontinued" to "Archived", and its note now says the repository is archived on GitHub and read-only. The README entry says the same.

## v0.2.1

### Added
- A "Discontinued" section at the end of the projects list. Its cards are dimmed, with a dashed border and a short note on why the project ended.

### Fixed
- The contact address was `contact@stuxie.dev`. The home page contact button and `CONTRIBUTING.md` now use `hello@stuxie.dev`, and the legal hub and all six legal pages use `legal@stuxie.dev`.
- The v0.2.0 restyle loaded Poppins and Lato from Google Fonts, which contradicted the Cookies Policy's "no third-party fonts" statement. Both fonts are now self-hosted in `assets/fonts/` (latin subset, SIL Open Font License), so the site makes no third-party requests again.
- The legal hub's "Questions about any of this?" link used `--accent-2`, a colour variable the v0.2.0 restyle removed. It now uses `--accent-bright`.
- The StuxieDev Archives icon and logo (`archives-icon.svg`, `archives-logo.svg`) were gold and teal. They now use the StuxieDev Archives colours: a purple-to-pink gradient (`#9b4f96`/`#d60270`) on dark plum `#170b1c`, matching `themes.php` in the Archives repo.

### Changed
- Footer copyright lines now show a year range starting from the repo's first commit (2026), in the same style as the Archives site: "© 2026 StuxieDev" for now, "© 2026–2027 StuxieDev" from next year. The start year is set with `data-year-start` and rendered by `assets/js/main.js`.
- StuxieDev Archives status changed from "Building" to "Live".
- PokeFusion moved from Featured to the new Discontinued section, and its Website link is removed. The upstream repo that hosted its sprite assets was taken down, so the site no longer works. The card and README entry say why.

## v0.2.0

### Added
- New projects on the index: Fix Blank Steam Icons and PokeFusion (featured), plus a "Scripts & smaller bits" section with StuxCogs, git-scripts, and the CU Classification Calculator — each with its own icon tile in `assets/img/projects/`.
- Hero stats row, a contact card, and a `theme-color` meta tag on every page.

### Changed
- The site is now credited to "StuxieDev" alone, without "Leo Ridgwell": hero eyebrow, meta description, every footer copyright line, the disclaimer page, and `README.md`.
- Restyled the site in the purple/pink theme used by stuxie.dev (`#9b4f96` / `#d60270`), with Poppins headings and Lato body text. The old purple/cyan colours in `icon.svg` and `logo.svg` were updated to match.
- Project icons now use separate square `-icon` files (`tighc-icon.png`, `ts4rls-icon.png`, `twrar-icon.png`, `archives-icon.svg`), and the wide logos are kept as `-logo` files.

### Fixed
- Project icons were being stretched and squashed. Icons now sit in a fixed square box with `object-fit: contain` and explicit width/height. Icons with a transparent background (TIGHC) get a backing tile.

## v0.1.2

### Added
- `404.html`: a custom not-found page matching the site's header/footer and dark purple/cyan theme, instead of GitHub Pages' default error page.

## v0.1.1

### Fixed
- `CNAME` pointed at the wrong custom domain, `portfolio.stuxie.dev` — corrected to `projects.stuxie.dev`, matching the site's actual name and every other reference to it.
- `README.md`'s tagline linked "StuxieDev" to its GitHub org page instead of `stuxie.dev`, and referenced the stale `portfolio.stuxie.dev` domain — both corrected.

### Changed
- `README.md`'s tagline was wrapped in `**bold**` — changed to the `### *italic*` heading style used for taglines elsewhere in the family.

## v0.1.0

### Added
- Initial static site: home page with a project index (StuxieDev Archives, TIGHC, TS4RLS, TWRAR), about/skills section, and contact links
- "Boring Legal Stuff" hub at `/legal/` with the six standard sub-pages: privacy, terms, cookies, imprint, disclaimer, opt-out
- `dev-server.js` local dev server (used by `dev-server.sh`/`dev-server.bat`), forcing `DEV_MODE` on by default with a `--no-dev-mode` opt-out
- GitHub Pages deploy workflow (`.github/workflows/pages.yml`)
- Project logo and icon (`assets/img/logo.svg`, `assets/img/icon.svg`)
