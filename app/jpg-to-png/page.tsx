import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter - Free Online Tool',
  description: 'Convert JPG/JPEG images to PNG format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'jpg png converter'],
  alternates: {
    canonical: '/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Converter - Free Online Tool',
    description: 'Convert JPG/JPEG images to PNG format instantly. Free, fast, and secure.',
    url: '/jpg-to-png',
  },
};

export default function JpgToPngPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageConverter
              fixedInputFormat="jpg"
              fixedOutputFormat="png"
              showFormatSelection={false}
              title="Convert JPG to PNG"
              description="Upload your JPG or JPEG image and convert it to PNG format. Supports transparency preservation."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Why Convert JPG to PNG?</h2>
              <p>
                PNG format supports lossless compression and transparency, making it ideal for images that need
                transparent backgrounds or require high quality without compression artifacts.
              </p>
              <h2>How to Convert JPG to PNG</h2>
              <ol>
                <li>Upload your JPG or JPEG image using the drag & drop area or click to browse</li>
                <li>Select PNG as the output format</li>
                <li>Adjust quality settings if needed</li>
                <li>Click &quot;Convert & Download&quot; to get your PNG file</li>
              </ol>
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
