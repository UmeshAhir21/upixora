import type { Metadata } from 'next';
import { FileConverter } from '@/components/file-converter';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'File Converter - Convert Documents, XML, PDF & More',
  description: 'Convert files between different formats. Support for XML to DOC, DOC to PDF, and more file types.',
  keywords: ['file converter', 'document converter', 'xml to doc', 'doc to pdf', 'file format converter'],
  alternates: {
    canonical: '/file-converter',
  },
  openGraph: {
    title: 'File Converter - Convert Documents, XML, PDF & More',
    description: 'Convert files between different formats. Free and secure.',
    url: '/file-converter',
  },
};

export default function FileConverterPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <FileConverter />
            <div className="mt-12 prose dark:prose-invert max-w-none">
              <h2>Supported File Conversions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3>XML Conversions</h3>
                  <ul>
                    <li>XML to DOC</li>
                    <li>XML to DOCX</li>
                    <li>XML to PDF</li>
                    <li>XML to TXT</li>
                  </ul>
                </div>
                <div>
                  <h3>Document Conversions</h3>
                  <ul>
                    <li>DOC to PDF</li>
                    <li>DOC to DOCX</li>
                    <li>DOCX to PDF</li>
                    <li>DOCX to DOC</li>
                  </ul>
                </div>
                <div>
                  <h3>Excel Conversions</h3>
                  <ul>
                    <li>XLS to XLSX</li>
                    <li>XLS to CSV</li>
                    <li>XLSX to XLS</li>
                    <li>XLSX to CSV</li>
                  </ul>
                </div>
                <div>
                  <h3>Text Conversions</h3>
                  <ul>
                    <li>TXT to DOC</li>
                    <li>TXT to DOCX</li>
                    <li>TXT to PDF</li>
                  </ul>
                </div>
              </div>
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
