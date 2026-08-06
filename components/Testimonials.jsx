'use client';

import { useEffect, useState } from 'react';
import { testimonials } from '@/lib/content';

export default function Testimonials() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselTotal = 6;

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselTotal);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
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
  );
}
