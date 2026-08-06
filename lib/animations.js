'use client';

import { useEffect } from 'react';

/* ============================================================
   GSAP + SCROLL ANIMATIONS (client only)

   Reduced motion is handled here rather than in each section's
   stylesheet. GSAP writes its from-state as an inline style, so a
   section that only guards itself in CSS has to fight that inline
   value with !important. Gating at the source means the from-state is
   never written at all, and sections stay plain.
   ============================================================ */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Paint every animated element in its final state, without animating. */
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

      gsapInstance.registerPlugin(ScrollTrigger);

      // Smooth scroll
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);
      tickerCallback = (time) => lenisInstance.raf(time * 1000);
      gsapInstance.ticker.add(tickerCallback);
      gsapInstance.ticker.lagSmoothing(0);

      // Reveal animations
      document.querySelectorAll('.reveal').forEach((el) => {
        gsapInstance.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Stagger children
      document.querySelectorAll('[data-stagger]').forEach((container) => {
        gsapInstance.fromTo(container.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animated counters
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (Number.isNaN(target)) return;
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsapInstance.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // Hero headline reveal
      const heroH1 = document.querySelector('.hero h1');
      if (heroH1) {
        gsapInstance.fromTo(heroH1,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Hero stats stagger
      const heroStats = document.querySelectorAll('.hero-stat');
      if (heroStats.length) {
        gsapInstance.fromTo(heroStats,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
        );
      }

      // Parallax for section headers
      document.querySelectorAll('.section-header').forEach((header) => {
        gsapInstance.to(header, {
          y: -20,
          scrollTrigger: {
            trigger: header,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
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
