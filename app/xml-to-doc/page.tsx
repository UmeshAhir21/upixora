import type { Metadata } from 'next';
import { FileConverter } from '@/components/file-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'XML to DOC Converter - Free Online Tool',
  description: 'Convert XML files to DOC format instantly. Free, fast, and secure conversion tool. No registration required.',
  keywords: ['xml to doc', 'xml to docx', 'convert xml to doc', 'xml doc converter'],
  alternates: {
    canonical: '/xml-to-doc',
  },
  openGraph: {
    title: 'XML to DOC Converter - Free Online Tool',
    description: 'Convert XML files to DOC format instantly. Free, fast, and secure.',
    url: '/xml-to-doc',
  },
};

export default function XmlToDocPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <FileConverter 
              fixedFrom="xml"
              fixedTo="doc"
              title="Convert XML to DOC"
              description="Upload your XML file and convert it to DOC format. Only XML files are accepted."
            />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>How to Convert XML to DOC</h2>
              <ol>
                <li>Upload your XML file using the drag & drop area or click to browse</li>
                <li>Select &quot;XML to DOC&quot; from the available conversion options</li>
                <li>Click &quot;Convert & Download&quot; to get your DOC file</li>
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
