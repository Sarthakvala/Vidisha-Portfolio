'use client';

import { skills } from '@/lib/content';
import styles from './Skills.module.css';

/* Exactly one chromatic rupture in the grid, per DESIGN.md's "Chromatic
   Accent Card ... never more than one in a row". Index 3 puts it in the
   second row rather than the first, so the eye reaches the catalogue
   before it reaches the colour. */
const ACCENT_INDEX = 3;

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.wrap}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Skills &amp; Expertise</span>
          <h2 className={styles.title}>What I bring to the table.</h2>
        </div>
        <div className={styles.grid} data-stagger>
          {skills.map((skill, i) => (
            <div
              className={`${styles.card} ${i === ACCENT_INDEX ? styles.cardAccent : ''}`}
              key={skill.title}
            >
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={skill.icon} /></svg>
              </div>
              <h3 className={styles.cardTitle}>{skill.title}</h3>
              <div className={styles.chips}>
                {skill.chips.map((chip) => (
                  <span className={styles.chip} key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
