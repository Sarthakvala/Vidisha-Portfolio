'use client';

import { education } from '@/lib/content';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section className={styles.section} id="education">
      <div className={styles.wrap}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Education</span>
          <h2 className={styles.title}>Academic foundation.</h2>
        </div>
        <div className={styles.grid} data-stagger>
          {education.map((edu) => (
            <div className={styles.card} key={edu.school}>
              <div className={styles.meta}>
                <span className={styles.icon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <span className={styles.year}>{edu.year}</span>
              </div>
              <h3 className={styles.school}>{edu.school}</h3>
              <p className={styles.degree}>{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
