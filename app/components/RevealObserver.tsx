'use client';

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    try {
      const els = document.querySelectorAll<HTMLElement>('.reveal');
      els.forEach((el) => el.classList.add('is-prepped'));

      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });

      els.forEach((el) => io.observe(el));

      return () => io.disconnect();
    } catch (err) {
      // Fallback — si IntersectionObserver no existe o falla, muestra todo
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    }
  }, []);

  // Safety net: if any JS error occurs, show all reveal elements
  useEffect(() => {
    const handler = () => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    };
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  return null;
}
