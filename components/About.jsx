'use client';

import { processSteps } from '@/lib/content';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={`${styles.copy} reveal`}>
            <span className={styles.eyebrow}>About</span>
            {/* h2, not p. This pull-quote is the section's heading, and as
                a paragraph it left #about contributing nothing to the
                document outline — anyone navigating by heading skipped
                the section. The copy and the styling are unchanged; the
                module class outranks the element selector. */}
            <h2 className={styles.statement}>
              &ldquo;I start with the <span className={styles.tension}>tension</span>, not the brief.&rdquo;
            </h2>
            <p className={styles.bio}>
              Every brand I work on starts with the same question: what is the audience navigating that the category isn&apos;t addressing? I build the positioning or content architecture that resolves it, then hold the work to measurable standards — market share, brand health, recall. The other half is building strategists who can do this without me in the room.
            </p>
          </div>

          <figure className={`${styles.photo} reveal`}>
            {/* The frame is what makes the drift safe: it clips, and the
                image inside is overscaled just enough that a few pixels
                of parallax never expose an edge. */}
            <div className={styles.photoFrame} data-drift>
              <img
                src="/assets/profile.jpeg"
                alt="Vidisha Todkar — Senior Brand Strategist"
                width={200}
                height={250}
              />
            </div>
          </figure>

          <div className={`${styles.process} reveal`}>
            <h3 className={styles.processTitle}>My Strategic Process</h3>
            <div className={styles.flow}>
              {processSteps.map((step, i) => (
                <span key={step.num} style={{ display: 'contents' }}>
                  {i > 0 && <div className={styles.arrow}>→</div>}
                  <div className={styles.step}>
                    <span className={styles.num}>{step.num}</span>
                    <span className={styles.stepLabel} style={{ whiteSpace: 'pre-line' }}>{step.label}</span>
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
