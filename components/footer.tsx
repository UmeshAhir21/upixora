import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Free, fast, and secure image conversion tool. Convert between multiple image formats instantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-600 dark:text-gray-400">Converters</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jpg-to-png" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  JPG to PNG
                </Link>
              </li>
              <li>
                <Link href="/png-to-jpg" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  PNG to JPG
                </Link>
              </li>
              <li>
                <Link href="/webp-to-jpg" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  WEBP to JPG
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  PNG to WEBP
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-600 dark:text-gray-400">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-600 dark:text-gray-400">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Upixora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
