'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Word-by-word animation
  useEffect(() => {
    const h = document.getElementById('hero-headline');
    if (!h) return;

    const walker = (node: HTMLElement) => {
      const out = document.createDocumentFragment();
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.textContent || '').split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              out.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'word';
              span.textContent = part;
              out.appendChild(span);
            }
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const wrap = document.createElement('span');
          wrap.className = 'word';
          wrap.appendChild((child as HTMLElement).cloneNode(true));
          out.appendChild(wrap);
        }
      });
      return out;
    };

    const frag = walker(h);
    h.innerHTML = '';
    h.appendChild(frag);

    const words = h.querySelectorAll('.word');
    words.forEach((w, i) => {
      (w as HTMLElement).style.animationDelay = (0.4 + i * 0.06) + 's';
    });
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let mouseX = -9999, mouseY = -9999;
    let mx = -9999, my = -9999;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = [];
    let animId: number;

    function initParticles() {
      const count = Math.min(120, Math.max(60, Math.floor((w * h) / 12000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          r: 1.5 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    const MAX_DIST = 180;
    const MOUSE_RADIUS = 280;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      mx += (mouseX - mx) * 0.1;
      my += (mouseY - my) * 0.1;

      if (mouseX > -1000) {
        const g = ctx!.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
        g.addColorStop(0, 'rgba(139,255,97,0.22)');
        g.addColorStop(0.4, 'rgba(139,255,97,0.08)');
        g.addColorStop(1, 'rgba(139,255,97,0)');
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }

      const cg = ctx!.createRadialGradient(0, h, 0, 0, h, w * 0.65);
      cg.addColorStop(0, 'rgba(139,255,97,0.07)');
      cg.addColorStop(1, 'rgba(139,255,97,0)');
      ctx!.fillStyle = cg;
      ctx!.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.025;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (mouseX > -1000) {
          const dx = mx - p.x, dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 1) {
            p.x += (dx / dist) * (1 - dist / MOUSE_RADIUS) * 0.55;
            p.y += (dy / dist) * (1 - dist / MOUSE_RADIUS) * 0.55;
          }
        }
      });

      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            ctx!.strokeStyle = `rgba(139,255,97,${(1 - dist / MAX_DIST) * 0.5})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      particles.forEach((p) => {
        const r = p.r + Math.sin(p.pulse) * 0.7;
        ctx!.shadowColor = '#8BFF61';
        ctx!.shadowBlur = 20;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(139,255,97,0.92)';
        ctx!.fill();
      });
      ctx!.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();

    const hero = canvas.parentElement;
    if (hero) {
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };
      const onLeave = () => { mouseX = -9999; mouseY = -9999; };
      hero.addEventListener('pointermove', onMove as EventListener);
      hero.addEventListener('pointerleave', onLeave);

      draw();

      return () => {
        window.removeEventListener('resize', resize);
        hero.removeEventListener('pointermove', onMove as EventListener);
        hero.removeEventListener('pointerleave', onLeave);
        cancelAnimationFrame(animId);
      };
    }

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-fallback"></div>
      <video className="hero-video" autoPlay loop muted playsInline poster="">
        <source src="/Hero/Hero video.mp4" type="video/mp4" />
      </video>
      <canvas className="hero-canvas" id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-vignette"></div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow">Agencia Web · CDMX</span>
        </div>
        <h1 className="hero-headline" id="hero-headline">
          Cada día que tu negocio se ve amateur, un cliente elige a tu <span className="accent">competencia.</span>
        </h1>
        <p className="hero-subtext">
          WeblynMX transforma negocios que se ven amateur en marcas que se ven premium. Sin relleno. Sin excusas.
        </p>
        <div className="hero-ctas">
          <a href="/diagnostico-marca" className="btn btn-primary magnetic">
            Diagnóstico de Marca <span className="arrow">→</span>
          </a>
          <a href="/diagnostico-conversion" className="btn btn-outline magnetic">
            Diagnóstico de Conversión
          </a>
        </div>
        <p className="hero-trust">
          Diagnóstico estratégico gratuito&nbsp;·&nbsp;Respuesta personalizada en menos de 24&nbsp;h
        </p>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </section>
  );
}
