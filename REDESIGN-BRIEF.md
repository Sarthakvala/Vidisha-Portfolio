# Redesign Brief — Vidisha Todkar Portfolio

Shared contract for every agent working on this revamp. Read this before touching any file.

## The one rule

**Change the design. Do not change the content or the section order.**

Every heading, paragraph, statistic, testimonial, date, job title, metric, award name and
case-study sentence that exists today must still exist afterward, verbatim. If a redesign
idea requires cutting or rewording copy, the idea loses. This is a real person's
professional record.

Section order is locked:

Nav → Hero → About → Work That Won → Awards → Highlights → Experience → Clients →
Case Studies → Skills → Testimonials → Education → At a Glance → Contact → Footer → Back-to-top

## Design direction

**Source of truth: the token files in `design/reference/`** — `tokens.json` (W3C design-token
format), `variables.css` (plain custom properties) and `theme.css` (Tailwind v4 `@theme`). All
three are the same Creative Giants extraction from refero and carry identical values; pick
whichever format fits what you are writing.

`design/reference/DESIGN.md.superseded` is the earlier prose write-up of the same extraction.
Its **token values are still correct and match the files above**. Where prose and tokens
disagree, tokens win.

Its prose was briefly set aside, then reinstated by the client **for motion and animation
work specifically** — the component recipes, interaction notes and do/don't list are fair
game when deciding how something should move. Note that neither the prose nor the Refero
style reference actually specifies a motion system: the extraction's motion section is empty
and its single interaction note is "No background change on hover — only the border darkens
to Ink Black." So motion has to be *designed* in the spirit of the system, not copied from it.
The restraint is the instruction: this is an editorial poster, not a demo reel.

More reference files are expected from the client. Until they arrive, build to the tokens.

Reference sites the client picked: creativegiants.art, portrait.so, destroytoday.com.

This **replaces** the direction in `../implementation_plan.md`, which specified dark-first
amber/gold and explicitly rejected "safe warm cream". That plan is now historical — the client
changed direction. Do not follow it.

### Light mode (default)
Straight from DESIGN.md: Bone White `#fffef7` canvas, Ink Black text, Graphite `#666666`
secondary, weight 300 display type at 54–84px with tight negative tracking, 0px radius on
cards and images, 1440px pill radius on buttons and tags, **no shadows**, chromatic accents
rationed to borders and single-card highlights.

### Dark mode
DESIGN.md is a light-only system, so the dark theme is a derivation, not an invention.
Keep the same type scale, spacing, radii and zero-shadow rule. Invert the neutral ramp only:

- canvas → Navy Ink `#101731` (DESIGN.md's own "Inverted Field")
- primary text → Bone White `#fffef7`
- secondary text → a desaturated bone, not pure Graphite (it goes muddy on navy)
- hairlines → bone at low alpha

The accent palette (magenta `#8a0467`, teal `#03624c`, powder blue `#a5c8eb`, candy pink
`#ffacea`, mint `#a5ebd6`, signal yellow `#ffd001`) stays identical across both modes. Do not
introduce a second accent system for dark.

Wire it as `:root` (light) + `[data-theme="dark"]` overrides, and make sure the theme toggle
and the no-flash inline script in `app/layout.js` still work. **The current default is dark;
flip the default to light** and update the layout.js bootstrap script to match.

## Logo policy — this is a solved problem, do not redesign it

Cleaned, background-stripped, transparent PNGs are already in `public/assets/logos/`:
`amazon, flipkart, johnsons-baby, navratna, red-bull, rupay, zee5` (7 files, normalised to
160px optical height).

Replace the **text** brand names with these images in two places:
1. Hero trust bar — currently `.logo-chip` spans containing text
2. Clients section — currently `.brand-card__name` text

**Every logo sits on a Bone White `#fffef7` plate in BOTH themes.** This is not negotiable and
it is not laziness — it was tested. On a dark canvas the Amazon wordmark (solid black) and the
ZEE5 disc (solid black) disappear entirely, and `filter: brightness(0) invert(1)` collapses
Navratna and Red Bull into unreadable blobs because their marks carry white knockout elements.
A constant light plate is the only treatment that keeps all seven marks legible and unmangled
in both modes. It also matches DESIGN.md's sharp-cornered card-tint surfaces.

- plate radius: 0px (DESIGN.md: cards are sharp)
- resting state: `filter: grayscale(1)`, opacity ~0.75
- hover: `filter: none`, full opacity — this is the rationed colour moment
- never scale a logo to fill its plate; constrain by height and centre it

### Missing logos
Complan, Tata Steel and Netflix have no source files. The client approved **placeholders**.
Render them as a plate of identical size containing the brand name set in the caption style
(12px, weight 400, all-caps, Graphite), so the grid stays even and the gap is obvious and
fillable later. Do not fabricate, trace or approximate these three marks.

The Clients grid also lists Edelweiss, Spotify, NPCI, Disney+ Hotstar, PhonePe and Toothsi,
which have no logo files either — same placeholder treatment. Do not drop them from the grid.

## Technical constraints

- Next.js 16 App Router, React 19, JS (not TS). GSAP 3.15 + Lenis 1.3 already installed.
- Everything lives in `app/page.js` today (835 lines, one `'use client'` component). It is
  being split into `components/` so sections can be worked on independently. Stay inside the
  component you were assigned; do not edit a sibling's file.
- Keep `prefers-reduced-motion` support. Every GSAP reveal must have a no-motion fallback that
  leaves content visible — never ship a section that stays at `opacity: 0` when motion is off.
- Keep the existing accessibility affordances: `aria-label`s, `aria-expanded` on the burger and
  accordions, focus-visible outlines, semantic landmarks.
- No new dependencies without flagging it first.
- No shadows. DESIGN.md is explicit and the current build is full of `--sh-*` glass shadows.
  They all go.

## Known defects to fix while you are in there

- `.cs-expand__body` animates via a hardcoded `maxHeight: '1000px'` inline style. Any case
  study taller than 1000px silently clips. Use a measured height or a grid-rows transition.
- Case-study accordion buttons have no `aria-expanded`.
- The testimonial carousel auto-advances every 6s with no pause-on-hover/focus and no
  `aria-live`. Auto-advancing carousels that cannot be paused are a WCAG 2.2 failure (2.2.2).
- Nav `<a>` elements are the only tab stops for a menu that visually collapses; the mobile menu
  is not focus-trapped and does not close on Escape.
- `next/image` is imported in `page.js` and never used; all images are raw `<img>`. Either use
  `next/image` properly or drop the import.
- The `about__grid` renders an empty `<div />` as its second column.
