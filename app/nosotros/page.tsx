import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import RevealObserver from '../components/RevealObserver';

export const metadata: Metadata = {
  title: 'Nosotros | WeblynMX',
  description:
    'WeblynMX es un estudio digital premium que crea presencia web estratégica para negocios que quieren verse más profesionales, confiables y listos para vender.',
};

const BULLETS = [
  'Estrategia antes que diseño.',
  'Diseño premium orientado a conversión.',
  'Experiencias web rápidas en Next.js.',
  'Mobile first en cada proyecto.',
  'Branding digital consistente.',
  'CTAs claros para generar acción.',
];

const PROCESS = [
  {
    num: '01',
    title: 'Diagnóstico',
    text: 'Entendemos tu negocio, tu cliente y tu presencia actual.',
  },
  {
    num: '02',
    title: 'Estrategia',
    text: 'Definimos qué necesita comunicar tu web para generar confianza y acción.',
  },
  {
    num: '03',
    title: 'Diseño',
    text: 'Creamos una experiencia visual premium, clara y alineada a tu marca.',
  },
  {
    num: '04',
    title: 'Desarrollo',
    text: 'Construimos en Next.js con enfoque mobile, velocidad y experiencia.',
  },
  {
    num: '05',
    title: 'Entrega',
    text: 'Publicamos, revisamos y dejamos tu presencia lista para vender mejor.',
  },
];

const DIFF = [
  'No vendemos páginas, construimos percepción.',
  'Combinamos diseño, negocio e IA.',
  'Pensamos en conversión desde el inicio.',
  'Creamos experiencias premium sin inflar procesos.',
  'Hablamos claro, sin humo ni términos vacíos.',
  'Diseñamos para negocios mexicanos que quieren verse a otro nivel.',
];

const PARA_SI = [
  'Negocios que ya venden y quieren verse más profesionales.',
  'Dueños que entienden que la confianza afecta ventas.',
  'Marcas que quieren dejar de verse improvisadas.',
  'Proyectos que necesitan presencia premium sin parecer corporativos genéricos.',
];

const PARA_NO = [
  'Negocios que solo buscan la opción más barata.',
  'Personas que quieren "una paginita".',
  'Proyectos sin claridad mínima de oferta.',
  'Marcas que no quieren invertir en percepción ni experiencia.',
];

const PROBLEM_CARDS = [
  { icon: '↘', text: 'Se ven amateur aunque venden bien.' },
  { icon: '⊘', text: 'Tienen buen servicio, pero mala presentación.' },
  { icon: '↻', text: 'Dependen demasiado de redes y mensajes manuales.' },
];

export default function NosotrosPage() {
  return (
    <>
      <Cursor />
      <RevealObserver />
      <Nav />

      <main className="nos-main">

        {/* ── HERO ─────────────────────────────────── */}
        <section className="nos-hero">
          <div className="nos-hero-glow" aria-hidden="true" />
          <div className="section-wrap">
            <span className="eyebrow nos-eyebrow">No somos una agencia más</span>
            <h1 className="nos-hero-title">
              No hacemos páginas<br />
              para llenar <span className="accent">internet.</span>
            </h1>
            <p className="nos-hero-sub">
              Construimos presencia digital para negocios que necesitan<br className="nos-br" />
              verse tan profesionales como realmente son.
            </p>
            <div className="nos-hero-btns">
              <Link href="/diagnostico" className="btn btn-primary magnetic">
                Hacer diagnóstico <span className="arrow">→</span>
              </Link>
              <Link href="/paquetes" className="btn btn-outline magnetic">
                Ver paquetes
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROBLEMA ─────────────────────────────── */}
        <section className="nos-section reveal">
          <div className="section-wrap">
            <div className="nos-problem-wrap">
              <div className="nos-problem-left">
                <h2 className="nos-section-title">
                  La mayoría de negocios se ven más baratos<br />
                  de lo que realmente <span className="accent">son.</span>
                </h2>
                <p className="nos-section-text">
                  Un buen negocio puede perder oportunidades si su presencia digital no transmite confianza. No siempre falta calidad. Muchas veces falta percepción.
                </p>
              </div>
              <div className="nos-problem-cards">
                {PROBLEM_CARDS.map((c) => (
                  <div className="nos-problem-card" key={c.text}>
                    <span className="nos-problem-icon">{c.icon}</span>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── QUÉ HACE ─────────────────────────────── */}
        <section className="nos-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <div className="nos-what-wrap">
              <div className="nos-what-text">
                <span className="eyebrow">Qué hacemos</span>
                <h2 className="nos-section-title" style={{ marginTop: '1rem' }}>
                  WeblynMX transforma<br />
                  percepción en <span className="accent">confianza.</span>
                </h2>
                <p className="nos-section-text">
                  No diseñamos solo por estética. Diseñamos para que tu negocio se entienda rápido, se vea confiable y tenga una ruta clara hacia el contacto o la compra.
                </p>
              </div>
              <ul className="nos-bullets">
                {BULLETS.map((b) => (
                  <li key={b} className="nos-bullet-item">
                    <span className="nos-bullet-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PROCESO ──────────────────────────────── */}
        <section className="nos-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <div className="nos-process-header">
              <span className="eyebrow">Cómo trabajamos</span>
              <h2 className="nos-section-title" style={{ marginTop: '1rem' }}>
                Primero entendemos.<br />
                Luego <span className="accent">diseñamos.</span>
              </h2>
            </div>
            <ol className="nos-timeline">
              {PROCESS.map((step, i) => (
                <li
                  key={step.num}
                  className="nos-timeline-step"
                  style={{ ['--step-delay' as string]: `${i * 0.08}s` }}
                >
                  <div className="nos-timeline-num">{step.num}</div>
                  <div className="nos-timeline-content">
                    <h3 className="nos-timeline-title">{step.title}</h3>
                    <p className="nos-timeline-text">{step.text}</p>
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="nos-timeline-line" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── DIFERENCIADORES ──────────────────────── */}
        <section className="nos-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <span className="eyebrow">Por qué elegirnos</span>
            <h2 className="nos-section-title" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
              Lo que nos hace <span className="accent">diferentes.</span>
            </h2>
            <div className="nos-diff-grid">
              {DIFF.map((d, i) => (
                <div
                  className="nos-diff-card"
                  key={d}
                  style={{ ['--diff-delay' as string]: `${i * 0.07}s` }}
                >
                  <span className="nos-diff-dot" aria-hidden="true" />
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUIÉN ───────────────────────────── */}
        <section className="nos-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <div className="nos-para-grid">
              {/* Sí */}
              <div className="nos-para-col nos-para-si">
                <div className="nos-para-col-header">
                  <span className="nos-para-badge nos-para-badge-si">Para quién sí</span>
                </div>
                <ul className="nos-para-list">
                  {PARA_SI.map((item) => (
                    <li key={item} className="nos-para-item">
                      <span className="nos-para-check nos-para-check-si">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* No */}
              <div className="nos-para-col nos-para-no">
                <div className="nos-para-col-header">
                  <span className="nos-para-badge nos-para-badge-no">Para quién no</span>
                </div>
                <ul className="nos-para-list">
                  {PARA_NO.map((item) => (
                    <li key={item} className="nos-para-item">
                      <span className="nos-para-check nos-para-check-no">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISIÓN ───────────────────────────────── */}
        <section className="nos-section reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <div className="nos-vision-wrap">
              <div className="nos-vision-glow" aria-hidden="true" />
              <span className="eyebrow nos-eyebrow-center">Nuestra visión</span>
              <h2 className="nos-vision-title">
                Queremos elevar el nivel digital<br />
                de los negocios <span className="accent">mexicanos.</span>
              </h2>
              <p className="nos-vision-text">
                México está lleno de negocios buenos que se ven por debajo de su valor. WeblynMX existe para cerrar esa brecha: hacer que negocios reales se vean más confiables, más profesionales y más listos para competir.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────── */}
        <section className="nos-final reveal" style={{ ['--reveal-delay' as string]: '.05s' }}>
          <div className="section-wrap">
            <div className="nos-final-inner">
              <div className="nos-final-glow" aria-hidden="true" />
              <h2 className="nos-final-title">
                Tu negocio ya tiene valor.<br />
                Hagamos que también <span className="accent">se note.</span>
              </h2>
              <p className="nos-final-sub">
                Empieza con un diagnóstico gratuito y recibe una recomendación personalizada de WeblynMX.
              </p>
              <div className="nos-final-btns">
                <Link href="/diagnostico" className="btn btn-primary magnetic">
                  Hacer diagnóstico <span className="arrow">→</span>
                </Link>
                <Link href="/paquetes" className="btn btn-outline magnetic">
                  Ver paquetes
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
