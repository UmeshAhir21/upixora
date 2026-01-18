import type { Metadata } from 'next';
import { FileConverter } from '@/components/file-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'DOC to PDF Converter - Free Online Tool',
  description: 'Convert DOC files to PDF format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['doc to pdf', 'docx to pdf', 'convert doc to pdf', 'doc pdf converter'],
  alternates: {
    canonical: '/doc-to-pdf',
  },
  openGraph: {
    title: 'DOC to PDF Converter - Free Online Tool',
    description: 'Convert DOC files to PDF format instantly. Free, fast, and secure.',
    url: '/doc-to-pdf',
  },
};

export default function DocToPdfPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <FileConverter 
              fixedFrom="doc"
              fixedTo="pdf"
              title="Convert DOC to PDF"
              description="Upload your DOC file and convert it to PDF format. Only DOC files are accepted."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>How to Convert DOC to PDF</h2>
              <ol>
                <li>Upload your DOC file using the drag & drop area or click to browse</li>
                <li>Select &quot;DOC to PDF&quot; from the available conversion options</li>
                <li>Click &quot;Convert & Download&quot; to get your PDF file</li>
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
