import React, { useState, useEffect } from 'react';
import NextMoveMathCalculator from './components/NextMoveMathCalculator';

export default function App() {
  const [country, setCountry] = useState<'CA' | 'US'>('CA');
  const [publisherId] = useState<string>('ca-pub-1925679446000087');
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [inspectOutlines, setInspectOutlines] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Initialize country and simulation parameters from URL if present
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const c = urlParams.get('country');
      if (c === 'US' || c === 'CA') {
        setCountry(c);
      }
      if (urlParams.get('simulate') === 'true') {
        setSimulationMode(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleShare = () => {
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('country', country);
      navigator.clipboard.writeText(currentUrl.toString());
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3200);
    } catch {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#17312d] flex flex-col font-sans">
      {/* Main NextMoveMath Calculator (Contains the single unified website topbar) */}
      <main className="flex-1 w-full mx-auto">
        <NextMoveMathCalculator
          publisherId={publisherId}
          simulationMode={simulationMode}
          inspectOutlines={inspectOutlines}
          country={country}
          setCountry={setCountry}
          onShare={handleShare}
          onPrint={handlePrint}
          shareToast={shareToast}
        />
      </main>

      {/* Discrete Share Toast Notification */}
      {shareToast && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#17312d] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fade-in"
          role="status"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="text-xs">
            <strong className="block text-emerald-400 font-bold">Calculation Link Copied!</strong>
            <span className="text-slate-300">Share this link with your spouse, realtor, or mortgage broker.</span>
          </div>
        </div>
      )}
    </div>
  );
}
