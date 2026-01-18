import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Contact Us - Image Converter',
  description: 'Get in touch with us. We\'d love to hear your feedback, suggestions, or answer any questions.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <AdPlaceholder className="h-96" />
          </aside>
          <main className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                We&apos;d love to hear from you! Whether you have a question, feedback, or a suggestion,
                please don&apos;t hesitate to reach out.
              </p>
              <h2>Get in Touch</h2>
              <p>
                For general inquiries, feedback, or support, please use the contact form below or email us
                at <a href="mailto:contact@example.com">contact@example.com</a>.
              </p>
              <form className="space-y-6 mt-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
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
