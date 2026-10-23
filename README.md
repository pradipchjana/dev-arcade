# Pradip's Dev Arcade

A playable arcade of games and algorithm visualisations, built from my own projects:
- `js-practice` — Tic-Tac-Toe, Game of Life, Sierpiński fractal, sorting, recursion and daily
  coding-exercise demos
- `suduku-solver`, `chess-bitboard-cli`, `dashboard-nextJs`, `uno`, `pokemon-card` — linked as
  standalone projects

Static site, no framework, no bundler, no backend. Deployed via GitHub Pages.

Source logic reused from other repos is copied (not imported) into `scripts/lib/`, with each file
noting its original source. The source repos themselves are never modified.

See [Plan.md](Plan.md) in this repo for full scope, audit findings and design decisions.

## Running locally

No build step. Either open `index.html` directly in a browser, or serve it with any static file
server, e.g.:

```sh
npx serve .
```

## Adding a new game or visualisation

1. Put any pure, reusable logic in `scripts/lib/<name>-logic.js`. If it's ported from another
   repo, add a comment linking back to the original source file.
2. Put the DOM/canvas rendering and event wiring in `scripts/games/<name>.js` or
   `scripts/playground/<name>.js`, exporting a single `init<Name>(root)` function.
3. Add a card with a `<div id="<name>-root"></div>` to the relevant section in `index.html`.
4. Import and call `init<Name>` from `scripts/main.js`.
