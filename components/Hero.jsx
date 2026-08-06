'use client';

import { trustBrands } from '@/lib/content';

export default function Hero() {
  return (
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
              <span className="stat-number stat-number--lg" data-count="4" data-suffix={'×'}>0</span>
              <p>Benchmark Beat<br />on Consideration</p>
            </div>
          </div>
        </div>
        <div className="trust">
          <span className="trust__label">Brands I&apos;ve Built Strategy For</span>
          <div className="logo-grid" data-stagger>
            {trustBrands.map((brand) => (
              <span className="logo-chip" key={brand}><span>{brand}</span></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
