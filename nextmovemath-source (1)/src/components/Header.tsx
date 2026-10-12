import React from 'react';
import { Share2, Printer, Check, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  country: 'CA' | 'US';
  setCountry: (country: 'CA' | 'US') => void;
  onShare: () => void;
  onPrint: () => void;
  shareToast: boolean;
  onOpenCompliance?: (page: 'privacy' | 'terms') => void;
}

export default function Header({
  country,
  setCountry,
  onShare,
  onPrint,
  shareToast,
  onOpenCompliance,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 gap-3">
        {/* Left: Brand Wordmark (Georgia serif) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2.5 group"
          >
            <span 
              className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-emerald-950/40 group-hover:bg-emerald-500 transition-colors"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              N
            </span>
            <span 
              className="font-bold tracking-tight text-white text-lg sm:text-xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              NextMoveMath
            </span>
          </a>
          <span className="hidden xl:inline text-[11px] text-slate-400 border-l border-slate-800 pl-3 py-0.5">
            Real home moving math in plain English
          </span>
        </div>

        {/* Center: Country Selector (Canada vs United States) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setCountry('CA')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              country === 'CA'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Canada: Bank of Canada Stress Test (+2%), CAD, CMHC and Provincial Transfer Taxes"
          >
            <span>🇨🇦</span>
            <span className="hidden sm:inline">Canada</span>
            <span className="sm:hidden">CA</span>
          </button>
          <button
            type="button"
            onClick={() => setCountry('US')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              country === 'US'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="United States: 30-Yr Fixed, USD, DTI Guidelines, PMI, County Transfer & Escrow"
          >
            <span>🇺🇸</span>
            <span className="hidden sm:inline">United States</span>
            <span className="sm:hidden">US</span>
          </button>
        </div>

        {/* Right: Share, Print, and Plain English anchor */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Plain English Promise Link */}
          <a
            href="#promise-section"
            className="hidden lg:flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 px-2 py-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>The Promise</span>
          </a>

          {/* Share Calculation Button */}
          <button
            type="button"
            onClick={onShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              shareToast
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:text-white'
            }`}
            title="Copy unique link with your current calculation numbers"
          >
            {shareToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Share Move</span>
                <span className="sm:hidden">Share</span>
              </>
            )}
          </button>

          {/* Print 1-Page Summary Button */}
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
            title="Print or Save a 1-page financial summary sheet to PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>
      </div>
    </header>
  );
}
