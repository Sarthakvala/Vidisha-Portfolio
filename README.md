# Vidisha Todkar — Portfolio

Portfolio site for a Senior Brand & Growth Strategist. Single page, fourteen
sections, built as an editorial poster rather than a product landing page.

**Stack:** Next.js 16 (App Router) · React 19 · JavaScript · GSAP 3.15 · Lenis 1.3
· CSS Modules. No CSS framework, no component library.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The site runs at `http://localhost:3000`. `npm run build` produces a static
prerender; there is no server runtime and no environment configuration.

## Design system — "the minimalist ledger"

The visual direction is a reference-locked synthesis, not a template. Its rules
are deliberately narrow, and they are the reason the page looks the way it does:

- **Hairline rules carry the structure.** There are no cards. Separation comes
  from 1px dividers and spacing.
- **Zero shadows.** Depth is line work and scale. Nothing is elevated.
- **0px radius everywhere** except buttons and tags, which are full pills.
- **One typeface.** Switzer at weights 300 and 400, self-hosted. Hierarchy comes
  from scale and negative tracking, never from adding weights or families.
- **Colour is rationed.** The canvas is Bone White `#fffef7`, text is ink and
  graphite. The hero spends its entire accent budget on one powder-blue plate.

Tokens live in `app/globals.css`. The source extraction is in
`design/reference/` (`tokens.json`, `variables.css`, `theme.css`) — those three
carry identical values, so use whichever format fits what you are writing.

Dark mode is a derivation, not a second system: the neutral ramp inverts to a
Navy Ink canvas and everything else — type scale, spacing, radii, the no-shadow
rule — stays identical.

### Reference lock

Primary reference is **Odin's Crow** for the ledger structure. Bounded borrows:
**Gustavo Faria** for the 1px-divided column and the portrait-as-single-colour
plate, **Christopher Ireland** for the split hero with the photograph contained
rather than full-bleed. Details and rationale are in `STATUS.md`.

## Motion

`lib/animations.js` is a single module — "the press impression". Type is
uncovered from behind its own baseline, hairlines draw at even pressure,
numerals count into place. There is no spring or overshoot anywhere, on purpose.

Two contracts matter if you touch it:

1. **Reduced motion is gated at the source.** The module returns before any
   tween exists, so GSAP never writes a from-state.
2. **Nothing in CSS hides content at rest.** If this module never runs, the page
   still renders fully visible. Do not add hidden from-states to stylesheets.

It finds its targets by class and data attribute — `data-poster-lines`,
`.poster-line`, `.rule-draw`, `.hero-stat`, `.stat-number`, `data-count`,
`data-stagger`, `.reveal`. Renaming any of them silently kills the animation.

## Content is load-bearing

Every metric, award, date, job title and testimonial on this site is a claim
about a real person's professional record. Copy lives in `lib/content.js`.

**Do not invent or reword it during a design pass.** A previous pass generated
ten fictional brand-strategy narratives with invented metrics and they had to be
removed. If a design idea requires copy that does not already exist in
`lib/content.js` or in git history, the idea loses.

The same applies to brand marks. Cleaned, transparent logos are in
`public/assets/logos/`. Three brands have no source file and render as approved
name-plate placeholders — they are not to be traced or approximated.

## Project docs

- `STATUS.md` — current state, what is done, what is next, open decisions
- `REDESIGN-BRIEF.md` — the content, section-order and logo contract
- `design/reference/` — design tokens in three formats

## Known gaps

Tracked in `STATUS.md`, briefly: the fourteen non-hero sections inherit the
corrected tokens but are still composed as cards; the case-study accordion
clips at a hardcoded `max-height`; the testimonial carousel auto-advances
without a pause control (WCAG 2.2.2); there is no test suite.
