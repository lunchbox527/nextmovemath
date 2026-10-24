import React from "react";
import { ShieldCheck, FileText, Calculator, ArrowRight } from "lucide-react";

interface LegalPageViewProps {
  page: "privacy" | "terms";
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}

export const LegalPageView: React.FC<LegalPageViewProps> = ({ page, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex items-center gap-2">
        <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
          Home
        </a>
        <span>/</span>
        <span className="text-[#17312d] font-semibold">
          {page === "privacy" ? "Privacy Policy" : "Terms of Service"}
        </span>
      </nav>

      {/* Switcher Tabs using real anchor tags */}
      <div className="flex items-center gap-3 mb-8 border-b border-[rgba(23,49,45,0.15)] pb-4">
        <a
          href="/privacy-policy"
          onClick={(e) => onNavigate("/privacy-policy", e)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all no-underline ${
            page === "privacy"
              ? "bg-[#17312d] text-white"
              : "bg-white text-[#17312d] border border-[rgba(23,49,45,0.15)] hover:bg-[#f4efe5]"
          }`}
        >
          Privacy Policy & Cookie Notice
        </a>
        <a
          href="/terms-of-service"
          onClick={(e) => onNavigate("/terms-of-service", e)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all no-underline ${
            page === "terms"
              ? "bg-[#17312d] text-white"
              : "bg-white text-[#17312d] border border-[rgba(23,49,45,0.15)] hover:bg-[#f4efe5]"
          }`}
        >
          Terms of Service & Disclaimers
        </a>
      </div>

      {page === "privacy" ? (
        <article className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-[#2c443e]">
          <header className="border-b border-[rgba(23,49,45,0.12)] pb-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#2e7450] mb-2">
              <ShieldCheck className="w-4 h-4" />
              Legal Compliance & Data Transparency
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] m-0">
              Privacy Policy & Cookie Disclosure
            </h1>
            <p className="text-xs text-[#60746d] mt-2">
              Last Updated: October 24, 2026 · Applies to https://nextmovemath.com
            </p>
          </header>

          <section className="p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/25 space-y-3">
            <h2 className="text-base font-bold text-[#17312d] m-0">
              Google AdSense & Third-Party Advertising Cookie Notice
            </h2>
            <p className="text-xs sm:text-sm text-[#17312d] m-0">
              NextMoveMath displays advertisements served by <strong>Google AdSense</strong> to keep our real estate calculators and financial guides free for all readers. In accordance with Google Publisher Policies, please note how advertising cookies function on this website:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-[#2c443e]">
              <li>
                <strong>Third-party vendors, including Google</strong>, use cookies (such as the DoubleClick cookie) to serve ads based on a user’s prior visits to NextMoveMath or other websites across the Internet.
              </li>
              <li>
                <strong>Google’s use of advertising cookies</strong> enables Google and its partners to serve relevant advertisements to visitors based on their visit to this site and/or other websites on the Internet.
              </li>
              <li>
                Visitors may opt out of personalized advertising at any time by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2e7450] underline font-bold"
                >
                  Google Ads Settings
                </a>{" "}
                or by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2e7450] underline font-bold"
                >
                  www.aboutads.info/choices
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              1. Local In-Browser Financial Calculations
            </h2>
            <p>
              NextMoveMath is built with privacy-by-design architecture. Every mortgage calculation, home sale net-proceeds worksheet, stress-test simulation, debt-to-income check, and rental cash-flow estimate you enter is processed locally inside your web browser’s memory. We do not require user account registration, and we never transmit, store, harvest, or sell your personal income figures, mortgage balances, or property prices to any external database or mortgage lead broker.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              2. Standard Server Logs, Cookies & Analytics
            </h2>
            <p>
              Like standard web publications hosted on modern content delivery networks, our hosting infrastructure automatically records non-identifying technical request metadata (such as browser user-agent type, referring page, approximate country/region, and timestamp) strictly to maintain uptime, prevent abuse, and diagnose broken links. Cookies may also be set by third-party advertising networks (including Google AdSense) to cap ad frequency, combat click fraud, and measure aggregate ad performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              3. Voluntary Contact Communications
            </h2>
            <p>
              If you choose to email our editorial support desk or submit a question via our Contact page, we use your name and email address solely to reply to your inquiry. We never add support correspondents to marketing lists or share your email address with third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              4. Canadian PIPEDA, US State Privacy (CCPA/CPRA) & EEA/UK GDPR Rights
            </h2>
            <p>
              NextMoveMath does not sell personal information as defined under the California Consumer Privacy Act (CCPA/CPRA), Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA), or the General Data Protection Regulation (GDPR). Visitors located in the European Economic Area, United Kingdom, or Switzerland are presented with applicable consent choices where required for personalized advertising cookies, and any user worldwide can manage browser cookie controls or opt out via Google Ads Settings.
            </p>
          </section>

          <section className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#60746d] m-0">
              Privacy inquiries: <strong className="text-[#17312d]">support@nextmovemath.com</strong>
            </p>
            <a
              href="/"
              onClick={(e) => onNavigate("/", e)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold no-underline transition-all"
            >
              <Calculator className="w-4 h-4" />
              Return to Calculator
            </a>
          </section>
        </article>
      ) : (
        <article className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-[#2c443e]">
          <header className="border-b border-[rgba(23,49,45,0.12)] pb-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#ec715a] mb-2">
              <FileText className="w-4 h-4" />
              User Agreement & Financial Disclaimers
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] m-0">
              Terms of Service & Planning Disclaimer
            </h1>
            <p className="text-xs text-[#60746d] mt-2">
              Effective Date: October 24, 2026 · Applies to https://nextmovemath.com
            </p>
          </header>

          <section className="p-5 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.18)] space-y-2">
            <h2 className="text-base font-bold text-[#17312d] m-0">
              Educational & Mathematical Planning Purpose Only
            </h2>
            <p className="text-xs sm:text-sm text-[#2c443e] m-0">
              NextMoveMath is an independent mathematical calculation and consumer education publisher. <strong>Nothing on NextMoveMath constitutes mortgage brokerage, an offer or commitment to lend, legal counsel, formal property appraisal, tax accounting, or personalized investment advice.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              1. Mandatory Professional Verification
            </h2>
            <p>
              Residential mortgage underwriting guidelines, minimum qualifying stress-test rates, debt-to-income exceptions, provincial or municipal land transfer taxes, first-time buyer rebates, prepayment penalty formulas, and legal closing disbursements change periodically and vary across provinces, states, municipalities, and individual lenders. Before signing an Agreement of Purchase and Sale, waiving financing conditions, or breaking an existing mortgage, you must verify exact figures in writing with a licensed mortgage professional, real estate lawyer or notary/escrow officer, and qualified tax advisor.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              2. Accuracy of Estimates & Assumptions
            </h2>
            <p>
              While we audit our compounding formulas and editorial guides against published regulatory standards from OSFI, CMHC, the Bank of Canada, the CFPB, and Fannie Mae, mathematical models rely on user-entered assumptions (such as estimated commission rates, annual property taxes, interest rates, and rental vacancy allowances). Actual lender amortization schedules may differ slightly due to exact day-count conventions, rounding rules, payment frequencies, or lender-specific fee schedules.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              3. Intellectual Property & Acceptable Use
            </h2>
            <p>
              All original articles, calculation interfaces, worked tables, and brand elements on NextMoveMath are protected by copyright and intellectual property laws. Visitors are welcome to use the calculator for personal household planning, share scenario links with family members or advisors, and print personal PDF summaries. Automated scraping, republication of our written guides without attribution and permission, or framing NextMoveMath inside deceptive commercial wrappers is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#17312d]">
              4. Limitation of Liability
            </h2>
            <p>
              NextMoveMath is provided on an “as-is” and “as-available” basis without warranties of any kind. Under no circumstances shall NextMoveMath, its authors, or contributors be liable for any direct, indirect, incidental, or consequential financial loss arising from reliance on estimates, articles, or third-party links referenced on this website.
            </p>
          </section>

          <section className="pt-4 border-t border-[rgba(23,49,45,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#60746d] m-0">
              Questions regarding these terms: <strong className="text-[#17312d]">support@nextmovemath.com</strong>
            </p>
            <a
              href="/guides"
              onClick={(e) => onNavigate("/guides", e)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17312d] hover:bg-[#255f41] text-white text-xs font-bold no-underline transition-all"
            >
              <span>Browse Real Estate Math Guides</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </article>
      )}
    </div>
  );
};
