<p align="center">
  <img src="assets/img/logo.svg" width="172" alt="StuxieDev Projects">
</p>

# StuxieDev Projects

### *An index of things built by [StuxieDev](https://stuxie.dev).*

[StuxieDev Projects](https://projects.stuxie.dev) is a small, static, no-build-step website that links out to everything else — game mods, automation tools, and utilities, each with its own repository and its own site.

- Plain HTML, CSS, and JavaScript — no framework, no bundler, no dependencies to install
- Deployed to [GitHub Pages](https://pages.github.com/) via `.github/workflows/pages.yml`
- No accounts, no ads, no tracking scripts

---

## Projects listed here

| Project | What it is | Site | Repo |
|---|---|---|---|
| StuxieDev Website | StuxieDev's home: portfolio, work history, and links to everything else | [stuxie.dev](https://stuxie.dev) | — |
| RoboStux | All-in-one Discord bot: moderation, utilities, fun, and automation | [robo.st](https://robo.st) | [RoboStux](https://github.com/RoboStux) (org) |
| Sm.lol | All-in-one linking service: short links, bio pages, QR codes | [sm.lol](https://sm.lol) | — |
| StuxieDev Archives | Archive of retired StuxieDev projects | [archives.stuxie.dev](https://archives.stuxie.dev) | [StuxieDev/Archives](https://github.com/StuxieDev/Archives) |
| TIGHC | The Intiface Game Haptics Controller | [tighc.stuxie.dev](https://tighc.stuxie.dev) | [TIGHC/Engine](https://github.com/TIGHC/Engine) |
| TS4RLS | The Sims 4 Random Loading Screen | [ts4rls.stuxie.dev](https://ts4rls.stuxie.dev) | [TS4RLS/Engine](https://github.com/TS4RLS/Engine) |
| TWRAR | The Website Recorder And Replayer | [twrar.stuxie.dev](https://twrar.stuxie.dev) | [TWRAR/Engine](https://github.com/TWRAR/Engine) |
| Fix Blank Steam Icons | Restores blank Steam shortcut icons from Steam's CDN | — | [StuxieDev/Fix-Blank-Steam-Icons](https://github.com/StuxieDev/Fix-Blank-Steam-Icons) |
| PokeFusion | Pokémon Infinite Fusion playground (discontinued and archived; its upstream sprite assets were taken down) | — | [StuxieDev/pokefusion](https://github.com/StuxieDev/pokefusion) |
| StuxCogs | Cogs for Red-DiscordBot | — | [StuxieDev/StuxCogs](https://github.com/StuxieDev/StuxCogs) |
| git-scripts | Bash helpers for rewriting Git history | — | [StuxieDev/git-scripts](https://github.com/StuxieDev/git-scripts) |
| CU Classification Calculator | Coventry University degree classification calculator | — | [StuxieDev/coventry-university-classification-calculator](https://github.com/StuxieDev/coventry-university-classification-calculator) |

This table (and the matching cards on the site) is the source of truth for what's featured — update both together when a project is added, retired, or renamed.

## Local development

```
./dev-server.sh          # http://127.0.0.1:8080, DEV_MODE forced on
./dev-server.sh 3000 --no-dev-mode
```

On Windows, use `dev-server.bat` instead. No `npm install` needed — the dev server is a single dependency-free Node script (`dev-server.js`); Node just needs to be installed. See [CONTRIBUTING.md](CONTRIBUTING.md) for more.

## Releasing

1. Update `CHANGELOG.md`
2. Bump `VERSION.md`
3. Update this README if relevant
4. Run `./commit.sh` (or `commit.bat`) — it reads `VERSION.md`, commits, and tags `vX.Y.Z`
5. `git push origin main --tags`

## License

&copy; 2026 StuxieDev. All rights reserved. This repository is not licensed for reuse or redistribution.
