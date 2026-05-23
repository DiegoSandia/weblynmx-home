'use client';

import { useState } from 'react';
import Link from 'next/link';

const WA = 'https://wa.me/525541426190';
const CATEGORIAS = ['Todos', 'Vender', 'Lanzar', 'Autoridad', 'Experiencias', 'Industria'] as const;
type Cat = typeof CATEGORIAS[number];

const PAQUETES = [
  {
    num: '01', name: 'Vender Más', precio: 'Desde $12,000 MXN',
    incluye: ['Landing Page', 'Funnel de Ventas', 'CTA Optimizado', 'Dominio y Deploy'],
    paraQuien: 'Negocios con tráfico que no convierte.',
    porQue: 'Convierte visitas en prospectos con una estructura clara de venta.',
    cat: 'Vender', recomendado: true,
  },
  {
    num: '02', name: 'Mejorar la Marca', precio: 'Desde $22,000 MXN',
    incluye: ['Rebrand Visual', 'Sitio Multi-página', 'Tarjeta Digital', 'Dominio y Deploy'],
    paraQuien: 'Negocios que ya existen pero se ven amateur.',
    porQue: 'Eleva percepción, confianza y autoridad de marca.',
    cat: 'Autoridad', recomendado: true,
  },
  {
    num: '03', name: 'Evento Único', precio: 'Desde $8,000 MXN',
    incluye: ['Invitación Digital', 'Mini Site de Evento', 'RSVP Digital', 'Dominio y Deploy'],
    paraQuien: 'Bodas, XV años, corporativos y eventos especiales.',
    porQue: 'Presenta el evento con experiencia premium y confirmaciones claras.',
    cat: 'Experiencias', recomendado: false,
  },
  {
    num: '04', name: 'Presencia Rápida', precio: 'Desde $6,500 MXN',
    incluye: ['Landing Page', 'Tarjeta Digital', 'Dominio y Deploy'],
    paraQuien: 'Negocios que necesitan salir rápido.',
    porQue: 'Presencia profesional en pocos días sin complicarse.',
    cat: 'Lanzar', recomendado: true,
  },
  {
    num: '05', name: 'Restaurante & Food', precio: 'Desde $14,000 MXN',
    incluye: ['Menú Digital', 'Landing Page', 'Branding Digital', 'Dominio y Deploy'],
    paraQuien: 'Restaurantes, cafés y dark kitchens.',
    porQue: 'Mejora la experiencia del cliente y hace que el restaurante se vea más confiable.',
    cat: 'Experiencias', recomendado: false,
  },
  {
    num: '06', name: 'Profesionistas', precio: 'Desde $16,000 MXN',
    incluye: ['Portafolio Web', 'Tarjeta Digital', 'Branding Digital', 'Dominio y Deploy'],
    paraQuien: 'Abogados, arquitectos, contadores y consultores.',
    porQue: 'Convierte experiencia profesional en presencia digital seria.',
    cat: 'Autoridad', recomendado: false,
  },
  {
    num: '07', name: 'Emprendedor', precio: 'Desde $15,000 MXN',
    incluye: ['Landing Page', 'Branding Digital', 'Tarjeta Digital', 'Sistema Visual para Redes'],
    paraQuien: 'Negocios que lanzan desde cero.',
    porQue: 'Sales con imagen sólida desde el día uno.',
    cat: 'Lanzar', recomendado: false,
  },
  {
    num: '08', name: 'Tienda & Producto', precio: 'Desde $18,000 MXN',
    incluye: ['Landing de Producto', 'Catálogo Digital', 'Branding Digital', 'Dominio y Deploy'],
    paraQuien: 'Productos físicos o digitales.',
    porQue: 'Presenta productos con mejor estructura visual y CTA de compra.',
    cat: 'Vender', recomendado: false,
  },
  {
    num: '09', name: 'Coach & Consultor', precio: 'Desde $14,000 MXN',
    incluye: ['Landing Alta Conversión', 'Funnel', 'Tarjeta Digital', 'Dominio y Deploy'],
    paraQuien: 'Coaches, terapeutas y consultores de alto valor.',
    porQue: 'Comunica autoridad y ayuda a convertir sesiones o asesorías.',
    cat: 'Autoridad', recomendado: false,
  },
  {
    num: '10', name: 'Inmobiliaria', precio: 'Desde $18,000 MXN',
    incluye: ['Landing Page', 'Catálogo de Propiedades', 'Branding Digital', 'Deploy'],
    paraQuien: 'Agentes inmobiliarios y desarrolladoras.',
    porQue: 'Muestra propiedades con mejor percepción y contacto directo.',
    cat: 'Industria', recomendado: false,
  },
  {
    num: '11', name: 'Fitness & Wellness', precio: 'Desde $15,000 MXN',
    incluye: ['Landing Page', 'Sistema de Reservas', 'Branding Digital', 'Deploy'],
    paraQuien: 'Gyms, estudios de yoga y nutriólogos.',
    porQue: 'Facilita reservas y mejora la imagen del servicio.',
    cat: 'Experiencias', recomendado: false,
  },
  {
    num: '12', name: 'Educación', precio: 'Desde $14,000 MXN',
    incluye: ['Landing Page', 'Página de Curso', 'Tarjeta Digital', 'Dominio y Deploy'],
    paraQuien: 'Tutores, academias y creadores de cursos online.',
    porQue: 'Presenta programas educativos con claridad y confianza.',
    cat: 'Industria', recomendado: false,
  },
  {
    num: '13', name: 'Sector Salud', precio: 'Desde $20,000 MXN',
    incluye: ['Sitio Premium', 'Agenda Digital', 'Tarjeta Digital', 'Dominio y Deploy'],
    paraQuien: 'Clínicas, dentistas y médicos.',
    porQue: 'Genera confianza y facilita agendar citas.',
    cat: 'Industria', recomendado: false,
  },
  {
    num: '14', name: 'Marca Personal', precio: 'Desde $16,000 MXN',
    incluye: ['Sitio Bio', 'Portafolio', 'Tarjeta Digital', 'Branding', 'Deploy'],
    paraQuien: 'Creadores, influencers y speakers.',
    porQue: 'Convierte presencia personal en marca profesional.',
    cat: 'Autoridad', recomendado: false,
  },
  {
    num: '15', name: 'Startup & Tech', precio: 'Desde $28,000 MXN',
    incluye: ['Sitio Premium', 'Landing', 'Branding', 'Deck Digital', 'Deploy'],
    paraQuien: 'Startups que buscan inversión o primeros clientes.',
    porQue: 'Presenta la idea con nivel de pitch, producto y marca.',
    cat: 'Lanzar', recomendado: false,
  },
] as const;

export default function GuiaPaquetesSection() {
  const [filtro, setFiltro] = useState<Cat>('Todos');

  const visibles = filtro === 'Todos' ? PAQUETES : PAQUETES.filter((p) => p.cat === filtro);

  return (
    <section id="guia-paquetes" className="gpkg-section">
      <div className="section-wrap">

        {/* Header */}
        <div className="gpkg-header reveal">
          <span className="eyebrow">Paquetes por objetivo</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Elige según lo que tu negocio<br />
            necesita <span className="accent">lograr.</span>
          </h2>
          <p className="gpkg-header-desc">
            No vendemos páginas por tamaño. Armamos paquetes según el problema real: vender más, verse más profesional, lanzar rápido o construir autoridad digital.
          </p>
          <div className="gpkg-header-btns">
            <a
              href={`${WA}?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20los%20paquetes%20de%20WeblynMX`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary magnetic"
            >
              Hablar con un asesor <span className="arrow">→</span>
            </a>
            <Link href="/diagnostico" className="btn btn-outline magnetic">
              No sé cuál elegir
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="gpkg-filters reveal" style={{ ['--reveal-delay' as string]: '.1s' }}>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`gpkg-filter${filtro === cat ? ' active' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gpkg-grid" key={filtro}>
          {visibles.map((p, i) => (
            <article
              key={p.num}
              className={`gpkg-card${p.recomendado ? ' recommended' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {p.recomendado && <span className="gpkg-badge">Recomendado</span>}

              <div className="gpkg-card-top">
                <span className="gpkg-num">PAQUETE {p.num}</span>
                <h3 className="gpkg-name">{p.name}</h3>
                <div className="gpkg-price">{p.precio}</div>
              </div>

              <div className="gpkg-divider" />

              <div className="gpkg-block">
                <p className="gpkg-label">Para quién</p>
                <p className="gpkg-para-quien">{p.paraQuien}</p>
              </div>

              <div className="gpkg-block">
                <p className="gpkg-label">Incluye</p>
                <ul className="gpkg-incluye-list">
                  {p.incluye.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="gpkg-block">
                <p className="gpkg-label">Por qué elegirlo</p>
                <p className="gpkg-por-que">{p.porQue}</p>
              </div>

              <a
                href={`${WA}?text=Hola%2C%20quiero%20informaci%C3%B3n%20del%20paquete%20${encodeURIComponent(p.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="gpkg-card-cta"
              >
                Solicitar cotización <span className="arrow">→</span>
              </a>
            </article>
          ))}
        </div>

        {/* CTA final */}
        <div className="gpkg-final-cta reveal" style={{ ['--reveal-delay' as string]: '.15s' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>¿Necesitas orientación?</p>
          <h3 className="gpkg-final-title">
            ¿No sabes cuál paquete <span className="accent">elegir?</span>
          </h3>
          <p className="gpkg-final-text">
            Haz el diagnóstico y te recomendamos el paquete correcto según el momento real de tu negocio.
          </p>
          <div className="gpkg-final-btns">
            <Link href="/diagnostico" className="btn btn-primary magnetic">
              Hacer diagnóstico <span className="arrow">→</span>
            </Link>
            <Link href="/" className="btn btn-outline magnetic">
              Regresar a página principal
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
