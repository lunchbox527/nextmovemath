import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, MousePointer, Layers, Sparkles } from 'lucide-react';

export default function RevenueCalculator() {
  const [pageviews, setPageviews] = useState<number>(150000);
  const [pagesPerSession, setPagesPerSession] = useState<number>(1.8);
  const [adUnitsPerPage, setAdUnitsPerPage] = useState<number>(3);
  const [ctr, setCtr] = useState<number>(1.2); // 1.2%
  const [cpc, setCpc] = useState<number>(0.45); // $0.45

  // Calculations
  const totalImpressionsMonthly = Math.round(pageviews * adUnitsPerPage);
  const totalClicksMonthly = Math.round(totalImpressionsMonthly * (ctr / 100));
  const estimatedRevenueMonthly = totalClicksMonthly * cpc;
  const estimatedRevenueDaily = estimatedRevenueMonthly / 30.4;
  const estimatedRevenueAnnual = estimatedRevenueMonthly * 12;

  // RPM (Revenue Per 1,000 pageviews)
  const pageRpm = pageviews > 0 ? (estimatedRevenueMonthly / pageviews) * 1000 : 0;
  // eCPM (Revenue Per 1,000 ad impressions)
  const adEcpm = totalImpressionsMonthly > 0 ? (estimatedRevenueMonthly / totalImpressionsMonthly) * 1000 : 0;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <span>💰 100% Free For You: AdSense Pays YOU</span>
        </div>
        <h2 className="text-base font-semibold text-white">Google AdSense Yield & Revenue Model</h2>
        <p className="text-xs text-slate-400 mt-1">
          Estimate potential <strong className="text-emerald-400">earnings</strong> you receive from Google based on traffic volume, ad slot density, click-through rates, and niche benchmarks.
        </p>
        <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
          <strong>Important:</strong> You never pay to host Google ads! The terms below like "CPC" (Cost Per Click) refer to what <em>outside brands</em> pay Google to reach your audience. Google takes that money and deposits <strong>68% of it directly to you</strong> as the site publisher.
        </div>
      </div>

      {/* Grid: Inputs + Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Column (6 cols) */}
        <div className="lg:col-span-6 space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Traffic & Monetization Parameters
          </h3>

          {/* Monthly Pageviews */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>Monthly Pageviews</span>
              </span>
              <span className="font-mono text-white font-semibold tabular-nums">
                {pageviews.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="2000000"
              step="5000"
              value={pageviews}
              onChange={(e) => setPageviews(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5K</span>
              <span>500K</span>
              <span>2M+</span>
            </div>
          </div>

          {/* Ad Units Per Page */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Ad Units Per Page (AdBanner Count)</span>
              </span>
              <span className="font-mono text-white font-semibold tabular-nums">
                {adUnitsPerPage} units
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={adUnitsPerPage}
              onChange={(e) => setAdUnitsPerPage(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 (Minimal)</span>
              <span>3 (Recommended)</span>
              <span>5 (High Density)</span>
            </div>
          </div>

          {/* Average CTR % */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click-Through Rate (CTR)</span>
              </span>
              <span className="font-mono text-white font-semibold tabular-nums">
                {ctr.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.2% (Low)</span>
              <span>1.2% (Industry Avg)</span>
              <span>4.0% (Optimized)</span>
            </div>
          </div>

          {/* Average CPC ($) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                <span>Cost Per Click (CPC)</span>
              </span>
              <span className="font-mono text-white font-semibold tabular-nums">
                ${cpc.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.10"
              max="3.00"
              step="0.05"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0.10 (General)</span>
              <span>$0.45 (Tech/Lifestyle)</span>
              <span>$3.00 (Finance/SaaS)</span>
            </div>
          </div>
        </div>

        {/* Projections & Metrics Column (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Monthly Revenue Big Card */}
          <div className="rounded-xl border border-sky-500/40 bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold">
                Projected Monthly Revenue
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono text-sky-300 bg-sky-950 rounded border border-sky-800">
                Gross AdSense
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                ${Math.round(estimatedRevenueMonthly).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>

            {/* Daily & Annual breakdown */}
            <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block">Daily Average</span>
                <span className="text-base font-bold text-slate-200 font-mono tabular-nums">
                  ${estimatedRevenueDaily.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Annualized Run-Rate</span>
                <span className="text-base font-bold text-slate-200 font-mono tabular-nums">
                  ${Math.round(estimatedRevenueAnnual).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[11px] text-slate-400 block">Page RPM</span>
              <span className="text-base sm:text-lg font-bold text-sky-400 font-mono tabular-nums mt-0.5 block">
                ${pageRpm.toFixed(2)}
              </span>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[11px] text-slate-400 block">Monthly Clicks</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono tabular-nums mt-0.5 block">
                {totalClicksMonthly.toLocaleString()}
              </span>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[11px] text-slate-400 block">Impressions</span>
              <span className="text-base sm:text-lg font-bold text-amber-400 font-mono tabular-nums mt-0.5 block">
                {(totalImpressionsMonthly / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          {/* Optimization Strategy Tip */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Publisher RPM Optimization Levers</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-slate-400">
              <li>Deploying <strong>Medium Rectangle (300×250)</strong> in-article typically increases CTR by 28% compared to top leaderboards.</li>
              <li>Implementing sticky sidebars increases viewability past 80%, triggering higher algorithmic advertiser bid competition.</li>
              <li>Always adhere to the Better Ads Standards: never exceed 30% ad density on mobile screens.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
