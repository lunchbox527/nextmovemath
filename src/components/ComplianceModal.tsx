import React from 'react';
import { X, ArrowLeft } from 'lucide-react';

export type CompliancePageType = 'privacy' | 'terms';

interface ComplianceModalProps {
  isOpen: boolean;
  page: CompliancePageType;
  onClose: () => void;
  onSelectPage: (page: CompliancePageType) => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  isOpen,
  page,
  onClose,
  onSelectPage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdf8] text-[#17312d] rounded-2xl shadow-2xl border border-[rgba(23,49,45,0.15)] my-8 max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-[rgba(23,49,45,0.12)] bg-[#f4efe5] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="font-serif font-bold text-base text-[#17312d]">
              NextMoveMath
            </span>
            <span className="text-xs text-[#60746d] ml-2">· Disclaimer &amp; Site Notice</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#60746d] hover:text-[#17312d] hover:bg-[#e7f2e9] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Tab Navigation */}
        <div className="bg-[#fffdf8] border-b border-[rgba(23,49,45,0.12)] px-6 flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={() => onSelectPage('terms')}
            className={`py-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              page === 'terms'
                ? 'border-[#17312d] text-[#17312d]'
                : 'border-transparent text-[#60746d] hover:text-[#17312d]'
            }`}
          >
            Terms &amp; Disclaimer
          </button>
          <button
            type="button"
            onClick={() => onSelectPage('privacy')}
            className={`py-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              page === 'privacy'
                ? 'border-[#17312d] text-[#17312d]'
                : 'border-transparent text-[#60746d] hover:text-[#17312d]'
            }`}
          >
            Privacy Notice
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm leading-relaxed text-[#2c443e]">
          {page === 'terms' ? (
            <div className="space-y-5">
              <div className="border-b border-[rgba(23,49,45,0.12)] pb-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
                  Terms of Use &amp; Estimation Disclaimer
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.16)] space-y-1.5">
                <div className="text-xs font-bold text-[#17312d] uppercase tracking-wider">
                  For Personal Mathematical Estimation Only — Not Professional Advice
                </div>
                <p className="text-xs text-[#2c443e] leading-relaxed m-0">
                  NextMoveMath is a self-serve mathematical estimation calculator provided strictly for general, illustrative planning. <strong>Nothing on this website constitutes financial, mortgage, lending, real estate, tax, accounting, appraisal, or legal advice, nor does NextMoveMath provide personalized consulting or advisory services.</strong>
                </p>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-[#17312d] mb-1.5">
                  1. Editable Estimates &amp; Independent Verification
                </h3>
                <p className="m-0 text-xs sm:text-sm">
                  All pre-filled values, interest rates, commission rates, tax fields, and debt-service benchmarks in this calculator are general, user-editable placeholders. Actual mortgage qualification rules, compounding conventions, prepayment penalties, closing adjustments, and local taxes vary by lender, jurisdiction, and individual circumstances, and can change at any time. Always confirm exact figures directly with a licensed mortgage professional, real estate lawyer or notary, tax advisor, and lender before making any financial or real estate decisions.
                </p>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-[#17312d] mb-1.5">
                  2. &ldquo;As-Is&rdquo; Tool &amp; Limitation of Liability
                </h3>
                <p className="m-0 text-xs sm:text-sm">
                  This calculator is provided free of charge on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind, express or implied, including any warranty of accuracy, completeness, or fitness for a particular purpose. Your use of NextMoveMath is solely at your own risk. Under no circumstances shall NextMoveMath or its creator be liable for any direct, indirect, incidental, or consequential loss or damages arising from the use of, or reliance upon, any calculation or estimate generated by this tool.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border-b border-[rgba(23,49,45,0.12)] pb-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
                  Privacy Notice
                </h2>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-[#17312d] mb-1.5">
                  1. 100% Local In-Browser Calculations
                </h3>
                <p className="m-0 text-xs sm:text-sm">
                  NextMoveMath runs locally in your web browser. Every number you enter—such as home prices, mortgage balances, income, debts, or rental estimates—is calculated strictly on your own device. We do not collect, transmit, store, or sell your financial inputs, and there are no user accounts or lead-generation forms on this site.
                </p>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-[#17312d] mb-1.5">
                  2. Share Links &amp; Standard Hosting Logs
                </h3>
                <p className="m-0 text-xs sm:text-sm">
                  If you click &ldquo;Share Move&rdquo;, a link is copied to your clipboard so you can share or bookmark the page at your own discretion. Like all standard websites, our web hosting provider processes basic, non-identifying technical request logs (such as browser type and timestamp) solely to serve the webpage reliably and maintain security.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[rgba(23,49,45,0.12)] bg-[#f4efe5] px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-[#60746d]">
            NextMoveMath · Illustrative estimation utility
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[rgba(23,49,45,0.2)] bg-white text-[#17312d] text-xs font-bold hover:bg-[#eae3d5] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#17312d]" />
            Back to Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
