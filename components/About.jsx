'use client';

import { processSteps } from '@/lib/content';

export default function About() {
  return (
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
                {processSteps.map((step, i) => (
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
  );
}
