import React, { useState } from "react";
import { BookOpen, Calculator, CheckCircle2, ArrowRight, Clock, Shield, ArrowLeft } from "lucide-react";
import { GUIDE_ARTICLES, getGuideBySlug } from "../data/siteContent.js";

interface GuideProps {
  slug?: string;
  onNavigate: (path: string, e?: React.MouseEvent) => void;
  onOpenCalculatorMode?: (mode: "buy" | "sell" | "move" | "rent", e?: React.MouseEvent) => void;
  isUS?: boolean;
}

export const EducationalGuides: React.FC<GuideProps> = ({
  slug,
  onNavigate,
  onOpenCalculatorMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const activeArticle = slug ? getGuideBySlug(slug) : undefined;

  // Dedicated Individual Article Page (/guides/:slug)
  if (activeArticle) {
    const relatedArticles = GUIDE_ARTICLES.filter((a) => a.slug !== activeArticle.slug).slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Crawlable Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex flex-wrap items-center gap-2">
          <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
            Home
          </a>
          <span>/</span>
          <a href="/guides" onClick={(e) => onNavigate("/guides", e)} className="hover:text-[#17312d] underline">
            Guides & Library
          </a>
          <span>/</span>
          <span className="text-[#17312d] font-semibold line-clamp-1">{activeArticle.title}</span>
        </nav>

        <article className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-10 shadow-sm mb-10">
          {/* Article Header */}
          <header className="border-b border-[rgba(23,49,45,0.12)] pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#60746d] mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e7f2e9] text-[#2e7450] font-bold uppercase tracking-wider">
                {activeArticle.badge}
              </span>
              <span className="font-bold uppercase tracking-wider text-[#ec715a]">
                {activeArticle.category}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <span>·</span>
              <span>Updated {activeArticle.updatedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#17312d] leading-tight m-0 mb-4">
              {activeArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-[#50645e] leading-relaxed m-0">
              {activeArticle.summary}
            </p>
          </header>

          {/* Key Takeaways Box */}
          <section className="p-5 sm:p-6 rounded-xl bg-[#f4efe5] border border-[rgba(23,49,45,0.14)] mb-8">
            <h2 className="text-base font-serif font-bold text-[#17312d] m-0 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2e7450]" />
              Key Financial Takeaways
            </h2>
            <ul className="space-y-2 m-0 pl-0 list-none">
              {activeArticle.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2c443e] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7450] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Main Editorial Sections */}
          <div className="space-y-8 text-sm sm:text-base text-[#2c443e] leading-relaxed">
            {activeArticle.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="m-0">
                    {para}
                  </p>
                ))}

                {sec.formula && (
                  <div className="p-4 rounded-xl bg-[#17312d] text-[#cfe8d8] font-mono text-xs sm:text-sm overflow-x-auto">
                    {sec.formula}
                  </div>
                )}

                {sec.callout && (
                  <div className="p-4 sm:p-5 rounded-xl bg-[#e7f2e9] border border-[#2e7450]/25 space-y-1">
                    <h3 className="text-sm font-bold text-[#17312d] m-0">{sec.callout.title}</h3>
                    <p className="text-xs sm:text-sm text-[#2c443e] m-0">{sec.callout.body}</p>
                  </div>
                )}

                {sec.bullets && (
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}

                {sec.table && (
                  <div className="overflow-x-auto my-4 border border-[rgba(23,49,45,0.15)] rounded-xl">
                    {sec.table.caption && (
                      <div className="px-4 py-2.5 bg-[#fffdf8] border-b border-[rgba(23,49,45,0.1)] text-xs font-bold text-[#60746d]">
                        {sec.table.caption}
                      </div>
                    )}
                    <table className="w-full text-left text-xs sm:text-sm bg-white border-collapse">
                      <thead className="bg-[#f4efe5] text-[#17312d] font-bold border-b border-[rgba(23,49,45,0.15)]">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(23,49,45,0.08)]">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 ${cIdx === 0 ? "font-semibold text-[#17312d]" : "text-[#2c443e]"}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Dedicated Article FAQs (Fully visible in DOM for readers & crawlers) */}
          {activeArticle.faqs.length > 0 && (
            <section className="mt-10 pt-8 border-t border-[rgba(23,49,45,0.14)] space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] m-0">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {activeArticle.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 sm:p-5 rounded-xl bg-[#fffdf8] border border-[rgba(23,49,45,0.12)] space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#17312d] m-0">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-[#2c443e] leading-relaxed m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Editorial Footer & Calculator CTA */}
          <footer className="mt-10 pt-6 border-t border-[rgba(23,49,45,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-[#60746d]">
              Authored by the <strong>NextMoveMath Editorial Research Team</strong> ·{" "}
              <a
                href="/methodology"
                onClick={(e) => onNavigate("/methodology", e)}
                className="text-[#2e7450] underline font-semibold"
              >
                View Formula Methodology
              </a>
            </div>
            <a
              href="/"
              onClick={(e) => {
                if (onOpenCalculatorMode) {
                  onOpenCalculatorMode(activeArticle.calculatorMode, e);
                } else {
                  onNavigate("/", e);
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold no-underline transition-all shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Your Numbers in the Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </footer>
        </article>

        {/* Related Guides Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#17312d] m-0">
              Continue Reading Related Guides
            </h2>
            <a
              href="/guides"
              onClick={(e) => onNavigate("/guides", e)}
              className="text-xs font-bold text-[#2e7450] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All 8 Guides
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((item) => (
              <a
                key={item.slug}
                href={`/guides/${item.slug}`}
                onClick={(e) => onNavigate(`/guides/${item.slug}`, e)}
                className="p-5 rounded-2xl bg-white border border-[rgba(23,49,45,0.14)] hover:border-[#2e7450] transition-all no-underline text-[#17312d] flex flex-col justify-between gap-3 shadow-xs"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#e7f2e9] text-[#2e7450] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#17312d] leading-snug m-0 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#60746d] line-clamp-3 m-0 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#2e7450] inline-flex items-center gap-1">
                  Read full guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Guides Hub Page (/guides)
  const categories = ["All", "Mortgage Qualification", "Home Buying Strategy", "Selling & Moving Math", "Financing & Equity Strategy"];
  const filteredGuides =
    selectedCategory === "All"
      ? GUIDE_ARTICLES
      : GUIDE_ARTICLES.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex items-center gap-2">
        <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
          Home
        </a>
        <span>/</span>
        <span className="text-[#17312d] font-semibold">Guides & Library</span>
      </nav>

      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4" />
          NextMoveMath Editorial Library
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#17312d] tracking-tight m-0 mb-4">
          Real Estate & Mortgage Math Guides
        </h1>
        <p className="text-[#50645e] text-sm sm:text-base leading-relaxed m-0">
          In-depth, plain-English guides covering Canadian mortgage stress tests, US debt-to-income underwriting, land transfer taxes, mortgage porting penalties, bridge loans, and rental cash-flow math—with worked examples you can verify directly in our calculator.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === cat
                ? "bg-[#17312d] text-white border-[#17312d]"
                : "bg-white text-[#17312d] border-[rgba(23,49,45,0.15)] hover:bg-[#f4efe5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Full Guide Cards with Real <a href> Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredGuides.map((guide) => (
          <article
            key={guide.slug}
            className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#2e7450] transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#60746d] mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e7f2e9] text-[#2e7450] font-bold uppercase tracking-wider text-[11px]">
                  {guide.badge}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17312d] leading-snug m-0 mb-3">
                <a
                  href={`/guides/${guide.slug}`}
                  onClick={(e) => onNavigate(`/guides/${guide.slug}`, e)}
                  className="text-[#17312d] hover:text-[#2e7450] no-underline"
                >
                  {guide.title}
                </a>
              </h2>

              <p className="text-xs sm:text-sm text-[#50645e] leading-relaxed m-0 mb-4">
                {guide.summary}
              </p>

              <ul className="space-y-1.5 mb-5 pl-0 list-none">
                {guide.keyTakeaways.slice(0, 2).map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#2c443e]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7450] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[rgba(23,49,45,0.1)] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#60746d]">{guide.category}</span>
              <a
                href={`/guides/${guide.slug}`}
                onClick={(e) => onNavigate(`/guides/${guide.slug}`, e)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2e7450] hover:underline no-underline"
              >
                <span>Read Complete Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#17312d] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white m-0 mb-2">
            Put the Formulas to Work on Your Own Move
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl m-0">
            Model buying, selling net proceeds, simultaneous equity rollovers, stress-test qualification, and rental conversions in real time.
          </p>
        </div>
        <a
          href="/"
          onClick={(e) => onNavigate("/", e)}
          className="px-6 py-3 rounded-xl bg-[#ec715a] hover:bg-[#d95c46] text-white text-sm font-bold no-underline transition-all shrink-0 inline-flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Interactive Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
