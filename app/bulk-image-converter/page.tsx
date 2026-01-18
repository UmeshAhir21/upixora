import type { Metadata } from 'next';
import { BulkImageConverter } from '@/components/bulk-image-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Bulk Image Converter - Upixora',
  description: 'Convert multiple images to different formats simultaneously. Free bulk image conversion tool. No registration required.',
  keywords: ['bulk image converter', 'batch image converter', 'convert multiple images', 'mass image converter'],
  alternates: {
    canonical: '/bulk-image-converter',
  },
  openGraph: {
    title: 'Bulk Image Converter - Upixora',
    description: 'Convert multiple images to different formats simultaneously. Free and secure.',
    url: '/bulk-image-converter',
  },
};

export default function BulkConverterPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <BulkImageConverter />
          </main>
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
        </div>
      </div>
    </div>
  );
}
