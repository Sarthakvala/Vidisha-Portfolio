'use client';

import { useEffect, useState } from 'react';
import useTheme from '@/lib/useTheme';
import { navLinks } from '@/lib/content';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

  return (
    <header className={`nav${navScrolled ? ' scrolled' : ''}`} role="banner">
      <div className="nav__inner">
        <a href="#" className="nav__logo" aria-label="Home">
          <div className="nav__mark">
            <img src="/assets/profile.jpeg" alt="Vidisha Todkar" width={36} height={36} />
          </div>
          <span className="nav__name">Vidisha Todkar</span>
        </a>
        <nav className={`nav__links${mobileNavOpen ? ' open' : ''}`} role="navigation" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href.slice(1) ? 'active' : ''}
              onClick={() => setMobileNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <a href="#contact" className="btn btn--primary" style={{ fontSize: '12.5px', padding: '10px 18px' }}>Let&apos;s Talk</a>
          <button
            className={`burger${mobileNavOpen ? ' open' : ''}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Menu"
            aria-expanded={mobileNavOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
