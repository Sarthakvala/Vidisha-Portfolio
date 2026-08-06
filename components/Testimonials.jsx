'use client';

import { useEffect, useState } from 'react';
import { testimonials } from '@/lib/content';
import styles from './Testimonials.module.css';

const AUTO_ADVANCE_MS = 6000;

export default function Testimonials() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselTotal = testimonials.length;

  // WCAG 2.2.2 — auto-advance stops on hover, on keyboard focus, and whenever
  // the visitor has asked for reduced motion.
  useEffect(() => {
    if (paused) return undefined;

    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselTotal);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [paused, carouselTotal]);

  const active = testimonials[carouselIdx];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.wrap}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Testimonials</span>
          <h2 className={styles.title}>What mentees and colleagues say.</h2>
        </div>

        <div className="reveal">
          <div
            className={styles.carousel}
            role="group"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className={styles.viewport} aria-live="polite" aria-atomic="false">
              <div
                className={styles.track}
                style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div
                    className={styles.slide}
                    key={t.author}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${carouselTotal}`}
                    aria-hidden={i !== carouselIdx}
                  >
                    <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
                    <p className={styles.quoteText}>{t.text}</p>
                    <div className={styles.author}>
                      <strong className={styles.authorName}>{t.author}</strong>
                      <span className={styles.authorRole}>{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className={styles.srOnly} aria-live="polite">
              {`Testimonial ${carouselIdx + 1} of ${carouselTotal}. ${active.author}, ${active.role}.`}
            </p>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => setCarouselIdx((carouselIdx - 1 + carouselTotal) % carouselTotal)}
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className={styles.dots}>
                {testimonials.map((t, i) => (
                  <button
                    type="button"
                    key={t.author}
                    className={`${styles.dot}${i === carouselIdx ? ` ${styles.dotActive}` : ''}`}
                    onClick={() => setCarouselIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === carouselIdx ? 'true' : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => setCarouselIdx((carouselIdx + 1) % carouselTotal)}
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          <p className={styles.footnote}>Full client references available on request.</p>
        </div>
      </div>
    </section>
  );
}
