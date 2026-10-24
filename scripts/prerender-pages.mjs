import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDE_ARTICLES } from "../src/data/siteContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const SITE_URL = "https://nextmovemath.com";

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSiteShell(pathname, mainInnerHtml) {
  return `
      <header style="background:#f4efe5; border-bottom:1px solid rgba(23,49,45,0.15); padding:18px 24px; font-family:Arial,sans-serif;">
        <div style="max-width:1160px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <a href="/" style="font-family:Georgia,serif; font-size:22px; font-weight:bold; color:#17312d; text-decoration:none;">NextMoveMath</a>
          <nav aria-label="Main navigation" style="display:flex; gap:16px; flex-wrap:wrap; font-size:14px; font-weight:bold;">
            <a href="/" style="color:${pathname === "/" ? "#2e7450" : "#17312d"}; text-decoration:none;">Calculator</a>
            <a href="/guides" style="color:${pathname.startsWith("/guides") ? "#2e7450" : "#17312d"}; text-decoration:none;">Guides &amp; Library</a>
            <a href="/methodology" style="color:${pathname === "/methodology" ? "#2e7450" : "#17312d"}; text-decoration:none;">Methodology</a>
            <a href="/about" style="color:${pathname === "/about" ? "#2e7450" : "#17312d"}; text-decoration:none;">About</a>
            <a href="/contact" style="color:${pathname === "/contact" ? "#2e7450" : "#17312d"}; text-decoration:none;">Contact</a>
          </nav>
        </div>
      </header>

      <main style="max-width:960px; margin:0 auto; padding:44px 20px; font-family:Arial,Helvetica,sans-serif; color:#17312d; line-height:1.75;">
        ${mainInnerHtml}
      </main>

      <footer style="border-top:1px solid rgba(23,49,45,0.15); padding:28px 24px; font-family:Arial,sans-serif; font-size:13px; color:#60746d;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-wrap:wrap; gap:14px; justify-content:space-between; align-items:center;">
          <span>© 2026 NextMoveMath. Independent consumer real estate planning estimates—not financial or lending advice.</span>
          <nav aria-label="Footer navigation" style="display:flex; gap:12px; flex-wrap:wrap;">
            <a href="/" style="color:#17312d;">Calculator</a>
            <a href="/guides" style="color:#17312d;">Educational Guides</a>
            <a href="/methodology" style="color:#17312d;">Methodology</a>
            <a href="/about" style="color:#17312d;">About Us</a>
            <a href="/contact" style="color:#17312d;">Contact</a>
            <a href="/privacy-policy" style="color:#17312d;">Privacy Policy</a>
            <a href="/terms-of-service" style="color:#17312d;">Terms of Service</a>
          </nav>
        </div>
      </footer>`;
}

function renderArticleBody(article) {
  const takeawaysHtml = article.keyTakeaways
    .map((item) => `<li style="margin-bottom:8px;">${escapeHtml(item)}</li>`)
    .join("\n");

  const sectionsHtml = article.sections
    .map((section) => {
      const paragraphs = (section.paragraphs || [])
        .map((p) => `<p style="margin:0 0 16px;">${escapeHtml(p)}</p>`)
        .join("\n");

      const formula = section.formula
        ? `<pre style="background:#17312d; color:#e7f2e9; padding:16px 20px; border-radius:12px; overflow-x:auto; font-size:13px; margin:18px 0;"><code>${escapeHtml(section.formula)}</code></pre>`
        : "";

      const bullets = section.bullets
        ? `<ul style="background:#fffdf8; border:1px solid rgba(23,49,45,0.12); border-radius:12px; padding:18px 24px 18px 38px; margin:18px 0;">
            ${section.bullets.map((b) => `<li style="margin-bottom:8px;">${escapeHtml(b)}</li>`).join("\n")}
          </ul>`
        : "";

      const table = section.table
        ? `<div style="overflow-x:auto; margin:22px 0; border:1px solid rgba(23,49,45,0.15); border-radius:12px;">
            <table style="width:100%; border-collapse:collapse; font-size:14px; text-align:left;">
              <caption style="padding:12px 16px; font-weight:bold; background:#f4efe5; text-align:left;">${escapeHtml(section.table.caption)}</caption>
              <thead>
                <tr style="background:#17312d; color:#ffffff;">
                  ${section.table.headers.map((h) => `<th style="padding:10px 14px;">${escapeHtml(h)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${section.table.rows
                  .map(
                    (row) => `<tr style="border-top:1px solid rgba(23,49,45,0.1);">
                      ${row.map((cell, idx) => `<td style="padding:10px 14px; ${idx === 0 ? "font-weight:bold;" : ""}">${escapeHtml(cell)}</td>`).join("")}
                    </tr>`
                  )
                  .join("\n")}
              </tbody>
            </table>
          </div>`
        : "";

      const callout = section.callout
        ? `<aside style="background:#fff8eb; border-left:4px solid #d97706; padding:16px 20px; border-radius:10px; margin:18px 0;">
            <strong style="display:block; margin-bottom:4px; color:#92400e;">${escapeHtml(section.callout.title)}</strong>
            <p style="margin:0; font-size:14px; color:#78350f;">${escapeHtml(section.callout.body)}</p>
          </aside>`
        : "";

      return `<section style="margin-bottom:32px;">
        <h2 style="font-family:Georgia,serif; font-size:24px; color:#17312d; margin:0 0 12px;">${escapeHtml(section.heading)}</h2>
        ${paragraphs}
        ${formula}
        ${bullets}
        ${table}
        ${callout}
      </section>`;
    })
    .join("\n");

  const faqsHtml =
    article.faqs && article.faqs.length > 0
      ? `<section style="margin-top:36px; padding-top:28px; border-top:1px solid rgba(23,49,45,0.15);">
          <h2 style="font-family:Georgia,serif; font-size:24px; margin:0 0 16px;">Frequently Asked Questions</h2>
          ${article.faqs
            .map(
              (f) => `<div style="background:#fff; border:1px solid rgba(23,49,45,0.12); border-radius:12px; padding:18px 20px; margin-bottom:14px;">
                <h3 style="font-size:17px; margin:0 0 8px; color:#17312d;">${escapeHtml(f.q)}</h3>
                <p style="margin:0; color:#3e534c; font-size:15px;">${escapeHtml(f.a)}</p>
              </div>`
            )
            .join("\n")}
        </section>`
      : "";

  const related = GUIDE_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const relatedHtml = `<section style="margin-top:36px; padding-top:24px; border-top:1px solid rgba(23,49,45,0.15);">
      <h2 style="font-family:Georgia,serif; font-size:22px; margin:0 0 12px;">Related Moving &amp; Mortgage Math Guides</h2>
      <ul>
        ${related
          .map(
            (r) =>
              `<li style="margin-bottom:8px;"><a href="/guides/${escapeHtml(r.slug)}" style="color:#2e7450; font-weight:bold;">${escapeHtml(r.title)}</a> — ${escapeHtml(r.readTime)}</li>`
          )
          .join("\n")}
      </ul>
      <p style="margin-top:16px;"><a href="/" style="color:#17312d; font-weight:bold;">→ Open the Interactive NextMoveMath Calculator</a> | <a href="/guides" style="color:#2e7450; font-weight:bold;">Browse All Guides</a></p>
    </section>`;

  return `
    <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
      <a href="/" style="color:#60746d;">Home</a> / <a href="/guides" style="color:#60746d;">Guides &amp; Library</a> / <span>${escapeHtml(article.title)}</span>
    </nav>
    <article style="background:#ffffff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
      <header style="border-bottom:1px solid rgba(23,49,45,0.12); padding-bottom:22px; margin-bottom:28px;">
        <p style="font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.1em; color:#2e7450; margin:0 0 8px;">
          ${escapeHtml(article.badge)} · ${escapeHtml(article.category)} · ${escapeHtml(article.readTime)} · Updated ${escapeHtml(article.updatedDate)}
        </p>
        <h1 style="font-family:Georgia,serif; font-size:34px; line-height:1.2; color:#17312d; margin:0 0 14px;">${escapeHtml(article.title)}</h1>
        <p style="font-size:17px; color:#3e534c; margin:0;">${escapeHtml(article.summary)}</p>
      </header>
      <section style="background:#e7f2e9; border-radius:14px; padding:20px 24px; margin-bottom:30px;">
        <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:0.08em; color:#2e7450; margin:0 0 10px;">Key Mathematical Takeaways</h2>
        <ul style="margin:0; padding-left:20px;">
          ${takeawaysHtml}
        </ul>
      </section>
      ${sectionsHtml}
      ${faqsHtml}
      ${relatedHtml}
    </article>`;
}

function buildPageDefinitions() {
  const pages = [];

  // 1. Guides Hub (/guides)
  pages.push({
    route: "/guides",
    title: "Real Estate & Mortgage Math Guides Library | NextMoveMath",
    description:
      "Explore in-depth guides on the Canadian mortgage stress test, US DTI ratios, quiet closing costs, mortgage porting, bridge loans, and rental HELOC math.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "NextMoveMath Real Estate & Mortgage Math Guides Library",
      url: `${SITE_URL}/guides`,
      description:
        "Comprehensive North American real estate moving math guides covering mortgage qualification, closing costs, bridge financing, porting, and rental HELOCs.",
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>Guides &amp; Library</span>
      </nav>
      <h1 style="font-family:Georgia,serif; font-size:38px; line-height:1.18; margin:0 0 14px;">Real Estate Moving &amp; Mortgage Math Guides</h1>
      <p style="font-size:17px; color:#3e534c; margin:0 0 32px;">
        Plain-English explanations, statutory compounding equations, and worked line-by-line examples for Canadian and US homebuyers, move-up sellers, downsizers, and small landlords.
      </p>
      <div style="display:grid; gap:20px;">
        ${GUIDE_ARTICLES.map(
          (g) => `<article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:16px; padding:24px;">
            <p style="font-size:12px; font-weight:bold; text-transform:uppercase; color:#2e7450; margin:0 0 6px;">${escapeHtml(g.badge)} · ${escapeHtml(g.category)} · ${escapeHtml(g.readTime)}</p>
            <h2 style="font-family:Georgia,serif; font-size:22px; margin:0 0 10px;">
              <a href="/guides/${escapeHtml(g.slug)}" style="color:#17312d; text-decoration:none;">${escapeHtml(g.title)}</a>
            </h2>
            <p style="margin:0 0 12px; color:#3e534c; font-size:15px;">${escapeHtml(g.summary)}</p>
            <a href="/guides/${escapeHtml(g.slug)}" style="color:#2e7450; font-weight:bold; font-size:14px;">Read complete guide &amp; worked tables →</a>
          </article>`
        ).join("\n")}
      </div>`,
  });

  // 2. Individual Guide Pages (/guides/:slug)
  for (const article of GUIDE_ARTICLES) {
    const graph = [
      {
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription,
        author: { "@type": "Organization", name: "NextMoveMath Editorial & Financial Modeling Team" },
        publisher: { "@type": "Organization", name: "NextMoveMath", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/guides/${article.slug}`,
        datePublished: "2026-10-01",
        dateModified: "2026-10-24",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/guides/${article.slug}` },
        ],
      },
    ];
    if (article.faqs && article.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: article.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }

    pages.push({
      route: `/guides/${article.slug}`,
      title: article.seoTitle,
      description: article.metaDescription,
      ogType: "article",
      jsonLd: { "@context": "https://schema.org", "@graph": graph },
      bodyHtml: renderArticleBody(article),
    });
  }

  // 3. Methodology (/methodology)
  pages.push({
    route: "/methodology",
    title: "Calculation Methodology & Mortgage Formulas | NextMoveMath",
    description:
      "Review the exact mathematical formulas, semi-annual vs. monthly compounding equations, OSFI B-20 stress test rules, and CFPB DTI benchmarks powering NextMoveMath.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Calculation Methodology & Regulatory Citations — NextMoveMath",
      url: `${SITE_URL}/methodology`,
      description:
        "Transparent mortgage amortization equations, semi-annual vs. monthly compounding derivations, OSFI B-20 stress test rules, and US DTI underwriting standards.",
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>Methodology</span>
      </nav>
      <article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
        <h1 style="font-family:Georgia,serif; font-size:36px; margin:0 0 14px;">Calculation Methodology &amp; Regulatory Citations</h1>
        <p style="font-size:17px; color:#3e534c; margin:0 0 24px;">
          NextMoveMath publishes every mathematical equation and regulatory assumption underlying our calculator so homeowners, buyers, realtors, and financial planners can audit every estimate independently.
        </p>

        <h2 style="font-family:Georgia,serif; font-size:24px; margin:24px 0 10px;">1. Statutory Compounding: Canada vs. United States</h2>
        <p>Under Section 6 of the federal <em>Interest Act (R.S.C., 1985, c. I-15)</em>, Canadian fixed-rate mortgages compound semi-annually, not in advance. To compute an exact monthly periodic interest factor <code>r_m</code> from a nominal annual rate <code>R</code>:</p>
        <pre style="background:#17312d; color:#e7f2e9; padding:14px 18px; border-radius:10px; font-size:13px;"><code>Canada Semi-Annual Periodic Monthly Rate: r_m = (1 + R / 2)^(2 / 12) - 1</code></pre>
        <p>In the United States, conventional conforming (Fannie Mae / Freddie Mac) and FHA/VA residential mortgages compound monthly:</p>
        <pre style="background:#17312d; color:#e7f2e9; padding:14px 18px; border-radius:10px; font-size:13px;"><code>United States Monthly Periodic Rate: r_m = R / 12</code></pre>
        <p>Standard level-payment amortization over <code>n = Years × 12</code> monthly periods uses:</p>
        <pre style="background:#17312d; color:#e7f2e9; padding:14px 18px; border-radius:10px; font-size:13px;"><code>M = P × [ r_m × (1 + r_m)^n ] / [ (1 + r_m)^n - 1 ]</code></pre>

        <h2 style="font-family:Georgia,serif; font-size:24px; margin:28px 0 10px;">2. Underwriting Qualification: OSFI B-20 Stress Test &amp; US DTI</h2>
        <p>In Canada mode, NextMoveMath evaluates Gross Debt Service (GDS ≤ 39%) and Total Debt Service (TDS ≤ 44%) at the OSFI Guideline B-20 Minimum Qualifying Rate—the greater of 5.25% or the entered contract rate plus 2.00%, including property taxes, heating, and 50% of condominium strata fees.</p>
        <p>In United States mode, NextMoveMath evaluates Front-End Housing DTI (≤ 28% benchmark) and Back-End Total DTI (≤ 36%–43% benchmark) at the note rate, factoring in principal, interest, property taxes, heating/insurance estimates, HOA dues, and estimated Private Mortgage Insurance (PMI) when down payment is below 20%.</p>

        <h2 style="font-family:Georgia,serif; font-size:24px; margin:28px 0 10px;">3. Net Sale Proceeds, 5-Year Equity Horizon &amp; Rental HELOC Simulation</h2>
        <p>Selling net proceeds deduct existing mortgage principal, real estate brokerage commissions, applicable Canadian GST/HST on commissions, mortgage prepayment penalties, legal discharge costs, staging/repairs, and moving expenses. Our 60-month horizon computes exact remaining loan balance after 60 scheduled payments to isolate cumulative principal paid from interest cost. Revolving HELOC simulations model monthly simple interest (<code>Balance × R / 12</code>) and track principal reduction whenever planned monthly payments exceed interest-only minimums.</p>

        <h2 style="font-family:Georgia,serif; font-size:24px; margin:28px 0 10px;">4. Primary Regulatory Sources</h2>
        <ul>
          <li>Office of the Superintendent of Financial Institutions (OSFI) — Guideline B-20 Residential Mortgage Underwriting Practices and Procedures.</li>
          <li>Department of Justice Canada — Interest Act (R.S.C., 1985, c. I-15), Section 6.</li>
          <li>Canada Mortgage and Housing Corporation (CMHC) — Homeowner Mortgage Loan Insurance Premium Schedule &amp; Debt Service Rules.</li>
          <li>Consumer Financial Protection Bureau (CFPB) — Ability-to-Repay and Qualified Mortgage Standards (Truth in Lending Act / Regulation Z).</li>
          <li>Fannie Mae Single-Family Selling Guide — B3-6-02 Debt-to-Income Ratios &amp; Homeowners Protection Act PMI Termination Rules.</li>
        </ul>
        <p style="margin-top:24px;"><a href="/" style="color:#2e7450; font-weight:bold;">→ Test These Formulas in the Interactive Calculator</a> | <a href="/guides" style="color:#17312d; font-weight:bold;">Read Worked Math Guides</a></p>
      </article>`,
  });

  // 4. About (/about)
  pages.push({
    route: "/about",
    title: "About NextMoveMath — Independent Real Estate Math Platform",
    description:
      "Learn why NextMoveMath was built to give Canadian and US homebuyers transparent, ad-supported moving math with zero lead-gen spam or lender bias.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About NextMoveMath",
      url: `${SITE_URL}/about`,
      description:
        "Independent North American residential real estate math calculator and educational library built for complete financial clarity.",
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>About NextMoveMath</span>
      </nav>
      <article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
        <h1 style="font-family:Georgia,serif; font-size:36px; margin:0 0 14px;">Why We Built NextMoveMath</h1>
        <p style="font-size:17px; color:#3e534c; margin:0 0 20px;">
          Most online mortgage calculators were designed as lead-capture funnels for banks and brokerages. They highlight an optimistic Principal-and-Interest number on a single property while hiding the friction costs that determine whether a move actually works in real life.
        </p>
        <h2 style="font-family:Georgia,serif; font-size:24px; margin:24px 0 10px;">Connecting Both Sides of a Real Estate Move</h2>
        <p>When families upsize, downsize, relocate, or keep a starter property as a rental, two transactions collide on the same balance sheet. You have to know what your current home truly nets after realtor fees, taxes on commission, legal discharges, and mortgage break penalties—and how that exact net cheque flows into your next down payment, buyer closing taxes, and stress-tested monthly budget.</p>
        <p>NextMoveMath brings every one of those variables onto a single transparent worksheet with instant toggle support for both Canadian (CAD, semi-annual compounding, OSFI +2% stress test, 65% HELOC LTV rules) and United States (USD, monthly compounding, Front/Back DTI, PMI) conventions.</p>

        <h2 style="font-family:Georgia,serif; font-size:24px; margin:24px 0 10px;">100% Client-Side Privacy &amp; Editorial Independence</h2>
        <ul>
          <li><strong>No Registration Gates or Phone Spam:</strong> Every number you type into NextMoveMath stays inside your browser session. We never lock your results behind an email or phone number form.</li>
          <li><strong>Unbiased Mathematical Modeling:</strong> No bank, brokerage, or mortgage lender can pay to alter our formulas, comfort-zone thresholds, or educational guides.</li>
          <li><strong>Plain-English Financial Literacy:</strong> Every technical ratio—from GDS/TDS to Interest Rate Differentials—is explained with worked dollar tables in our <a href="/guides" style="color:#2e7450; font-weight:bold;">Educational Guides Library</a>.</li>
        </ul>
        <p style="margin-top:24px;"><a href="/" style="color:#2e7450; font-weight:bold;">→ Launch the NextMoveMath Calculator</a> | <a href="/contact" style="color:#17312d; font-weight:bold;">Contact Our Team</a></p>
      </article>`,
  });

  // 5. Contact (/contact)
  pages.push({
    route: "/contact",
    title: "Contact & Editorial Support | NextMoveMath",
    description:
      "Questions about a mortgage formula, regional tax rule, or editorial guide? Contact the NextMoveMath team directly.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact NextMoveMath",
      url: `${SITE_URL}/contact`,
      description: "Direct editorial feedback, formula verification inquiries, and support contact details for NextMoveMath.",
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>Contact</span>
      </nav>
      <article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
        <h1 style="font-family:Georgia,serif; font-size:36px; margin:0 0 14px;">Contact &amp; Editorial Inquiries</h1>
        <p style="font-size:17px; color:#3e534c; margin:0 0 22px;">
          Have a question about how a calculation works, spotted a provincial or state transfer-tax update, or want to suggest a new moving scenario for our calculator? We welcome reader feedback.
        </p>
        <div style="background:#f4efe5; border-radius:14px; padding:22px 24px; margin-bottom:24px;">
          <h2 style="font-family:Georgia,serif; font-size:22px; margin:0 0 8px;">Direct Email Support</h2>
          <p style="margin:0 0 8px;"><strong>General &amp; Calculation Feedback:</strong> <a href="mailto:coled0527@gmail.com" style="color:#2e7450; font-weight:bold;">coled0527@gmail.com</a></p>
          <p style="margin:0; font-size:14px; color:#4b6058;">Typical response window: 1 to 2 business days (Monday – Friday, North America).</p>
        </div>
        <h2 style="font-family:Georgia,serif; font-size:22px; margin:20px 0 8px;">Important Scope Reminder</h2>
        <p>NextMoveMath is an independent educational software publisher, not a licensed mortgage brokerage, law firm, or tax accounting practice. While we are always happy to clarify our mathematical formulas and published guides, we cannot provide individualized mortgage underwriting approvals, legal closing opinions, or personal tax advice.</p>
        <p style="margin-top:20px;"><a href="/" style="color:#2e7450; font-weight:bold;">← Return to Interactive Calculator</a> | <a href="/methodology" style="color:#17312d; font-weight:bold;">Review Calculation Methodology</a></p>
      </article>`,
  });

  // 6. Privacy Policy (/privacy-policy)
  pages.push({
    route: "/privacy-policy",
    title: "Privacy Policy & Cookie Disclosure | NextMoveMath",
    description:
      "Read the NextMoveMath Privacy Policy, client-side calculation privacy guarantee, and Google AdSense DoubleClick cookie & opt-out disclosures.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy — NextMoveMath",
      url: `${SITE_URL}/privacy-policy`,
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>Privacy Policy</span>
      </nav>
      <article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
        <h1 style="font-family:Georgia,serif; font-size:34px; margin:0 0 8px;">Privacy Policy &amp; Advertising Cookie Disclosure</h1>
        <p style="font-size:13px; color:#60746d; margin:0 0 24px;">Effective &amp; Last Updated: October 2026</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">1. Zero Server Storage of Calculator Inputs</h2>
        <p>NextMoveMath (<code>https://nextmovemath.com</code>) performs all mortgage, home sale, closing cost, debt-to-income, and rental cash-flow calculations locally inside your web browser. Financial figures you type into our calculator fields (such as home prices, mortgage balances, household income, or debts) are never transmitted to or stored in any NextMoveMath database.</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">2. Google AdSense &amp; Third-Party Advertising Cookies</h2>
        <p>To keep NextMoveMath free for consumers without registration walls, we use Google AdSense to display advertisements. Please note the following required disclosures regarding how Google and third-party vendors use cookies:</p>
        <ul>
          <li>Third-party vendors, including Google, use cookies (such as the DoubleClick / advertising cookie) to serve ads based on a user's prior visits to NextMoveMath or other websites on the internet.</li>
          <li>Google's use of advertising cookies enables Google and its partners to serve advertisements to our users based on their visit to NextMoveMath and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank" style="color:#2e7450; font-weight:bold;">Google Ads Settings</a>. Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank" style="color:#2e7450; font-weight:bold;">www.aboutads.info/choices</a> or <a href="https://youradchoices.ca/" rel="noopener noreferrer" target="_blank" style="color:#2e7450; font-weight:bold;">youradchoices.ca</a>.</li>
          <li>Learn more about how Google manages data in its advertising products at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank" style="color:#2e7450; font-weight:bold;">How Google uses information from sites or apps that use our services</a>.</li>
        </ul>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">3. Standard Server Logs &amp; Voluntary Contact</h2>
        <p>Like all web hosting providers, our infrastructure records standard non-identifying HTTP request metadata (browser user-agent, anonymised IP/region, and requested URL) strictly for security, uptime, and aggregate performance diagnostics. If you voluntarily email our support address, we use your email address solely to reply to your inquiry and never sell or rent contact details to third parties.</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">4. Regional Privacy Rights (PIPEDA, CCPA/CPRA &amp; GDPR/EEA)</h2>
        <p>Canadian residents (PIPEDA), California/US state residents (CCPA/CPRA), and EEA/UK visitors may manage browser cookie preferences or contact us at <a href="mailto:coled0527@gmail.com" style="color:#2e7450; font-weight:bold;">coled0527@gmail.com</a> regarding any privacy questions.</p>
        <p style="margin-top:24px;"><a href="/terms-of-service" style="color:#2e7450; font-weight:bold;">Read Terms of Service →</a> | <a href="/" style="color:#17312d; font-weight:bold;">Return to Calculator</a></p>
      </article>`,
  });

  // 7. Terms of Service (/terms-of-service)
  pages.push({
    route: "/terms-of-service",
    title: "Terms of Service & Planning Disclaimers | NextMoveMath",
    description:
      "Review the NextMoveMath Terms of Service, educational planning disclaimers, and regional real estate calculation accuracy terms.",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service — NextMoveMath",
      url: `${SITE_URL}/terms-of-service`,
    },
    bodyHtml: `
      <nav aria-label="Breadcrumb" style="font-size:13px; color:#60746d; margin-bottom:20px;">
        <a href="/" style="color:#60746d;">Home</a> / <span>Terms of Service</span>
      </nav>
      <article style="background:#fff; border:1px solid rgba(23,49,45,0.15); border-radius:20px; padding:36px 32px;">
        <h1 style="font-family:Georgia,serif; font-size:34px; margin:0 0 8px;">Terms of Service &amp; Financial Planning Disclaimers</h1>
        <p style="font-size:13px; color:#60746d; margin:0 0 24px;">Effective &amp; Last Updated: October 2026</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">1. Educational &amp; Planning Purpose Only (No Professional Advice)</h2>
        <p>NextMoveMath provides interactive mathematical simulations and educational real estate guides strictly for general informational and consumer planning purposes. Nothing on NextMoveMath constitutes a mortgage pre-approval, lending commitment, financial planning advice, legal opinion, or tax accounting advice. Always verify exact figures with a licensed mortgage professional, real estate lawyer/notary, or certified accountant before signing binding real estate contracts.</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">2. Regional Variations &amp; Estimation Assumptions</h2>
        <p>Real estate transfer taxes, municipal levies, high-ratio mortgage insurance premiums, lender IRD prepayment formulas, property tax adjustments, and underwriting rules change periodically across provinces, states, and municipalities. Users are responsible for reviewing and customizing editable calculator inputs to reflect their specific jurisdiction and lender terms.</p>

        <h2 style="font-family:Georgia,serif; font-size:22px; margin:22px 0 8px;">3. Limitation of Liability &amp; Intellectual Property</h2>
        <p>NextMoveMath is provided on an "as-is" and "as-available" basis without warranties of any kind. NextMoveMath and its creators shall not be liable for any financial decisions, transaction costs, or damages arising from reliance on estimates generated by this website. All original source code, design layouts, and written editorial guides on NextMoveMath are protected by copyright.</p>
        <p style="margin-top:24px;"><a href="/privacy-policy" style="color:#2e7450; font-weight:bold;">Read Privacy Policy →</a> | <a href="/" style="color:#17312d; font-weight:bold;">Return to Calculator</a></p>
      </article>`,
  });

  return pages;
}

function generatePageHtml(templateHtml, page) {
  const canonicalUrl = `${SITE_URL}${page.route}`;
  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  // Replace canonical link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(page.ogType)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
  );

  // Replace JSON-LD structured data script
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${JSON.stringify(page.jsonLd, null, 2)}\n    </script>`
  );

  // Replace <div id="root">...</div> inner static HTML (Vite hoists module scripts into <head>, leaving </div> right before </body>)
  const shellHtml = renderSiteShell(page.route, page.bodyHtml);
  const rootRegex = /<div id="root">[\s\S]*<\/div>\s*(?=<\/body>|<script)/i;
  if (!rootRegex.test(html)) {
    throw new Error(`Failed to locate <div id="root">...</div> container while prerendering ${page.route}`);
  }
  html = html.replace(rootRegex, `<div id="root">${shellHtml}\n    </div>\n  `);

  return html;
}

function run() {
  const indexHtmlPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`dist/index.html not found at ${indexHtmlPath}. Run 'vite build' first.`);
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, "utf8");
  const pages = buildPageDefinitions();

  for (const page of pages) {
    const relativeDir = page.route.replace(/^\/+/, "");
    const outDir = path.join(DIST_DIR, relativeDir);
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "index.html");
    const pageHtml = generatePageHtml(templateHtml, page);
    fs.writeFileSync(outFile, pageHtml, "utf8");
  }

  console.log(`Prerendered ${pages.length} standalone static HTML pages (+ root index.html = ${pages.length + 1} total crawlable pages).`);
}

run();
