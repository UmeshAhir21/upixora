'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to enhance your browsing experience and analyze site traffic. 
            By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
            <a href="/privacy" className="underline hover:text-blue-400">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-700 rounded hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
