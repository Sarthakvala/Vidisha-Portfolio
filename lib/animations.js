'use client';

import { useEffect } from 'react';

/* ============================================================
   GSAP + SCROLL ANIMATIONS (loaded on client only)
   ============================================================ */
export default function useAnimations() {
  useEffect(() => {
    let gsapInstance, ScrollTrigger, Lenis, lenisInstance;

    async function init() {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const lenisMod = await import('lenis');

      gsapInstance = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      Lenis = lenisMod.default;

      gsapInstance.registerPlugin(ScrollTrigger);

      // Smooth scroll
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);
      gsapInstance.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsapInstance.ticker.lagSmoothing(0);

      // Reveal animations
      document.querySelectorAll('.reveal').forEach((el, i) => {
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
        const children = container.children;
        gsapInstance.fromTo(children,
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

      // Hero text reveal
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
      if (lenisInstance) lenisInstance.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}

export { useAnimations };
