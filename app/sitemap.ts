import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/jpg-to-png',
    '/png-to-jpg',
    '/webp-to-jpg',
    '/png-to-webp',
    '/image-to-avif',
    '/bulk-image-converter',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
