'use client';

import { kpis } from '@/lib/content';

export default function Highlights() {
  return (
    <section className="section section--alt" id="highlights">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Key Highlights</span>
          <h2>Numbers that tell the story.</h2>
        </div>
        <div className="kpi-grid" data-stagger>
          {kpis.map((kpi) => (
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
  );
}
