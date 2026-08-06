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

Design direction changed on 2026-08-06. The previous direction (`implementation_plan.md`
— dark-first, amber/gold, Space Grotesk, glassmorphism) is **superseded**. The client
picked an editorial cream direction instead, referencing creativegiants.art,
portrait.so and destroytoday.com, specified in `C:\Users\Sarthak\Downloads\DESIGN.md`.

That plan explicitly rejected "safe warm cream", so it is now historical and should
not be followed. `REDESIGN-BRIEF.md` is the live contract.

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

## In progress

Four agents redesigning sections in parallel, each owning its own components and
CSS Modules so they cannot collide on shared files:

1. Navbar, Hero (+ trust logo bar), Footer
2. About, WorkThatWon, Awards, Highlights
3. Experience, Clients (16-brand logo grid), CaseStudies
4. Skills, Testimonials, Education, AtAGlance, Contact

## Next steps

- Dead-CSS sweep of `app/globals.css` once the modules land — the old global section
  selectors stop matching but still ship.
- Verify in-browser: both themes, responsive breakpoints, GSAP reveals firing,
  reduced-motion, keyboard nav.
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
  by a design pass.
