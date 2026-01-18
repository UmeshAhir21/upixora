'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-12 w-auto flex-shrink-0">
        <Image
          src="/Gemini_Generated_Image_wckmpdwckmpdwckm.png"
          alt="Upixora"
          width={120}
          height={48}
          className="object-contain h-full w-auto"
          priority
        />
      </div>
      {/* {showText && (
        <span className="text-xl font-bold text-blue-900 dark:text-blue-100 hidden sm:block">
          Upixora
        </span>
      )} */}
    </Link>
  );
}
