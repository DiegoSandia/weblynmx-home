'use client';

import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const ring = document.getElementById('cursor-ring');
    const dot = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let animId: number;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    window.addEventListener('pointermove', onMove as EventListener);

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(tick);
    }
    tick();

    const hoverables = 'a, button, .magnetic, .ba-handle, .portfolio-card, .testimonial-card, .card-pkg';
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element).closest(hoverables)) document.body.classList.add('cursor-hover');
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element).closest(hoverables)) document.body.classList.remove('cursor-hover');
    };
    document.addEventListener('pointerover', onOver as EventListener);
    document.addEventListener('pointerout', onOut as EventListener);

    const onLeave = () => { ring!.style.opacity = '0'; dot.style.opacity = '0'; };
    const onEnter = () => { ring!.style.opacity = '1'; dot.style.opacity = '1'; };
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    // Magnetic effect — applied to any .magnetic elements that exist or get added
    const radius = 80;
    function applyMagnetic() {
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        if (el.hasAttribute('data-magnetic-skip') || el.dataset.magneticBound) return;
        el.dataset.magneticBound = '1';
        el.addEventListener('pointermove', (e: Event) => {
          const pe = e as PointerEvent;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = pe.clientX - cx;
          const dy = pe.clientY - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < radius + Math.max(r.width, r.height) / 2) {
            el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
          }
        });
        el.addEventListener('pointerleave', () => {
          el.style.transform = '';
        });
      });
    }
    applyMagnetic();

    return () => {
      window.removeEventListener('pointermove', onMove as EventListener);
      document.removeEventListener('pointerover', onOver as EventListener);
      document.removeEventListener('pointerout', onOut as EventListener);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return null;
}
