'use client';

import { useEffect } from 'react';

/* ============================================================
   MOTION SYSTEM — "the press impression"

   DESIGN.md documents no motion, so this is designed in the spirit of
   the poster rather than transcribed from it. The governing idea: an
   oversized editorial poster is printed, not assembled. Type is
   uncovered from behind its own baseline, hairlines draw across at even
   pressure, numerals count into place — and nothing overshoots, because
   ink does not bounce. Restraint is the brief.

   Durations and curves are tokens in app/globals.css (--motion-*), read
   once here so the CSS transitions and the GSAP timelines cannot drift
   apart. GSAP has no cubic-bezier parser without the CustomEase plugin
   (not installed), so each token curve is mapped onto the closest named
   GSAP ease below; the pairs are near-identical in shape, which is what
   makes a CSS hover and a GSAP reveal read as one system.

   REDUCED MOTION is gated once, here, before any tween exists. GSAP
   writes its from-state as an inline style, so a section that only
   guards itself in CSS has to fight that inline value with !important.
   Gating at the source means the from-state is never written at all and
   the section stays plain. Nothing in any stylesheet sets opacity: 0 —
   if this module never runs, the page renders fully visible.
   ============================================================ */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/* Token curve -> nearest GSAP named ease.
   --motion-ease-ink  cubic-bezier(0.22, 1, 0.36, 1)  ~ power3.out
   --motion-ease-rule cubic-bezier(0.65, 0, 0.35, 1)  ~ power2.inOut */
const EASE_INK = 'power3.out';
const EASE_RULE = 'power2.inOut';
const EASE_COUNT = 'power2.out';

/* Reveals fire slightly before the element is fully on screen, so the
   motion has finished by the time the reader's eye arrives. */
const START = 'top 85%';
const PLAY_ONCE = { toggleActions: 'play none none none' };

/** Read the motion tokens once. One getComputedStyle at init — never per frame. */
function readMotionTokens() {
  const cs = getComputedStyle(document.documentElement);

  const seconds = (name, fallback) => {
    const raw = cs.getPropertyValue(name).trim();
    const value = parseFloat(raw);
    if (Number.isNaN(value)) return fallback;
    return raw.endsWith('ms') ? value / 1000 : value;
  };

  const pixels = (name, fallback) => {
    const value = parseFloat(cs.getPropertyValue(name));
    return Number.isNaN(value) ? fallback : value;
  };

  return {
    base: seconds('--motion-base', 0.32),
    slow: seconds('--motion-slow', 0.6),
    poster: seconds('--motion-poster', 0.9),
    stagger: seconds('--motion-stagger', 0.06),
    staggerPoster: seconds('--motion-stagger-poster', 0.09),
    lift: pixels('--motion-lift', 12),
  };
}

/**
 * Paint every animated element in its final state, without animating.
 * Only counters need this: their markup ships a placeholder ("0%") that
 * the count-up would otherwise replace. Everything else is already at
 * rest in CSS.
 */
function settleStatically() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (!Number.isNaN(target)) el.textContent = target + suffix;
  });
}

export default function useAnimations() {
  useEffect(() => {
    // Nothing to tear down until init() resolves; without this flag an
    // unmount mid-import leaves the ticker and ScrollTriggers running.
    let cancelled = false;
    let gsapInstance = null;
    let ScrollTrigger = null;
    let lenisInstance = null;
    let tickerCallback = null;

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      settleStatically();
      return undefined;
    }

    async function init() {
      const [gsapMod, stMod, lenisMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);

      if (cancelled) return;

      gsapInstance = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      const Lenis = lenisMod.default;
      const gsap = gsapInstance;

      gsap.registerPlugin(ScrollTrigger);

      const M = readMotionTokens();

      // Smooth scroll. Lenis drives ScrollTrigger off GSAP's ticker, so
      // scroll position is read once per frame by the library rather
      // than by a handler of ours doing layout reads.
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);
      tickerCallback = (time) => lenisInstance.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      /* ----------------------------------------------------------
         1. POSTER LINES — the hero headline.
         Each line sits in an overflow mask, so translating the ink
         inside it by its own height uncovers the line from behind its
         baseline. Transform-only: the mask does the clipping, which is
         cheaper than animating clip-path on large type.
         ---------------------------------------------------------- */
      document.querySelectorAll('[data-poster-lines]').forEach((container) => {
        const ink = container.querySelectorAll('.poster-line__ink');
        if (!ink.length) return;

        const onLoad = container.getAttribute('data-poster-lines') === 'load';

        gsap.fromTo(ink,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: M.poster,
            ease: EASE_INK,
            stagger: M.staggerPoster,
            // Above the fold: the poster is the page's first impression,
            // so it plays on load rather than waiting for a scroll.
            delay: onLoad ? 0.15 : 0,
            scrollTrigger: onLoad
              ? undefined
              : { trigger: container, start: START, ...PLAY_ONCE },
          }
        );
      });

      /* ----------------------------------------------------------
         2. POSTER WIPE — the Contact headline.
         It wraps to an unknown number of lines, so a per-line mask
         would need measuring. Instead the whole block is wiped upward
         with clip-path while the ink lifts a token distance: the same
         gesture as the hero, expressed on a block. The negative bottom
         inset keeps descenders out of the travelling edge.
         ---------------------------------------------------------- */
      document.querySelectorAll('.poster-wipe').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0% -0.12em 0%)', y: M.lift },
          {
            clipPath: 'inset(0% 0% -0.12em 0%)',
            y: 0,
            duration: M.poster,
            ease: EASE_INK,
            scrollTrigger: { trigger: el, start: START, ...PLAY_ONCE },
          }
        );
      });

      /* ----------------------------------------------------------
         3. HAIRLINE RULES — draw across instead of fading in.
         DESIGN.md's only interaction note is that hairlines, not fills,
         carry state. Rules honour that on entry too: scaleX from the
         left at even pressure.
         ---------------------------------------------------------- */
      document.querySelectorAll('.rule-draw').forEach((rule) => {
        gsap.fromTo(rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: M.slow,
            ease: EASE_RULE,
            // The hero rule sits under the headline: let the type land first.
            delay: rule.closest('[data-rule-load]') ? 0.55 : 0,
            scrollTrigger: rule.closest('[data-rule-load]')
              ? undefined
              : { trigger: rule, start: START, ...PLAY_ONCE },
          }
        );
      });

      /* One element gets exactly one from-state. Without this an element
         carrying both a poster treatment and a generic reveal — or one
         sitting inside a staggered container — would have two tweens
         writing conflicting inline styles, and the signature move would
         play out underneath a fade it does not need. */
      const hasPosterTreatment = (el) =>
        el.hasAttribute('data-poster-lines') || el.classList.contains('poster-wipe');

      /* ----------------------------------------------------------
         4. BLOCK REVEALS — the workhorse.
         A short settle, not a throw.
         ---------------------------------------------------------- */
      document.querySelectorAll('.reveal').forEach((el) => {
        if (hasPosterTreatment(el)) return;

        gsap.fromTo(el,
          { opacity: 0, y: M.lift },
          {
            opacity: 1,
            y: 0,
            duration: M.slow,
            ease: EASE_INK,
            scrollTrigger: { trigger: el, start: START, ...PLAY_ONCE },
          }
        );
      });

      /* ----------------------------------------------------------
         5. STAGGERED CHILDREN — grids, ledgers, logo plates.
         Index order is the point: the eye should read the set in
         sequence, the way a contact sheet is scanned.
         ---------------------------------------------------------- */
      document.querySelectorAll('[data-stagger]').forEach((container) => {
        const children = Array.from(container.children).filter((el) => !hasPosterTreatment(el));
        if (!children.length) return;

        gsap.fromTo(children,
          { opacity: 0, y: M.lift },
          {
            opacity: 1,
            y: 0,
            duration: M.slow,
            ease: EASE_INK,
            stagger: M.stagger,
            scrollTrigger: { trigger: container, start: START, ...PLAY_ONCE },
          }
        );
      });

      /* ----------------------------------------------------------
         6. INDEX NUMERALS — the counters.
         These are the site's index numerals: they tick up to the exact
         figure and are written once more on complete, so the value on
         screen is the value in the markup even if the tween is
         interrupted or killed mid-flight.
         ---------------------------------------------------------- */
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (Number.isNaN(target)) return;
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: EASE_COUNT,
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            ...PLAY_ONCE,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
          onComplete: () => {
            el.textContent = target + suffix;
          },
        });
      });

      /* ----------------------------------------------------------
         7. HERO STATS — settle on load, in index order.
         The previous build scaled these from 0.95. Scaling type is a
         demo-reel move and DESIGN.md is explicit that scale belongs to
         hierarchy, not to entrances — so this is a settle only.
         ---------------------------------------------------------- */
      const heroStats = document.querySelectorAll('.hero-stat');
      if (heroStats.length) {
        gsap.fromTo(heroStats,
          { opacity: 0, y: M.lift },
          {
            opacity: 1,
            y: 0,
            duration: M.slow,
            ease: EASE_INK,
            stagger: M.stagger,
            delay: 0.5,
          }
        );
      }

      /* ----------------------------------------------------------
         8. SCROLL-LINKED DRIFT — section headers.
         Barely-there parallax: enough to give the page depth without
         depth, which is the only elevation DESIGN.md permits. Scrubbed
         through ScrollTrigger, so there is no scroll handler of ours
         reading layout per frame.
         ---------------------------------------------------------- */
      document.querySelectorAll('.section-header').forEach((header) => {
        gsap.to(header, {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: header,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Late-loading media (the campaign film, logo plates) changes
      // document height after the triggers were measured.
      ScrollTrigger.refresh();
    }

    init();

    return () => {
      cancelled = true;
      if (gsapInstance && tickerCallback) gsapInstance.ticker.remove(tickerCallback);
      if (lenisInstance) lenisInstance.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

export { useAnimations };
