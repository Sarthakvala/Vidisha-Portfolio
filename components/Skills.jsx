'use client';

import { skills } from '@/lib/content';
import styles from './Skills.module.css';

// One chromatic rupture per DESIGN.md: "never more than one in a row".
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
          {skills.map((skill, i) => {
            const colors = ['var(--cat-coral)', 'var(--cat-purple)', 'var(--cat-cyan)', 'var(--cat-yellow)', 'var(--cat-pink)'];
            const catColor = colors[i % colors.length];

            return (
              <div
                className={styles.card}
                key={skill.title}
                data-category-color={catColor}
              >
                <div className={styles.icon} data-category-color={catColor}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={skill.icon} /></svg>
                </div>
                <h3 className={styles.cardTitle}>{skill.title}</h3>
                <div className={styles.chips}>
                  {skill.chips.map((chip) => (
                    <span className={styles.chip} key={chip} data-category-color={catColor}>{chip}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
