import type { Metadata } from 'next';
import Nav from '../components/Nav';
import GuiaPaquetesSection from '../components/GuiaPaquetesSection';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import RevealObserver from '../components/RevealObserver';

export const metadata: Metadata = {
  title: 'Paquetes — WeblynMX',
  description: 'Encuentra el paquete ideal para tu negocio. 15 paquetes diseñados por objetivo: vender más, mejorar tu marca, lanzar rápido o construir autoridad digital.',
};

export default function PaquetesPage() {
  return (
    <>
      <Cursor />
      <RevealObserver />
      <Nav />
      <main style={{ paddingTop: '5rem' }}>
        <GuiaPaquetesSection />
      </main>
      <Footer />
    </>
  );
}
