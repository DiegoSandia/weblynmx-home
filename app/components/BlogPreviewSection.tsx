import Link from 'next/link';

const TOPICS = [
  { icon: '₱', label: 'Precios reales',        desc: 'Cuánto cuesta una web, una landing, un rediseño. Sin rangos vagos.' },
  { icon: '⊙', label: 'Por industria',          desc: 'Qué necesita tu negocio específico: dentista, restaurante, coach, abogado.' },
  { icon: '⇄', label: 'Comparativas',           desc: 'Agencia vs freelancer, Next.js vs WordPress, Wix vs profesional.' },
  { icon: '◎', label: 'Problemas frecuentes',   desc: 'Por qué tu sitio no convierte, no aparece en Google o se ve desactualizado.' },
  { icon: '◈', label: 'Guías y conceptos',      desc: 'Qué es mobile-first, qué hace diferente a una web que sí vende.' },
];

export default function BlogPreviewSection() {
  return (
    <section className="blogprev-section reveal">
      <div className="section-wrap">

        <div className="blogprev-top">
          <span className="eyebrow">Recursos gratuitos</span>
          <h2 className="blogprev-title">
            Toda la información que necesitas<br />
            sobre presencia <span className="accent">digital.</span>
          </h2>
          <p className="blogprev-sub">
            Precios reales, comparativas honestas y guías sin tecnicismos.
            Todo lo que un dueño de negocio en México necesita saber antes
            de invertir en su web.
          </p>
        </div>

        <div className="blogprev-topics">
          {TOPICS.map((t) => (
            <div key={t.label} className="blogprev-topic">
              <span className="blogprev-topic-icon">{t.icon}</span>
              <div>
                <p className="blogprev-topic-label">{t.label}</p>
                <p className="blogprev-topic-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="blogprev-bottom">
          <Link href="/blog" className="btn btn-primary magnetic">
            Explorar todos los artículos <span className="arrow">→</span>
          </Link>
          <p className="blogprev-disclaimer">
            Sin registro. Sin spam. Solo información útil.
          </p>
        </div>

      </div>
    </section>
  );
}
