import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Privacy Policy - Upixora',
  description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>Introduction</h2>
              <p>
                This Privacy Policy describes how Upixora (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects,
                uses, and protects your information when you use our image conversion service.
              </p>

              <h2>Data Storage Policy</h2>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                <strong>We do not store your data.</strong> All files uploaded to our service, including images and documents,
                are processed in real-time and immediately deleted after conversion. We do not save, store, or retain any
                uploaded files, converted files, or user data on our servers. Your privacy and data security are our top priorities.
              </p>

              <h2>Information We Collect</h2>
              <h3>Files and Documents</h3>
              <p>
                When you upload files (images, documents, or any other files) for conversion, we temporarily process them
                on our servers only for the duration of the conversion process. All files are immediately and permanently
                deleted after conversion is complete. <strong>We cannot and do not store, save, or retain any uploaded files,
                converted files, or any user data.</strong> Your files are processed in memory and never written to disk storage.
              </p>

              <h3>Usage Data</h3>
              <p>
                We may collect information about how you access and use our service, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Date and time of access</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and convert your images</li>
                <li>Improve our service and user experience</li>
                <li>Prevent abuse and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Cookies</h2>
              <p>
                We use cookies to enhance your experience, analyze usage, and for advertising purposes.
                You can control cookie preferences through your browser settings.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We may use third-party services such as Google Analytics and Google AdSense. These services
                may collect information about your use of our website.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information. However, no method of
                transmission over the internet is 100% secure.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of cookies</li>
                <li>File a complaint with relevant authorities</li>
              </ul>

              <h2>Children&apos;s Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect information
                from children.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new policy on this page.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@example.com">privacy@example.com</a>.
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
