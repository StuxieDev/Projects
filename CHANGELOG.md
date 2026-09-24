# Changelog

All notable changes to StuxieDev Projects are documented here. The format is
based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
