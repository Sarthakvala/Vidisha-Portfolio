'use client';

import { brands } from '@/lib/content';

export default function Clients() {
  return (
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
  );
}
