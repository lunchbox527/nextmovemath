import React from "react";
import { CheckCircle2, Calculator, Shield, BookOpen, ExternalLink, ArrowRight } from "lucide-react";

interface MethodologyProps {
  onGoToCalculator: () => void;
}

export const MethodologyView: React.FC<MethodologyProps> = ({ onGoToCalculator }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <Shield className="w-4 h-4" />
          Mathematical Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight">
          NextMoveMath Calculation Methodology
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base mt-3 leading-relaxed">
          Full algorithmic transparency into how NextMoveMath calculates mortgage payments, stress test qualification, compounding periods, and equity projections.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[#2c443e] leading-relaxed">
        {/* Section 1: Compounding Formulations */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d]">
            1. Mortgage Payment & Compounding Equations
          </h2>
          <p>
            Mortgage interest calculation depends fundamentally on statutory compounding conventions which differ between Canada and the United States:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                🇨🇦 Canada: Semi-Annual Compounding
              </span>
              <p className="text-xs text-[#60746d] mb-3">
                By federal Canadian banking law (Interest Act, R.S.C.), mortgages compound semi-annually, not in advance. The effective monthly rate <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r_m</code> is derived from nominal annual rate <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r</code>:
              </p>
              <div className="p-3 bg-[#17312d] text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto">
                r_m = (1 + r / 2)^(2 / 12) - 1
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                🇺🇸 United States: Monthly Compounding
              </span>
              <p className="text-xs text-[#60746d] mb-3">
                In the United States, conventional conforming mortgages compound monthly. The effective monthly rate is simply nominal rate divided by 12:
              </p>
              <div className="p-3 bg-[#17312d] text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto">
                r_m = r / 12
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#60746d]">
            The standard monthly amortization annuity formula applied across principal <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">P</code> and <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">n</code> monthly payments (years × 12):
          </p>
          <div className="p-3 bg-[#17312d] text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto">
            Payment = P * [ r_m * (1 + r_m)^n ] / [ (1 + r_m)^n - 1 ]
          </div>
        </section>

        {/* Section 2: Stress Test & Qualification Formulas */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d]">
            2. Qualification & Stress Test Rules
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)] space-y-2">
              <h3 className="font-bold text-[#17312d] text-base">
                Canadian OSFI Guideline B-20 Benchmark
              </h3>
              <p>
                Federally regulated lenders in Canada determine mortgage affordability based on the <strong>Minimum Qualifying Rate (MQR)</strong>:
              </p>
              <div className="p-2.5 bg-white border border-[rgba(23,49,45,0.15)] rounded-lg font-mono text-xs text-[#17312d]">
                Qualifying Rate = Max( 5.25%, Contract Rate + 2.00% )
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#60746d]">
                <li><strong>Gross Debt Service (GDS):</strong> (Mortgage at Qualifying Rate + Annual Property Taxes + Annual Heating Costs + 50% Condo Fees) / Gross Household Income ≤ <strong>39%</strong>.</li>
                <li><strong>Total Debt Service (TDS):</strong> (Housing Costs + Other Monthly Debt Servicing Payments) / Gross Household Income ≤ <strong>44%</strong>.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)] space-y-2">
              <h3 className="font-bold text-[#17312d] text-base">
                US Conventional Conforming (Fannie Mae & Freddie Mac)
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-[#60746d]">
                <li><strong>Front-End DTI (Housing Ratio):</strong> PITI (Principal, Interest, Property Taxes, Homeowners Insurance, HOA dues) / Gross Monthly Income ≤ <strong>28%</strong>.</li>
                <li><strong>Back-End DTI (Total Debt Ratio):</strong> PITI + Student Loans + Auto Loans + Credit Card Minimum Payments / Gross Monthly Income ≤ <strong>36% to 43%</strong> (up to 45%–50% with Automated Underwriting System compensating factors).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: CMHC and Down Payment Rules */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d]">
            3. Down Payment Tiers & Default Insurance
          </h2>
          <p>
            In Canada, minimum statutory down payments follow a tiered structure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#2c443e]">
            <li><strong>Up to $500,000:</strong> Minimum 5% down payment.</li>
            <li><strong>$500,000 to $999,999:</strong> 5% on the first $500,000, plus 10% on the portion above $500,000.</li>
            <li><strong>$1,000,000 and above:</strong> Minimum 20% down payment (no government-backed mortgage default insurance permitted).</li>
          </ul>
          <p className="text-xs sm:text-sm text-[#60746d]">
            Down payments below 20% require mortgage default insurance (CMHC, Sagen, or Canada Guaranty), with premium rates ranging from 2.80% to 4.00% of the loan amount, added directly onto the mortgage principal balance.
          </p>
        </section>

        {/* Section 4: Regulatory Citations */}
        <section className="bg-[#fffdf8] border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#17312d]">
            Regulatory Sources & References
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-[#60746d]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0" />
              <span>Office of the Superintendent of Financial Institutions (OSFI) — Guideline B-20 (Residential Mortgage Underwriting Practices)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0" />
              <span>Canada Mortgage and Housing Corporation (CMHC) — Residential Loan Insurance Schedules</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0" />
              <span>Bank of Canada (BoC) — Benchmark Qualifying Rate & Monetary Policy Reports</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0" />
              <span>Consumer Financial Protection Bureau (CFPB) — Qualified Mortgage Standards & TILA-RESPA Integrated Disclosure (TRID)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0" />
              <span>Fannie Mae Selling Guide (B3-6: Debt-to-Income Ratios)</span>
            </li>
          </ul>
        </section>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onGoToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-sm font-bold transition-all shadow-md cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Return to Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
