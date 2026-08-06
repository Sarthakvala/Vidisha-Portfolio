'use client';

import { kpis } from '@/lib/content';
import styles from './Highlights.module.css';

export default function Highlights() {
  return (
    <section className={styles.highlights} id="highlights">
      <div className={styles.inner}>
        <div className={`${styles.titleBlock} reveal`}>
          <span className={styles.eyebrow}>Key Highlights</span>
          <h2 className={styles.statement}>Numbers that tell the story.</h2>
        </div>

        <div className={styles.grid} data-stagger>
          {kpis.map((kpi) => (
            <div className={styles.kpi} key={kpi.label}>
              <span
                className={`stat-number stat-number--xl ${styles.num}`}
                data-count={kpi.value}
                data-suffix={kpi.suffix}
              >
                0
              </span>
              <p className={styles.meta}>
                <span className={styles.label}>{kpi.label}</span>
                <span className={styles.desc}>{kpi.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
