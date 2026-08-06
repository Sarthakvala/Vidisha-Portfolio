'use client';

import { skills } from '@/lib/content';

export default function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Skills &amp; Expertise</span>
          <h2>What I bring to the table.</h2>
        </div>
        <div className="grid g3" data-stagger>
          {skills.map((skill) => (
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
  );
}
