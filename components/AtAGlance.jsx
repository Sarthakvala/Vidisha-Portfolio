'use client';

import { glanceItems } from '@/lib/content';

export default function AtAGlance() {
  return (
    <section className="section" id="glance">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">At a Glance</span>
          <h2>Quick facts.</h2>
        </div>
        <div className="glance-grid" data-stagger>
          {glanceItems.map((item, i) => (
            <div className="glance-item" key={i}>
              <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
