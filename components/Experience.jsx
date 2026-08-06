'use client';

import { experience } from '@/lib/content';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Experience</span>
          <h2>Career trajectory.</h2>
        </div>
        <div className="reveal">
          <div className="timeline">
            {experience.map((job, i) => (
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
  );
}
