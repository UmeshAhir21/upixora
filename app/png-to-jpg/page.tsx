import type { Metadata } from 'next';
import { ImageConverter } from '@/components/image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter - Free Online Tool',
  description: 'Convert PNG images to JPG/JPEG format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'png jpg converter'],
  alternates: {
    canonical: '/png-to-jpg',
  },
  openGraph: {
    title: 'PNG to JPG Converter - Free Online Tool',
    description: 'Convert PNG images to JPG/JPEG format instantly. Free, fast, and secure.',
    url: '/png-to-jpg',
  },
};

export default function PngToJpgPage() {
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
              fixedOutputFormat="jpg"
              showFormatSelection={false}
              title="Convert PNG to JPG"
              description="Upload your PNG image and convert it to JPG format. Choose a background color for transparent areas."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Why Convert PNG to JPG?</h2>
              <p>
                JPG format offers better compression for photographs and images without transparency,
                resulting in smaller file sizes while maintaining good quality.
              </p>
              <h2>How to Convert PNG to JPG</h2>
              <ol>
                <li>Upload your PNG image using the drag & drop area or click to browse</li>
                <li>Select JPG as the output format</li>
                <li>Choose a background color if your PNG has transparency</li>
                <li>Adjust quality settings (1-100)</li>
                <li>Click &quot;Convert & Download&quot; to get your JPG file</li>
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
