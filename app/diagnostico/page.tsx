import type { Metadata } from 'next';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import RevealObserver from '../components/RevealObserver';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito — WeblynMX',
  description:
    'Analizamos tu negocio y tu presencia digital actual para recomendarte exactamente qué necesitas. Gratis, personalizado, sin compromiso.',
};

const VALUE_CARDS = [
  {
    icon: '◈',
    title: 'Diagnóstico gratuito',
    text: 'Analizamos tu presencia digital actual, redes, branding y comunicación para detectar áreas de mejora.',
  },
  {
    icon: '◎',
    title: 'Recomendación personalizada',
    text: 'Te recomendamos el paquete más adecuado según el momento real de tu negocio y tus objetivos.',
  },
  {
    icon: '◇',
    title: 'Precio especial',
    text: 'Junto con la recomendación, recibes una propuesta personalizada con precio preferencial exclusivo para quienes hacen el diagnóstico.',
  },
];

const WHAT_YOU_GET = [
  'Recomendación personalizada para tu negocio',
  'Qué necesita mejorar tu presencia digital',
  'Qué paquete te conviene y por qué',
  'Estimación de inversión según tu caso',
  'Posibles siguientes pasos concretos',
  'Respuesta directa del equipo WeblynMX',
];

export default function DiagnosticoPage() {
  return (
    <>
      <Cursor />
      <RevealObserver />

      {/* Top bar */}
      <div className="dgp-topbar">
        <a href="/" className="dgp-topbar-logo">
          <img src="/Icono-transparent.png" alt="WeblynMX" className="dgp-topbar-icon" />
          <span>WeblynMX</span>
        </a>
        <a href="/" className="dgp-topbar-back">← Volver al inicio</a>
      </div>

      <main className="dgp-main">

        {/* ── HERO ─────────────────────────────────── */}
        <section className="dgp-hero">
          <span className="eyebrow dgp-eyebrow">Diagnóstico WeblynMX</span>
          <h1 className="dgp-hero-title">
            Descubre qué necesita<br />
            realmente tu{' '}
            <span className="accent">presencia digital.</span>
          </h1>
          <p className="dgp-hero-sub">
            No se trata de venderte el paquete más caro.<br />
            Analizamos tu negocio, tu presencia actual y lo que quieres<br className="dgp-br" />
            lograr para recomendarte la mejor opción.
          </p>
          <div className="dgp-hero-cta">
            <a href="#elegir" className="btn btn-primary magnetic">
              Hacer diagnóstico gratuito <span className="arrow">→</span>
            </a>
            <span className="dgp-no-cost">Sin costo · Sin compromiso</span>
          </div>
        </section>

        {/* ── VALUE CARDS ──────────────────────────── */}
        <section className="dgp-values reveal">
          {VALUE_CARDS.map((c, i) => (
            <div
              className="dgp-value-card"
              key={c.title}
              style={{ ['--card-delay' as string]: `${i * 0.1}s` }}
            >
              <span className="dgp-value-icon">{c.icon}</span>
              <h3 className="dgp-value-title">{c.title}</h3>
              <p className="dgp-value-text">{c.text}</p>
            </div>
          ))}
        </section>

        {/* ── QUÉ RECIBES ──────────────────────────── */}
        <section className="dgp-wyr reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="dgp-wyr-label">
            <span className="eyebrow">Lo que obtienes</span>
          </div>
          <h2 className="dgp-wyr-title">
            ¿Qué recibes al completar<br />
            el <span className="accent">diagnóstico?</span>
          </h2>
          <ul className="dgp-wyr-list">
            {WHAT_YOU_GET.map((item) => (
              <li key={item} className="dgp-wyr-item">
                <span className="dgp-wyr-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── TRUST ────────────────────────────────── */}
        <section className="dgp-trust reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="dgp-trust-inner">
            <span className="dgp-trust-quote">"</span>
            <h2 className="dgp-trust-title">No hacemos páginas genéricas.</h2>
            <p className="dgp-trust-text">
              Cada negocio tiene necesidades distintas.<br />
              Algunos necesitan vender más.<br />
              Otros verse más profesionales.<br />
              Otros lanzar rápido.<br /><br />
              Por eso primero entendemos el negocio<br className="dgp-br" />
              y después recomendamos.
            </p>
          </div>
        </section>

        {/* ── ELEGIR FORMULARIO ────────────────────── */}
        <section id="elegir" className="dgp-forms-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Elige tu diagnóstico</span>
          <h2 className="dgp-forms-title">
            ¿Cuál describe mejor<br />
            tu <span className="accent">situación?</span>
          </h2>

          <div className="dgp-hub-grid">
            <Link href="/diagnostico-marca" className="dgp-hub-card">
              <div className="dgp-hub-card-accent" />
              <span className="dgp-hub-icon">✦</span>
              <h3 className="dgp-hub-card-title">Diagnóstico de Marca</h3>
              <p className="dgp-hub-card-desc">
                Para negocios que quieren mejorar su imagen, lanzar su marca o transmitir una percepción más premium.
              </p>
              <ul className="dgp-hub-tags">
                <li>Branding</li>
                <li>Identidad visual</li>
                <li>Posicionamiento</li>
              </ul>
              <span className="dgp-hub-cta">Comenzar <span className="arrow">→</span></span>
            </Link>

            <Link href="/diagnostico-conversion" className="dgp-hub-card">
              <div className="dgp-hub-card-accent" />
              <span className="dgp-hub-icon">◈</span>
              <h3 className="dgp-hub-card-title">Diagnóstico de Conversión</h3>
              <p className="dgp-hub-card-desc">
                Para negocios con tráfico o anuncios que no están convirtiendo en ventas, leads o clientes.
              </p>
              <ul className="dgp-hub-tags">
                <li>Conversión</li>
                <li>Funnel</li>
                <li>Anuncios</li>
              </ul>
              <span className="dgp-hub-cta">Comenzar <span className="arrow">→</span></span>
            </Link>
          </div>

          <p className="dgp-microcopy">
            Las recomendaciones son revisadas personalmente por el equipo de WeblynMX.
          </p>
        </section>

        {/* ── FINAL CTA ────────────────────────────── */}
        <section className="dgp-final reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="dgp-final-glow" aria-hidden="true" />
          <h2 className="dgp-final-title">
            Tu negocio ya existe.<br />
            La pregunta es si tu presencia digital<br />
            refleja realmente su <span className="accent">valor.</span>
          </h2>
          <div className="dgp-final-btns">
            <a href="#elegir" className="btn btn-primary magnetic">
              Comenzar diagnóstico <span className="arrow">→</span>
            </a>
            <Link href="/paquetes" className="btn btn-outline magnetic">
              Ver paquetes
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
