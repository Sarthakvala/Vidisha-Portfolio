'use client';

import { trustBrands } from '@/lib/content';
import styles from './Hero.module.css';

/* Cleaned, background-stripped, transparent PNGs normalised to 160px
   optical height. Complan, Netflix and Tata Steel have no source file —
   they render as approved name-plate placeholders, not fabricated marks. */
const LOGO_FILES = {
  'RuPay': 'rupay.png',
  "Johnson's Baby": 'johnsons-baby.png',
  'Flipkart': 'flipkart.png',
  'Amazon': 'amazon.png',
  'Red Bull': 'red-bull.png',
  'ZEE5': 'zee5.png',
  'Navratna': 'navratna.png',
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <span className={styles.eyebrow}>Senior Brand &amp; Growth Strategist</span>

        {/* Display Poster Headline: takes the full page measure, never the
            width of a column — that is what keeps it to two lines. */}
        <h1 className={styles.headline}>
          I don&apos;t sell decks.<br />
          I sell <span className={styles.headlineAccent}>decisions.</span>
        </h1>

        <div className={styles.rule} />

        <div className={styles.grid}>
          <div>
            <p className={styles.sub}>
              8+ years turning consumer tension into commercial growth. Architect of a strategy that took{' '}
              <strong>15% market share</strong> off Visa &amp; Mastercard, and a{' '}
              <strong>Cannes Lions 2026</strong>-shortlisted campaign that trained{' '}
              <strong>200,000+ midwives</strong> across India.
            </p>
            <div className={styles.ctas}>
              <a href="#cases" className={`${styles.btn} ${styles.btnPrimary}`}>View Case Studies</a>
              <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>Get in Touch</a>
            </div>
          </div>

          {/* .hero-stat / .stat-number / data-count / data-suffix are GSAP
              query hooks in lib/animations.js — do not rename or remove. */}
          <div className={styles.stats}>
            <div className={`hero-stat ${styles.stat}`}>
              <span className={`stat-number stat-number--lg ${styles.statNumber}`} data-count="15" data-suffix="%">0%</span>
              <p className={styles.statLabel}>Market Share Growth<br />vs Visa &amp; Mastercard</p>
            </div>
            <div className={`hero-stat ${styles.stat}`}>
              <span className={`stat-number stat-number--lg ${styles.statNumber}`} data-count="200" data-suffix="K+">0</span>
              <p className={styles.statLabel}>Midwives Trained<br />Across 91% of India</p>
            </div>
            <div className={`hero-stat ${styles.stat}`}>
              <span className={`stat-number stat-number--lg ${styles.statNumber}`} data-count="55" data-suffix="+">0</span>
              <p className={styles.statLabel}>Brand Strategies<br />Architected</p>
            </div>
            <div className={`hero-stat ${styles.stat}`}>
              <span className={`stat-number stat-number--lg ${styles.statNumber}`} data-count="4" data-suffix={'×'}>0</span>
              <p className={styles.statLabel}>Benchmark Beat<br />on Consideration</p>
            </div>
          </div>
        </div>

        <div className={styles.trust}>
          <span className={styles.trustLabel}>Brands I&apos;ve Built Strategy For</span>
          <div className={styles.logoGrid} data-stagger>
            {trustBrands.map((brand) => {
              const file = LOGO_FILES[brand];
              return (
                <div className={styles.plate} key={brand}>
                  {file ? (
                    <img
                      src={`/assets/logos/${file}`}
                      alt={brand}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.plateName}>{brand}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
