import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Image to AVIF Converter - Upixora',
  description: 'Convert images to AVIF format instantly. AVIF offers the best compression with excellent quality. Free, fast, and secure.',
  keywords: ['image to avif', 'convert to avif', 'avif converter', 'jpg to avif', 'png to avif'],
  alternates: {
    canonical: '/image-to-avif',
  },
  openGraph: {
    title: 'Image to AVIF Converter - Upixora',
    description: 'Convert images to AVIF format instantly. Best compression with excellent quality.',
    url: '/image-to-avif',
  },
};

export default function ImageToAvifPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageConverter
              fixedOutputFormat="avif"
              showFormatSelection={false}
              title="Convert Image to AVIF"
              description="Upload your image and convert it to AVIF format. AVIF offers the best compression ratio with excellent quality."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Why Convert to AVIF?</h2>
              <p>
                AVIF (AV1 Image File Format) provides the best compression efficiency among modern image formats,
                offering up to 50% better compression than JPEG while maintaining superior image quality.
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
