import type { Metadata } from 'next';
import Link from 'next/link';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cursor from '../../components/Cursor';
import { getPostBySlug, getAllPosts, formatDate } from '../../lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | WeblynMX`,
    description: post.meta.ogDescription || post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <>
      <Cursor />
      <Nav />

      <main className="article-main">
        <div className="section-wrap">
          <div className="article-wrap">

            <Link href="/blog" className="article-back">
              ← Volver al blog
            </Link>

            <p className="article-date">{formatDate(post.meta.date)}</p>
            <h1 className="article-title">{post.meta.title}</h1>
            <hr className="article-divider" />

            <article
              className="article-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="article-cta">
              <p className="article-cta-text">
                ¿Tu negocio necesita esto?
              </p>
              <Link href="/diagnostico" className="btn btn-primary magnetic">
                Comenzamos con una conversación <span className="arrow">→</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
