import React from "react";
import { ShieldCheck, Sparkles, Award, Mail, Calculator, BookOpen } from "lucide-react";

interface AboutProps {
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}

export const AboutView: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex items-center gap-2">
        <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
          Home
        </a>
        <span>/</span>
        <span className="text-[#17312d] font-semibold">About NextMoveMath</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          Our Mission & Editorial Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight m-0 mb-3">
          About NextMoveMath
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base m-0 leading-relaxed">
          Independent moving, mortgage, and closing-cost clarity for Canadian and American households—built so the math behind your next home never catches you off guard.
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-[#2c443e] leading-relaxed">
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
            Why NextMoveMath Exists
          </h2>
          <p className="m-0">
            Most online mortgage calculators were built to generate sales leads rather than answer real household questions. They calculate a single principal-and-interest payment in isolation—ignoring the existing home you need to sell first, the realtor commission and sales taxes deducted at closing, the prepayment penalty on your current loan, the provincial or county transfer tax bill, and the +2% stress test or DTI limits used by underwriters.
          </p>
          <p className="m-0">
            Because those pieces live on separate spreadsheets, families routinely overestimate their net down-payment equity by $30,000 to $55,000 or walk into closing week surprised by five-figure legal and tax adjustments. NextMoveMath connects every moving piece—buying, selling, rolling equity into a move-up home, or keeping a starter property as a rental—inside one transparent, plain-English workspace.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base m-0 mb-1.5">Privacy-First Math</h3>
            <p className="text-xs sm:text-sm text-[#60746d] m-0">
              No sign-up walls, no phone-number traps, and no server storage of your personal finances. All scenario modeling executes right in your browser.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base m-0 mb-1.5">Plain-English Guides</h3>
            <p className="text-xs sm:text-sm text-[#60746d] m-0">
              Every banking acronym—GDS, TDS, DTI, IRD, LTV, PITI, CMHC, PMI—is explained with worked numerical tables and clear definitions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
            <div className="w-10 h-10 rounded-xl bg-[#e7f2e9] flex items-center justify-center text-[#2e7450] mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17312d] text-base m-0 mb-1.5">Cross-Border Precision</h3>
            <p className="text-xs sm:text-sm text-[#60746d] m-0">
              Dedicated Canadian (CAD, semi-annual compounding, OSFI B-20) and US (USD, monthly compounding, PITI & DTI) calculation modes.
            </p>
          </div>
        </section>

        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
            Editorial Policy, Corrections & How We Keep NextMoveMath Free
          </h2>
          <p className="m-0">
            Our articles and calculator formulas are researched, written, and maintained against primary public sources including OSFI residential underwriting guidelines, Canada’s Interest Act, CMHC insurance schedules, Bank of Canada publications, CFPB consumer mortgage disclosures, and Fannie Mae selling guides. You can inspect every underlying equation on our{" "}
            <a href="/methodology" onClick={(e) => onNavigate("/methodology", e)} className="text-[#2e7450] underline font-semibold">
              Calculation Methodology
            </a>{" "}
            page.
          </p>
          <p className="m-0">
            To keep our calculators, printable PDF summaries, and educational library 100% free without subscription paywalls or forced lead-generation forms, NextMoveMath is supported by standard display advertising. Advertisers never influence our mathematical formulas, qualification thresholds, or editorial conclusions. If you spot a provincial/state tax rule update or a calculation question, please reach out via our{" "}
            <a href="/contact" onClick={(e) => onNavigate("/contact", e)} className="text-[#2e7450] underline font-semibold">
              Contact page
            </a>{" "}
            so we can review and update promptly.
          </p>
        </section>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#17312d] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h2 className="text-xl font-serif font-bold text-white m-0 mb-1">
              Explore Our Guides or Run Your Own Numbers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg m-0">
              Jump into our 8 real estate math guides or model your own buying, selling, or rental move right now.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/guides"
              onClick={(e) => onNavigate("/guides", e)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold no-underline transition-all inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Guides</span>
            </a>
            <a
              href="/contact"
              onClick={(e) => onNavigate("/contact", e)}
              className="px-4 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold no-underline transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
            <a
              href="/"
              onClick={(e) => onNavigate("/", e)}
              className="px-4 py-2.5 rounded-xl bg-[#ec715a] hover:bg-[#d95c46] text-white text-xs font-bold no-underline transition-all inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
