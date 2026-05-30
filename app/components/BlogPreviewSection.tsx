import Link from 'next/link';

const TOPICS = [
  { num: '01', label: 'Precios reales',        desc: 'Cuánto cuesta una web, una landing, un rediseño. Sin rangos vagos.' },
  { num: '02', label: 'Por industria',          desc: 'Qué necesita tu negocio: dentista, restaurante, coach, abogado.' },
  { num: '03', label: 'Comparativas',           desc: 'Agencia vs freelancer, Next.js vs WordPress, Wix vs profesional.' },
  { num: '04', label: 'Problemas frecuentes',   desc: 'Por qué tu sitio no convierte, no aparece en Google o se ve viejo.' },
  { num: '05', label: 'Guías y conceptos',      desc: 'Qué hace diferente a una web que sí vende. Mobile-first. SEO.' },
];

export default function BlogPreviewSection() {
  return (
    <section className="blogprev-section">
      <div className="section-wrap">

        <div className="blogprev-grid-wrap">
          <div className="blogprev-left">
            <span className="eyebrow">Blog WeblynMX</span>
            <h2 className="blogprev-title">
              Toda la información que necesitas<br />
              sobre presencia <span className="accent">digital.</span>
            </h2>
            <p className="blogprev-sub">
              Precios reales, comparativas honestas y guías sin tecnicismos.
              Lo que un dueño de negocio en México necesita saber
              antes de invertir en su web.
            </p>

            <div className="blogprev-cta-block">
              <Link href="/blog" className="btn btn-primary magnetic blogprev-main-cta">
                Explorar todos los artículos <span className="arrow">→</span>
              </Link>
              <p className="blogprev-disclaimer">
                Gratis. Sin registro. Sin spam.
              </p>
            </div>
          </div>

          <ul className="blogprev-topics">
            {TOPICS.map((t) => (
              <li key={t.label} className="blogprev-topic">
                <span className="blogprev-topic-num">{t.num}</span>
                <div className="blogprev-topic-body">
                  <p className="blogprev-topic-label">{t.label}</p>
                  <p className="blogprev-topic-desc">{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
