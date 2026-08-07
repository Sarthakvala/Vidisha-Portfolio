# STATUS — Vidisha Todkar Portfolio

## End goal (north star)

A portfolio site that positions Vidisha Todkar as a senior-level Brand & Growth
Strategist credible enough to win remote-first leadership roles across MENA, APAC
and UK/EU. Every design decision is judged against one question: does a hiring
CMO reading this take her more seriously?

The site is the artefact. The proof — Cannes Lions shortlist, 15% RuPay market
share against Visa and Mastercard, 200K+ midwives trained — is already real. The
job is to stop the design from underselling it.

## Current state

Design direction was refined on 2026-08-08 into **"the minimalist ledger"** — a
reference-locked synthesis, approved by the client after an audit found the working
tree had drifted off contract. The token *values* are unchanged (still the Creative
Giants extraction in `design/reference/`); what changed is the structural idea the
tokens hang on.

Reference lock, primary: **Odin's Crow** (odins-crow.com) — hairline rules as the
structural device instead of cards, 0px radius, zero shadows, one typeface carrying
all hierarchy through scale and negative tracking, no accent colour in the primary UI.
Borrowed, bounded: **Gustavo Faria** (gustavo.work) for the 1px-divided ledger column
and the portrait-as-single-chromatic-note plate; **Christopher Ireland**
(christopherireland.net) for the split hero — display type one side, *contained*
photograph the other, divided by a hairline.

Rationale: the proof on this page is numerical and adversarial (15% share taken off
Visa and Mastercard, 200K+ midwives across 91% of India). A ledger is how you present
numbers you want believed; cards make hard numbers look like marketing.

`implementation_plan.md` (dark-first, amber/gold, glassmorphism) remains **superseded**.
`REDESIGN-BRIEF.md` is still the live content and logo contract.

Stack: Next.js 16.3 App Router, React 19, JavaScript, GSAP 3.15 + Lenis 1.3.
No test suite exists.

## Done

- **Audited the pre-redesign build.** One 835-line `'use client'` page component,
  1441-line global stylesheet, dark/amber token system, no version control.
- **Git initialised** and a baseline commit taken, so every agent-authored change
  is revertible. This did not exist before and was the largest single risk.
- **Logo pipeline built and verified.** 7 brand marks background-stripped via
  edge-connected flood fill (not a global colour key, which would have punched holes
  through ZEE5's knocked-out lettering), trimmed and normalised to 160px optical
  height, in `public/assets/logos/`. Amazon's source had a fake-transparency
  checkerboard baked in as real grey pixels; that is gone.
- **Per-logo theme policy settled empirically.** Proof sheets on cream and on navy
  showed Amazon's black wordmark and ZEE5's black disc disappear on a dark canvas,
  and that a `brightness(0) invert(1)` knockout collapses Navratna and Red Bull into
  blobs because those marks carry white knockout elements. Conclusion: logos sit on
  a Bone White plate in **both** themes, grayscale at rest, colour on hover.
- **Component split + token swap.** Page decomposed into 15 section components with
  shared hooks and content extracted to `lib/`. Token layer replaced with the
  DESIGN.md cream system plus a derived dark theme; shadows nulled, radii squared,
  default theme flipped from dark to light. Copy carried over verbatim and verified
  by sliding-window diff against the previous `page.js`. Build green.

- **Caught and reverted an off-contract drift (2026-08-08).** An uncommitted pass had
  replaced the hero and gutted `globals.css` (1,948 → 269 lines) with a "Geniestudio"
  system: `#ebf5ff` canvas, 32px radii, shadows, an `#0069e0` accent palette, weight-500
  display. It also **invented ten brand strategy narratives and metrics** — "+42%
  Advocacy" (Netflix), "4× Consideration" (Amazon), "2.4× Mother Trust" (Complan) and
  others that appear in no commit and no source file, attached to a real person's
  professional record. All of it cut. The original files are backed up outside the repo.

- **Hero rebuilt to the ledger lock.** Split composition: poster headline (Switzer 300,
  clamp to 132px, -0.045em) + verified subhead + two pills on the left; portrait on a
  flat powder-blue plate on the right, divided by a hairline. Below the full-measure
  rule, the four verified KPIs from `lib/content.js` run as ledger rows with 1px
  dividers — no cards. Trust bar restored with the 7 real marks + the 3 approved
  name-plate placeholders. Zero shadows, zero non-pill radii in the section.

- **Motion system reconnected.** The hero had lost every GSAP hook (`data-poster-lines`,
  `.rule-draw`, `.hero-stat`, `.stat-number`, `data-count`, `data-stagger`) — 13 are back.
  The `--motion-*` tokens `lib/animations.js` reads had been deleted from `globals.css`,
  so it was silently running on hardcoded fallbacks; restored.

- **Cross-cutting defects fixed.** Added the missing `<main>` landmark; heading order now
  h1 → h2 (was h1 → h3); the 10 keyboard-unreachable `<div onClick>` tiles and their
  untrapped modal are gone; portrait moved to `next/image` (was a 582 KB PNG upscaled
  from 548px to 704px); `--ink-f` remapped off Ash `#aaaaaa` (2.3:1, a WCAG AA text
  failure in About, Experience and Testimonials) to `#737373`; five hardcoded Navbar
  shadows removed.

## In progress

Nothing in flight.

## Next steps

- Bring the remaining 14 sections onto the ledger system. They currently inherit the
  corrected tokens through the compatibility aliases in `globals.css`, so they are
  legible and on-palette, but they are still composed as cards.
- Fix the known defects still open in siblings: `.cs-expand__body` hardcoded
  `maxHeight: 1000px`, missing `aria-expanded` on case-study accordions, and the
  testimonial carousel's unpausable 6s auto-advance (WCAG 2.2.2 failure).
- Add a `favicon.ico` — currently the only 404 on the page.
- Decide the three missing logos (below).

## Blockers / decisions

- **3 logos missing.** Complan, Tata Steel and Netflix have no source files. Client
  approved name-plate placeholders. The Clients grid additionally lists Edelweiss,
  Spotify, NPCI, Disney+ Hotstar, PhonePe and Toothsi with no marks either — 9 plates
  total are placeholders. Nothing is fabricated or traced.
- **DESIGN.md forbids 3D.** Its imagery rule reads "No illustration, no 3D, no product
  mockups", and all three reference sites are flat editorial. A three.js pass was
  requested; it is on hold rather than dropped, pending a call on which wins.
- **No tests.** Global standard is 80% coverage; this project has no test
  infrastructure at all. Not addressed in this pass.
- **Content is a real professional record.** Metrics, awards, dates and testimonials
  are load-bearing claims about a real person and must never be reworded or invented
  by a design pass. This is no longer hypothetical — see the 2026-08-08 entry above.
  Any new metric or brand outcome must trace to `lib/content.js` or a commit.

- **Animation playback is unverified.** The rest state, the reduced-motion path and the
  hook wiring were all verified directly. Playback was not: the harness browser pane
  runs hidden (`document.hidden === true`, 0 rAF frames/sec), so GSAP writes its
  from-states and the ticker never advances. Confirm the reveals visually in a real
  browser before sign-off.
