import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface DataStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  opacity: number;
  color: string;
}

export const FintechBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle interactive proximity
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Fintech theme colors: Emerald, Amber, Cyan
    const nodeColors = [
      'rgba(16, 185, 129, ', // Emerald
      'rgba(52, 211, 153, ', // Light Emerald
      'rgba(245, 158, 11, ', // Amber
      'rgba(6, 182, 212, ',  // Cyan
    ];

    // Initialize lightweight node particles (optimized for zero CPU lag)
    const particleCount = Math.min(18, Math.floor(width / 65));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorBase = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 1.0,
        color: colorBase,
        alpha: Math.random() * 0.22 + 0.12,
      });
    }

    // Initialize subtle vertical data stream trails
    const streamTokens = ['0x9F', 'ACK', 'SPENDY', 'TX99', 'BLK', '100%', '0.00', 'SYNC', 'NODE'];
    const streamCount = Math.min(6, Math.floor(width / 180));
    const dataStreams: DataStream[] = [];

    for (let i = 0; i < streamCount; i++) {
      dataStreams.push({
        x: Math.floor((Math.random() * width) / 32) * 32 + 16,
        y: Math.random() * height,
        speed: Math.random() * 0.7 + 0.5,
        length: Math.floor(Math.random() * 3) + 2,
        chars: Array.from({ length: 3 }, () => streamTokens[Math.floor(Math.random() * streamTokens.length)]),
        opacity: Math.random() * 0.14 + 0.06,
        color: Math.random() > 0.3 ? '16, 185, 129' : '245, 158, 11',
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop with FPS capping for maximum efficiency
    let lastTime = 0;
    const frameInterval = 1000 / 45; // 45 fps target: silk smooth while using ~50% less CPU

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle vertical data streams
      ctx.font = '9px "JetBrains Mono", monospace';
      for (const stream of dataStreams) {
        stream.y += stream.speed;
        if (stream.y > height + 50) {
          stream.y = -40;
          stream.x = Math.floor((Math.random() * width) / 32) * 32 + 16;
        }

        // Draw faint trailing data packets
        for (let j = 0; j < stream.chars.length; j++) {
          const charY = stream.y - j * 16;
          if (charY > -20 && charY < height + 20) {
            const fade = (1 - j / stream.length) * stream.opacity;
            ctx.fillStyle = `rgba(${stream.color}, ${fade})`;
            ctx.fillText(stream.chars[j], stream.x, charY);
          }
        }
      }

      // 2. Connect nearby particles with ultra-low opacity constellation lines
      const maxDistance = 100;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDistance) * 0.06;
            ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Subtle mouse proximity influence
        const mouseDx = p1.x - mouse.x;
        const mouseDy = p1.y - mouse.y;
        const mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy;
        if (mouseDistSq < 14400) { // 120^2
          const mouseDist = Math.sqrt(mouseDistSq);
          const force = (1 - mouseDist / 120) * 0.25;
          p1.x += (mouseDx / (mouseDist || 1)) * force;
          p1.y += (mouseDy / (mouseDist || 1)) * force;
        }

        // Update particle positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around boundaries smoothly
        if (p1.x < -10) p1.x = width + 10;
        if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        if (p1.y > height + 10) p1.y = -10;

        // Draw particle node with soft bloom
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* 0. Full Website Background: Compressed Spendy Birthday Portrait with Blur Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
        <img
          src="/spendy-bg-compressed.jpg"
          alt="Spendy Birthday Background"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center filter blur-md sm:blur-lg scale-105 opacity-40 brightness-85 contrast-110"
        />
        {/* Soft dark gradient vignette overlay for perfect contrast & readability */}
        <div className="absolute inset-0 bg-slate-950/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Background Deep Neon Glow Orbs that morph colors and drift over time */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Neon Light 1: Electric Emerald to Aqua Cyan to Fuchsia */}
        <div 
          className="absolute -top-24 -left-24 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full blur-[100px] sm:blur-[130px] opacity-65 animate-neon-orb-1 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.55) 0%, rgba(6,182,212,0.3) 45%, transparent 75%)'
          }}
        />

        {/* Neon Light 2: Amber Gold to Electric Violet */}
        <div 
          className="absolute top-1/3 -right-28 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full blur-[90px] sm:blur-[120px] opacity-55 animate-neon-orb-2 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(217,70,239,0.35) 50%, transparent 75%)'
          }}
        />

        {/* Neon Light 3: Deep Cyber Cyan to Neon Mint */}
        <div 
          className="absolute -bottom-32 left-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[95px] sm:blur-[125px] opacity-60 animate-neon-orb-3 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(16,185,129,0.3) 45%, transparent 75%)'
          }}
        />

        {/* Dynamic Neon Horizon Laser Glow Bar along top and bottom */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] opacity-70 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.8), rgba(6,182,212,0.9), rgba(245,158,11,0.8), transparent)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1.5px] opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.7), rgba(16,185,129,0.8), transparent)'
          }}
        />
      </div>

      {/* Moving low-opacity grid lines (CSS keyframe drift) */}
      <div className="fixed inset-0 bg-grid-pattern animate-grid-drift pointer-events-none z-0 opacity-60" />

      {/* Very faint cyber scanline beam */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="w-full h-24 bg-gradient-to-b from-transparent via-emerald-500/[0.045] to-transparent animate-scanline" />
      </div>

      {/* HTML5 Canvas for floating nodes, connections & data streams */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
      />
    </>
  );
};
