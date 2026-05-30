import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import RevealObserver from '../components/RevealObserver';
import { getPostsByCategory, getAllPosts, CATEGORIES, CATEGORY_ORDER, formatDate } from '../lib/blog';

export const metadata: Metadata = {
  title: 'Blog | WeblynMX',
  description: 'Guías, comparativas y recursos sobre diseño web y presencia digital para negocios en México.',
};

// Subtítulos descriptivos por categoría para dar contexto
const CATEGORY_DESC: Record<string, string> = {
  'precios':       'Cuánto cuesta una web, una landing o un rediseño. Rangos reales en MXN.',
  'por-industria': 'Recomendaciones específicas según el giro de tu negocio.',
  'comparativas':  'Decide entre opciones sin que te vendan humo.',
  'problemas':     'Errores frecuentes que te están costando ventas y cómo resolverlos.',
  'guias':         'Conceptos clave de diseño web explicados sin tecnicismos.',
  'general':       'Otros artículos sobre presencia digital y branding.',
};

export default function BlogPage() {
  const byCategory = getPostsByCategory();
  const total = getAllPosts().length;

  const orderedCategories = [
    ...CATEGORY_ORDER.filter(c => byCategory[c]?.length > 0),
    ...Object.keys(byCategory).filter(c => !CATEGORY_ORDER.includes(c) && byCategory[c]?.length > 0),
  ];

  return (
    <>
      <Cursor />
      <RevealObserver />
      <Nav />

      <main className="blog-main">
        <div className="section-wrap">

          {/* Hero */}
          <header className="blog-hero">
            <span className="eyebrow">Blog WeblynMX</span>
            <h1 className="blog-hero-title">
              Todo lo que necesitas saber<br />
              para decidir mejor en <span className="accent">digital.</span>
            </h1>
            <p className="blog-hero-sub">
              {total} artículos sobre diseño web, precios, estrategia y presencia digital
              para dueños de negocio en México.
            </p>
          </header>

          {/* Category nav pills */}
          {orderedCategories.length > 1 && (
            <nav className="blog-cat-nav" aria-label="Categorías">
              {orderedCategories.map(cat => (
                <a key={cat} href={`#${cat}`} className="blog-cat-pill">
                  {CATEGORIES[cat] ?? cat}
                  <span className="blog-cat-pill-count">{byCategory[cat].length}</span>
                </a>
              ))}
            </nav>
          )}

          {/* Sections by category */}
          {orderedCategories.map((cat, idx) => (
            <section key={cat} id={cat} className="blog-section">
              <div className="blog-section-header">
                <div className="blog-section-meta">
                  <span className="blog-section-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="blog-section-title">
                      {CATEGORIES[cat] ?? cat}
                    </h2>
                    <p className="blog-section-desc">
                      {CATEGORY_DESC[cat] ?? ''}
                    </p>
                  </div>
                </div>
                <span className="blog-section-count">
                  {byCategory[cat].length} {byCategory[cat].length === 1 ? 'artículo' : 'artículos'}
                </span>
              </div>

              <div className="blog-grid">
                {byCategory[cat].map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card magnetic">
                    <div className="blog-card-top">
                      <p className="blog-card-date">{formatDate(post.date)}</p>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-desc">{post.description}</p>
                    </div>
                    <span className="blog-card-link">
                      Leer artículo <span className="arrow">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {total === 0 && (
            <p className="blog-empty">Próximamente nuevos artículos.</p>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
