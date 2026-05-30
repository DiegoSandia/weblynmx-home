import Nav from './components/Nav';
import Hero from './components/Hero';
import DiagnosticoSection from './components/DiagnosticoSection';
import TransformacionSection from './components/TransformacionSection';
import PaquetesSection from './components/PaquetesSection';
import DiagnosticoCTA from './components/DiagnosticoCTA';
import BlogPreviewSection from './components/BlogPreviewSection';
import ContactSection from './components/ContactSection';
import CtaFinal from './components/CtaFinal';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import RevealObserver from './components/RevealObserver';

export default function Home() {
  return (
    <>
      <Cursor />
      <RevealObserver />
      <Nav />
      <Hero />
      <DiagnosticoSection />
      <TransformacionSection />
      <PaquetesSection />
      <DiagnosticoCTA />
      <BlogPreviewSection />
      <ContactSection />
      <CtaFinal />
      <Footer />
    </>
  );
}
