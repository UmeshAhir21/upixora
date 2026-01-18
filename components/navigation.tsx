'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Logo } from './logo';

export function Navigation() {
  const pathname = usePathname();
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jpg-to-png', label: 'JPG to PNG' },
    { href: '/png-to-jpg', label: 'PNG to JPG' },
    { href: '/webp-to-jpg', label: 'WEBP to JPG' },
    { href: '/png-to-webp', label: 'PNG to WEBP' },
    { href: '/image-to-avif', label: 'Image to AVIF' },
    { href: '/bulk-image-converter', label: 'Bulk Converter' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <button
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
