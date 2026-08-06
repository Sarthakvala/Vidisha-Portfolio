'use client';

import { awards, awardGallery } from '@/lib/content';
import styles from './Awards.module.css';

/* DESIGN.md: "never more than one [chromatic accent card] in a row".
   Index 1 carries the row's single tint; every other card sits on canvas. */
const TINTED_INDEX = 1;

export default function Awards() {
  return (
    <section className={styles.awards} id="awards">
      <div className={styles.inner}>
        <div className={`${styles.titleBlock} reveal`}>
          <span className={styles.eyebrow}>Awards &amp; Achievements</span>
          <h2 className={styles.statement}>Recognized globally.</h2>
        </div>

        <div className={styles.grid} data-stagger>
          {awards.map((award, i) => (
            <article
              className={`${styles.card}${i === TINTED_INDEX ? ` ${styles.cardTint}` : ''}`}
              key={award.title}
            >
              <div className={styles.badge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={award.icon} />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>{award.title}</h3>
              <p className={styles.cardDesc}>{award.desc}</p>
            </article>
          ))}
        </div>

        <div className={styles.gallery} data-stagger>
          {awardGallery.map((img) => (
            <figure className={styles.galleryItem} key={img}>
              <img src={`/assets/${img}`} alt="Award moment" loading="lazy" width={400} height={300} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
