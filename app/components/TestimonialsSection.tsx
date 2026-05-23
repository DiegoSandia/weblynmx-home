export default function TestimonialsSection() {
  return (
    <section id="nosotros">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="eyebrow">Clientes</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Lo que dicen <span className="accent">después.</span>
          </h2>
        </div>

        <div className="testimonials">
          <div className="testimonial-card reveal" style={{ ['--reveal-delay' as string]: '0s' }}>
            <p className="quote">&ldquo;Antes nadie me tomaba en serio. Después del sitio cerramos tres contratos en el primer mes.&rdquo;</p>
            <div className="author">Carlos M.</div>
            <div className="role">Despacho Contable · CDMX</div>
          </div>
          <div className="testimonial-card reveal" style={{ ['--reveal-delay' as string]: '.1s' }}>
            <p className="quote">&ldquo;El menú digital nos ahorró el costo de imprimir cada semana. Y se ve mil veces mejor.&rdquo;</p>
            <div className="author">Sofía R.</div>
            <div className="role">Restaurante · Polanco</div>
          </div>
          <div className="testimonial-card reveal" style={{ ['--reveal-delay' as string]: '.2s' }}>
            <p className="quote">&ldquo;Entregaron en 7 días. Sin excusas, sin idas y venidas. Profesional de principio a fin.&rdquo;</p>
            <div className="author">Andrés V.</div>
            <div className="role">Clínica Dental · Guadalajara</div>
          </div>
        </div>
      </div>
    </section>
  );
}
