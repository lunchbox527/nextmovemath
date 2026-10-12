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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#fffdf8] text-[#17312d] rounded-2xl shadow-2xl border border-[rgba(23,49,45,0.15)] my-8 max-h-[90vh] flex flex-col overflow-hidden"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {/* Modal Header */}
        <div className="border-b border-[rgba(23,49,45,0.12)] bg-[#f4efe5] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span 
              className="font-bold text-base text-[#17312d]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              NextMoveMath
            </span>
            <span className="text-xs text-[#60746d] ml-2">· Legal & Compliance</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#60746d] hover:text-[#17312d] hover:bg-[#e7f2e9] transition-colors cursor-pointer"
            aria-label="Close dialog"
            style={{ background: 'transparent', border: 'none' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Tab Navigation (No dark green boxes) */}
        <div className="bg-[#fffdf8] border-b border-[rgba(23,49,45,0.12)] px-6 flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onSelectPage('privacy')}
            className={`py-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
              page === 'privacy'
                ? 'border-[#17312d] text-[#17312d]'
                : 'border-transparent text-[#60746d] hover:text-[#17312d]'
            }`}
            style={{ background: 'transparent' }}
          >
            Privacy Policy & Cookie Notice
          </button>
          <button
            type="button"
            onClick={() => onSelectPage('terms')}
            className={`py-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
              page === 'terms'
                ? 'border-[#17312d] text-[#17312d]'
                : 'border-transparent text-[#60746d] hover:text-[#17312d]'
            }`}
            style={{ background: 'transparent' }}
          >
            Terms of Service & Disclaimers
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-sm leading-relaxed text-[#2c443e]">
          {/* 1. PRIVACY POLICY */}
          {page === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-[rgba(23,49,45,0.12)] pb-4">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#ec715a]">
                  LEGAL COMPLIANCE & PRIVACY
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#17312d] mt-1">
                  Privacy Policy
                </h1>
                <p className="text-xs text-[#60746d] mt-1">
                  Last Updated: October 1, 2026 · Compliant with Google AdSense Publisher Terms
                </p>
              </div>

              {/* CRITICAL ADSENSE NOTICE CALLOUT */}
              <div className="p-4 rounded-xl bg-[#cfe8d8]/50 border border-[#2e7450]/30 space-y-2">
                <div className="text-[#2e7450] font-bold text-xs">
                  Google AdSense & Third-Party Advertising Notice
                </div>
                <p className="text-xs text-[#17312d]">
                  This website displays advertisements served by <strong>Google AdSense</strong>. Google’s partner policies require clear disclosure of how advertising cookies are utilized on this site:
                </p>
                <ul className="list-disc pl-5 text-xs space-y-1.5 text-[#2c443e]">
                  <li>
                    <strong>Third-party vendors, including Google</strong>, use cookies to serve ads based on a user’s prior visits to our website or other websites across the Internet.
                  </li>
                  <li>
                    <strong>Google’s use of advertising cookies</strong> enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
                  </li>
                  <li>
                    Users may opt out of personalized advertising by visiting{' '}
                    <a 
                      href="https://adssettings.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#ec715a] underline font-bold"
                    >
                      Google Ads Settings ↗
                    </a>{' '}
                    or by visiting{' '}
                    <a 
                      href="https://www.aboutads.info/choices/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#ec715a] underline font-bold"
                    >
                      www.aboutads.info ↗
                    </a>.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  1. Local In-Browser Calculations & Privacy
                </h2>
                <p>
                  <strong>NextMoveMath is a client-side utility tool.</strong> All mathematical formulas, mortgage amortizations, income calculations, and cost estimates are performed locally in your own web browser. We do not transmit, collect, or store your mortgage balances, house prices, income, or financial information on external servers.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  2. Cookies and Aggregated Metrics
                </h2>
                <p>
                  This site uses standard browser cookies solely to remember user display preferences (such as selected calculation path) and to facilitate advertising delivery via Google AdSense.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  3. California Consumer Privacy Act (CCPA) & GDPR
                </h2>
                <p>
                  We do not sell personal information or build individual profiles on visitors. Visitors have the right to opt out of interest-based ad tracking through Google Ads Settings and industry opt-out portals listed above.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(23,49,45,0.1)]">
                <h2 className="text-sm font-serif font-bold text-[#17312d] mb-1">
                  Questions & Inquiries
                </h2>
                <p className="text-xs text-[#60746d]">
                  For any privacy questions or inquiries regarding this utility tool, contact us at{' '}
                  <strong className="text-[#17312d]">privacy@nextmovemath.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* 2. TERMS OF SERVICE */}
          {page === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-[rgba(23,49,45,0.12)] pb-4">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#ec715a]">
                  USER AGREEMENT & DISCLAIMERS
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#17312d] mt-1">
                  Terms of Service
                </h1>
                <p className="text-xs text-[#60746d] mt-1">
                  Effective Date: October 1, 2026
                </p>
              </div>

              {/* CRITICAL FINANCIAL DISCLAIMER */}
              <div className="p-4 rounded-xl bg-[#ec715a]/10 border border-[#ec715a]/30 space-y-1.5">
                <div className="text-xs font-bold text-[#ec715a] uppercase tracking-wider">
                  Utility Tool Purpose & Planning Disclaimer
                </div>
                <p className="text-xs text-[#17312d] leading-normal">
                  NextMoveMath is an independent mathematical simulation tool intended for planning and educational purposes only. <strong>The calculations generated do not constitute an offer to lend, a formal mortgage pre-approval, an official appraisal, financial advice, or legal counsel.</strong>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  1. Independent Verification Required
                </h2>
                <p>
                  Mortgage lending rules, benchmark qualifying rates (such as stress tests), property transfer taxes, and broker fees vary by province, state, lender, and applicant profile. Always confirm your exact qualification numbers with a licensed mortgage broker, lender, lawyer, or notary before making financial commitments.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  2. Intellectual Property & Permitted Use
                </h2>
                <p>
                  NextMoveMath is provided for personal, non-commercial planning use. The design layout, custom formula implementations, and brand assets are protected by applicable intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#17312d] mb-2">
                  3. Limitation of Liability
                </h2>
                <p>
                  In no event shall NextMoveMath or its creators be held liable for any decisions, financial transactions, or contracts entered into based on figures or simulations produced by this calculator.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(23,49,45,0.1)]">
                <p className="text-xs text-[#60746d]">
                  Questions regarding terms of use can be directed to{' '}
                  <strong className="text-[#17312d]">legal@nextmovemath.com</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Clean light button, NO dark green box) */}
        <div className="border-t border-[rgba(23,49,45,0.12)] bg-[#f4efe5] px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-[#60746d]">
            © 2026 NextMoveMath. Client-side utility calculator.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[rgba(23,49,45,0.2)] bg-white text-[#17312d] text-xs font-bold hover:bg-[#eae3d5] hover:border-[#17312d] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ color: '#17312d', backgroundColor: '#ffffff' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#17312d]" />
            Return to Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
