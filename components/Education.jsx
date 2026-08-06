'use client';

import { education } from '@/lib/content';

export default function Education() {
  return (
    <section className="section section--alt" id="education">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Education</span>
          <h2>Academic foundation.</h2>
        </div>
        <div className="grid g2" data-stagger>
          {education.map((edu) => (
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
  );
}
