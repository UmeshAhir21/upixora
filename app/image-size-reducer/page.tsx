import type { Metadata } from 'next';
import { ImageSizeReducer } from '@/components/image-size-reducer';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Image Size Reducer - Reduce Image File Size Online',
  description: 'Reduce your image file size to a specific target size. Free online tool to compress images to your desired file size in MB or KB.',
  keywords: ['image size reducer', 'reduce image size', 'compress image', 'image file size reducer', 'image compressor'],
  alternates: {
    canonical: '/image-size-reducer',
  },
  openGraph: {
    title: 'Image Size Reducer - Reduce Image File Size Online',
    description: 'Reduce your image file size to a specific target size. Free and secure.',
    url: '/image-size-reducer',
  },
};

export default function ImageSizeReducerPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <ImageSizeReducer />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>How to Reduce Image Size</h2>
              <ol>
                <li>Upload your image using the drag & drop area or click to browse</li>
                <li>Enter your target file size (in MB or KB)</li>
                <li>Click &quot;Reduce Size&quot; button</li>
                <li>Download your reduced image</li>
              </ol>
              <h2>Why Reduce Image Size?</h2>
              <p>
                Reducing image file size helps improve website loading speed, save storage space,
                and make images easier to share via email or messaging apps.
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
