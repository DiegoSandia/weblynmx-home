export default function CtaFinal() {
  return (
    <section className="cta-final">
      <video className="cta-video-bg" autoPlay loop muted playsInline>
        <source src="/Hero/Hero video.mp4" type="video/mp4" />
      </video>
      <div className="cta-overlay"></div>
      <h2 className="cta-headline reveal">
        Tu negocio merece <span className="accent">verse así.</span>
      </h2>
      <p className="cta-sub reveal" style={{ ['--reveal-delay' as string]: '.1s' }}>
        Comenzamos con una conversación. Sin presión. Sin términos técnicos.
      </p>
      <a
        href="#cotizar"
        className="btn btn-primary cta-button-big magnetic reveal"
        style={{ ['--reveal-delay' as string]: '.2s' }}
      >
        Cotizar mi proyecto <span className="arrow">→</span>
      </a>
      <div className="cta-badge reveal" style={{ ['--reveal-delay' as string]: '.3s' }}>
        <span className="dot"></span>
        Respondemos en menos de 2 horas
      </div>
    </section>
  );
}
