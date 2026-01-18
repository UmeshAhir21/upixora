import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Blog - Upixora Tips & Guides',
  description: 'Learn about image formats, conversion tips, and best practices for image optimization.',
  alternates: {
    canonical: '/blog',
  },
};

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Image Formats: JPG vs PNG vs WEBP',
    excerpt: 'Learn the differences between popular image formats and when to use each one.',
    date: '2024-01-15',
    slug: 'understanding-image-formats',
  },
  {
    id: 2,
    title: 'How to Optimize Images for Web Performance',
    excerpt: 'Best practices for reducing image file sizes while maintaining quality.',
    date: '2024-01-10',
    slug: 'optimize-images-web',
  },
  {
    id: 3,
    title: 'AVIF: The Future of Web Images',
    excerpt: 'Discover why AVIF format is becoming the new standard for web images.',
    date: '2024-01-05',
    slug: 'avif-future-web-images',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="border-b pb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                  <time className="text-sm text-gray-500">{post.date}</time>
                </article>
              ))}
            </div>
          </main>
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
        </div>
      </div>
    </div>
  );
}
