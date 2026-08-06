'use client';

import { awards, awardGallery } from '@/lib/content';

export default function Awards() {
  return (
    <section className="section" id="awards">
      <div className="wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Awards &amp; Achievements</span>
          <h2>Recognized globally.</h2>
        </div>
        <div className="awards-grid" data-stagger>
          {awards.map((award) => (
            <div className="card award-card" key={award.title}>
              <div className="award-badge">
                <svg viewBox="0 0 24 24"><path d={award.icon} /></svg>
              </div>
              <h3>{award.title}</h3>
              <p>{award.desc}</p>
            </div>
          ))}
        </div>
        <div className="award-gallery" data-stagger>
          {awardGallery.map((img) => (
            <div className="award-img" key={img}>
              <img src={`/assets/${img}`} alt="Award moment" loading="lazy" width={400} height={300} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
