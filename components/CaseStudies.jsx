'use client';

import { useState } from 'react';
import { caseStudies } from '@/lib/content';
import styles from './CaseStudies.module.css';

/* Per-case expanded body. Copy is verbatim from the original page. */
const details = {
  rupay: (
    <div className={styles.detail}>
      <h4 className={styles.detailHeading}>Challenge</h4>
      <p className={styles.detailText}>RuPay needed to shift from government-mandate adoption to genuine consumer preference in a market where Visa and Mastercard owned aspiration.</p>
      <h4 className={styles.detailHeading}>Strategic Thinking</h4>
      <p className={styles.detailText}>Don&apos;t compete on global prestige — own national pride and everyday relevance. Built a content strategy around &ldquo;India&apos;s own&rdquo; positioning tied to local commerce moments.</p>
      <p className={styles.learn}><span className={styles.learnLabel}>Key Takeaway</span>Challenger brands win when they redefine the game, not when they play catch-up on the incumbent&apos;s terms.</p>
    </div>
  ),
  jnj: (
    <div className={styles.detail}>
      <h4 className={styles.detailHeading}>Challenge</h4>
      <p className={styles.detailText}>Johnson&apos;s Baby needed to reclaim emotional relevance in a fragmented market where heritage brands were losing ground to indie competitors.</p>
      <h4 className={styles.detailHeading}>Strategic Thinking</h4>
      <p className={styles.detailText}>Tied &ldquo;gentleness&rdquo; to the first sixty seconds after birth, where neonatal revival knowledge among rural Dai Maas decides a newborn&apos;s survival.</p>
      <h4 className={styles.detailHeading}>Results</h4>
      <p className={styles.detailText}><strong>Ad Recall +4.3%</strong> (1.6× benchmark) · <strong>Consideration +2.7%</strong> (4× benchmark) · <strong>Purchase Intent +1.3%</strong> (2.1× benchmark) · <strong>3M+ organic views</strong></p>
      <div className={styles.awardTags}>
        <span>◆ Cannes Lions Shortlist 2026</span>
        <span>◆ 6 Kyoorius Elephants</span>
        <span>◆ Abby Award</span>
      </div>
      <p className={styles.learn}><span className={styles.learnLabel}>Key Takeaway</span>The fastest way back to relevance is proving your oldest promise in a new, high-stakes context.</p>
    </div>
  ),
  nav: (
    <div className={styles.detail}>
      <h4 className={styles.detailHeading}>Challenge</h4>
      <p className={styles.detailText}>Grow a 15–25 youth audience without diluting trust the core older user base was built on.</p>
      <h4 className={styles.detailHeading}>Strategic Thinking</h4>
      <p className={styles.detailText}>Don&apos;t reposition the product — reposition the job. Projective research surfaced youth stressors; the cooling effect was reframed as an everyday mental reset.</p>
      <p className={styles.learn}><span className={styles.learnLabel}>Key Takeaway</span>Audience extension rarely needs a new truth — just the job the audience already wants it to do.</p>
    </div>
  ),
  nfx: (
    <div className={styles.detail}>
      <h4 className={styles.detailHeading}>Challenge</h4>
      <p className={styles.detailText}>Netflix needed long-term brand affinity. Non-members felt it was distant, too edgy, expensive, and not for families.</p>
      <h4 className={styles.detailHeading}>Strategic Thinking</h4>
      <p className={styles.detailText}>Recommendation is the real currency. The brand&apos;s job shifted from &ldquo;convince&rdquo; to &ldquo;give something worth putting social capital behind.&rdquo;</p>
      <div className={styles.impact}>
        <p className={styles.detailText}>CMO/MD-level buy-in. Client leadership called it <strong>&ldquo;fresh and hard-hitting.&rdquo;</strong></p>
      </div>
      <p className={styles.learn}><span className={styles.learnLabel}>Key Takeaway</span>For category leaders, the risk isn&apos;t being unknown — it&apos;s being taken for granted.</p>
    </div>
  ),
};

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

export default function CaseStudies() {
  const [expandedCS, setExpandedCS] = useState({});

  const toggleCS = (id) => {
    setExpandedCS(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="section" id="cases">
      <div className="wrap">
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Case Studies</span>
          <h2 className={styles.title}>Deep dives into the strategy.</h2>
        </div>

        <div className={styles.list}>
          {caseStudies.map((cs) => {
            const isOpen = Boolean(expandedCS[cs.id]);
            return (
              <article className={`${styles.case} reveal`} key={cs.id}>
                <span className={styles.tag}>{cs.tag}</span>
                <h3 className={styles.caseTitle}>{cs.title}</h3>
                <p className={styles.tagline}>{cs.tagline}</p>

                <div className={styles.metrics}>
                  {cs.metrics.map((m) => (
                    <div className={styles.metric} key={m.label}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.toggle}
                  onClick={() => toggleCS(cs.id)}
                  aria-expanded={isOpen}
                  aria-controls={`cs-body-${cs.id}`}
                  id={`cs-toggle-${cs.id}`}
                >
                  Full case study <Chevron />
                </button>

                <div
                  id={`cs-body-${cs.id}`}
                  role="region"
                  aria-labelledby={`cs-toggle-${cs.id}`}
                  className={`${styles.body}${isOpen ? ` ${styles.bodyOpen}` : ''}`}
                >
                  <div className={styles.bodyInner}>
                    {details[cs.id]}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
