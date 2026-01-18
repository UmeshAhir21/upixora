import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import { StructuredData } from '@/components/structured-data';
import { ToastProvider } from '@/components/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Upixora - Convert JPG, PNG, WEBP, AVIF & More',
    template: '%s | Upixora',
  },
  description: 'Convert images between JPG, PNG, WEBP, AVIF, GIF, BMP, and TIFF formats. Free, fast, and secure image conversion tool with batch processing support.',
  keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp converter', 'avif converter', 'image format converter'],
  authors: [{ name: 'Upixora' }],
  creator: 'Upixora',
  publisher: 'Upixora',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Upixora',
    title: 'Upixora - Convert JPG, PNG, WEBP, AVIF & More',
    description: 'Convert images between multiple formats. Free, fast, and secure image conversion tool.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upixora',
    description: 'Convert images between multiple formats. Free, fast, and secure.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="WebApplication" />
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
