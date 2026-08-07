'use client';

import { useEffect, useRef } from 'react';
import styles from './PolkaPattern.module.css';

const COLORS = [
  '#FF5757', // Electric Coral
  '#9D4EDD', // Violet Purple
  '#FFD001', // Solar Yellow
  '#00F5D4', // Cyber Cyan
  '#FF007F', // Hot Pink
  '#FF9F1C', // Amber Orange
  '#3A86FF', // Royal Blue
];

export default function PolkaPattern() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = 1200;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Generate fixed grid of circles with random colors and slight movement offset
    const cols = 28;
    const rows = 10;
    const spacingX = width / cols;
    const spacingY = height / rows;

    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          baseX: c * spacingX + spacingX / 2,
          baseY: r * spacingY + spacingY / 2,
          x: c * spacingX + spacingX / 2,
          y: r * spacingY + spacingY / 2,
          radius: 14 + Math.random() * 16,
          color: COLORS[(r * cols + c) % COLORS.length],
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (width / rect.width);
      mouseY = (e.clientY - rect.top) * (height / rect.height);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Background fill inside clipped container
      ctx.fillStyle = '#101731';
      ctx.fillRect(0, 0, width, height);

      dots.forEach((dot) => {
        // Floating movement
        const offsetX = Math.sin(time + dot.phase) * 6;
        const offsetY = Math.cos(time + dot.phase) * 6;

        let targetX = dot.baseX + offsetX;
        let targetY = dot.baseY + offsetY;

        // Mouse repulsion effect
        const dx = mouseX - targetX;
        const dy = mouseY - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          targetX -= (dx / dist) * force * 35;
          targetY -= (dy / dist) * force * 35;
        }

        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
