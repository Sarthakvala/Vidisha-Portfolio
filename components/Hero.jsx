'use client';

import Image from 'next/image';
import { kpis, trustBrands } from '@/lib/content';
import styles from './Hero.module.css';

/* ============================================================
   HERO — "the ledger of proof"

   Composition is the Christopher Ireland split: display type on the
   left, the portrait as a *contained* piece of curated artwork on the
   right, divided by a hairline. Below the full-width rule, the four
   verified KPIs run as ledger rows in the Gustavo Faria manner — 1px
   dividers, tight vertical rhythm — rather than as stat cards.

   There is not a single card, fill or shadow in this section. Structure
   is carried entirely by rules and scale, which is the primary
   reference's whole argument.

   CONTENT IS LOAD-BEARING. Every string here is a claim about a real
   person's professional record and is carried verbatim from
   lib/content.js or from the committed copy. Do not add a metric, a
   brand outcome or a strategy narrative that is not already sourced
   there — an earlier pass invented ten of them and they had to be cut.
   ============================================================ */

/* Cleaned, background-stripped, transparent PNGs normalised to 160px
   optical height. Complan, Netflix and Tata Steel have no source file —
   they render as approved name-plate placeholders, not fabricated
   marks. See REDESIGN-BRIEF.md; this is a settled decision. */
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
    <section className={styles.hero} id="hero" data-rule-load>
      <div className={styles.container}>

        <div className={styles.split}>
          <div className={styles.lede}>
            <p className={styles.eyebrow}>Senior Brand &amp; Growth Strategist</p>

            {/* Each line is wrapped in a .poster-line mask so
                lib/animations.js can uncover it from behind its own
                baseline. The wrapper spans are block-level — that is what
                does the <br />'s old job. Both are visible at rest; only
                GSAP ever hides them. */}
            <h1 className={styles.headline} data-poster-lines="load">
              <span className="poster-line">
                <span className="poster-line__ink">I don&apos;t sell decks.</span>
              </span>
              <span className="poster-line">
                <span className="poster-line__ink">I sell decisions.</span>
              </span>
            </h1>

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

          {/* The plate is the single chromatic moment in the hero. The
              portrait sits ON it, never inside a rounded frame — 0px
              radius, no shadow, no gradient border.

              next/image handles the format and resize: the source is a
              548px-wide PNG that a previous pass was upscaling to 704px
              and shipping unoptimised at 582 KB. sizes is capped at the
              plate's real maximum so no oversized candidate is served. */}
          <figure className={styles.portrait}>
            <div className={styles.plate}>
              <Image
                src="/assets/Vidisha.png"
                alt="Vidisha Todkar"
                width={548}
                height={544}
                priority
                sizes="(max-width: 900px) 100vw, 460px"
                className={styles.portraitImage}
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              Vidisha Todkar — Brand &amp; Growth Strategy
            </figcaption>
          </figure>
        </div>

        <div className={`${styles.rule} rule-draw`} />

        {/* The ledger. .hero-stat / .stat-number / data-count / data-suffix
            are GSAP query hooks in lib/animations.js — do not rename or
            remove them. The "0" text content is a placeholder the count-up
            replaces; under reduced motion animations.js settles it to the
            final value statically. */}
        <ul className={styles.ledger} data-stagger>
          {kpis.map((kpi) => (
            <li className={`hero-stat ${styles.row}`} key={kpi.label}>
              <span
                className={`stat-number stat-number--lg ${styles.rowValue}`}
                data-count={kpi.value}
                data-suffix={kpi.suffix}
              >
                0{kpi.suffix}
              </span>
              <span className={styles.rowLabel}>{kpi.label}</span>
              <span className={styles.rowDesc}>{kpi.desc}</span>
            </li>
          ))}
        </ul>

        <div className={styles.trust}>
          <h2 className={styles.trustLabel}>Brands I&apos;ve Built Strategy For</h2>
          <ul className={styles.logoGrid} data-stagger>
            {trustBrands.map((brand) => {
              const file = LOGO_FILES[brand];
              return (
                <li className={styles.plateItem} key={brand}>
                  {/* Every mark sits on a Bone White plate in BOTH themes.
                      Tested, not lazy: on a dark canvas the Amazon wordmark
                      and the ZEE5 disc vanish, and a brightness/invert
                      knockout collapses Navratna and Red Bull into blobs.
                      The plate's fixed height also reserves the space, so
                      the varying intrinsic logo widths cannot shift layout. */}
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
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}
