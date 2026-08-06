'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtt(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <p className={styles.copy}>© 2026 Vidisha Todkar</p>
          <p className={styles.note}>All metrics from brand-tracking data and awards listings.</p>
        </div>
      </footer>

      <button
        className={`${styles.btt}${showBtt ? ` ${styles.bttVisible}` : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showBtt ? 0 : -1}
        aria-hidden={showBtt ? undefined : 'true'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </>
  );
}
