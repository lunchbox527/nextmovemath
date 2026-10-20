import React from "react";
import { ExternalLink, ShieldCheck, TrendingDown, Award, CheckCircle2, Phone, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { AFFILIATE_CONFIG } from "../config/affiliates";

export type PartnerVariant = "live-rates" | "sticky-sidebar" | "consultation";

interface PartnerOfferCardProps {
  variant: PartnerVariant;
  isUS?: boolean;
  mode?: "buy" | "sell" | "move" | "rent";
  purchasePrice?: number;
  monthlyPayment?: number;
  className?: string;
}

export const PartnerOfferCard: React.FC<PartnerOfferCardProps> = ({
  variant,
  isUS = false,
  mode = "move",
  purchasePrice = 750000,
  monthlyPayment = 3450,
  className = "",
}) => {
  const targetUrl = isUS ? AFFILIATE_CONFIG.usRatesUrl : AFFILIATE_CONFIG.canadaRatesUrl;
  const partnerName = isUS ? AFFILIATE_CONFIG.usRatesPartnerName : AFFILIATE_CONFIG.canadaRatesPartnerName;
  const isDirectBroker = AFFILIATE_CONFIG.directBroker.enabled;
  const broker = AFFILIATE_CONFIG.directBroker;

  // 1. Variant: Live Rates Bar (Between Quiet Costs and Path Picker)
  if (variant === "live-rates") {
    return (
      <aside
        className={`w-full my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17312d] via-[#1f423d] to-[#17312d] text-white border border-emerald-500/30 shadow-lg ${className}`}
        aria-label="Mortgage Rate Comparison Partner"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Info & Live Rates */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] tracking-wide uppercase border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isUS ? "US Daily Rate Benchmark" : "Canadian Bank & Broker Benchmark"}
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                Verified Daily
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
              Compare Today's Best Mortgage Rates Across 30+ Lenders
            </h3>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Don’t settle for posted branch rates. A 0.25% lower rate on a standard mortgage saves you over{" "}
              <strong className="text-emerald-300 font-bold">$12,000 to $28,000</strong> in interest.
            </p>
          </div>

          {/* Right: Rate Badges & CTA */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {/* Live Sample Rates Pill */}
            <div className="flex items-center gap-2 bg-black/25 border border-white/10 rounded-xl px-3 py-2 text-xs">
              <div className="text-center px-1.5">
                <span className="block text-[10px] uppercase text-slate-400">5-Yr Fixed</span>
                <span className="font-bold text-emerald-300">{isUS ? "5.99%" : "4.34%"}</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center px-1.5">
                <span className="block text-[10px] uppercase text-slate-400">3-Yr Fixed</span>
                <span className="font-bold text-emerald-300">{isUS ? "6.24%" : "4.59%"}</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center px-1.5">
                <span className="block text-[10px] uppercase text-slate-400">Variable</span>
                <span className="font-bold text-emerald-300">{isUS ? "6.45%" : "P - 0.95%"}</span>
              </div>
            </div>

            {/* Click Button */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ec715a] hover:bg-[#d95c46] text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer group"
            >
              <span>Compare Live Rates</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 2. Variant: Sticky Results Sidebar Card (Sits directly above results breakdown)
  if (variant === "sticky-sidebar") {
    // Context-sensitive copy
    let contextTitle = "Lock In Today's Lowest Rate";
    let contextBody = "Pre-approval locks your rate for up to 120 days and protects against rate hikes while you house hunt.";
    let ctaLabel = "Check Pre-Approval Rates";

    if (mode === "sell") {
      contextTitle = "Sell for More & Save on Commission";
      contextBody = "Connect with top 1% local listing agents who offer full service with discounted commission structures.";
      ctaLabel = "Find Discount Listing Agents";
    } else if (mode === "move") {
      contextTitle = "Bridge Loan & Porting Assistance";
      contextBody = "Moving before your sale closes? Compare lenders offering penalty waivers and low-rate bridge equity loans.";
      ctaLabel = "Explore Move-Up Financing";
    } else if (mode === "rent") {
      contextTitle = "Compare HELOC & Equity Takeout";
      contextBody = "Tap up to 80% of your starter home’s equity at Prime + 0.50% to fund your next down payment.";
      ctaLabel = "Compare HELOC Lenders";
    }

    return (
      <aside
        className={`w-full mb-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.18)] p-3.5 sm:p-4 text-[#17312d] shadow-sm relative overflow-hidden ${className}`}
        aria-label="Verified Financing Resource"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#2e7450] bg-[#e7f2e9] px-2 py-0.5 rounded-full border border-[#2e7450]/20">
            <Award className="w-3 h-3 text-[#2e7450]" />
            Verified Lending Network
          </span>
          <span className="text-[10px] text-[#60746d]">Sponsored</span>
        </div>

        <h4 className="font-serif font-bold text-sm sm:text-base text-[#17312d] leading-snug mb-1">
          {contextTitle}
        </h4>

        <p className="text-xs text-[#50645e] leading-relaxed mb-3">
          {contextBody}
        </p>

        {/* Feature bullets */}
        <div className="grid grid-cols-2 gap-1.5 mb-3 text-[11px] text-[#2c443e]">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0" />
            <span>Zero credit score impact</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0" />
            <span>30+ Lenders compared</span>
          </div>
        </div>

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-sm cursor-pointer group"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <div className="mt-2 text-center">
          <span className="text-[10px] text-[#60746d] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#2e7450]" />
            Bank-grade 256-bit encryption · No obligation
          </span>
        </div>
      </aside>
    );
  }

  // 3. Variant: Consultation Card (Placed in the FAQ / Bottom Area)
  return (
    <aside
      className={`w-full rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.18)] p-5 sm:p-6 text-[#17312d] shadow-sm ${className}`}
      aria-label="Direct Specialist Consultation"
    >
      {isDirectBroker ? (
        /* Direct Local Broker Sponsor Card */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e7f2e9] text-[#2e7450] text-[11px] font-bold uppercase tracking-wider">
              {broker.badgeText || "⭐ Verified Mortgage Specialist"}
            </span>
            <span className="text-[10px] text-[#60746d]">Direct Partner</span>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#17312d] text-[#fffdf8] flex items-center justify-center font-bold text-lg shrink-0">
              {broker.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#17312d] leading-snug">
                {broker.name}
              </h4>
              <p className="text-xs text-[#60746d]">{broker.title}</p>
              <p className="text-[11px] font-medium text-[#2e7450]">{broker.brokerage}</p>
              <p className="text-[10px] text-[#60746d]">{broker.location}</p>
            </div>
          </div>

          <p className="text-xs text-[#50645e] leading-relaxed">
            Need a second opinion on your mortgage numbers, stress test qualification, or bridge financing options? Speak directly with {broker.name.split(" ")[0]}.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <a
              href={broker.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free 15-Min Strategy Call</span>
            </a>
            {broker.phone && (
              <a
                href={`tel:${broker.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[rgba(23,49,45,0.2)] text-[#17312d] hover:bg-[#f4efe5] text-xs font-bold transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{broker.phone}</span>
              </a>
            )}
          </div>
        </div>
      ) : (
        /* National Mortgage Network Card */
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e7f2e9] text-[#2e7450] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#2e7450]" />
              Need Tailored Advice?
            </span>
            <span className="text-[10px] text-[#60746d]">Sponsored</span>
          </div>

          <h4 className="font-serif font-bold text-base text-[#17312d] leading-snug">
            Speak with an Accredited Mortgage Strategist
          </h4>

          <p className="text-xs text-[#50645e] leading-relaxed">
            Every home transition is unique. Get an independent review of your contract rate, porting penalty calculations, and bridge loan financing with zero sales pressure.
          </p>

          <div className="space-y-1.5 text-xs text-[#2c443e]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0" />
              <span>Independent assessment of Big Bank posted rates vs broker rates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0" />
              <span>Personalized OSFI Stress Test & DTI pre-qualification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0" />
              <span>100% Free consultation — paid by lenders, not by you</span>
            </div>
          </div>

          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#17312d] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer group mt-2"
          >
            <span>Compare Rates & Connect with a Specialist</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}
    </aside>
  );
};
