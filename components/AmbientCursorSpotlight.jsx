'use client';

import { useEffect, useState } from 'react';
import styles from './AmbientCursorSpotlight.module.css';

export default function AmbientCursorSpotlight() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [activeColor, setActiveColor] = useState('var(--cat-coral)');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Check if mouse is hovering over an element with data-category-color
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const catEl = target?.closest('[data-category-color]');
      if (catEl) {
        const colorAttr = catEl.getAttribute('data-category-color');
        if (colorAttr) {
          setActiveColor(colorAttr);
          setIsHovered(true);
        }
      } else {
        setIsHovered(false);
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`${styles.spotlight} ${isHovered ? styles.active : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        '--spotlight-color': activeColor,
      }}
    />
  );
}
