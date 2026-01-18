import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'PNG to WEBP Converter - Free Online Tool',
  description: 'Convert PNG images to WEBP format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['png to webp', 'convert png to webp', 'png webp converter'],
  alternates: {
    canonical: '/png-to-webp',
  },
  openGraph: {
    title: 'PNG to WEBP Converter - Free Online Tool',
    description: 'Convert PNG images to WEBP format instantly. Free, fast, and secure.',
    url: '/png-to-webp',
  },
};

export default function PngToWebpPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageConverter
              fixedInputFormat="png"
              fixedOutputFormat="webp"
              showFormatSelection={false}
              title="Convert PNG to WEBP"
              description="Upload your PNG image and convert it to WEBP format. Get smaller file sizes with excellent quality."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Why Convert PNG to WEBP?</h2>
              <p>
                WEBP format provides superior compression compared to PNG while maintaining transparency support,
                resulting in significantly smaller file sizes for web use.
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
