import React from 'react';
import { HelpCircle, DollarSign, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PlainEnglishGuideProps {
  onSelectSiteType: (type: string) => void;
  onClose?: () => void;
}

export const PlainEnglishGuide: React.FC<PlainEnglishGuideProps> = ({ onSelectSiteType, onClose }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden mb-8">
      {/* Glow decorative effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Urgent clarity badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Good News: You Do NOT Pay Anything!
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
          Google AdSense <span className="text-emerald-400">pays YOU</span> — it is 100% free for you!
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-6">
          Here is how it works in simple words: Big companies (like Nike or Samsung) pay Google to display ads on the web. 
          When you put an ad banner on <span className="text-white font-semibold">your website</span>, Google shares that money with <span className="text-emerald-300 font-bold">YOU</span> whenever people visit or click!
        </p>

        {/* 3 Simple Truths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">1. Zero Cost to You</h3>
            <p className="text-sm text-slate-300 leading-normal">
              You never have to pay to have ads on your site. Those "CPC" and "Revenue" numbers you saw are <span className="text-emerald-300 font-medium">money you earn</span> from Google, not a bill you pay.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">2. What Was That Code?</h3>
            <p className="text-sm text-slate-300 leading-normal">
              The snippet Gemini gave you is like a "picture frame". It tells Google: <em>"Reserve this rectangle on my website so an ad can show up here."</em>
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">3. Now: Your Actual Website</h3>
            <p className="text-sm text-slate-300 leading-normal">
              Gemini only gave me the ad frame, not the rest of your website! Tell me what website you want (a food blog, business site, hobby page, or store) and I will build it for you.
            </p>
          </div>
        </div>

        {/* Action prompt */}
        <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              What kind of website would you like to build?
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Choose one of the starter templates below, or tell me your own idea in the chat, and I'll build it immediately:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => onSelectSiteType('blog')}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Personal / Lifestyle Blog
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectSiteType('business')}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Small Business / Service
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectSiteType('recipe')}
              className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Recipe & Food Blog
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
