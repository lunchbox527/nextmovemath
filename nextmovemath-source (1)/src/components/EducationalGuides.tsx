import React, { useState } from "react";
import { BookOpen, Calculator, CheckCircle2, AlertTriangle, ArrowRight, Clock, HelpCircle, Shield, ChevronDown, ChevronUp } from "lucide-react";

interface GuideProps {
  onGoToCalculator: () => void;
  isUS?: boolean;
}

export const EducationalGuides: React.FC<GuideProps> = ({ onGoToCalculator, isUS = false }) => {
  const [activeGuide, setActiveGuide] = useState<number>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const guides = [
    {
      id: "stress-test",
      title: isUS ? "Mortgage Debt-to-Income (DTI) Qualifying: The Complete 2026 Guide" : "The 2026 Canadian Mortgage Stress Test (+2% OSFI Rules Explained)",
      readTime: "7 min read",
      category: "Mortgage Qualification",
      badge: "Crucial Rule",
      summary: isUS
        ? "How US mortgage lenders evaluate your front-end (28%) and back-end (36%–43%) DTI ratios across gross income, student loans, car notes, and housing costs."
        : "Why Canadian home buyers must qualify at the higher of 5.25% or contract rate + 2.0%, how it cuts your maximum purchasing power by 18%–22%, and how to calculate your true qualifying income.",
      content: (
        <div className="space-y-6 text-[#2c443e] text-sm sm:text-base leading-relaxed">
          <div className="p-4 sm:p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/20">
            <h4 className="font-bold text-[#17312d] text-base mb-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2e7450]" />
              The Core Rule in Plain English
            </h4>
            <p className="text-xs sm:text-sm text-[#2c443e]">
              {isUS
                ? "In the United States, conventional conforming mortgages backed by Fannie Mae and Freddie Mac judge your eligibility using two benchmark ratios: the Front-End DTI (housing payments alone must not exceed 28% of gross monthly income) and the Back-End DTI (all monthly debt obligations combined must stay below 36% to 43%)."
                : "Under federal OSFI Guideline B-20, Canadian chartered banks must stress test every mortgage applicant at the qualifying rate: the higher of 5.25% OR your negotiated contract interest rate plus 2.00%. Even if you secure a 4.69% mortgage, your household income must prove you can comfortably afford payments at 6.69%."}
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            {isUS ? "1. Front-End vs. Back-End DTI Explained" : "1. Why the Stress Test Exists & How It Works"}
          </h3>
          <p>
            {isUS ? (
              <>
                When an underwriter evaluates your mortgage application, they look at your Gross Monthly Income (before taxes, health deductions, or 401k contributions). They then calculate two critical percentages:
              </>
            ) : (
              <>
                Introduced by the Office of the Superintendent of Financial Institutions (OSFI) and mandatory for all federally regulated financial institutions (Schedule I banks like RBC, TD, Scotiabank, BMO, CIBC, and National Bank), the stress test is designed to ensure borrowers will not default if interest rates spike or economic conditions tighten.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                {isUS ? "Front-End Housing Ratio (≤ 28%)" : "Contract Rate vs. Qualifying Rate"}
              </span>
              <p className="text-xs sm:text-sm text-[#60746d]">
                {isUS
                  ? "Sum of principal, interest, property taxes, homeowners insurance, and HOA dues divided by gross income. Target is 28% or lower."
                  : "If your lender gives you a 5-year fixed rate of 4.89%, your stress test qualifying rate is 6.89% (4.89% + 2.00%). The monthly payment you qualify on is hundreds of dollars higher than what you actually pay."}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                {isUS ? "Back-End Total Debt Ratio (≤ 36%–43%)" : "GDS & TDS Limits (39% / 44%)"}
              </span>
              <p className="text-xs sm:text-sm text-[#60746d]">
                {isUS
                  ? "Housing costs PLUS student loans, minimum credit card payments, auto loans, and personal debt divided by gross income. 36% standard, 43% max."
                  : "Gross Debt Service (GDS) caps housing costs at 39% of gross monthly income. Total Debt Service (TDS) caps all debts (housing + student loans, car payments, credit cards) at 44%."}
              </p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            2. Real-World Calculation Example
          </h3>
          <p>
            Let’s examine a typical scenario for a family purchasing a $750,000 property with a 20% down payment ($150,000), leaving a loan balance of $600,000 amortized over 25 years:
          </p>

          <div className="overflow-x-auto my-4 border border-[rgba(23,49,45,0.15)] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm bg-white">
              <thead className="bg-[#f4efe5] text-[#17312d] font-bold border-b border-[rgba(23,49,45,0.15)]">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3">Actual Contract Rate (4.89%)</th>
                  <th className="p-3">Stress Test Rate (6.89%)</th>
                  <th className="p-3">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(23,49,45,0.08)]">
                <tr>
                  <td className="p-3 font-medium">Monthly Mortgage Payment</td>
                  <td className="p-3 text-[#2e7450] font-bold">$3,452 / mo</td>
                  <td className="p-3 text-[#ec715a] font-bold">$4,161 / mo</td>
                  <td className="p-3 font-semibold">+$709 / mo</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Annual Property Tax & Heat</td>
                  <td className="p-3">$5,400 / yr</td>
                  <td className="p-3">$5,400 / yr</td>
                  <td className="p-3">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Required Qualifying Income (39% GDS)</td>
                  <td className="p-3 font-semibold">$120,060 / yr</td>
                  <td className="p-3 font-bold text-[#ec715a]">$141,870 / yr</td>
                  <td className="p-3 font-bold text-[#ec715a]">+$21,810 / yr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Notice that while the borrower can comfortably make the $3,452 monthly payment on a $120,000 salary, the bank will decline the application unless their income reaches approximately $142,000! This creates the illusion of pre-approval failure for many creditworthy buyers.
          </p>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            3. Actionable Strategies to Pass the Test
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Pay Down Revolving Debts First:</strong> Because car loans and credit card balances inflate your TDS/Back-End ratio dollar-for-dollar, paying off a $500/month car loan often frees up over $80,000 in mortgage borrowing capacity.</li>
            <li><strong>Extend Amortization to 30 Years:</strong> If putting 20% down, stretching amortization from 25 to 30 years lowers the baseline monthly payment, reducing the qualifying income requirement.</li>
            <li><strong>Add a Co-Signer or Guarantor:</strong> Bringing a family member onto title pools gross incomes, lowering the combined debt-service percentage into compliant territory.</li>
          </ul>

          <div className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#60746d]">
              Interactive modeling: test your exact income and stress test threshold in our calculator.
            </span>
            <button
              type="button"
              onClick={onGoToCalculator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Test Your Income in Calculator
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "quiet-closing-costs",
      title: "The Quiet Closing Costs: What Home Buyers Forget to Budget",
      readTime: "6 min read",
      category: "Home Buying Strategy",
      badge: "Cash Planning",
      summary: "Your down payment is only part of the cash required on closing day. Discover how Land Transfer Taxes, legal disbursements, title insurance, and adjustments add 1.5% to 3.5% in surprise expenses.",
      content: (
        <div className="space-y-6 text-[#2c443e] text-sm sm:text-base leading-relaxed">
          <div className="p-4 sm:p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/20">
            <h4 className="font-bold text-[#17312d] text-base mb-1 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#ec715a]" />
              The Rule of Thumb: Add 1.5% to 3.5%
            </h4>
            <p className="text-xs sm:text-sm text-[#2c443e]">
              When preparing for closing day, your lawyer or title company requires certified funds for the down payment PLUS closing adjustments. On an $800,000 home, quiet closing costs routinely tally between $12,000 and $28,000. If your savings only cover the exact down payment, you risk a disastrous closing delay.
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            The 5 Major Quiet Closing Costs Itemized
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-[rgba(23,49,45,0.12)]">
              <div className="flex items-center justify-between font-bold text-[#17312d] mb-1">
                <span>1. Land Transfer Tax (PTT / Stamp Duty)</span>
                <span className="text-[#ec715a]">$4,000 – $25,000+</span>
              </div>
              <p className="text-xs sm:text-sm text-[#60746d]">
                The single largest closing cost in most provinces and states. In British Columbia, Property Transfer Tax (PTT) is 1% on the first $200k and 2% on the remainder up to $2M. In Ontario, provincial tax applies, and in the City of Toronto, buyers pay both Provincial AND Municipal Land Transfer Tax (a double tax). In the US, transfer stamps vary widely by county and city.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(23,49,45,0.12)]">
              <div className="flex items-center justify-between font-bold text-[#17312d] mb-1">
                <span>2. Legal Fees & Disbursements</span>
                <span className="text-[#2e7450]">$1,200 – $2,500</span>
              </div>
              <p className="text-xs sm:text-sm text-[#60746d]">
                Your real estate attorney or notary public reviews contract documents, verifies clear title, registers the mortgage on the land title registry, and conducts tax searches. Disbursements include registry search fees, courier charges, and land registration filing fees.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(23,49,45,0.12)]">
              <div className="flex items-center justify-between font-bold text-[#17312d] mb-1">
                <span>3. Title Insurance Policy</span>
                <span className="text-[#2e7450]">$300 – $600</span>
              </div>
              <p className="text-xs sm:text-sm text-[#60746d]">
                Virtually all institutional lenders require a lender’s title insurance policy, and an owner’s policy protects you against past title defects, fraudulent transfers, boundary disputes, or unpermitted work by previous owners.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(23,49,45,0.12)]">
              <div className="flex items-center justify-between font-bold text-[#17312d] mb-1">
                <span>4. Property Tax & Utility Adjustments</span>
                <span className="text-[#ec715a]">$500 – $2,500</span>
              </div>
              <p className="text-xs sm:text-sm text-[#60746d]">
                If the previous homeowner prepaid annual property taxes, water utilities, or fuel/heating oil through the end of the year, your attorney credits the seller on the Statement of Adjustments for the exact days you will own the home.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(23,49,45,0.12)]">
              <div className="flex items-center justify-between font-bold text-[#17312d] mb-1">
                <span>5. Home Inspection & Appraisal</span>
                <span className="text-[#2e7450]">$500 – $1,200</span>
              </div>
              <p className="text-xs sm:text-sm text-[#60746d]">
                Paid directly prior to closing during the subject removal window. Essential for uncovering structural faults, water ingress, roofing deterioration, and electrical hazards.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#60746d]">
              Our calculator automatically models transfer taxes and legal disbursements for your jurisdiction.
            </span>
            <button
              type="button"
              onClick={onGoToCalculator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Calculate Your Closing Costs
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "porting-vs-penalty",
      title: "Mortgage Porting vs. Breaking: How to Avoid a $15,000 Bank Penalty",
      readTime: "8 min read",
      category: "Mortgage Porting & Penalties",
      badge: "Cost Saver",
      summary: "Moving before your 5-year mortgage term is up? Learn how mortgage porting works, how banks calculate the brutal Interest Rate Differential (IRD) penalty, and when blend-and-extend saves a fortune.",
      content: (
        <div className="space-y-6 text-[#2c443e] text-sm sm:text-base leading-relaxed">
          <div className="p-4 sm:p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/20">
            <h4 className="font-bold text-[#17312d] text-base mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2e7450]" />
              What is Mortgage Porting?
            </h4>
            <p className="text-xs sm:text-sm text-[#2c443e]">
              Porting is the process of taking your existing mortgage rate, outstanding principal balance, and remaining term from the property you are selling and attaching it to the new property you are purchasing—bypassing prepayment break penalties.
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            1. The Prepayment Penalty Trap (Variable vs. Fixed)
          </h3>
          <p>
            If you sell your current home mid-term and do not port, your lender will penalize you for terminating the contract early:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                Variable Rate Mortgages
              </span>
              <p className="text-xs sm:text-sm text-[#60746d]">
                Straightforward: the penalty is strictly <strong>3 months of interest</strong> on the remaining balance. On a $500,000 mortgage at 5.0%, the penalty is roughly $6,250.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.12)]">
              <span className="font-bold text-[#17312d] block text-sm mb-1">
                Fixed Rate Mortgages (The IRD Trap)
              </span>
              <p className="text-xs sm:text-sm text-[#60746d]">
                Lenders charge the <em>greater</em> of 3 months interest or the <strong>Interest Rate Differential (IRD)</strong>. Major big banks post artificially high "posted rates", resulting in IRD penalties reaching $15,000 to $35,000!
              </p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            2. Porting with a "Blend and Extend"
          </h3>
          <p>
            What happens if you are moving to a more expensive home and need to borrow additional funds? Most prime lenders offer a <strong>Blend and Extend</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Existing Balance:</strong> Your current $400,000 balance stays at your ultra-low historical rate (e.g., 3.29%).</li>
            <li><strong>Additional Funds:</strong> The extra $200,000 needed for the new purchase is borrowed at current market rates (e.g., 5.19%).</li>
            <li><strong>Blended Rate:</strong> The lender calculates a weighted average rate (in this case, approximately 3.92%) applied across the full $600,000 balance with a refreshed term.</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            3. The Critical Porting Window (30 to 120 Days)
          </h3>
          <p>
            Lenders enforce strict timelines. The sale of your current home and completion of the new purchase must typically close within <strong>30 to 90 days</strong> (some credit unions allow up to 120 days). If closing dates don't align, you will pay the penalty upfront upon sale and receive a refund only if your new purchase completes within the approved window.
          </p>

          <div className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#60746d]">
              Model your exact selling net proceeds, mortgage payout, and penalties in our calculator.
            </span>
            <button
              type="button"
              onClick={onGoToCalculator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Check Selling Net Proceeds
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "sell-buy-simultaneous",
      title: "Selling & Buying Simultaneously: Net Proceeds & Bridge Loan Math",
      readTime: "7 min read",
      category: "Selling & Buying Transitions",
      badge: "Real Estate Strategy",
      summary: "How to calculate your real net equity from a sale, roll it into your next home purchase, and avoid cash crunches using bridge financing between closing dates.",
      content: (
        <div className="space-y-6 text-[#2c443e] text-sm sm:text-base leading-relaxed">
          <div className="p-4 sm:p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/20">
            <h4 className="font-bold text-[#17312d] text-base mb-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2e7450]" />
              The Net Equity Formula
            </h4>
            <p className="text-xs sm:text-sm text-[#2c443e]">
              True Net Proceeds = Sale Price – Existing Mortgage Balance – Realtor Commission – Applicable Sales Tax on Commission – Legal Fees & Discharges – Staging/Repairs.
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            1. Why Sellers Overestimate Their Down Payment
          </h3>
          <p>
            Many homeowners believe that if their home is worth $900,000 and they owe $500,000, they have $400,000 ready for their next purchase. In reality:
          </p>

          <div className="overflow-x-auto my-4 border border-[rgba(23,49,45,0.15)] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm bg-white">
              <thead className="bg-[#f4efe5] text-[#17312d] font-bold border-b border-[rgba(23,49,45,0.15)]">
                <tr>
                  <th className="p-3">Item</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Remaining Cash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(23,49,45,0.08)]">
                <tr>
                  <td className="p-3 font-medium">Sale Price</td>
                  <td className="p-3 text-[#2e7450] font-bold">$900,000</td>
                  <td className="p-3">$900,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Mortgage Payout Balance</td>
                  <td className="p-3 text-[#ec715a]">-$500,000</td>
                  <td className="p-3">$400,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Realtor Commission (5% + GST/HST/Sales Tax)</td>
                  <td className="p-3 text-[#ec715a]">-$47,250</td>
                  <td className="p-3">$352,750</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Legal Fees, Title Discharge & Search</td>
                  <td className="p-3 text-[#ec715a]">-$1,500</td>
                  <td className="p-3">$351,250</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Home Staging, Minor Repairs & Moving Truck</td>
                  <td className="p-3 text-[#ec715a]">-$4,500</td>
                  <td className="p-3 font-bold text-[#2e7450]">$346,750 Net Equity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            That is a <strong>$53,250 gap</strong> between gross equity and actual cash in the bank! Overlooking this difference leads buyers to overextend on their purchase offer.
          </p>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17312d]">
            2. What is Bridge Financing & When Do You Need It?
          </h3>
          <p>
            When buying and selling at the same time, closing dates rarely land on the same afternoon. If you take possession of your new home on June 15th, but your sale doesn't close until June 30th:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your equity is temporarily trapped in your old house for 15 days.</li>
            <li>Your lender provides a short-term <strong>Bridge Loan</strong> to cover your new down payment.</li>
            <li>Requirements: You must possess a firm, unconditional Contract of Purchase and Sale on your existing home.</li>
            <li>Cost: Typically Prime rate + 2.0% to 3.0% calculated daily, plus a $250 to $500 administrative fee. For a 2-week period on $300,000, bridge interest usually costs under $1,200—well worth the peace of mind of moving smoothly.</li>
          </ul>

          <div className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#60746d]">
              Our "Selling & Buying" mode calculates your exact net rollover down payment automatically.
            </span>
            <button
              type="button"
              onClick={onGoToCalculator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Open Move Math Mode
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4" />
          NextMoveMath Educational Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight">
          Master Real Estate Math & Mortgage Rules
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base mt-3 leading-relaxed">
          Comprehensive, non-biased financial guides breaking down the quiet costs, qualification stress tests, and equity rollover math for Canadian and US home buyers.
        </p>
      </div>

      {/* Guide Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {guides.map((g, idx) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGuide(idx)}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeGuide === idx
                ? "bg-[#17312d] text-white border-[#17312d] shadow-lg ring-2 ring-[#2e7450]/40"
                : "bg-white text-[#17312d] border-[rgba(23,49,45,0.12)] hover:border-[#2e7450] hover:bg-[#f4efe5]/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                activeGuide === idx ? "bg-[#2e7450] text-white" : "bg-[#e7f2e9] text-[#2e7450]"
              }`}>
                {g.badge}
              </span>
              <span className={`flex items-center gap-1 ${activeGuide === idx ? "text-slate-300" : "text-[#60746d]"}`}>
                <Clock className="w-3 h-3" />
                {g.readTime}
              </span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
              {g.title}
            </h4>
          </button>
        ))}
      </div>

      {/* Active Guide Article */}
      <article className="bg-[#fffdf8] border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
        <div className="border-b border-[rgba(23,49,45,0.12)] pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#60746d] mb-2">
            <span className="font-bold uppercase tracking-wider text-[#ec715a]">
              {guides[activeGuide].category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {guides[activeGuide].readTime}
            </span>
            <span>·</span>
            <span>Reviewed for 2026 Guidelines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17312d] leading-tight mb-3">
            {guides[activeGuide].title}
          </h2>
          <p className="text-sm sm:text-base text-[#60746d] leading-relaxed">
            {guides[activeGuide].summary}
          </p>
        </div>

        {/* Render Guide Body */}
        {guides[activeGuide].content}
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#ec715a]">
            QUICK ANSWERS
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#17312d] mt-1">
            Frequently Asked Real Estate Math Questions
          </h3>
          <p className="text-[#60746d] text-sm mt-1">
            Plain English answers to common questions about closing costs, qualifying ratios, and bridge financing.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Can I use equity from selling my current home as the down payment on my next home?",
              a: "Yes! This is the most common path for move-up buyers. Your equity becomes available on the sale completion date. If your purchase completes earlier, your mortgage lender will arrange a short-term bridge loan secured against your firm sale contract.",
            },
            {
              q: "Why is the stress test qualifying payment higher than what I actually pay each month?",
              a: "The stress test is a simulation mandated by financial regulators. You only make payments based on your actual contract interest rate. However, to guard against default if interest rates climb in the future, the bank verifies that your current income could handle payments at +2.0% above contract rate.",
            },
            {
              q: "Do first-time buyers have to pay full Land Transfer Tax?",
              a: "In many jurisdictions, first-time buyers qualify for substantial rebates. In Ontario, eligible buyers receive up to $4,000 back. In Toronto, an additional municipal rebate up to $4,475 applies. In British Columbia, homes under $500,000 are fully exempt, with partial exemptions up to $525,000.",
            },
            {
              q: "What is the difference between Canadian and US mortgage compounding?",
              a: "In Canada, federal law requires fixed-rate mortgages to compound semi-annually (twice per year) not in advance. In the United States, mortgages compound monthly. This mathematical nuance slightly changes the true effective monthly interest calculation.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-[rgba(23,49,45,0.12)] rounded-xl overflow-hidden bg-[#fffdf8]"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-4 text-left font-bold text-sm sm:text-base text-[#17312d] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f4efe5]/50 transition-colors"
              >
                <span>{item.q}</span>
                {expandedFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-[#2e7450] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#60746d] shrink-0" />
                )}
              </button>
              {expandedFaq === i && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-[#2c443e] leading-relaxed border-t border-[rgba(23,49,45,0.08)] bg-white">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#17312d] to-[#255f41] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Ready to test these numbers on your own scenario?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Switch between buying, selling, moving, and rental conversion. See your real payments, stress test thresholds, and 5-year equity growth instantly.
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToCalculator}
          className="px-6 py-3 rounded-xl bg-[#ec715a] hover:bg-[#d95c46] text-white text-sm font-bold transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Launch Interactive Calculator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
