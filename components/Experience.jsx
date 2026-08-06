'use client';

import { experience } from '@/lib/content';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Experience</span>
          <h2 className={styles.title}>Career trajectory.</h2>
        </div>

        <div className={styles.ledger} data-stagger>
          {experience.map((job, i) => (
            <article
              className={`${styles.row}${i === 0 ? ` ${styles.rowCurrent}` : ''}`}
              key={job.date}
            >
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.date}>{job.date}</div>
              <div className={styles.body}>
                <h3 className={styles.role}>{job.title}</h3>
                <div className={styles.company}>{job.company}</div>
                <p className={styles.desc}>{job.desc}</p>
                <div className={styles.tags}>
                  {job.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
