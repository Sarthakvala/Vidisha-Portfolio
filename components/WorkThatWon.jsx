'use client';

import styles from './WorkThatWon.module.css';

export default function WorkThatWon() {
  return (
    <section className={styles.work} id="work">
      <div className={styles.inner}>
        <div className={`${styles.titleBlock} reveal`}>
          <span className={styles.eyebrow}>Work That Won</span>
          <h2 className={styles.statement}>Campaigns and strategies that moved markets.</h2>
        </div>
      </div>

      <div className={`${styles.band} reveal`}>
        <video controls playsInline preload="metadata" poster="/assets/johnsons-baby-campaign.jpeg">
          <source src="/assets/johnson-baby-campaign.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.inner}>
        <div className={`${styles.content} reveal`}>
          <h3 className={styles.title}>Johnson&apos;s Baby: Project Golden Minute</h3>
          <p className={styles.category}>FMCG · Campaign Strategy</p>
          <p className={styles.description}>
            Cannes Lions 2026 Shortlist. Proved heritage promise by training 200K+ midwives across 91% of India&apos;s districts. Shifted emotional connection in fragmented market.
          </p>
          <div className={styles.tags}>
            <span>Cannes Lions Shortlist</span>
            <span>Ad Recall +4.3×</span>
            <span>6 Kyoorius Elephants</span>
          </div>
        </div>
      </div>
    </section>
  );
}
