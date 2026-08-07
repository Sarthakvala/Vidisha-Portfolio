'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WorkThatWon.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/* Matches --motion-base in app/globals.css. Only used to decide how long
   the observer waits before it is worth pausing an off-screen film. */
const VISIBILITY_THRESHOLD = 0.35;

export default function WorkThatWon() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasAutoplay, setHasAutoplay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // React does not reliably reflect `muted` to the DOM property across a
    // hydration boundary, and an unmuted video is refused autoplay outright.
    // Setting it here, once, before any observer can call play() is the
    // difference between the film running and a silent console error.
    video.muted = true;

    // An autoplaying film is motion like any other. Reduced-motion visitors
    // keep the poster frame and press play themselves — so the unmute
    // control is not rendered either, since there is nothing to unmute.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return undefined;

    setHasAutoplay(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects rather than throws — an unhandled rejection here
          // surfaces as a console error on every browser that declines.
          const attempt = video.play();
          if (attempt && typeof attempt.catch === 'function') {
            attempt.catch(() => {
              // Declined (battery saver, data saver, an unmute we could not
              // honour). The poster and the native controls remain.
            });
          }
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: VISIBILITY_THRESHOLD }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    // Unmuting is a user gesture, so this play() is allowed even if the
    // silent autoplay was previously declined.
    if (!nextMuted) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    }
  }

  return (
    <section className={styles.work} id="work">
      <div className={styles.inner}>
        <div className={`${styles.titleBlock} reveal`}>
          <span className={styles.eyebrow}>Work That Won</span>
          <h2 className={styles.statement}>Campaigns and strategies that moved markets.</h2>
        </div>
      </div>

      <div className={`${styles.band} reveal`}>
        <video
          ref={videoRef}
          controls
          muted
          playsInline
          preload="metadata"
          poster="/assets/johnsons-baby-campaign.jpeg"
        >
          <source src="/assets/johnson-baby-campaign.mp4" type="video/mp4" />
        </video>

        {/* A silent campaign film is a poor showcase, so muted autoplay
            always ships with a visible way out of it. Hidden when autoplay
            never started: there is nothing to unmute, and the native
            controls already carry a volume slider. */}
        {hasAutoplay && (
          <button
            type="button"
            className={styles.sound}
            onClick={toggleSound}
            aria-pressed={!isMuted}
            aria-label={isMuted ? 'Unmute campaign film' : 'Mute campaign film'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
              {isMuted ? (
                <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" />
              ) : (
                <path d="M16 8.8a4.5 4.5 0 0 1 0 6.4M18.6 6.6a8 8 0 0 1 0 10.8" />
              )}
            </svg>
            {isMuted ? 'Sound off' : 'Sound on'}
          </button>
        )}
      </div>

      <div className={styles.inner}>
        <div className={`${styles.content} reveal`} data-category-color="var(--cat-yellow)">
          <h3 className={styles.title}>Johnson&apos;s Baby: Project Golden Minute</h3>
          <p className={styles.category}>FMCG · Campaign Strategy</p>
          <p className={styles.description}>
            Cannes Lions 2026 Shortlist. Proved heritage promise by training 200K+ midwives across 91% of India&apos;s districts. Shifted emotional connection in fragmented market.
          </p>
          <div className={styles.tags}>
            <span data-category-color="var(--cat-yellow)">Cannes Lions Shortlist</span>
            <span data-category-color="var(--cat-coral)">Ad Recall +4.3×</span>
            <span data-category-color="var(--cat-purple)">6 Kyoorius Elephants</span>
          </div>
        </div>
      </div>
    </section>
  );
}
