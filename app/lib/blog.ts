import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  ogDescription: string;
  category: string;
}

export const CATEGORIES: Record<string, string> = {
  'precios':       'Precios y presupuesto',
  'por-industria': 'Por industria',
  'comparativas':  'Comparativas',
  'problemas':     'Problemas frecuentes',
  'guias':         'Guías y conceptos',
  'general':       'General',
};

export const CATEGORY_ORDER = [
  'precios',
  'por-industria',
  'comparativas',
  'problemas',
  'guias',
  'general',
];

// GPT sometimes wraps output in ```mdx ... ``` — strip it
function clean(raw: string): string {
  return raw.replace(/^```(?:mdx)?\r?\n/, '').replace(/\r?\n```\s*$/, '').trim();
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const { data } = matter(clean(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')));
      const slug = file.replace('.mdx', ''); // Always use filename as slug — never frontmatter
      return {
        title:         data.title        ?? slug,
        description:   data.description  ?? '',
        date:          data.date         ?? '',
        slug,
        ogDescription: data.ogDescription ?? '',
        category:      data.category     ?? 'general',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(): Record<string, PostMeta[]> {
  const posts = getAllPosts();
  const grouped: Record<string, PostMeta[]> = {};
  for (const post of posts) {
    const cat = post.category ?? 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(post);
  }
  return grouped;
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(clean(fs.readFileSync(file, 'utf8')));
  return {
    meta: {
      title:         data.title        ?? slug,
      description:   data.description  ?? '',
      date:          data.date         ?? '',
      slug:          data.slug         ?? slug,
      ogDescription: data.ogDescription ?? '',
      category:      data.category     ?? 'general',
    },
    content,
  };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}
