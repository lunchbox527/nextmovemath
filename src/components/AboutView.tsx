import React from "react";
import { ShieldCheck, Heart, Sparkles, Award, Users, Mail, Calculator } from "lucide-react";

interface AboutProps {
  onGoToCalculator: () => void;
  onGoToContact: () => void;
}

export const AboutView: React.FC<AboutProps> = ({ onGoToCalculator, onGoToContact }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          Our Mission & Story
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight">
          About NextMoveMath
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base mt-3 leading-relaxed">
          Built by homeowners for homeowners. We believe buying or selling a home should feel exciting—and the math shouldn't ruin it.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[#2c443e] leading-relaxed">
        {/* Origin Story */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d]">
            Why We Built NextMoveMath
          </h2>
          <p>
            When you visit a typical commercial bank or mortgage lender website, you are handed a basic slider tool that computes a single monthly payment in a vacuum. It assumes you have infinite cash in the bank, ignores the property transfer tax check you have to write to the government, overlooks your existing mortgage prepayment penalty, and completely forgets that moving trucks and legal disbursements exist.
          </p>
          <p>
            The result? Homeowners and first-time buyers walk into their lawyer’s office on closing week and get hit with a <strong>$15,000 to $35,000 surprise bill</strong> for "quiet closing costs." Or worse, they assume their old home sale will give them $400,000 in equity, only to realize realtor commissions and taxes leave them short on their new purchase deposit.
          </p>
          <p className="font-medium text-[#17312d]">
            NextMoveMath was created to bring every quiet cost into the light before you sign a contract.
          </p>
        </section>

        {/* 3 Core Principles */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base mb-1">100% Independent</h3>
            <p className="text-xs sm:text-sm text-[#60746d]">
              We do not accept kickbacks from mortgage lenders, and we never sell user calculations to aggressive telemarketers. Our math is strictly objective.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base mb-1">Plain English First</h3>
            <p className="text-xs sm:text-sm text-[#60746d]">
              No confusing acronyms without explanation. Whether it’s semi-annual compounding or the OSFI stress test, we translate banking jargon into human terms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base mb-1">2026 Up-to-Date Rules</h3>
            <p className="text-xs sm:text-sm text-[#60746d]">
              Real estate finance rules change constantly. We actively maintain our provincial and state tax schedules, stress test benchmarks, and CMHC tiers.
            </p>
          </div>
        </section>

        {/* Editorial Standards & Accuracy */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d]">
            Editorial Standards & Disclaimers
          </h2>
          <p>
            All guides and computational formulas on NextMoveMath are authored and reviewed by financial technologists and verified against published regulatory standards from the Office of the Superintendent of Financial Institutions (OSFI), the Bank of Canada, the Canada Mortgage and Housing Corporation (CMHC), and the Consumer Financial Protection Bureau (CFPB).
          </p>
          <div className="p-4 rounded-xl bg-[#f4efe5] text-xs sm:text-sm text-[#60746d]">
            <strong>Consumer Notice:</strong> While NextMoveMath strives for mathematical precision, calculations are provided strictly for educational and consumer scenario-planning purposes. Final loan terms, interest rates, mortgage default insurance approvals, and legal fees must be formally executed with a licensed mortgage broker, banking institution, and real estate attorney.
          </div>
        </section>

        {/* Connect & Team Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#17312d] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-1">
              Have questions or feedback?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              We love hearing from home buyers, real estate agents, and mortgage planners. Reach out to our team directly.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onGoToContact}
              className="px-5 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </button>
            <button
              type="button"
              onClick={onGoToCalculator}
              className="px-5 py-2.5 rounded-xl bg-[#ec715a] hover:bg-[#d95c46] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Open Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
