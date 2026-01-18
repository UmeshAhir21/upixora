import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'About Us - Image Converter',
  description: 'Learn about our free image conversion tool and our mission to provide fast, secure, and easy image format conversion.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Upixora is a free, fast, and secure online tool designed to help you convert images
                between different formats effortlessly. Our mission is to provide a simple, user-friendly
                solution for all your image conversion needs.
              </p>
              <h2>Our Mission</h2>
              <p>
                We believe that image conversion should be simple, fast, and accessible to everyone. That&apos;s
                why we&apos;ve created a tool that requires no registration, no software installation, and
                works directly in your browser.
              </p>
              <h2>Key Features</h2>
              <ul>
                <li>100% free - no hidden costs or subscriptions</li>
                <li>Fast conversion - process images in seconds</li>
                <li>Secure - all processing happens server-side, files are deleted immediately</li>
                <li>No registration required - start converting right away</li>
                <li>Multiple formats - support for JPG, PNG, WEBP, AVIF, GIF, BMP, and TIFF</li>
                <li>Batch processing - convert multiple images at once</li>
              </ul>
              <h2>Privacy & Security</h2>
              <p>
                Your privacy is important to us. All uploaded images are processed server-side and immediately
                deleted after conversion. We don&apos;t store, share, or access your images beyond the
                conversion process.
              </p>
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
