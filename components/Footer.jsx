'use client';

import { useEffect, useState } from 'react';

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
      <footer className="footer">
        <div className="wrap footer__inner">
          <p>© 2026 Vidisha Todkar</p>
          <p>All metrics from brand-tracking data and awards listings.</p>
        </div>
      </footer>

      <button
        className={`btt${showBtt ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </>
  );
}
