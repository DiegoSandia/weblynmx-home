'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sc = scrollerRef.current;
    const bar = barRef.current;
    if (!sc || !bar) return;

    function update() {
      const max = sc!.scrollWidth - sc!.clientWidth;
      const pct = max <= 0 ? 0 : (sc!.scrollLeft / max) * 100;
      bar!.style.width = pct + '%';
    }
    sc.addEventListener('scroll', update, { passive: true });
    update();

    let isDown = false, startX = 0, startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isDown = true;
      startX = e.clientX;
      startScroll = sc.scrollLeft;
      sc.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      sc.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => { isDown = false; };

    sc.addEventListener('pointerdown', onDown as EventListener);
    sc.addEventListener('pointermove', onMove as EventListener);
    sc.addEventListener('pointerup', onUp);
    sc.addEventListener('pointercancel', onUp);

    return () => {
      sc.removeEventListener('scroll', update);
      sc.removeEventListener('pointerdown', onDown as EventListener);
      sc.removeEventListener('pointermove', onMove as EventListener);
      sc.removeEventListener('pointerup', onUp);
      sc.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <section id="proyectos">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Portafolio</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Lo que hacemos <span className="accent">habla</span> por nosotros.
          </h2>
        </div>

        <div className="portfolio-scroller reveal" id="portfolio-scroller" ref={scrollerRef}>

          <article className="portfolio-card">
            <img
              src="/Proyectos/Casa Aurelio · Restaurante-MenuDigital.png"
              alt="Casa Aurelio"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>Casa Aurelio</div>
            <span className="pf-tag">01 · Restaurante</span>
            <div className="portfolio-overlay">
              <span className="pf-category">Sitio + Menú Digital</span>
              <h3 className="pf-name">Casa Aurelio</h3>
            </div>
          </article>

          <article className="portfolio-card">
            <img
              src="/Proyectos/Summit-Bienes Raices-LandingPage.png"
              alt="Summit"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>Summit</div>
            <span className="pf-tag">02 · Bienes Raíces</span>
            <div className="portfolio-overlay">
              <span className="pf-category">Landing de Ventas</span>
              <h3 className="pf-name">Summit</h3>
            </div>
          </article>

          <article className="portfolio-card">
            <img
              src="/Proyectos/Elevate-clinica dental-SitioPremium.png"
              alt="Elevate"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>Elevate</div>
            <span className="pf-tag">03 · Clínica Dental</span>
            <div className="portfolio-overlay">
              <span className="pf-category">Sitio Premium</span>
              <h3 className="pf-name">Elevate</h3>
            </div>
          </article>

          <article className="portfolio-card">
            <img
              src="/Proyectos/Despacho Legal · Branding.png"
              alt="Despacho Legal"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="ba-placeholder" style={{ display: 'none' }}>Despacho Legal</div>
            <span className="pf-tag">04 · Despacho Legal</span>
            <div className="portfolio-overlay">
              <span className="pf-category">Branding Completo</span>
              <h3 className="pf-name">Mendoza &amp; Asoc.</h3>
            </div>
          </article>

        </div>

        <div className="portfolio-progress reveal">
          <div className="portfolio-progress-bar" id="portfolio-progress" ref={barRef}></div>
        </div>
      </div>
    </section>
  );
}
