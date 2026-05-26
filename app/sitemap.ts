import { MetadataRoute } from 'next';
import { getAllPosts } from './lib/blog';

const BASE = 'https://weblynmx.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: new Date(), priority: 1.0,  changeFrequency: 'monthly' },
    { url: `${BASE}/paquetes`,      lastModified: new Date(), priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/diagnostico`,   lastModified: new Date(), priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/nosotros`,      lastModified: new Date(), priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE}/blog`,          lastModified: new Date(), priority: 0.8,  changeFrequency: 'weekly'  },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url:              `${BASE}/blog/${post.slug}`,
    lastModified:     post.date ? new Date(post.date) : new Date(),
    priority:         0.7,
    changeFrequency:  'monthly',
  }));

  return [...staticRoutes, ...blogRoutes];
}
