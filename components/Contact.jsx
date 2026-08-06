'use client';

import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.wrap}>
        <div className={`${styles.poster} reveal`}>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.title}>Let&apos;s build something that moves the market.</h2>
          <p className={styles.lede}>
            Open to remote-first Brand &amp; Marketing Strategy leadership roles across MENA, APAC, and UK/EU.
          </p>
          <div className={styles.ctas}>
            <a
              href="mailto:vidishatodkar2010@gmail.com"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/vidishatodkar"
              className={`${styles.btn} ${styles.btnGhost}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.6 2z" /></svg>
              +91 9130084874
            </span>
            <span className={styles.metaItem}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
              Ahmedabad, India (IST)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
