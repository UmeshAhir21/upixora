import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Upixora - Convert JPG, PNG, WEBP, AVIF & More',
  description: 'Convert images between JPG, PNG, WEBP, AVIF and TIFF formats. Free, fast, and secure image conversion tool with batch processing support.',
  keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp converter', 'avif converter', 'image format converter'],
  openGraph: {
    title: 'Upixora - Convert JPG, PNG, WEBP, AVIF & More',
    description: 'Convert images between multiple formats. Free, fast, and secure image conversion tool.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageConverter
              title="Upixora"
              description="Convert your images between JPG, PNG, WEBP, AVIF and TIFF formats instantly. No registration required."
            />
            <div className="mt-12 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Supported Formats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Input Formats</h3>
                    <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>JPG / JPEG</li>
                      <li>PNG</li>
                      <li>WEBP</li>
                      <li>TIFF</li>
                      <li>SVG</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Output Formats</h3>
                    <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>JPG</li>
                      <li>PNG</li>
                      <li>WEBP</li>
                      <li>AVIF</li>
                      <li>TIFF</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Drag & drop image upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Batch image conversion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Adjustable quality settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Resize options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>100% free and secure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>No registration required</span>
                  </li>
                </ul>
              </section>
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
