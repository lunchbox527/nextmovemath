import React from "react";
import { CheckCircle2, Calculator, Shield, ArrowRight } from "lucide-react";

interface MethodologyProps {
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}

export const MethodologyView: React.FC<MethodologyProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex items-center gap-2">
        <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
          Home
        </a>
        <span>/</span>
        <span className="text-[#17312d] font-semibold">Methodology</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <Shield className="w-4 h-4" />
          Mathematical Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight m-0 mb-3">
          NextMoveMath Calculation Methodology
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base m-0 leading-relaxed">
          Complete algorithmic transparency into how NextMoveMath calculates mortgage payments, stress-test qualification, compounding periods, net seller proceeds, and 5-year equity projections across Canada and the United States.
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-[#2c443e] leading-relaxed">
        {/* Section 1: Compounding Formulations */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
            1. Mortgage Payment & Statutory Compounding Equations
          </h2>
          <p className="m-0">
            Residential mortgage interest calculations depend on statutory compounding rules that differ between Canadian federal law and US lending practice. Using a generic monthly-compounded calculator on a Canadian fixed mortgage systematically overstates payments and total interest. NextMoveMath switches formulas automatically based on your selected country:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                🇨🇦 Canada: Semi-Annual Compounding
              </span>
              <p className="text-xs text-[#60746d] mb-3">
                Under Section 6 of Canada’s federal Interest Act, fixed-rate mortgages compound semi-annually, not in advance. The effective monthly rate <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r_m</code> from nominal annual rate <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r</code> is:
              </p>
              <div className="p-3 bg-[#17312d] text-[#cfe8d8] font-mono text-xs rounded-lg overflow-x-auto">
                r_m = (1 + r / 2)^(2 / 12) - 1
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                🇺🇸 United States: Monthly Compounding
              </span>
              <p className="text-xs text-[#60746d] mb-3">
                In the United States (as well as revolving HELOC credit lines), interest compounds monthly. The effective monthly factor equals the nominal annual rate divided by 12:
              </p>
              <div className="p-3 bg-[#17312d] text-[#cfe8d8] font-mono text-xs rounded-lg overflow-x-auto">
                r_m = r / 12
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#60746d] m-0">
            Once the effective monthly periodic rate <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r_m</code> is established, the level monthly principal-and-interest payment across principal <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">P</code> and <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">n</code> total months (<code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">years × 12</code>) is computed via the standard annuity equation:
          </p>
          <div className="p-3 bg-[#17312d] text-[#cfe8d8] font-mono text-xs rounded-lg overflow-x-auto">
            M = P × [ r_m × (1 + r_m)^n ] / [ (1 + r_m)^n - 1 ]
          </div>
        </section>

        {/* Section 2: Stress Test & Qualification Formulas */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
            2. Underwriting Qualification & Stress-Test Models
          </h2>
          <p className="m-0">
            Lenders evaluate mortgage affordability using pre-tax gross household income and standardized shelter debt-service ratios rather than take-home pay:
          </p>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)] space-y-2">
              <h3 className="font-bold text-[#17312d] text-base m-0">
                Canadian OSFI Guideline B-20 Benchmark
              </h3>
              <p className="m-0">
                Federally regulated Canadian lenders evaluate repayment capacity using the <strong>Minimum Qualifying Rate (MQR)</strong>:
              </p>
              <div className="p-2.5 bg-white border border-[rgba(23,49,45,0.15)] rounded-lg font-mono text-xs text-[#17312d]">
                Qualifying Rate = max( 5.25%, Contract Rate + 2.00% )
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#2c443e]">
                <li><strong>Gross Debt Service (GDS):</strong> (Mortgage Payment at Qualifying Rate + Monthly Property Tax + Monthly Heating + 50% of Condo/Strata Fees) ÷ Gross Monthly Household Income ≤ <strong>39%</strong>.</li>
                <li><strong>Total Debt Service (TDS):</strong> (GDS Shelter Numerator + Monthly Auto, Student, Credit Card, and Personal Loan Payments) ÷ Gross Monthly Household Income ≤ <strong>44%</strong>.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)] space-y-2">
              <h3 className="font-bold text-[#17312d] text-base m-0">
                US Conventional Conforming (Fannie Mae & Freddie Mac)
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-[#2c443e]">
                <li><strong>Front-End Housing Ratio:</strong> PITI (Principal & Interest at Note Rate + Property Taxes + Homeowners Insurance + PMI + 100% of HOA Dues) ÷ Gross Monthly Income ≤ <strong>28%</strong> traditional benchmark.</li>
                <li><strong>Back-End Total DTI:</strong> (Full PITI Housing Cost + Recurring Credit Bureau Debt Payments) ÷ Gross Monthly Income ≤ <strong>36% traditional / 43% Qualified Mortgage benchmark</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 60-Month Horizon, Net Proceeds & Rental Offset */}
        <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
            3. Five-Year Amortization, Net Proceeds & Rental Cash-Flow Math
          </h2>
          <p className="m-0">
            To show how much wealth you retain after five years, NextMoveMath iterates month-by-month from Month 1 through Month 60: each month’s interest equals remaining balance multiplied by <code className="bg-[#f4efe5] px-1 py-0.5 rounded text-[#17312d]">r_m</code>, principal reduction equals total monthly payment minus monthly interest, and cumulative 5-year home equity sums your upfront down payment plus 60 months of principal reduction (assuming 0% speculative home-price appreciation so estimates remain conservative).
          </p>
          <p className="m-0">
            In our <strong>Selling</strong> and <strong>Selling & Buying</strong> modes, net sale equity deducts real estate commission, regional sales tax on commission where applicable, mortgage payout balance, contractual prepayment penalties, legal discharge costs, and pre-sale preparation expenses. In our <strong>Keep One, Buy Another</strong> mode, effective rental income applies a 5% vacancy allowance before subtracting existing mortgage payments, property taxes, landlord insurance, strata/HOA dues, maintenance reserves, property management fees, and interest on any HELOC equity draw used toward the next home.
          </p>
        </section>

        {/* Section 4: Regulatory Citations */}
        <section className="bg-[#fffdf8] border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#17312d] m-0">
            Primary Regulatory References & Standards
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-[#2c443e] pl-0 list-none m-0">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
              <span>Office of the Superintendent of Financial Institutions (OSFI) — Guideline B-20: Residential Mortgage Underwriting Practices and Procedures</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
              <span>Government of Canada — Interest Act (R.S.C., 1985, c. I-15), Section 6 Semi-Annual Mortgage Compounding Rules</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
              <span>Canada Mortgage and Housing Corporation (CMHC) — High-Ratio Homeowner Mortgage Loan Insurance Premium Schedules</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
              <span>Consumer Financial Protection Bureau (CFPB) — Ability-to-Repay / Qualified Mortgage (ATR/QM) & TRID Closing Disclosure Standards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
              <span>Fannie Mae Single-Family Selling Guide — Section B3-6: Debt-to-Income Ratios & Qualifying Liabilities</span>
            </li>
          </ul>
        </section>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/guides"
            onClick={(e) => onNavigate("/guides", e)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[rgba(23,49,45,0.2)] text-[#17312d] text-xs font-bold no-underline hover:bg-[#f4efe5] transition-all"
          >
            <span>Explore In-Depth Math Guides</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/"
            onClick={(e) => onNavigate("/", e)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold no-underline transition-all shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Interactive Calculator</span>
          </a>
        </div>
      </div>
    </div>
  );
};
