# Changelog

All notable changes to StuxieDev Projects are documented here. The format is
based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
