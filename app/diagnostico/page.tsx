import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito — WeblynMX',
  description: 'Elige el diagnóstico que necesita tu negocio. De marca o de conversión. Gratis, sin compromiso, respuesta en menos de 24 horas.',
};

export default function DiagnosticoPage() {
  return (
    <main className="dg-page">
      <div className="dg-page-blob" aria-hidden="true" />

      <div className="dg-page-content" style={{ maxWidth: '700px' }}>
        <p className="eyebrow dg-page-eyebrow">Diagnóstico estratégico gratuito</p>

        <h1 className="dg-page-heading">
          ¿Qué necesita<br />
          tu <span className="accent">negocio?</span>
        </h1>

        <p className="dg-page-sub">
          Elige el diagnóstico que mejor describe tu situación. Te respondemos con una recomendación personalizada en menos de 24 horas. Sin compromiso.
        </p>

        <div className="dg-hub-grid">
          <Link href="/diagnostico-marca" className="dg-hub-card">
            <div className="dg-hub-card-icon">✦</div>
            <div className="dg-hub-card-title">Diagnóstico de Marca</div>
            <p className="dg-hub-card-desc">
              Para negocios que quieren mejorar su imagen, lanzar su marca o transmitir una percepción más premium.
            </p>
            <span className="dg-hub-card-cta">Comenzar <span>→</span></span>
          </Link>

          <Link href="/diagnostico-conversion" className="dg-hub-card">
            <div className="dg-hub-card-icon">📈</div>
            <div className="dg-hub-card-title">Diagnóstico de Conversión</div>
            <p className="dg-hub-card-desc">
              Para negocios con tráfico o anuncios que no están convirtiendo en ventas, leads o clientes.
            </p>
            <span className="dg-hub-card-cta">Comenzar <span>→</span></span>
          </Link>
        </div>

        <Link className="dg-page-back" href="/">
          WeblynMX · Webs que convierten
        </Link>
      </div>
    </main>
  );
}
