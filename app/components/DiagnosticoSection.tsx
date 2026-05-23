'use client';

import { useEffect, useRef } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Cuéntanos sobre tu negocio. En minutos sabemos qué necesitas y qué no.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Análisis',
    desc: 'Revisamos tu situación actual, competencia y oportunidades reales de mejora.',
    icon: '📊',
  },
  {
    num: '03',
    title: 'Propuesta',
    desc: 'Recibes una recomendación personalizada y clara — sin presión ni relleno.',
    icon: '✦',
  },
];

export default function DiagnosticoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal on scroll
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.dg-card');
    const header = sectionRef.current?.querySelectorAll<HTMLElement>('[data-dg-reveal]');
    const all = [...(header || []), ...(cards || [])];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('dg-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    all.forEach((el) => io.observe(el));

    // 3D tilt on cards
    cards?.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px) scale(1.02)`;
        const shine = card.querySelector<HTMLElement>('.dg-card-shine');
        if (shine) {
          shine.style.opacity = '1';
          shine.style.background = `radial-gradient(ellipse at ${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%, rgba(139,255,97,0.18) 0%, transparent 70%)`;
        }
      };
      const onLeave = () => {
        card.style.transform = '';
        const shine = card.querySelector<HTMLElement>('.dg-card-shine');
        if (shine) shine.style.opacity = '0';
      };
      card.addEventListener('pointermove', onMove as EventListener);
      card.addEventListener('pointerleave', onLeave);
    });

    // Mouse glow on section
    const section = sectionRef.current;
    const onSectionMove = (e: PointerEvent) => {
      if (!section) return;
      const r = section.getBoundingClientRect();
      section.style.setProperty('--gx', `${e.clientX - r.left}px`);
      section.style.setProperty('--gy', `${e.clientY - r.top}px`);
    };
    section?.addEventListener('pointermove', onSectionMove as EventListener);

    return () => {
      io.disconnect();
      section?.removeEventListener('pointermove', onSectionMove as EventListener);
    };
  }, []);

  return (
    <section className="dg-section" ref={sectionRef} id="diagnostico-proceso">
      <div className="dg-glow" aria-hidden="true" />

      <div className="section-wrap">
        <div className="section-header" data-dg-reveal>
          <span className="eyebrow">Diagnóstico gratuito</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Tres pasos para saber exactamente<br />
            qué <span className="accent">necesita</span> tu negocio.
          </h2>
          <p className="section-desc">
            Sin formularios eternos. Sin ventas agresivas. Solo claridad.
          </p>
        </div>

        <div className="dg-cards">
          {STEPS.map(({ num, title, desc, icon }, i) => (
            <div
              className="dg-card"
              key={num}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="dg-card-shine" aria-hidden="true" />
              <div className="dg-card-num">{num}</div>
              <div className="dg-card-icon">{icon}</div>
              <h3 className="dg-card-title">{title}</h3>
              <p className="dg-card-desc">{desc}</p>
              {i < STEPS.length - 1 && <div className="dg-card-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="dg-cta-wrap" data-dg-reveal style={{ transitionDelay: '0.4s' }}>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/diagnostico-marca" className="btn btn-primary magnetic dg-cta-btn">
              Diagnóstico de Marca <span className="arrow">→</span>
            </a>
            <a href="/diagnostico-conversion" className="btn btn-outline magnetic">
              Diagnóstico de Conversión
            </a>
          </div>
          <p className="dg-cta-note">Gratis · Sin compromiso · Respuesta en &lt; 24 h</p>
        </div>
      </div>
    </section>
  );
}
