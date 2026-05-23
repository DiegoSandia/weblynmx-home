import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Diagnóstico Estratégico Gratuito — WeblynMX',
  description: 'Cuéntanos sobre tu negocio y recibe una recomendación personalizada en menos de 24 horas. Sin compromiso.',
};

const WA = 'https://wa.me/525541426190?text=Hola%2C%20quiero%20hacer%20el%20diagn%C3%B3stico%20para%20mi%20negocio%20con%20WeblynMX';

export default function DiagnosticoPage() {
  return (
    <main className="dg-page">
      <div className="dg-page-blob" aria-hidden="true" />

      <div className="dg-page-content">
        <p className="eyebrow dg-page-eyebrow">DIAGNÓSTICO ESTRATÉGICO GRATUITO</p>

        <h1 className="dg-page-heading">
          Próximamente.<br />
          <span className="accent">Casi listo.</span>
        </h1>

        <p className="dg-page-sub">
          El formulario de diagnóstico está en camino. Por ahora escríbenos directamente por WhatsApp — te respondemos en menos de 24 horas con una recomendación personalizada.
        </p>

        <div className="dg-page-btns">
          <a
            className="btn btn-primary"
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribir por WhatsApp <span className="arrow">→</span>
          </a>
          <Link className="btn btn-outline" href="/">
            ← Volver al inicio
          </Link>
        </div>

        <Link className="dg-page-back" href="/">
          WeblynMX · Webs que convierten
        </Link>
      </div>
    </main>
  );
}
