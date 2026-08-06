'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

/* ============================================================
   THEME TOGGLE HOOK
   ============================================================ */
function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const current = saved || (document.documentElement.getAttribute('data-theme') || 'dark');
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }, [theme]);

  return { theme, toggle };
}

/* ============================================================
   GSAP + SCROLL ANIMATIONS (loaded on client only)
   ============================================================ */
function useAnimations() {
  useEffect(() => {
    let gsapInstance, ScrollTrigger, Lenis, lenisInstance;

    async function init() {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const lenisMod = await import('lenis');

      gsapInstance = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      Lenis = lenisMod.default;

      gsapInstance.registerPlugin(ScrollTrigger);

      // Smooth scroll
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);
      gsapInstance.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsapInstance.ticker.lagSmoothing(0);

      // Reveal animations
      document.querySelectorAll('.reveal').forEach((el, i) => {
        gsapInstance.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Stagger children
      document.querySelectorAll('[data-stagger]').forEach((container) => {
        const children = container.children;
        gsapInstance.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animated counters
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsapInstance.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // Hero text reveal
      const heroH1 = document.querySelector('.hero h1');
      if (heroH1) {
        gsapInstance.fromTo(heroH1,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Hero stats stagger
      const heroStats = document.querySelectorAll('.hero-stat');
      if (heroStats.length) {
        gsapInstance.fromTo(heroStats,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
        );
      }

      // Parallax for section headers
      document.querySelectorAll('.section-header').forEach((header) => {
        gsapInstance.to(header, {
          y: -20,
          scrollTrigger: {
            trigger: header,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }

    init();

    return () => {
      if (lenisInstance) lenisInstance.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function Home() {
  const { theme, toggle } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showBtt, setShowBtt] = useState(false);

  // Testimonial carousel
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselTotal = 6;

  // Case study expand states
  const [expandedCS, setExpandedCS] = useState({});

  useAnimations();

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 10);
      setShowBtt(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselTotal);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Active nav tracking
  const [activeSection, setActiveSection] = useState('');
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

  const toggleCS = (id) => {
    setExpandedCS(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#awards', label: 'Awards' },
    { href: '#experience', label: 'Experience' },
    { href: '#cases', label: 'Cases' },
    { href: '#skills', label: 'Skills' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const brands = [
    { name: 'RuPay', cat: 'Fintech' }, { name: "Johnson's Baby", cat: 'FMCG' },
    { name: 'Netflix', cat: 'Streaming' }, { name: 'Flipkart', cat: 'E-Commerce' },
    { name: 'Amazon', cat: 'E-Commerce' }, { name: 'Red Bull', cat: 'Lifestyle' },
    { name: 'Tata Steel', cat: 'Industrial' }, { name: 'ZEE5', cat: 'OTT' },
    { name: 'Navratna', cat: 'FMCG' }, { name: 'Complan', cat: 'FMCG' },
    { name: 'Edelweiss', cat: 'Finance' }, { name: 'Spotify', cat: 'Streaming' },
    { name: 'NPCI', cat: 'Fintech' }, { name: 'Disney+ Hotstar', cat: 'OTT' },
    { name: 'PhonePe', cat: 'Fintech' }, { name: 'Toothsi', cat: 'Health' },
  ];

  const testimonials = [
    { text: "If I had to describe Vidisha in one sentence, she's the kind of manager who teaches you how to think, not what to think. I worked with her as a junior strategist at DDB India, and brand strategy was completely new to me at the time. Looking back, I couldn't have asked for a better first manager.", author: 'Nishtha Ojha', role: 'Associate Strategist, DDB India' },
    { text: "One thing I really appreciated was the amount of ownership Vidisha trusted me with as a junior strat at Wondrlab. She'd let me approach a task however I wanted, and then give feedback so specific and thoughtful that it genuinely made the work better. She had this balance of giving space while always having your back.", author: 'Rucha Shah', role: 'Junior Strategist, Wondrlab' },
    { text: "A lot of the things I still do today came from working with Vidisha at DDB India. Keeping a repository of interesting insights, writing briefs for campaigns I admire just for practice, digging one layer deeper during research—these habits stuck with me. She taught me: Don't marry your ideas, but don't give up on them before they've had a fair chance either.", author: 'Anjali Mane', role: 'Associate Brand Strategist, DDB India' },
    { text: "What impressed me the most was how effortlessly Vidisha could switch between brands and even between markets. One moment she'd be deeply immersed in one category, and the next she'd be thinking about something completely different with the same curiosity and creativity. That kind of range is something you'd expect from someone leading strategy at a global level.", author: 'Adwait Hari', role: 'Junior Strategist, Wondrlab' },
    { text: "I genuinely believe the reason I was able to grow from a junior strategist into a more confident one at DDB India was because of the foundation Vidisha helped me build. She didn't just teach me advertising. She taught me how to learn, how to navigate an agency, and most importantly, how to trust my own thinking.", author: 'Vanshika Dang', role: 'Junior Brand Strategist, Wondrlab' },
    { text: "Any team, anywhere in the world, would be incredibly lucky to have Vidisha. She's an insightful strategist, a generous mentor, and someone who truly invests in helping the people around her grow. As someone just starting out as an associate strategist at Wondrlab, having a manager who leads with that much clarity and generosity made all the difference.", author: 'Puneet Didwania', role: 'Assistant Brand Manager, Everest Fleet' },
  ];

  return (
    <>
      {/* ====== NAVIGATION ====== */}
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

      {/* ====== HERO ====== */}
      <section className="hero" id="hero">
        <div className="wrap">
          <div className="hero__grid">
            <div>
              <span className="eyebrow">Senior Brand &amp; Growth Strategist</span>
              <h1>I don&apos;t sell decks.<br />I sell <span className="hl">decisions.</span></h1>
              <div className="hero__bar" />
              <p className="hero__sub">
                8+ years turning consumer tension into commercial growth. Architect of a strategy that took{' '}
                <strong>15% market share</strong> off Visa &amp; Mastercard, and a{' '}
                <strong>Cannes Lions 2026</strong>-shortlisted campaign that trained{' '}
                <strong>200,000+ midwives</strong> across India.
              </p>
              <div className="hero__ctas">
                <a href="#cases" className="btn btn--primary">View Case Studies</a>
                <a href="#contact" className="btn btn--ghost">Get in Touch</a>
              </div>
            </div>
            <div className="hero__stats">
              <div className="hero-stat">
                <span className="stat-number stat-number--lg" data-count="15" data-suffix="%">0%</span>
                <p>Market Share Growth<br />vs Visa &amp; Mastercard</p>
              </div>
              <div className="hero-stat">
                <span className="stat-number stat-number--lg" data-count="200" data-suffix="K+">0</span>
                <p>Midwives Trained<br />Across 91% of India</p>
              </div>
              <div className="hero-stat">
                <span className="stat-number stat-number--lg" data-count="55" data-suffix="+">0</span>
                <p>Brand Strategies<br />Architected</p>
              </div>
              <div className="hero-stat">
                <span className="stat-number stat-number--lg" data-count="4" data-suffix="×">0</span>
                <p>Benchmark Beat<br />on Consideration</p>
              </div>
            </div>
          </div>
          <div className="trust">
            <span className="trust__label">Brands I&apos;ve Built Strategy For</span>
            <div className="logo-grid" data-stagger>
              {['RuPay', "Johnson's Baby", 'Netflix', 'Flipkart', 'Amazon', 'Red Bull', 'Tata Steel', 'ZEE5', 'Navratna', 'Complan'].map((brand) => (
                <span className="logo-chip" key={brand}><span>{brand}</span></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="about__grid">
            <div className="reveal">
              <span className="eyebrow">About</span>
              <div className="about__photo">
                <img src="/assets/profile.jpeg" alt="Vidisha Todkar — Senior Brand Strategist" width={200} height={200} />
              </div>
              <p className="about__quote">
                &ldquo;I start with the <span className="hl">tension</span>, not the brief.&rdquo;
              </p>
              <p className="about__text">
                Every brand I work on starts with the same question: what is the audience navigating that the category isn&apos;t addressing? I build the positioning or content architecture that resolves it, then hold the work to measurable standards — market share, brand health, recall. The other half is building strategists who can do this without me in the room.
              </p>
              <div className="process">
                <div className="process__title">My Strategic Process</div>
                <div className="process__flow">
                  {[
                    { num: '01', label: 'Find the\nTension' },
                    { num: '02', label: 'Mine the\nInsight' },
                    { num: '03', label: 'Build the\nArchitecture' },
                    { num: '04', label: 'Measure\nthe Impact' },
                  ].map((step, i) => (
                    <span key={step.num} style={{ display: 'contents' }}>
                      {i > 0 && <div className="process__arrow">→</div>}
                      <div className="process__step">
                        <span className="process__num">{step.num}</span>
                        <span className="process__step-label" style={{ whiteSpace: 'pre-line' }}>{step.label}</span>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* ====== WORK THAT WON ====== */}
      <section className="section section--alt" id="work">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Work That Won</span>
            <h2>Campaigns and strategies that moved markets.</h2>
          </div>
          <div className="work-grid reveal">
            <div className="work-item">
              <div className="work-media">
                <video controls playsInline preload="metadata" poster="/assets/johnsons-baby-campaign.jpeg">
                  <source src="/assets/johnson-baby-campaign.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="work-content">
                <h3>Johnson&apos;s Baby: Project Golden Minute</h3>
                <p className="work-category">FMCG · Campaign Strategy</p>
                <p className="work-description">
                  Cannes Lions 2026 Shortlist. Proved heritage promise by training 200K+ midwives across 91% of India&apos;s districts. Shifted emotional connection in fragmented market.
                </p>
                <div className="work-tags">
                  <span>Cannes Lions Shortlist</span>
                  <span>Ad Recall +4.3×</span>
                  <span>6 Kyoorius Elephants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AWARDS ====== */}
      <section className="section" id="awards">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Awards &amp; Achievements</span>
            <h2>Recognized globally.</h2>
          </div>
          <div className="awards-grid" data-stagger>
            {[
              { title: 'Cannes Lions 2026', desc: 'Shortlist — Johnson\'s Baby. Global creative effectiveness benchmark.', icon: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 4H3v2a4 4 0 0 0 4 4M17 4h4v2a4 4 0 0 1-4 4' },
              { title: '6 Kyoorius Elephants', desc: 'Incl. 1 Grey Elephant — India\'s premier effectiveness awards.', icon: 'M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z' },
              { title: '20 Abby Awards', desc: 'India\'s longest-running industry awards — sustained output across career.', icon: 'M12 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8 13l-2 8 6-3 6 3-2-8' },
              { title: "Best Employee '21", desc: 'Client Servicing — Rioconn. High-accountability client-facing role.', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3' },
            ].map((award) => (
              <div className="card award-card" key={award.title}>
                <div className="award-badge">
                  <svg viewBox="0 0 24 24"><path d={award.icon} /></svg>
                </div>
                <h3>{award.title}</h3>
                <p>{award.desc}</p>
              </div>
            ))}
          </div>
          <div className="award-gallery" data-stagger>
            {['award-cannes.png', 'award-ceremony.jpeg', 'award-photo1.jpeg', 'award-photo2.jpeg'].map((img) => (
              <div className="award-img" key={img}>
                <img src={`/assets/${img}`} alt="Award moment" loading="lazy" width={400} height={300} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HIGHLIGHTS / KPI ====== */}
      <section className="section section--alt" id="highlights">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Key Highlights</span>
            <h2>Numbers that tell the story.</h2>
          </div>
          <div className="kpi-grid" data-stagger>
            {[
              { value: '15', suffix: '%', label: 'Market Share', desc: 'Growth vs Visa & Mastercard' },
              { value: '200', suffix: 'K+', label: 'Midwives', desc: 'Trained across 91% of India' },
              { value: '55', suffix: '+', label: 'Strategies', desc: 'Architected end-to-end' },
              { value: '4', suffix: '×', label: 'Benchmark', desc: 'Beat on Consideration metrics' },
            ].map((kpi) => (
              <div className="card kpi" key={kpi.label}>
                <span className="stat-number stat-number--xl" data-count={kpi.value} data-suffix={kpi.suffix}>0</span>
                <p>
                  <span className="kpi__label">{kpi.label}</span>
                  {kpi.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EXPERIENCE ====== */}
      <section className="section" id="experience">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Experience</span>
            <h2>Career trajectory.</h2>
          </div>
          <div className="reveal">
            <div className="timeline">
              {[
                {
                  date: 'Jan 2024 – Present', title: 'Senior Brand & Growth Strategist', company: 'BBDO Mumbai (Contract via Wondrlab)',
                  desc: 'Lead strategist on Johnson\'s Baby (Cannes Lions 2026 Shortlist). Architected RuPay content strategy that grew market share 15% against Visa & Mastercard. Pitched and won Netflix brand affinity work.',
                  tags: ['Brand Strategy', 'Growth Strategy', 'FMCG', 'Fintech', 'Streaming'],
                },
                {
                  date: 'Jun 2022 – Dec 2023', title: 'Senior Brand Strategist', company: 'DDB India',
                  desc: 'Led strategic planning for Flipkart, Amazon, and ZEE5. Built and mentored a team of junior strategists. Developed proprietary research methodologies.',
                  tags: ['Strategic Planning', 'Team Leadership', 'E-Commerce', 'OTT'],
                },
                {
                  date: 'Mar 2021 – May 2022', title: 'Brand Strategist', company: 'Wondrlab',
                  desc: 'Drove brand strategy for Navratna, Complan, and NPCI portfolio. Won 50% of competitive pitches. Developed Gen Z positioning frameworks.',
                  tags: ['Brand Positioning', 'Pitch Development', 'FMCG'],
                },
                {
                  date: 'Jul 2018 – Feb 2021', title: 'Account Manager → Strategist', company: 'Rioconn',
                  desc: 'Transitioned from client servicing to strategy. Managed 15+ brand accounts. Named Best Employee 2021 for client-facing excellence.',
                  tags: ['Client Management', 'Best Employee', 'Brand Building'],
                },
              ].map((job, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-item__date">{job.date}</div>
                  <h3>{job.title}</h3>
                  <div className="tl-item__company">{job.company}</div>
                  <p>{job.desc}</p>
                  <div className="tl-tags">
                    {job.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CLIENTS ====== */}
      <section className="section section--alt" id="clients">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Clients</span>
            <h2>Brands I&apos;ve strategized for.</h2>
          </div>
          <div className="brand-grid" data-stagger>
            {brands.map((brand) => (
              <div className="card brand-card" key={brand.name}>
                <span className="brand-card__name">{brand.name}</span>
                <span className="brand-card__cat">{brand.cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CASE STUDIES ====== */}
      <section className="section" id="cases">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Case Studies</span>
            <h2>Deep dives into the strategy.</h2>
          </div>
          <div className="cs-list">
            {/* Case 1: RuPay */}
            <div className="card cs reveal">
              <span className="cs__tag">Fintech · RuPay</span>
              <h3>Category Challenger to Market Leader</h3>
              <p className="cs__tagline">Building payment preference against global duopolists</p>
              <div className="cs-metrics">
                <div className="cs-m"><span className="cs-m__value">15%</span><span className="cs-m__label">Share Growth</span></div>
                <div className="cs-m"><span className="cs-m__value">₹50K Cr</span><span className="cs-m__label">Revenue Impact</span></div>
                <div className="cs-m"><span className="cs-m__value">4×</span><span className="cs-m__label">Consideration</span></div>
              </div>
              <div className="cs-expand">
                <button className={`cs-expand__btn${expandedCS.rupay ? ' open' : ''}`} onClick={() => toggleCS('rupay')}>
                  Full case study <span className="arrow">▼</span>
                </button>
                <div className={`cs-expand__body${expandedCS.rupay ? ' open' : ''}`} style={expandedCS.rupay ? { maxHeight: '1000px' } : {}}>
                  <div className="cs-expand__detail">
                    <h4>Challenge</h4>
                    <p>RuPay needed to shift from government-mandate adoption to genuine consumer preference in a market where Visa and Mastercard owned aspiration.</p>
                    <h4>Strategic Thinking</h4>
                    <p>Don&apos;t compete on global prestige — own national pride and everyday relevance. Built a content strategy around &ldquo;India&apos;s own&rdquo; positioning tied to local commerce moments.</p>
                    <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>Challenger brands win when they redefine the game, not when they play catch-up on the incumbent&apos;s terms.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2: Johnson's Baby */}
            <div className="card cs reveal">
              <span className="cs__tag">FMCG · Johnson&apos;s Baby</span>
              <h3>Project Golden Minute</h3>
              <p className="cs__tagline">Proving a 100-year heritage promise in a new, high-stakes context</p>
              <div className="cs-metrics">
                <div className="cs-m"><span className="cs-m__value">4.3×</span><span className="cs-m__label">Ad Recall</span></div>
                <div className="cs-m"><span className="cs-m__value">200K+</span><span className="cs-m__label">Midwives Trained</span></div>
                <div className="cs-m"><span className="cs-m__value">3M+</span><span className="cs-m__label">Organic Views</span></div>
              </div>
              <div className="cs-expand">
                <button className={`cs-expand__btn${expandedCS.jnj ? ' open' : ''}`} onClick={() => toggleCS('jnj')}>
                  Full case study <span className="arrow">▼</span>
                </button>
                <div className={`cs-expand__body${expandedCS.jnj ? ' open' : ''}`} style={expandedCS.jnj ? { maxHeight: '1000px' } : {}}>
                  <div className="cs-expand__detail">
                    <h4>Challenge</h4>
                    <p>Johnson&apos;s Baby needed to reclaim emotional relevance in a fragmented market where heritage brands were losing ground to indie competitors.</p>
                    <h4>Strategic Thinking</h4>
                    <p>Tied &ldquo;gentleness&rdquo; to the first sixty seconds after birth, where neonatal revival knowledge among rural Dai Maas decides a newborn&apos;s survival.</p>
                    <h4>Results</h4>
                    <p><strong>Ad Recall +4.3%</strong> (1.6× benchmark) · <strong>Consideration +2.7%</strong> (4× benchmark) · <strong>Purchase Intent +1.3%</strong> (2.1× benchmark) · <strong>3M+ organic views</strong></p>
                    <div className="cs-award-tags">
                      <span>◆ Cannes Lions Shortlist 2026</span>
                      <span>◆ 6 Kyoorius Elephants</span>
                      <span>◆ Abby Award</span>
                    </div>
                    <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>The fastest way back to relevance is proving your oldest promise in a new, high-stakes context.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 3: Navratna */}
            <div className="card cs reveal">
              <span className="cs__tag">FMCG · Navratna</span>
              <h3>Legacy Brand Meets Gen Z</h3>
              <p className="cs__tagline">Reframing cooling oil as a stress-reset ritual</p>
              <div className="cs-metrics">
                <div className="cs-m"><span className="cs-m__value">15+</span><span className="cs-m__label">Strategies</span></div>
                <div className="cs-m"><span className="cs-m__value">50%</span><span className="cs-m__label">Pitch Win</span></div>
                <div className="cs-m"><span className="cs-m__value">2</span><span className="cs-m__label">Nominations</span></div>
              </div>
              <div className="cs-expand">
                <button className={`cs-expand__btn${expandedCS.nav ? ' open' : ''}`} onClick={() => toggleCS('nav')}>
                  Full case study <span className="arrow">▼</span>
                </button>
                <div className={`cs-expand__body${expandedCS.nav ? ' open' : ''}`} style={expandedCS.nav ? { maxHeight: '1000px' } : {}}>
                  <div className="cs-expand__detail">
                    <h4>Challenge</h4>
                    <p>Grow a 15–25 youth audience without diluting trust the core older user base was built on.</p>
                    <h4>Strategic Thinking</h4>
                    <p>Don&apos;t reposition the product — reposition the job. Projective research surfaced youth stressors; the cooling effect was reframed as an everyday mental reset.</p>
                    <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>Audience extension rarely needs a new truth — just the job the audience already wants it to do.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 4: Netflix */}
            <div className="card cs reveal">
              <span className="cs__tag">Streaming · Netflix</span>
              <h3>From Recall to Recommendation</h3>
              <p className="cs__tagline">Making a category leader worth advocating for again</p>
              <div className="cs-metrics">
                <div className="cs-m"><span className="cs-m__value">25+</span><span className="cs-m__label">Interviews</span></div>
                <div className="cs-m"><span className="cs-m__value">6</span><span className="cs-m__label">Territories</span></div>
                <div className="cs-m"><span className="cs-m__value">5</span><span className="cs-m__label">Pitches Won</span></div>
              </div>
              <div className="cs-expand">
                <button className={`cs-expand__btn${expandedCS.nfx ? ' open' : ''}`} onClick={() => toggleCS('nfx')}>
                  Full case study <span className="arrow">▼</span>
                </button>
                <div className={`cs-expand__body${expandedCS.nfx ? ' open' : ''}`} style={expandedCS.nfx ? { maxHeight: '1000px' } : {}}>
                  <div className="cs-expand__detail">
                    <h4>Challenge</h4>
                    <p>Netflix needed long-term brand affinity. Non-members felt it was distant, too edgy, expensive, and not for families.</p>
                    <h4>Strategic Thinking</h4>
                    <p>Recommendation is the real currency. The brand&apos;s job shifted from &ldquo;convince&rdquo; to &ldquo;give something worth putting social capital behind.&rdquo;</p>
                    <div className="cs-impact">
                      <p>CMO/MD-level buy-in. Client leadership called it <strong>&ldquo;fresh and hard-hitting.&rdquo;</strong></p>
                    </div>
                    <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>For category leaders, the risk isn&apos;t being unknown — it&apos;s being taken for granted.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SKILLS ====== */}
      <section className="section section--alt" id="skills">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Skills &amp; Expertise</span>
            <h2>What I bring to the table.</h2>
          </div>
          <div className="grid g3" data-stagger>
            {[
              { title: 'Brand & Growth Strategy', icon: 'M3 17l6-6 4 4 8-8M15 7h6v6', chips: ['Brand Strategy', 'Growth Strategy', 'Go-to-Market', 'Brand Transformation', 'Business Transformation', 'Brand Architecture'] },
              { title: 'Consumer & Cultural Insight', icon: 'M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', chips: ['Consumer Insights', 'Cultural Strategy', 'Qualitative Research', 'Focus Groups', 'Insights Mining', 'Competitive Analysis'] },
              { title: 'Strategic Planning', icon: 'M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM14 3v5h5', chips: ['Strategic Frameworks', 'Innovation Strategy', 'Brand Positioning', 'Market Positioning', 'Content IP Strategy'] },
              { title: 'Execution & Creative', icon: 'M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z', chips: ['Pitch Development', 'Creative Direction', 'Strategic Briefs', 'Content Strategy', 'Cross-Functional Collaboration'] },
              { title: 'Leadership & Team Building', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', chips: ['Team Leadership', 'People Management', 'Mentorship', 'Remote Leadership', 'Senior Stakeholder Mgmt'] },
              { title: 'Research & Tools', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3', chips: ['A/B Testing', 'AI-Assisted Research', 'On-Ground Research', 'High-Volume Portfolio Mgmt', 'Async-First Collaboration'] },
            ].map((skill) => (
              <div className="card skill-card" key={skill.title}>
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24"><path d={skill.icon} /></svg>
                </div>
                <h3>{skill.title}</h3>
                <div className="skill-chips">
                  {skill.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="section" id="testimonials">
        <div className="wrap">
          <div className="section-header reveal" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Testimonials</span>
            <h2>What mentees and colleagues say.</h2>
          </div>
          <div className="reveal">
            <div className="carousel-wrapper">
              <div className="carousel-track" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div className="carousel-slide" key={i}>
                    <div className="quote-card">
                      <div className="quote-mark">&ldquo;</div>
                      <p className="quote-text">{t.text}</p>
                      <div className="quote-author">
                        <strong>{t.author}</strong>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => setCarouselIdx((carouselIdx - 1 + carouselTotal) % carouselTotal)} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="carousel-dots">
                {Array.from({ length: carouselTotal }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${i === carouselIdx ? ' active' : ''}`}
                    onClick={() => setCarouselIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button className="carousel-btn" onClick={() => setCarouselIdx((carouselIdx + 1) % carouselTotal)} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
          <p className="reveal" style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--ink-f)' }}>
            Full client references available on request.
          </p>
        </div>
      </section>

      {/* ====== EDUCATION ====== */}
      <section className="section section--alt" id="education">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Education</span>
            <h2>Academic foundation.</h2>
          </div>
          <div className="grid g2" data-stagger>
            {[
              { school: 'MICA Ahmedabad', degree: 'PG Certificate — Creative Advertising', year: '2021 – 2022' },
              { school: 'School of Fashion Technology, Pune', degree: 'B.Design — Lifestyle Communication', year: '2015 – 2018' },
            ].map((edu) => (
              <div className="card edu" key={edu.school}>
                <div className="edu__icon">
                  <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <div>
                  <h3>{edu.school}</h3>
                  <p className="edu__degree">{edu.degree}</p>
                  <span className="edu__year">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== AT A GLANCE ====== */}
      <section className="section" id="glance">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">At a Glance</span>
            <h2>Quick facts.</h2>
          </div>
          <div className="glance-grid" data-stagger>
            {[
              { icon: 'M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11zM12 10a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z', text: 'Ahmedabad, India (IST, UTC+5:30)' },
              { icon: 'M12 12a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18', text: 'Open to remote-first roles — MENA, APAC, UK/EU' },
              { icon: 'M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2', text: '8+ years — FMCG, Fintech, Streaming, E-Commerce' },
              { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', text: 'English · Hindi · Marathi · Gujarati' },
              { icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3', text: 'Async-first · Cross-timezone collaboration' },
              { icon: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z', text: 'Available for immediate start' },
            ].map((item, i) => (
              <div className="glance-item" key={i}>
                <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section className="section section--alt" id="contact">
        <div className="wrap">
          <div className="contact reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Contact</span>
            <h2>Let&apos;s build something that moves the market.</h2>
            <p>Open to remote-first Brand &amp; Marketing Strategy leadership roles across MENA, APAC, and UK/EU.</p>
            <div className="contact-ctas">
              <a href="mailto:vidishatodkar2010@gmail.com" className="btn btn--primary">Email Me</a>
              <a href="https://linkedin.com/in/vidishatodkar" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="contact-meta">
              <span>
                <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.6 2z" /></svg>
                +91 9130084874
              </span>
              <span>
                <svg viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
                Ahmedabad, India (IST)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        <div className="wrap footer__inner">
          <p>© 2026 Vidisha Todkar</p>
          <p>All metrics from brand-tracking data and awards listings.</p>
        </div>
      </footer>

      {/* ====== BACK TO TOP ====== */}
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
