'use client';

import { glanceItems } from '@/lib/content';
import styles from './AtAGlance.module.css';

export default function AtAGlance() {
  return (
    <section className={styles.section} id="glance">
      <div className={styles.wrap}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>At a Glance</span>
          <h2 className={styles.title}>Quick facts.</h2>
        </div>
        <div className={styles.grid} data-stagger>
          {glanceItems.map((item, i) => (
            <div className={styles.item} key={i}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg>
              <span className={styles.text}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
