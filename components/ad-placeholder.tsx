interface AdPlaceholderProps {
  className?: string;
  label?: string;
}

export function AdPlaceholder({ className = '', label = 'Advertisement' }: AdPlaceholderProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg ${className}`}>
      <div className="text-center p-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
        <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400">Ad Space</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {/* Google AdSense code will go here */}
          {/* <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`} crossOrigin="anonymous"></script> */}
        </p>
      </div>
    </div>
  );
}
