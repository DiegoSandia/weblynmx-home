'use client';

import { useEffect, useRef } from 'react';

const WA = 'https://wa.me/525541426190?text=Hola%2C%20quiero%20hacer%20el%20diagn%C3%B3stico%20para%20mi%20negocio%20con%20WeblynMX';

export default function DiagnosticoCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Blur-in reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('dgcta-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(section);

    // Mouse parallax glow
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      section.style.setProperty('--mx', `${e.clientX - r.left}px`);
      section.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    section.addEventListener('pointermove', onMove as EventListener);

    return () => {
      io.disconnect();
      section.removeEventListener('pointermove', onMove as EventListener);
    };
  }, []);

  return (
    <section className="dgcta-section" ref={sectionRef}>
      <div className="dgcta-mouse-glow" aria-hidden="true" />

      <div className="section-wrap dgcta-wrap">
        <div className="dgcta-badge">
          <span className="dgcta-badge-dot" />
          Diagnóstico estratégico gratuito
        </div>

        <h2 className="dgcta-heading">
          ¿No sabes qué necesita<br />
          tu <span className="accent">negocio?</span>
        </h2>

        <p className="dgcta-sub">
          En menos de 24 horas te decimos exactamente qué tipo de presencia digital necesitas — sin venderte algo que no necesitas.
        </p>

        <div className="dgcta-btns">
          <a href="/diagnostico-marca" className="btn btn-primary magnetic dgcta-btn-main">
            Diagnóstico de Marca <span className="arrow">→</span>
          </a>
          <a href="/diagnostico-conversion" className="btn btn-outline magnetic">
            Diagnóstico de Conversión
          </a>
        </div>

        <p className="dgcta-footnote">
          Sin ventas agresivas · Gratis · Respuesta en menos de 24 h
        </p>
      </div>
    </section>
  );
}
