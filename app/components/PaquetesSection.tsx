'use client';

import { useEffect, useRef, useState } from 'react';

const PAQUETES = [
  { num: '01', name: 'Vender Más', services: 'Landing + Funnel + CTA optimizado', desc: 'Para negocios con tráfico que no convierten.', img: '/Servicios/Vender Más.png' },
  { num: '02', name: 'Mejorar la Marca', services: 'Rebrand Visual + Sitio Multi-página + Tarjeta Digital', desc: 'Para negocios que se ven amateur.', img: '/Servicios/Mejorar la Marca.png' },
  { num: '03', name: 'Evento Único', services: 'Invitación Digital + Mini Site + RSVP', desc: 'Bodas, XV, corporativos.', img: '/Servicios/Evento Único.png' },
  { num: '04', name: 'Presencia Rápida', services: 'Landing + Tarjeta Digital · Entrega 5 días', desc: 'Para los que no pueden esperar.', img: '/Servicios/Presencia Rápida.png' },
  { num: '05', name: 'Restaurante & Food', services: 'Menú Digital + Landing + Branding', desc: 'Restaurantes, cafés, dark kitchens.', img: '/Servicios/Restaurante & Food.png' },
  { num: '06', name: 'Profesionistas', services: 'Portafolio Web + Tarjeta Digital + Branding', desc: 'Abogados, arquitectos, contadores.', img: '/Servicios/Profesionistas.png' },
  { num: '07', name: 'Emprendedor', services: 'Landing + Branding + Tarjeta + Sistema Visual Redes', desc: 'Lanzar desde cero con presencia sólida.', img: '/Servicios/Emprendedor.png' },
  { num: '08', name: 'Tienda & Producto', services: 'Landing + Catálogo Digital + Branding', desc: 'Productos físicos o digitales.', img: '/Servicios/Tienda & Producto.png' },
  { num: '09', name: 'Coach & Consultor', services: 'Landing Alta Conversión + Funnel + Tarjeta Digital', desc: 'Coaches, terapeutas, consultores.', img: '/Servicios/Coach & Consultor.png' },
  { num: '10', name: 'Inmobiliaria', services: 'Landing + Catálogo de Propiedades + Branding', desc: 'Agentes y desarrolladoras.', img: '/Servicios/Inmobiliaria.png' },
  { num: '11', name: 'Fitness & Wellness', services: 'Landing + Sistema de Reservas + Branding', desc: 'Gyms, yoga, nutriólogos.', img: '/Servicios/Fitness & Wellness.png' },
  { num: '12', name: 'Educación', services: 'Landing + Página de Curso + Tarjeta Digital', desc: 'Tutores, academias, cursos online.', img: '/Servicios/Educación.png' },
  { num: '13', name: 'Sector Salud', services: 'Sitio Premium + Agenda Digital + Tarjeta Digital', desc: 'Clínicas, dentistas, médicos.', img: '/Servicios/Sector Salud.png' },
  { num: '14', name: 'Marca Personal', services: 'Sitio Bio + Portafolio + Tarjeta Digital + Branding', desc: 'Creadores, influencers, speakers.', img: '/Servicios/Marca Personal.png' },
  { num: '15', name: 'Startup & Tech', services: 'Sitio Premium + Landing + Branding + Deck Digital', desc: 'Startups que buscan inversión.', img: '/Servicios/Startup & Tech.png' },
];

export default function PaquetesSection() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; a: number } | null>(null);

  function getCardWidth() {
    if (!stageRef.current) return 380;
    const card = stageRef.current.children[0] as HTMLElement;
    if (!card) return 380;
    return card.getBoundingClientRect().width + 22;
  }

  function layout(activeIdx: number) {
    if (!stageRef.current) return;
    const cw = getCardWidth();
    const viewW = stageRef.current.parentElement!.getBoundingClientRect().width;
    const offset = viewW / 2 - cw * activeIdx - cw / 2;
    stageRef.current.style.transform = `translateX(${offset}px)`;
    Array.from(stageRef.current.children).forEach((card, i) => {
      card.classList.toggle('is-active', i === activeIdx);
    });
  }

  useEffect(() => {
    layout(active);
  });

  useEffect(() => {
    const handleResize = () => layout(active);
    window.addEventListener('resize', handleResize);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive((a) => Math.max(0, a - 1));
      if (e.key === 'ArrowRight') setActive((a) => Math.min(PAQUETES.length - 1, a + 1));
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleCarouselPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    dragStartRef.current = { x: e.clientX, a: active };
    try { carouselRef.current?.setPointerCapture(e.pointerId); } catch (_) {}
  };

  const handleCarouselPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const cw = getCardWidth();
    const steps = Math.round((dragStartRef.current.x - e.clientX) / (cw * 0.4));
    const newActive = Math.max(0, Math.min(PAQUETES.length - 1, dragStartRef.current.a + steps));
    if (newActive !== active) setActive(newActive);
  };

  const handleCarouselPointerUp = () => { dragStartRef.current = null; };

  return (
    <section id="servicios">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Servicios</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Encuentra el paquete para tu <span className="accent">negocio.</span>
          </h2>
          <p className="section-desc">
            15 paquetes diseñados para industrias específicas. Cada uno con entregables claros y precio cerrado.
          </p>
        </div>

        <div
          className="carousel-3d reveal"
          id="pkg-carousel"
          ref={carouselRef}
          onPointerDown={handleCarouselPointerDown}
          onPointerMove={handleCarouselPointerMove}
          onPointerUp={handleCarouselPointerUp}
          onPointerCancel={handleCarouselPointerUp}
        >
          <div className="carousel-viewport">
            <div className="carousel-stage" ref={stageRef}>
              {PAQUETES.map((p) => (
                <article key={p.num} className="card-pkg">
                  <div className="card-pkg-img">
                    <img
                      src={p.img}
                      alt={p.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'grid';
                      }}
                    />
                    <div className="card-pkg-img-fallback" style={{ display: 'none' }}>{p.num}</div>
                  </div>
                  <div className="card-pkg-num">PAQUETE {p.num}</div>
                  <h3 className="card-pkg-name">{p.name}</h3>
                  <p className="card-pkg-services">{p.services}</p>
                  <p className="card-pkg-desc">&ldquo;{p.desc}&rdquo;</p>
                  <a
                    href={`https://wa.me/525541426190?text=Hola%2C%20quiero%20info%20del%20paquete%20${encodeURIComponent(p.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-pkg-cta"
                  >
                    Solicitar cotización <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button
              className="carousel-arrow"
              aria-label="Anterior"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
            >
              ←
            </button>
            <div className="carousel-counter">
              <span id="pkg-current">{PAQUETES[active].num}</span>{' '}
              <span className="total">/ 15</span>
            </div>
            <button
              className="carousel-arrow"
              aria-label="Siguiente"
              onClick={() => setActive((a) => Math.min(PAQUETES.length - 1, a + 1))}
            >
              →
            </button>
          </div>
        </div>

        <div className="meta-ads-banner reveal" style={{ ['--reveal-delay' as string]: '.1s' }}>
          <div className="meta-ads-text">
            <strong>⚡ Add-on disponible: Meta Ads Optimizado</strong>
            <p>Suma campañas pagadas a cualquier paquete. Configuración, creativos y optimización mensual.</p>
          </div>
          <a
            href="https://wa.me/525541426190?text=Hola%2C%20quiero%20info%20del%20add-on%20de%20Meta%20Ads"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-pill-accent magnetic"
          >
            Saber más <span className="arrow">→</span>
          </a>
        </div>
        <div className="services-badge-wrap reveal" style={{ ['--reveal-delay' as string]: '.2s' }}>
          <a className="services-badge" href="/diagnostico">
            <span className="services-badge-dot" />
            ¿No sabes cuál elegir? Haz el diagnóstico y te recomendamos uno.
          </a>
        </div>
        <div className="reveal" style={{ ['--reveal-delay' as string]: '.3s', textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="/paquetes" className="btn btn-primary magnetic">
            Ver guía completa de paquetes <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
