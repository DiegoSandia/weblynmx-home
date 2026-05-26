import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import RevealObserver from '../components/RevealObserver';
import { getAllPosts, formatDate } from '../lib/blog';

export const metadata: Metadata = {
  title: 'Blog | WeblynMX',
  description: 'Artículos sobre diseño web, branding digital y presencia online para negocios en México.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Cursor />
      <RevealObserver />
      <Nav />

      <main className="blog-main">
        <div className="section-wrap">

          <div className="blog-hero reveal">
            <span className="eyebrow">Recursos</span>
            <h1 className="blog-hero-title">
              Todo lo que necesitas saber<br />
              sobre presencia <span className="accent">digital.</span>
            </h1>
            <p className="blog-hero-sub">
              Guías prácticas para dueños de negocio en México que quieren
              verse más profesionales en internet.
            </p>
          </div>

          <div className="blog-grid reveal">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card magnetic">
                <p className="blog-card-date">{formatDate(post.date)}</p>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-link">Leer artículo →</span>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
