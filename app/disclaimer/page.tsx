import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Disclaimer - Upixora',
  description: 'Read our disclaimer regarding the use of the Upixora service.',
  alternates: {
    canonical: '/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>General Disclaimer</h2>
              <p>
                The information on this website is provided on an &quot;as is&quot; basis. Upixora makes no
                representations or warranties of any kind, express or implied, about the completeness, accuracy,
                reliability, or suitability of the information contained on this website.
              </p>

              <h2>Service Availability</h2>
              <p>
                We do not guarantee that the service will be available at all times. The service may be
                temporarily unavailable due to maintenance, updates, or technical issues.
              </p>

              <h2>Image Conversion</h2>
              <p>
                While we strive to provide accurate image conversion, we cannot guarantee that all conversions
                will be perfect or meet your specific requirements. Results may vary depending on the source
                image quality and format.
              </p>

              <h2>No Copyright Infringement</h2>
              <p>
                Users are solely responsible for ensuring they have the right to convert and use the images
                they upload. Upixora is not responsible for any copyright infringement or illegal
                use of converted images.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We have no control over the content
                or practices of these websites and are not responsible for their content or privacy policies.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                  Upixora shall not be liable for any loss or damage, including without limitation,
                indirect or consequential loss or damage, arising from the use of this website or service.
              </p>

              <h2>Professional Advice</h2>
              <p>
                The information provided on this website is for general informational purposes only and should
                not be considered as professional advice. Always seek professional guidance for specific
                situations.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about this disclaimer, please contact us at{' '}
                <a href="mailto:contact@example.com">contact@example.com</a>.
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
