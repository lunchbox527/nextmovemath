import React, { useState, useEffect } from 'react';
import NextMoveMathCalculator from './components/NextMoveMathCalculator';

export default function App() {
  const [country, setCountry] = useState<'CA' | 'US'>('CA');
  const [shareToast, setShareToast] = useState<boolean>(false);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const c = urlParams.get('country');
      if (c === 'US' || c === 'CA') {
        setCountry(c);
      }

      // Normalize any legacy multi-page path cleanly back to the single-page root
      if (window.location.pathname !== '/') {
        const cleanQuery = c === 'US' ? '?country=US' : '';
        window.history.replaceState({}, '', `/${cleanQuery}`);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetCountry = (nextCountry: 'CA' | 'US') => {
    setCountry(nextCountry);
    try {
      const nextUrl = new URL('/', window.location.origin);
      if (nextCountry === 'US') {
        nextUrl.searchParams.set('country', 'US');
      }
      window.history.replaceState({}, '', nextUrl.pathname + nextUrl.search);
    } catch {
      // ignore
    }
  };

  const handleShare = () => {
    try {
      const shareUrl = new URL('/', window.location.origin);
      if (country === 'US') {
        shareUrl.searchParams.set('country', 'US');
      }
      navigator.clipboard.writeText(shareUrl.toString());
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    } catch {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#17312d] flex flex-col font-sans">
      <main className="flex-1 w-full mx-auto">
        <NextMoveMathCalculator
          country={country}
          setCountry={handleSetCountry}
          onShare={handleShare}
          onPrint={handlePrint}
          shareToast={shareToast}
        />
      </main>

      {shareToast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-[#17312d] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3"
          role="status"
        >
          <div className="text-xs">
            <strong className="block text-emerald-400 font-bold">Link Copied!</strong>
            <span className="text-slate-300">Share NextMoveMath with family, your realtor, or your broker.</span>
          </div>
        </div>
      )}
    </div>
  );
}
