import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'WEBP to JPG Converter - Free Online Tool',
  description: 'Convert WEBP images to JPG/JPEG format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['webp to jpg', 'webp to jpeg', 'convert webp to jpg', 'webp jpg converter'],
  alternates: {
    canonical: '/webp-to-jpg',
  },
  openGraph: {
    title: 'WEBP to JPG Converter - Free Online Tool',
    description: 'Convert WEBP images to JPG/JPEG format instantly. Free, fast, and secure.',
    url: '/webp-to-jpg',
  },
};

export default function WebpToJpgPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageConverter
              fixedInputFormat="webp"
              fixedOutputFormat="jpg"
              showFormatSelection={false}
              title="Convert WEBP to JPG"
              description="Upload your WEBP image and convert it to JPG format. Perfect for compatibility with older systems."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Why Convert WEBP to JPG?</h2>
              <p>
                While WEBP offers excellent compression, JPG format has universal compatibility across
                all devices and platforms, making it ideal for sharing and compatibility.
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
