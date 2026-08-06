'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useTheme from '@/lib/useTheme';
import { navLinks } from '@/lib/content';
import styles from './Navbar.module.css';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active nav tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Mobile menu: Escape closes, Tab is trapped inside the panel, and focus
     returns to the burger on close. Body scroll locks while it is open. */
  useEffect(() => {
    if (!mobileNavOpen) return undefined;

    const panel = navRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const first = panel?.querySelector(FOCUSABLE);
    first?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        burgerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const items = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen, closeMenu]);

  return (
    <header
      className={`${styles.header}${navScrolled ? ` ${styles.headerScrolled}` : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a href="#" className={styles.lockup} aria-label="Home">
          <span className={styles.mark}>
            <img src="/assets/profile.jpeg" alt="Vidisha Todkar" width={32} height={32} />
          </span>
          <span className={styles.lockupName}>Vidisha Todkar</span>
        </a>

        <nav
          id="primary-navigation"
          ref={navRef}
          className={`${styles.nav}${mobileNavOpen ? ` ${styles.navOpen}` : ''}`}
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="#contact" className={styles.cta}>Let&apos;s Talk</a>

          <button
            ref={burgerRef}
            className={`${styles.burger}${mobileNavOpen ? ` ${styles.burgerOpen}` : ''}`}
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={mobileNavOpen}
            aria-controls="primary-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
