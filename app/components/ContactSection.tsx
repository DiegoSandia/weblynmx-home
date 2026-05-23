const BULLETS = [
  'Recomendación clara según tu negocio.',
  'Respuesta directa por WhatsApp o correo.',
  'Propuesta personalizada si el proyecto hace sentido.',
];

const WA_LINK = 'https://wa.me/525541426190?text=Hola%2C%20vi%20el%20sitio%20de%20WeblynMX%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.';

export default function ContactSection() {
  return (
    <section className="cs-section" id="contacto">
      <div className="section-wrap">

        {/* Header */}
        <div className="cs-header reveal">
          <span className="eyebrow">Contacto</span>
          <h2 className="cs-title" style={{ marginTop: '1rem' }}>
            Tu negocio ya existe.<br />
            Hagamos que también <span className="accent">se note.</span>
          </h2>
          <p className="cs-subtitle">
            Cuéntanos qué quieres mejorar y te ayudamos a elegir el camino correcto: landing, sitio profesional, diagnóstico o paquete completo.
          </p>
        </div>

        {/* 2-col grid */}
        <div className="cs-grid">

          {/* Izquierda — editorial */}
          <div className="cs-left reveal">
            <h3 className="cs-left-title">Empezamos con una conversación.</h3>
            <p className="cs-left-text">
              No necesitas tener todo claro. Si tu negocio ya vende, pero tu presencia digital no refleja su valor, WeblynMX puede ayudarte a ordenar la idea y convertirla en una experiencia web profesional.
            </p>
            <ul className="cs-bullets">
              {BULLETS.map((b) => (
                <li key={b} className="cs-bullet">
                  <span className="cs-bullet-check">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha — botones de contacto */}
          <div className="cs-right reveal" style={{ ['--reveal-delay' as string]: '.1s' }}>
            <div className="cs-card">

              {/* WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn cs-btn-wa magnetic"
              >
                <svg className="cs-btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.771.465 3.432 1.28 4.877L2 22l5.26-1.247A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor" opacity=".55"/>
                </svg>
                Hablar por WhatsApp
                <span className="cs-btn-arrow">→</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/WebLynMx"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn cs-btn-ig magnetic"
              >
                <svg className="cs-btn-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                </svg>
                Ver Instagram
                <span className="cs-btn-arrow">→</span>
              </a>

              {/* Correo */}
              <a
                href="mailto:WebLynMx@gmail.com"
                className="cs-btn cs-btn-mail magnetic"
              >
                <svg className="cs-btn-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Enviar correo
                <span className="cs-btn-arrow">→</span>
              </a>

              <p className="cs-microcopy">Respondemos personalmente. Sin bots raros. Sin vueltas.</p>
            </div>
          </div>
        </div>

        {/* Mini-card diagnóstico */}
        <div className="cs-diag-card reveal" style={{ ['--reveal-delay' as string]: '.15s' }}>
          <div className="cs-diag-text">
            <h4 className="cs-diag-title">¿No sabes qué necesitas?</h4>
            <p className="cs-diag-desc">
              Haz el diagnóstico gratuito y recibe una recomendación personalizada de WeblynMX junto con un precio especial.
            </p>
          </div>
          <a href="/diagnostico" className="btn btn-primary magnetic cs-diag-btn">
            Hacer diagnóstico <span className="arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
