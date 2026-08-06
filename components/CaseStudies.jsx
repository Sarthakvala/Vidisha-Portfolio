'use client';

import { useState } from 'react';
import { caseStudies } from '@/lib/content';

/* Per-case expanded body. Copy is verbatim from the original page. */
const details = {
  rupay: (
    <div className="cs-expand__detail">
      <h4>Challenge</h4>
      <p>RuPay needed to shift from government-mandate adoption to genuine consumer preference in a market where Visa and Mastercard owned aspiration.</p>
      <h4>Strategic Thinking</h4>
      <p>Don&apos;t compete on global prestige — own national pride and everyday relevance. Built a content strategy around &ldquo;India&apos;s own&rdquo; positioning tied to local commerce moments.</p>
      <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>Challenger brands win when they redefine the game, not when they play catch-up on the incumbent&apos;s terms.</p>
    </div>
  ),
  jnj: (
    <div className="cs-expand__detail">
      <h4>Challenge</h4>
      <p>Johnson&apos;s Baby needed to reclaim emotional relevance in a fragmented market where heritage brands were losing ground to indie competitors.</p>
      <h4>Strategic Thinking</h4>
      <p>Tied &ldquo;gentleness&rdquo; to the first sixty seconds after birth, where neonatal revival knowledge among rural Dai Maas decides a newborn&apos;s survival.</p>
      <h4>Results</h4>
      <p><strong>Ad Recall +4.3%</strong> (1.6× benchmark) · <strong>Consideration +2.7%</strong> (4× benchmark) · <strong>Purchase Intent +1.3%</strong> (2.1× benchmark) · <strong>3M+ organic views</strong></p>
      <div className="cs-award-tags">
        <span>◆ Cannes Lions Shortlist 2026</span>
        <span>◆ 6 Kyoorius Elephants</span>
        <span>◆ Abby Award</span>
      </div>
      <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>The fastest way back to relevance is proving your oldest promise in a new, high-stakes context.</p>
    </div>
  ),
  nav: (
    <div className="cs-expand__detail">
      <h4>Challenge</h4>
      <p>Grow a 15–25 youth audience without diluting trust the core older user base was built on.</p>
      <h4>Strategic Thinking</h4>
      <p>Don&apos;t reposition the product — reposition the job. Projective research surfaced youth stressors; the cooling effect was reframed as an everyday mental reset.</p>
      <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>Audience extension rarely needs a new truth — just the job the audience already wants it to do.</p>
    </div>
  ),
  nfx: (
    <div className="cs-expand__detail">
      <h4>Challenge</h4>
      <p>Netflix needed long-term brand affinity. Non-members felt it was distant, too edgy, expensive, and not for families.</p>
      <h4>Strategic Thinking</h4>
      <p>Recommendation is the real currency. The brand&apos;s job shifted from &ldquo;convince&rdquo; to &ldquo;give something worth putting social capital behind.&rdquo;</p>
      <div className="cs-impact">
        <p>CMO/MD-level buy-in. Client leadership called it <strong>&ldquo;fresh and hard-hitting.&rdquo;</strong></p>
      </div>
      <p className="cs-learn"><span className="cs-learn-label">Key Takeaway</span>For category leaders, the risk isn&apos;t being unknown — it&apos;s being taken for granted.</p>
    </div>
  ),
};

export default function CaseStudies() {
  const [expandedCS, setExpandedCS] = useState({});

  const toggleCS = (id) => {
    setExpandedCS(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="section" id="cases">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Case Studies</span>
          <h2>Deep dives into the strategy.</h2>
        </div>
        <div className="cs-list">
          {caseStudies.map((cs) => (
            <div className="card cs reveal" key={cs.id}>
              <span className="cs__tag">{cs.tag}</span>
              <h3>{cs.title}</h3>
              <p className="cs__tagline">{cs.tagline}</p>
              <div className="cs-metrics">
                {cs.metrics.map((m) => (
                  <div className="cs-m" key={m.label}>
                    <span className="cs-m__value">{m.value}</span>
                    <span className="cs-m__label">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="cs-expand">
                <button className={`cs-expand__btn${expandedCS[cs.id] ? ' open' : ''}`} onClick={() => toggleCS(cs.id)}>
                  Full case study <span className="arrow">▼</span>
                </button>
                <div className={`cs-expand__body${expandedCS[cs.id] ? ' open' : ''}`} style={expandedCS[cs.id] ? { maxHeight: '1000px' } : {}}>
                  {details[cs.id]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
