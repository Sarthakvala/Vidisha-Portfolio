'use client';

import { brands } from '@/lib/content';
import styles from './Clients.module.css';

/* Cleaned, background-stripped marks that actually exist in
   public/assets/logos/. Brands absent from this map render as name
   plates of identical size — per the brief, the gap stays visible
   and fillable. Never fabricate, trace or approximate a mark. */
const LOGOS = {
  'Amazon': 'amazon.png',
  'Flipkart': 'flipkart.png',
  "Johnson's Baby": 'johnsons-baby.png',
  'Navratna': 'navratna.png',
  'Red Bull': 'red-bull.png',
  'RuPay': 'rupay.png',
  'ZEE5': 'zee5.png',
};

export default function Clients() {
  return (
    <section className="section" id="clients">
      <div className="wrap">
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Clients</span>
          <h2 className={styles.title}>Brands I&apos;ve strategized for.</h2>
        </div>

        <ul className={styles.grid} data-stagger>
          {brands.map((brand) => {
            const file = LOGOS[brand.name];
            return (
              <li className={styles.cell} key={brand.name}>
                <div className={styles.plate}>
                  {file ? (
                    <img
                      className={styles.mark}
                      src={`/assets/logos/${file}`}
                      alt={brand.name}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.plateName}>{brand.name}</span>
                  )}
                </div>
                <span className={styles.cat}>{brand.cat}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
