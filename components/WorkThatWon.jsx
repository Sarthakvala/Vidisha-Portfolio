'use client';

export default function WorkThatWon() {
  return (
    <section className="section section--alt" id="work">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Work That Won</span>
          <h2>Campaigns and strategies that moved markets.</h2>
        </div>
        <div className="work-grid reveal">
          <div className="work-item">
            <div className="work-media">
              <video controls playsInline preload="metadata" poster="/assets/johnsons-baby-campaign.jpeg">
                <source src="/assets/johnson-baby-campaign.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="work-content">
              <h3>Johnson&apos;s Baby: Project Golden Minute</h3>
              <p className="work-category">FMCG · Campaign Strategy</p>
              <p className="work-description">
                Cannes Lions 2026 Shortlist. Proved heritage promise by training 200K+ midwives across 91% of India&apos;s districts. Shifted emotional connection in fragmented market.
              </p>
              <div className="work-tags">
                <span>Cannes Lions Shortlist</span>
                <span>Ad Recall +4.3×</span>
                <span>6 Kyoorius Elephants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
