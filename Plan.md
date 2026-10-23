# Plan: Improve Dev Arcade

Status: **proposal — findings only, no implementation files changed**

## 1. Current implementation summary

`dev-arcade` is a static site (no framework, no bundler, no backend) with 9 commits on `main`:
scaffold → Tic-Tac-Toe → Game of Life → Fractal Lab → Sorting Visualiser → Recursion Explorer →
Sudoku link → About Me + responsive pass.

Structure:
```
index.html                  single page, 5 sections (About, Contributions, Dev Arcade,
                             Algorithm Playground, Projects)
styles/tokens.css            design tokens (colour, spacing, fonts, reduced-motion)
styles/base.css              layout, cards, buttons, canvas, mobile breakpoint
styles/a11y.css              focus states, skip link, visually-hidden
scripts/main.js              wires up each demo on DOMContentLoaded
scripts/games/               tic-tac-toe.js, game-of-life.js (DOM/canvas UI layer)
scripts/playground/          fractal-lab.js, sorting-visualiser.js, recursion-explorer.js
scripts/lib/                 pure logic ported from js-practice, each file comments its source
README.md                    project description, links to js-practice/Plan.md
```

Every game/visualisation's pure logic lives in `scripts/lib/*-logic.js`, copied (not imported)
from `js-practice` with a disclosure comment pointing at the original file. The UI layer
(`scripts/games/*`, `scripts/playground/*`) is new code written for this project.

## 2. Strongest parts worth preserving

- **The lib/UI split.** Pure logic is small, disclosed, and testable in isolation (verified
  insertion/merge sort against each other, factorial/reverse against the originals' own test
  cases before committing). Keep this pattern for any new demo.
- **No framework, no build step.** Matches the stated constraint and keeps the site trivially
  easy to run locally (`open index.html` or any static server).
- **Accurate, non-inflated Projects section.** Descriptions are plain and honest (e.g.
  "chess-bitboard-cli... not true bitboards despite the repo name") — this tone should extend to
  any new section rather than being diluted.
- **Design tokens + `prefers-reduced-motion` wired at the token layer** (`--transition-fast: 0ms`
  under reduced motion) rather than scattered per-component.

## 3. Confirmed issues

Checked directly, not guessed:

1. **GitHub Pages is not live.** `https://pradipchjana.github.io/dev-arcade/` returns `404`. I
   can't enable it via `gh api` — my CLI is authenticated as a different GitHub account than
   `pradipchjana` and gets `404 Not Found` on the Pages API for this repo (confirmed by testing).
   This needs to be enabled manually in repo settings, or you can grant API access.
2. **README's `Plan.md` link is broken, and doubly so.** `README.md` links to
   `../js-practice/Plan.md` — a relative path that only resolves if both repos are checked out
   as sibling folders locally. On GitHub itself this link 404s regardless, since `dev-arcade` and
   `js-practice` are separate repos with no relative path between them. On top of that,
   `Plan.md` in `js-practice` was **never committed or pushed** — `git status` there shows it as
   an untracked file, so `gh api repos/pradipchjana/js-practice/contents/Plan.md` also 404s. The
   link has been broken since it was written.
3. **`simple_weather`'s GitHub Pages is not actually live** — `https://pradipchjana.github.io/simple_weather/`
   returns `404`. My first audit pass assumed it was live without checking the URL directly; that
   was wrong and the Projects section should not claim or imply a working demo for it.
4. **`pokemon-card`'s Pages *is* confirmed live** (`200`) — this one's fine as linked.
5. **An unrelated uncommitted local edit exists in `js-practice/games/game_of_life.js`** (toggling
   which hardcoded grid pattern is active). This isn't something I made — flagging it so it isn't
   silently lost, but it's your file and I haven't touched it.

## 4. Unverified concerns (flagging, not claiming)

- I cannot render the page in an actual browser from this environment, so console errors, visual
  layout at specific breakpoints, and real screen-reader behaviour are **not verified** — only
  `node --check` syntax validation and manual code review have been done on the JS, and manual
  reading of the CSS/HTML for obvious issues. Once Pages is live, a real browser pass is needed.
- `dashboard-nextJs` and `uno` — I have not re-verified these build cleanly or that their READMEs
  still match reality since the first audit pass (last commit dates: Jun 2026 for both). Still
  link-only in this plan, so low risk either way.
- Keyboard operability gap: the Game of Life canvas's click-to-edit (drawing cells before
  pressing Play) has no keyboard equivalent. The core play/pause/reset/speed controls are all
  real `<button>`/`<input>` elements and are keyboard-operable; only the optional freehand editing
  is mouse-only.

## 5. Profile-wide inventory (re-verified, supersedes the equivalent section in the old
   `js-practice/Plan.md`)

No new repositories have appeared since the last audit (still 24 repos total). Two corrections
and one new finding from this pass:

| Repo | Status | Correction / new finding |
|---|---|---|
| `aoc-cli-leaderboard` | confirmed, not AoC solutions | Contains only `advent_code.js` (fetches your *private leaderboard* via `AOC_SESSION` cookie) and a `calculateScore.js` tally script — **no actual puzzle solutions**, just leaderboard tooling. Correctly excluded, and now for the more precise reason: there's no "Problem Solving" content here, not only a security concern. |
| `js-practice/day1`–`day6` | **new finding** | Daily practice exercises (not labelled Advent of Code or Project Euler): `day1` (first program, rounding), `day2` (odd/even, vowel check, number comparison), `day3` (binary converter, substring count), `day4` (digit counting, factorial, prime check, digit sum), `day5` (arithmetic progression, fibonacci, password checker), `day6` (longest run, vowel island). Several have paired `.md` writeups. These are genuine small algorithm exercises, closer in spirit to a "Problem Solving" section than to the existing Arcade/Playground, but they're uncurated bootcamp-style katas, not full AoC/Project Euler solutions — your message mentions those by name but **no repository anywhere on the profile actually contains Advent of Code or Project Euler solutions**. I did not find any; not assuming they don't exist, just reporting what's visible. |
| `simple_weather` | correction | Pages **not live** (404, see §3) — downgrade to "source link only, no demo claim" if kept. |
| `pokemon-card` | confirmed | Pages live (200) — demo link claim is accurate. |
| Everything else (`suduku-solver`, `chess-bitboard-cli`, `dashboard-nextJs`, `uno`, `HotelApp`, `js-animation-learning`, `la-la`, `code-review-system`, `bootcamp`, `rover-example`, `mockito-example`, `java-basic-handson`, `webcomponet`, `shell-practice`, `mfr-practice`, `learn-github-and-git`, `back_up`, `protfolio`, `Ecomerce_eshop`, `gofood`) | unchanged | Same assessment as the original profile-wide audit — see `js-practice/Plan.md` §1b for the full table (recommend committing that file so this link stops being broken, see §6 below). |

**No p5.js repository exists on the profile** — consistent with your note that the sketches live
in the p5.js Web Editor, not GitHub. I have not invented or guessed at their content.

## 6. How p5.js sketches could fit in, once available

The p5.js Web Editor can produce a shareable link per sketch (`editor.p5js.org/<user>/sketches/<id>`)
and/or exported `.zip`/embeddable `iframe` snippets. Two realistic options once you have those
links, in order of preference:

1. **Link-only "Creative Coding" section** (lowest effort, zero risk): a card per sketch with its
   name, a one-line description (from you, not invented), and a link to the p5.js Web Editor page.
   Matches the existing "link out, don't duplicate" pattern already used for Uno/dashboard-nextJs.
2. **Embedded via `<iframe>`** pointing at the p5.js Web Editor's embed URL for a published sketch
   (p5.js Web Editor supports `.../embed` URLs for public sketches). This keeps the sketch's source
   of truth in the Editor (no code copied into `dev-arcade`), while still rendering inline. Only
   viable for sketches you've explicitly made public in the Editor — private/unlisted sketches
   won't embed.

I won't pursue either until you share the actual sketch links — no placeholder "Creative Coding"
cards will be added before that.

## 7. Prioritised proposed changes for Phase 2 onward

1. **Fix the broken `Plan.md` link (highest priority, lowest risk).** Either commit/push
   `Plan.md` in `js-practice` so the link resolves, or stop linking across repos and instead keep
   a copy of the planning doc in `dev-arcade` itself (this file). Recommend: keep per-repo
   plans in their own repos, and have `dev-arcade`'s README link to `js-practice`'s GitHub file
   view URL (not a relative path) once it's actually committed there.
2. **Get Pages live on `dev-arcade`.** Nothing else in Phase 2/3 is demoable externally until
   this is enabled (manually, in repo settings, since my CLI can't do it for this account).
3. **Correct the `simple_weather` claim** — link as source-only, not as a live demo, until/unless
   Pages is actually enabled there too.
4. **Add a "Problem Solving" section using `js-practice/day1`–`day6`**, but curated, not a dump of
   all 20+ files — pick a handful of the more interesting/complete ones (candidates: prime number
   check, fibonacci, password checker, vowel island, longest run) with the same disclosed-copy
   pattern already used for the Arcade/Playground, each copied into `scripts/lib/` with a source
   comment. This directly answers the brief's "coding challenges and experiments" ask using real,
   verified content instead of inventing AoC/Project Euler work that doesn't exist on the profile.
5. **Creative Coding section: deferred**, pending your p5.js sketch links (see §6).
6. **Keyboard support for Game of Life's click-to-edit**, to close the one confirmed a11y gap
   (e.g. focusable grid cells with arrow-key navigation and Space/Enter to toggle) — small, scoped
   fix, not a redesign.
7. **README rewrite**: fix the broken link, add "run locally" instructions (there is currently no
   documented way to run the site — it's a static page, so `open index.html` or
   `npx serve .` is enough, but it isn't written anywhere), and a short "how to add a project"
   section for future you.

## 8. Explicit non-goals for this phase

- No implementation files (`index.html`, `styles/*`, `scripts/*`) are changed in this response.
- No p5.js content is invented, guessed, or stubbed in before real links are provided.
- No claim is made that Pages is live anywhere it was not independently verified with `curl`.
- No existing repository is modified by this plan (the `js-practice` uncommitted change noted in
  §3.5 is pre-existing and not touched).
- No commits, pushes, or deployments happen until you approve this plan.

## 9. Coordinated plan: profile README ↔ Dev Arcade

Two separate repositories, inspected separately, no assumption that either auto-updates the other.

**`pradipchjana/pradipchjana` (profile README) — current state, re-verified just now:**
- 5 commits on `main`, working tree clean, nothing uncommitted.
- Current sections: Typing-SVG header, About Me (real bio: Thoughtworks, Taylor & Francis,
  Customer Operations), Contribution Snake (`output` branch SVG, confirmed working), Tech Stack
  (6 categorised badge groups), GitHub Stats widgets, Reach Me (placeholder email/LinkedIn/Twitter
  links — `your.email@example.com` etc. were never filled in with real handles).
- **No mention of Dev Arcade anywhere yet.**

**Status: implemented.** `https://pradipchjana.github.io/dev-arcade/` was verified live (`HTTP 200`,
correct `<title>`, Problem Solving section present in the deployed HTML) before any link was added.
The profile README now has a "🕹️ Dev Arcade" section linking to it (commit `fc11c52`).

**Proposed division of responsibility:**
- **Profile README** = introduction + directory. Short bio (already good, keep as-is), tech stack
  (already good, keep as-is), and **one new short section** — "🕹️ Dev Arcade" — a 2-3 line
  description plus a single link to the live Dev Arcade URL, placed between About Me and
  Contribution Snake (or right after Contribution Snake). Not a list of every game; that duplicates
  the website and violates "concise... not a copy of the entire website."
- **Dev Arcade** = the actual interactive destination. No change needed to its structure for this
  purpose, but it should link *back* to the profile (already does, via the footer and new About
  section added in §7's predecessor work) and to each project's real source repo (already does, in
  the Projects section).

**Exact files that would change, once approved and once Pages is confirmed live:**

| Repo | File | Change |
|---|---|---|
| `pradipchjana/pradipchjana` | `README.md` | Insert a new "🕹️ Dev Arcade" section with a 2-3 line description and a link to the verified live URL. Optionally fill in the placeholder Reach Me links if you provide real ones — not changed otherwise. |
| `pradipchjana/dev-arcade` | `index.html` | No structural change required — footer and About section already link to `github.com/pradipchjana` and `github.com/pradipchjana/pradipchjana`. If you want a more prominent "back to profile" link, that would be a one-line addition near the header. |
| `pradipchjana/dev-arcade` | `Plan.md` | This file — mark the coordinated plan as implemented once both sides are done. |

**Sequencing was followed:** Pages was enabled, verified with `curl` (`200`), then the profile
README was updated — in that order — so no unverified link was ever shipped.

## 10. Open questions

1. Do you want `Plan.md` (the full profile audit) committed into `js-practice`, or should
   `dev-arcade` be self-contained with its own planning doc (this file) and just stop linking
   across repos?
2. Can you enable Pages on `dev-arcade` (Settings → Pages → Source: Deploy from a branch → `main`
   → `/root`) so Phase 3/4 verification can actually test the live site?
3. For the "Problem Solving" section — are the `day1`–`day6` exercises the kind of thing you want
   featured, or would you rather this section wait until you have more substantial
   algorithm-challenge work (real AoC/Project Euler attempts)?
4. When you're ready to share p5.js sketch links, do you have a preference between the link-only
   card and the `<iframe>` embed approach described in §6?
5. Once Pages is live on `dev-arcade`, is the "🕹️ Dev Arcade" section placement (between About Me
   and Contribution Snake) right, or do you want it positioned elsewhere in the profile README?
6. Do you want the placeholder Reach Me links (email/LinkedIn/Twitter) in the profile README fixed
   with real handles as part of this change, or left alone since that's outside this task's scope?
