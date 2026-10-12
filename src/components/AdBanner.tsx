'use client';
import React, { useEffect, useRef, useState } from 'react';
import { SAMPLE_AD_CREATIVES } from '../data/adPresets';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdBannerProps {
  /** The Google AdSense ad slot numeric ID */
  dataAdSlot: string;
  /** Optional custom client ID; defaults to standard placeholder or configured ID */
  dataAdClient?: string;
  /** Format of the ad: 'auto', 'rectangle', 'horizontal', 'vertical', or 'fluid' */
  dataAdFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid' | string;
  /** Whether to enable full width responsive sizing */
  dataFullWidthResponsive?: boolean | string;
  /** Custom inline styles for the wrapper container */
  style?: React.CSSProperties;
  /** Custom class names */
  className?: string;
  /** Force simulation mode for previewing real-looking ads in development without AdSense script */
  simulation?: boolean;
  /** Prevent Cumulative Layout Shift (CLS) by reserving minimal container height */
  minHeight?: number | string;
  /** Slot label for debugging and inspection */
  slotLabel?: string;
  /** Creative index for simulation */
  creativeIndex?: number;
  /** Whether to render in ultra-sleek compact single-row mode (~50px tall) */
  compact?: boolean;
  /** Size variant: 'compact' (~50px), 'medium' (~95px), 'large' (~150px, 1.6x medium), or 'standard' (~180px) */
  size?: 'compact' | 'medium' | 'large' | 'standard';
}

export default function AdBanner({
  dataAdSlot,
  dataAdClient = 'ca-pub-1925679446000087',
  dataAdFormat = 'auto',
  dataFullWidthResponsive = 'true',
  style,
  className = '',
  simulation = false,
  minHeight,
  slotLabel,
  creativeIndex = 0,
  compact = false,
  size
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isPushed, setIsPushed] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);
  const [adBlocked, setAdBlocked] = useState(false);

  // Resolved active size
  const activeSize = size || (compact ? 'compact' : 'standard');

  useEffect(() => {
    if (simulation) return;

    // Check if adsbygoogle script is loaded or blocked
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && !window.adsbygoogle) {
        // Script might be blocked by adblocker or not loaded in <head>
        setAdBlocked(true);
      }
    }, 1500);

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        // Only push if not already populated
        window.adsbygoogle.push({});
        setIsPushed(true);
      }
    } catch (err: any) {
      console.error('AdSense push error:', err);
      setPushError(err?.message || 'Error executing adsbygoogle.push');
    }

    return () => clearTimeout(timer);
  }, [simulation, dataAdSlot]);

  // Determine display style and min-height for CLS prevention
  const containerStyle: React.CSSProperties = {
    textAlign: 'center',
    margin: activeSize !== 'standard' ? '0' : '1.5rem 0',
    minHeight: minHeight ? (typeof minHeight === 'number' ? `${minHeight}px` : minHeight) : undefined,
    ...style
  };

  const creative = SAMPLE_AD_CREATIVES[creativeIndex % SAMPLE_AD_CREATIVES.length] || SAMPLE_AD_CREATIVES[0];

  return (
    <div
      style={containerStyle}
      className={`adsense-banner-container relative w-full overflow-hidden transition-all ${className}`}
      data-testid="ad-banner-wrapper"
    >
      {slotLabel && (
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1 font-mono">
          <span>Ad Slot: {dataAdSlot}</span>
          <span>{slotLabel}</span>
        </div>
      )}

      {simulation ? (
        activeSize === 'compact' ? (
          /* Sleek single-row sponsor bar (~48px tall) */
          <div className="relative flex items-center justify-between gap-2.5 rounded-lg border border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-950 px-2.5 py-1.5 text-left shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60 shrink-0">
                Ad
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-100 truncate leading-tight">
                  {creative.headline}
                </div>
                <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                  {creative.brand} · {creative.domain}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`https://${creative.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-sky-600 hover:bg-sky-500 text-white shadow transition-colors whitespace-nowrap"
              >
                {creative.ctaText}
              </a>
            </div>
          </div>
        ) : activeSize === 'medium' ? (
          /* Medium 2-tier sponsor card (~92px tall - double compact height) */
          <div className="relative rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-900/95 to-slate-950 p-2.5 sm:p-3 text-left shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-wider uppercase text-emerald-400 text-[9px] bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                  SPONSORED
                </span>
                <span className="font-semibold text-slate-300 truncate text-[11px]">{creative.brand}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                <span>AdChoices</span>
                <svg className="w-2.5 h-2.5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 leading-snug">
                  {creative.headline}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {creative.description}
                </p>
              </div>
              <a
                href={`https://${creative.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-sky-600 hover:bg-sky-500 text-white shadow transition-colors whitespace-nowrap shrink-0"
              >
                {creative.ctaText}
              </a>
            </div>
          </div>
        ) : activeSize === 'large' ? (
          /* Large High-CPM Sponsor Card (~150px tall - 1.6x medium size) */
          <div className="relative rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-900/95 to-slate-950 p-3 sm:p-3.5 text-left shadow-sm flex flex-col justify-between" style={{ minHeight: '148px' }}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-wider uppercase text-emerald-400 text-[9px] bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                  SPONSORED RATE
                </span>
                <span className="font-semibold text-slate-200 truncate text-[11px]">{creative.brand}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">· {creative.domain}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                <span>AdChoices</span>
                <svg className="w-2.5 h-2.5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="flex items-start gap-3 my-auto">
              {creative.image && (
                <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700/50 relative">
                  <img
                    src={creative.image}
                    alt={creative.brand}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-100 line-clamp-1 leading-snug">
                  {creative.headline}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {creative.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 mt-1.5 border-t border-slate-800/60">
              <span className="text-[10px] text-emerald-400 font-medium truncate">
                ⚡ Compare competitive terms online
              </span>
              <a
                href={`https://${creative.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                className="px-3.5 py-1 text-xs font-bold rounded-lg bg-sky-600 hover:bg-sky-500 text-white shadow transition-colors whitespace-nowrap shrink-0"
              >
                {creative.ctaText}
              </a>
            </div>
          </div>
        ) : (
        // Realistic Google AdSense Simulated Unit for preview & testing
        <div className="relative mx-auto rounded border border-slate-700/60 bg-gradient-to-b from-slate-900/90 to-slate-950 p-4 text-left shadow-sm">
          {/* Google AdChoices Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[11px] text-slate-400">
            <span className="font-medium tracking-wide uppercase text-slate-400 text-[10px]">
              Sponsored Advertisement
            </span>
            <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-default">
              <span>AdChoices</span>
              <svg className="w-3 h-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Ad Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {creative.image && (
              <div className="w-full sm:w-36 h-24 rounded bg-slate-800 overflow-hidden shrink-0 border border-slate-700/40 relative">
                <img
                  src={creative.image}
                  alt={creative.brand}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-200 truncate">{creative.brand}</span>
                <span className="text-[11px] text-slate-400 font-mono">· {creative.domain}</span>
              </div>
              <h4 className="text-sm sm:text-base font-medium text-slate-100 line-clamp-1 hover:text-sky-400 transition-colors cursor-pointer">
                {creative.headline}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {creative.description}
              </p>
            </div>
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-end sm:justify-start">
              <a
                href={`https://${creative.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded bg-sky-600 hover:bg-sky-500 text-white shadow transition-colors text-center whitespace-nowrap"
              >
                {creative.ctaText}
              </a>
            </div>
          </div>

          {/* Bottom Slot Details */}
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Client: {dataAdClient}</span>
            <span>Slot: {dataAdSlot} ({dataAdFormat})</span>
          </div>
        </div>
      )
    ) : (
        // Real Google AdSense <ins> Tag
        <div className="relative">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={dataAdClient}
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={typeof dataFullWidthResponsive === 'boolean' ? String(dataFullWidthResponsive) : dataFullWidthResponsive}
          />
        </div>
      )}
    </div>
  );
}
