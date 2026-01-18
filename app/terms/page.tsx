import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Upixora',
  description: 'Read our terms and conditions for using the Upixora service.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using Upixora, you accept and agree to be bound by these Terms
                and Conditions. If you do not agree, please do not use our service.
              </p>

              <h2>Use of Service</h2>
              <p>You agree to use our service only for lawful purposes and in accordance with these terms.</p>

              <h2>Prohibited Uses</h2>
              <p>You may not use our service to:</p>
              <ul>
                <li>Upload copyrighted material without permission</li>
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Attempt to breach security or disrupt service</li>
                <li>Use automated systems to abuse the service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                All content, features, and functionality of the service are owned by Upixora and
                are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
                that the service will be uninterrupted, secure, or error-free.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                Upixora shall not be liable for any indirect, incidental, special, or consequential
                damages arising from your use of the service.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Upixora from any claims, damages, or expenses
                arising from your use of the service or violation of these terms.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service after
                changes constitutes acceptance of the new terms.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these Terms & Conditions, please contact us at{' '}
                <a href="mailto:legal@example.com">legal@example.com</a>.
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
