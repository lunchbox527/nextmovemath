export const GUIDE_ARTICLES = [
  {
    slug: "canadian-mortgage-stress-test",
    title: "The Canadian Mortgage Stress Test Explained: OSFI B-20 Rules, GDS/TDS Ratios & Real Qualifying Math",
    seoTitle: "Canadian Mortgage Stress Test Guide (+2% OSFI Math) | NextMoveMath",
    metaDescription: "Learn how Canada's OSFI B-20 mortgage stress test works, how the +2% qualifying buffer affects GDS and TDS ratios, and see worked income examples.",
    category: "Mortgage Qualification",
    badge: "Canada Guide",
    readTime: "9 min read",
    updatedDate: "October 2026",
    jurisdiction: "CA",
    calculatorMode: "buy",
    summary: "Canadian federally regulated lenders do not qualify your mortgage using the actual contract interest rate you pay each month. Instead, underwriters test your household income against a higher Minimum Qualifying Rate so you have a built-in financial buffer if rates rise at renewal.",
    keyTakeaways: [
      "Federally regulated Canadian lenders qualify borrowers at the higher of 5.25% or your contract mortgage rate plus 2.00%.",
      "Your actual monthly bank withdrawal is still calculated at your lower contract rate—the stress test only governs approval size.",
      "Standard underwriting caps Gross Debt Service (GDS) around 39% and Total Debt Service (TDS) around 44% of gross pre-tax household income.",
      "Eliminating fixed monthly car or loan payments often boosts maximum mortgage qualification far faster than saving extra cash."
    ],
    sections: [
      {
        heading: "1. What Is the Canadian Mortgage Stress Test and Why Does It Exist?",
        paragraphs: [
          "When Canadian homebuyers sit down with a bank or mortgage broker, the single biggest surprise is discovering a gap between the monthly payment they feel comfortable paying and the maximum purchase price the bank will approve. That gap is driven almost entirely by Guideline B-20, enforced by the Office of the Superintendent of Financial Institutions (OSFI) for uninsured mortgages and mirrored by the Department of Finance for insured high-ratio mortgages.",
          "Because most Canadian mortgages carry a 1-year to 5-year interest rate term amortized over 25 or 30 years, homeowners must renegotiate their interest rate several times before the loan is paid off. If a household stretched its budget to the absolute limit when rates were 4.49% and rates rose to 6.49% five years later, a wave of forced sales could destabilize households and the broader housing system. The stress test forces lenders to verify today—before funding the loan—that your gross household income could absorb that 2.00% jump.",
          "Critically, the stress test does not increase the payment taken from your chequing account after closing. If your signed mortgage commitment states a 4.79% 5-year fixed rate, your real monthly payment is calculated at 4.79% compounded semi-annually. The 6.79% qualifying rate exists strictly inside the underwriter's approval worksheet."
        ],
        formula: "Minimum Qualifying Rate (MQR) = max( 5.25%, Contract Interest Rate + 2.00% )",
        callout: {
          title: "Plain-English Example of the +2.00% Buffer",
          body: "Suppose a lender offers you a 4.69% five-year fixed rate. Since 4.69% + 2.00% equals 6.69%—which is higher than the 5.25% floor—the underwriter calculates a hypothetical payment at 6.69% to decide whether your household income qualifies."
        }
      },
      {
        heading: "2. How Gross Debt Service (GDS) and Total Debt Service (TDS) Work",
        paragraphs: [
          "Once the lender determines your stress-tested monthly mortgage payment, it plugs that figure into two debt-to-income formulas: Gross Debt Service (GDS) and Total Debt Service (TDS). Understanding every component inside the numerator prevents last-minute surprises when you make an offer on a condo, townhouse, or detached home.",
          "Gross Debt Service measures pure shelter carrying costs divided by gross pre-tax household income. Underwriters add together your stress-tested principal and interest payment, annual municipal property taxes, an estimated monthly heating charge (often standardized between $100 and $175 per month depending on square footage), and exactly 50% of monthly strata or condominium maintenance fees. For strong-credit borrowers, insured mortgages strictly cap GDS at 39%.",
          "Total Debt Service takes every dollar inside GDS and adds all outside monthly debt obligations: vehicle loans or leases, minimum credit card requirements (typically calculated at 3% of any revolving balance carried on your credit bureau), lines of credit, student loan payments, and support obligations. Standard underwriting caps TDS at 44% of gross household income."
        ],
        bullets: [
          "GDS Limit (Shelter Only): Stress-tested mortgage payment + property tax + heating + 50% of condo fees divided by gross monthly income (standard cap: 39%).",
          "TDS Limit (All Debt): Shelter costs plus car payments, student loans, credit card minimums, and personal credit lines divided by gross monthly income (standard cap: 44%).",
          "Condo Fee Impact: Every $500/month in strata fees adds $250/month to your qualifying shelter numerator, reducing borrowing power by roughly $35,000 to $42,000."
        ]
      },
      {
        heading: "3. Worked Numerical Comparison: $600,000 Mortgage at 4.89% vs. 6.89%",
        paragraphs: [
          "To see how much purchasing power the stress test removes in practice, consider a move-up couple buying a $750,000 property with a 20% down payment ($150,000), leaving a $600,000 uninsured mortgage amortized over 25 years. Property taxes are $4,200 per year ($350/month), heating is $125/month, and the household has no car loans or condo fees.",
          "Using Canadian semi-annual compounding, the table below compares the real out-of-pocket monthly budget against the stress-tested numbers the bank requires to approve the file."
        ],
        table: {
          caption: "25-Year Amortization on $600,000 Principal (Semi-Annual Compounding)",
          headers: ["Calculation Metric", "Real Budget (4.89% Contract)", "Underwriter Test (6.89% MQR)", "Qualifying Impact"],
          rows: [
            ["Monthly Principal & Interest", "$3,452 / mo", "$4,161 / mo", "+$709 / mo buffer"],
            ["Property Tax + Heating", "$475 / mo", "$475 / mo", "Unchanged"],
            ["Total Shelter Cost (GDS Numerator)", "$3,927 / mo", "$4,636 / mo", "+$709 / mo tested"],
            ["Income Needed at 39% GDS", "$120,831 / yr", "$142,646 / yr", "+$21,815 / yr required"]
          ]
        }
      },
      {
        heading: "4. Practical Ways Borrowers Improve Stress-Test Qualification",
        paragraphs: [
          "When your household numbers land slightly above the 39% GDS or 44% TDS boundary, understanding the math gives you clear levers to pull before submitting a formal application. Small structural adjustments to debt or amortization often bridge a $30,000 to $75,000 qualification gap without requiring a higher salary.",
          "First, evaluate high-payment, low-balance installment loans. If you owe $9,000 left on a car loan that charges $550 every month, using $9,000 of cash savings to clear that loan eliminates $550 per month from your TDS numerator. At a 6.79% qualifying rate, freeing $550 per month in debt service restores roughly $80,000 in mortgage qualification—far more than $9,000 added directly to your down payment would accomplish.",
          "Second, borrowers putting 20% or more down (or eligible first-time buyers purchasing qualifying homes under current insured 30-year rules) can compare a 30-year amortization against a 25-year amortization. Extending amortization lowers the mandatory monthly payment used inside the stress test, though borrowers can still use voluntary prepayment privileges to pay the loan off on a 25-year schedule."
        ]
      }
    ],
    faqs: [
      {
        q: "Does the stress test apply when renewing my mortgage with the same lender?",
        a: "No. If you renew an existing mortgage with your current federally regulated lender without increasing the loan balance or amortization, you do not have to re-qualify under the stress test. In addition, recent regulatory updates have eased straight-switch stress-test barriers for uninsured borrowers moving between federally regulated lenders at renewal when loan amount and remaining amortization stay unchanged."
      },
      {
        q: "Do provincially regulated credit unions use the exact same stress test?",
        a: "Many credit unions follow OSFI B-20 as a baseline best practice, especially on insured mortgages where federal insurer rules apply. However, on uninsured conventional mortgages with 20% or more down, certain provincially regulated credit unions offer specialized products qualified closer to the contract rate, often at a slightly higher interest rate."
      }
    ]
  },
  {
    slug: "us-dti-mortgage-qualifying",
    title: "US Mortgage Debt-to-Income (DTI) Qualifying Guide: 28/36 Benchmarks, PITI & Reserve Math",
    seoTitle: "US Mortgage DTI Ratio Guide (28/36 & PITI Math) | NextMoveMath",
    metaDescription: "Understand how US mortgage lenders calculate Front-End and Back-End Debt-to-Income (DTI) ratios, PITI escrow payments, PMI, and conforming loan limits.",
    category: "Mortgage Qualification",
    badge: "US Guide",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "US",
    calculatorMode: "buy",
    summary: "Unlike Canada's +2% interest rate buffer, US conventional and government-backed lenders qualify borrowers at the actual note rate—but enforce strict Front-End (PITI) and Back-End Debt-to-Income (DTI) ratios alongside monthly tax, insurance, PMI, and HOA escrow accounting.",
    keyTakeaways: [
      "US mortgages compound monthly and are underwritten at your actual contract note rate for fixed-rate loans.",
      "The classic 28/36 rule targets 28% or less of gross income on total PITI housing payments and 36% or less on combined monthly debts.",
      "Automated underwriting systems (Desktop Underwriter and Loan Product Advisor) can approve Back-End DTIs up to 43%–45%+ for borrowers with strong credit scores and cash reserves.",
      "Every dollar of HOA dues, county property taxes, homeowners insurance, and Private Mortgage Insurance (PMI) counts directly against your Front-End and Back-End DTI."
    ],
    sections: [
      {
        heading: "1. Front-End Ratio vs. Back-End DTI in US Underwriting",
        paragraphs: [
          "When applying for a residential mortgage in the United States, loan officers and automated underwriting engines evaluate repayment capacity by comparing your verifiable gross monthly income (before federal, state, FICA taxes, or 401(k) deferrals) against your recurring monthly obligations. Two distinct percentages frame every conversation: the Front-End housing ratio and the Back-End total debt-to-income ratio.",
          "The Front-End ratio divides your complete proposed monthly housing payment—known across the industry as PITI (Principal, Interest, Taxes, and Insurance, plus any Homeowners Association dues and Private Mortgage Insurance)—by your gross monthly income. Traditional financial planning benchmarks treat 28% as the gold-standard ceiling where homeowners maintain healthy room for retirement contributions, maintenance, and emergencies.",
          "The Back-End DTI ratio takes your entire PITI housing payment and adds every recurring debt reporting on your Equifax, Experian, and TransUnion credit files: auto loans, federal or private student loan payments, minimum credit card payments, personal installment loans, child support, or co-signed obligations. Utility bills, cell phone plans, health insurance premiums, and groceries are excluded from DTI—which is why passing a lender's 43% Back-End limit can still feel uncomfortably tight in real life if you do not model your household comfort zone separately."
        ],
        formula: "Back-End DTI (%) = ( Monthly PITI + HOA + PMI + Recurring Credit Report Debts ) / Gross Monthly Income × 100"
      },
      {
        heading: "2. Why PITI Escrow Components Change Borrowing Power Dramatically by State",
        paragraphs: [
          "Many online mortgage widgets show only principal and interest, leaving buyers shocked when a Loan Estimate arrives $650 to $1,100 per month higher. In the US, lenders typically collect 1/12th of your annual county/school property tax bill and 1/12th of your hazard/homeowners insurance premium inside an escrow impound account with every monthly payment.",
          "Because property tax mill rates and homeowners insurance premiums vary enormously by state and county, the exact same $500,000 purchase price produces vastly different DTI ratios depending on location. A $500,000 home in a low-tax county with $3,000 annual taxes and $1,400 insurance adds $367/month to PITI, whereas a $500,000 home in a high-tax or coastal windstorm zone with $10,800 property taxes and $4,200 insurance adds $1,250/month—requiring roughly $29,000 more annual income to hit the same DTI target."
        ],
        table: {
          caption: "Sample US DTI Breakdown: $500,000 Purchase, 10% Down ($450,000 30-Yr Fixed at 6.25%)",
          headers: ["Monthly Expense Item", "Low-Tax County Scenario", "High-Tax / HOA Scenario"],
          rows: [
            ["Principal & Interest (Monthly Compounding)", "$2,771 / mo", "$2,771 / mo"],
            ["County Property Taxes (Escrow)", "$275 / mo", "$850 / mo"],
            ["Homeowners Insurance + 0.45% PMI", "$310 / mo", "$520 / mo"],
            ["HOA / Condo Association Dues", "$0 / mo", "$325 / mo"],
            ["Total Monthly Housing Payment (PITI+)", "$3,356 / mo", "$4,466 / mo"],
            ["Gross Income Needed for 28% Front-End DTI", "$143,829 / yr", "$191,400 / yr"]
          ]
        }
      },
      {
        heading: "3. Conventional vs. FHA vs. Jumbo DTI Guidelines",
        paragraphs: [
          "Different US loan programs weigh DTI thresholds alongside compensating factors such as FICO credit score, loan-to-value (LTV) ratio, and post-closing liquid reserves (checking, savings, brokerage, and vested retirement balances).",
          "Conventional conforming loans backed by Fannie Mae and Freddie Mac traditionally cite 28%/36% for manually underwritten files, while automated approvals routinely stretch up to 43%–45% (and occasionally up to 49.9% for borrowers with high credit scores and low LTV). FHA loans insured by the Federal Housing Administration use benchmark ratios of 31% Front-End and 43% Back-End, with automated allowances higher when strong compensating factors exist, though FHA requires both an upfront and ongoing Mortgage Insurance Premium (MIP). Portfolio Jumbo loans above county conforming limits are held on bank balance sheets and typically enforce stricter 38%–43% Back-End caps plus 6 to 12 months of liquid PITI reserves."
        ],
        bullets: [
          "Private Mortgage Insurance (PMI): Required on conventional loans when down payment is below 20%; automatically terminates at 78% LTV (or by borrower request at 80% LTV).",
          "Student Loan Calculation Rules: If loans are in income-driven repayment or deferment, lenders either use the documented payment on your statement or impute 0.5% to 1.0% of the outstanding loan balance per month depending on agency rules.",
          "Credit Card Payoffs vs. Paydowns: Paying down revolving credit utilization below 10% boosts FICO score tiers (lowering your interest rate and PMI pricing) while trimming minimum monthly debt obligations."
        ]
      }
    ],
    faqs: [
      {
        q: "Does paying off a car loan with 8 months remaining help my US DTI ratio?",
        a: "Under many conventional guidelines, installment debts with 10 or fewer monthly payments remaining can sometimes be excluded by the underwriter if the payment does not impair your ability to handle early housing expenses—verify with your loan officer before depleting cash needed for closing reserves."
      },
      {
        q: "Are closing costs rolled into a US purchase mortgage?",
        a: "Generally no—buyer closing costs (origination, appraisal, title insurance, escrow prepaids, and recording taxes) are paid in cash at the settlement table, unless offset by negotiated seller concessions or lender rate credits."
      }
    ]
  },
  {
    slug: "quiet-closing-costs",
    title: "Quiet Closing Costs Itemized: Land Transfer Taxes, Legal Disbursements & Statement of Adjustments",
    seoTitle: "Quiet Home Closing Costs Guide (Taxes & Legal) | NextMoveMath",
    metaDescription: "Budgeting only for your down payment leaves a dangerous cash gap. Itemize land transfer taxes, title insurance, legal fees, and closing-day adjustments.",
    category: "Home Buying Strategy",
    badge: "Cash Planning",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "buy",
    summary: "First-time and repeat buyers alike often focus 100% of their savings goal on the down payment—only to discover one week before closing that government transfer taxes, title insurance, legal disbursements, and seller tax adjustments require another 1.5% to 4.0% in certified liquid funds.",
    keyTakeaways: [
      "Closing costs cannot usually be added to your purchase mortgage; they must be paid in liquid cash alongside the balance of your down payment.",
      "Provincial, state, and municipal transfer taxes make up the single largest variable cost, ranging from $1,500 in low-fee regions to over $30,000 in dual-tax cities like Toronto.",
      "The Statement of Adjustments reimburses the seller for prepaid property taxes, strata/HOA dues, or heating fuel covering days after you take possession.",
      "Holding an extra 2.5% to 3.5% cash buffer above your target down payment keeps closing week completely stress-free."
    ],
    sections: [
      {
        heading: "1. Why Closing Cash Required Is Always Higher Than Your Down Payment",
        paragraphs: [
          "Suppose you plan to purchase an $800,000 home with a 10% down payment ($80,000). You diligently save $81,500 in a high-interest savings account, sign a purchase agreement, and deliver a $40,000 earnest deposit to the brokerage trust account. Three days before possession, your real estate lawyer or escrow settlement agent emails the final Trust Ledger Statement requesting $58,400 instead of the remaining $40,000 down payment.",
          "Where did the extra $18,400 come from? Those are the 'quiet closing costs'—mandatory government levies, legal registration charges, tax prorations, and insurance policies that trigger on transfer of title. Because mortgage lenders advance funds strictly based on the lesser of the purchase price or appraised value minus your down payment, every dollar of closing costs must come out of your own pocket."
        ],
        callout: {
          title: "Safe Cash-to-Close Planning Benchmark",
          body: "Budget 1.5% of the purchase price in low-transfer-tax regions (such as Alberta or no-transfer-tax US states) and 2.5% to 4.0% in tiered transfer tax jurisdictions (such as British Columbia, Ontario, Toronto, New York, Washington, or Pennsylvania)."
        }
      },
      {
        heading: "2. Provincial, State & Municipal Land Transfer Taxes Explained",
        paragraphs: [
          "In most North American markets, government transfer taxes represent 60% to 80% of total buyer closing expenses. Unlike property taxes—which are billed annually by your city—land transfer tax (also called Property Transfer Tax in British Columbia, Welcome Tax / Droits de mutation in Quebec, or Deed Transfer / Recording Tax in the United States) is a one-time marginal tax due the moment title registers in your name.",
          "Most jurisdictions calculate transfer tax using progressive brackets rather than a flat rate. In British Columbia, buyers pay 1% on the first $200,000, 2% on the slice from $200,000 to $2,000,000, and 3% above $2,000,000. In Ontario, marginal tiers step from 0.5% up to 2.0% up to $2,000,000 (and 2.5% above $2,000,000)—and buyers within the City of Toronto pay an identical municipal land transfer tax on top of the provincial schedule. By contrast, provinces like Alberta and Saskatchewan skip percentage transfer taxes entirely, charging modest Land Titles registration fees based on property value and mortgage size."
        ],
        table: {
          caption: "Illustrative Closing Cost Comparison on an $800,000 Resale Home (Non-First-Time Buyer)",
          headers: ["Closing Cost Category", "Alberta (Title Fee Model)", "BC (PTT Model)", "Toronto, ON (Dual LTT)", "Typical US Escrow"],
          rows: [
            ["Transfer / Recording Tax", "~$720", "$14,000", "$24,950", "$2,500 – $8,000"],
            ["Legal / Escrow & Title Insurance", "$1,650", "$1,850", "$2,100", "$2,800 – $4,500"],
            ["Inspection & Appraisal", "$850", "$850", "$850", "$1,050"],
            ["Tax & Prepaid Adjustments", "$1,200", "$1,200", "$1,200", "$3,200 (Escrow Prepaids)"],
            ["Estimated Cash Above Down Payment", "~$4,420", "~$17,900", "~$29,100", "~$9,550 – $16,750"]
          ]
        }
      },
      {
        heading: "3. Legal Fees, Title Insurance, and the Statement of Adjustments",
        paragraphs: [
          "Beyond transfer taxes, three recurring line items appear on nearly every real estate settlement sheet. First, legal fees and disbursements (or US title/escrow settlement and lender origination charges) cover historical title examination, tax certificate verification, discharging prior encumbrances, registering the new mortgage charge, and wiring trust funds.",
          "Second, lender and owner title insurance policies protect against hidden title defects, survey encroachments, unpaid prior municipal utility liens, and real estate title fraud for a one-time premium typically ranging from $300 to $650 in Canada (and $1,000 to $2,500+ in US regulated title-rate states).",
          "Third, the Statement of Adjustments settles calendar fairness between buyer and seller. If you take possession on August 1 and the seller already paid the municipality $4,800 for the entire January–December tax year, your lawyer credits the seller for the five months (August through December) that you will live in the property—adding roughly $2,000 to the certified bank draft you bring to closing."
        ],
        bullets: [
          "Sales Tax on High-Ratio Insurance (ON, QC, SK): While CMHC/Sagen mortgage insurance premiums are added to your loan, Ontario (8%), Quebec (9%), and Saskatchewan (6%) charge non-financeable provincial sales tax on that premium in cash at closing.",
          "Newly Built Homes: Pre-construction and brand-new homes frequently carry GST/HST (net of rebates), builder tarion/warranty enrollment fees, utility meter installation fees, and driveway/landscaping levies.",
          "Immediate Move-In Liquidity: Always budget separately for locksmith re-keying, movers, mail forwarding, utility deposits, and immediate safety repairs."
        ]
      }
    ],
    faqs: [
      {
        q: "Can first-time home buyers get an exemption from Land Transfer Tax?",
        a: "Yes, many provinces and municipalities offer partial or full rebates for eligible first-time buyers who have never owned a home anywhere in the world. Ontario rebates up to $4,000 provincially (plus up to $4,475 municipally in Toronto), and BC offers First-Time Home Buyers' exemptions up to statutory fair-market-value thresholds."
      },
      {
        q: "When do I hand over the money for closing costs?",
        a: "Inspection and appraisal fees are paid upfront during your condition window. All remaining closing costs (transfer tax, legal fees, title insurance, and adjustments) are combined with the remainder of your down payment into a single bank draft or wire transfer delivered to your lawyer or escrow officer 1 to 3 business days before closing."
      }
    ]
  },
  {
    slug: "mortgage-porting-vs-breaking",
    title: "Mortgage Porting vs. Breaking Early: IRD Penalties, 3-Month Interest & Blend-and-Extend Math",
    seoTitle: "Mortgage Porting vs Prepayment Penalty Math | NextMoveMath",
    metaDescription: "Selling mid-term? Compare fixed-rate IRD prepayment penalties against 3-month interest, mortgage porting windows, and blend-and-extend rate calculations.",
    category: "Selling & Moving Math",
    badge: "Penalty Math",
    readTime: "9 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "move",
    summary: "Nearly six out of ten five-year mortgages are modified, refinanced, or paid off before maturity. Understanding how lenders calculate early payout penalties—and how porting or blend-and-extend structures work—can preserve $8,000 to $25,000+ of your home equity when moving.",
    keyTakeaways: [
      "Variable-rate closed mortgages in Canada typically charge a predictable penalty equal to 3 months of simple interest on the remaining balance.",
      "Fixed-rate closed mortgages charge the GREATER of 3 months' interest or the Interest Rate Differential (IRD), which can exceed 3%–4.5% of your balance when rates fall.",
      "Porting transfers your existing mortgage balance, rate, and remaining term onto your replacement property without triggering a break penalty.",
      "Most US 30-year conventional conforming residential mortgages carry zero prepayment penalty, making refinancing or selling mid-term far simpler south of the border."
    ],
    sections: [
      {
        heading: "1. Why Fixed-Rate Prepayment Penalties Catch Sellers Off Guard",
        paragraphs: [
          "In the United States, standard agency-backed residential mortgages (Fannie Mae, Freddie Mac, FHA, and VA) prohibit prepayment penalties, allowing homeowners to sell or refinance whenever market conditions suit them. In Canada, however, nearly all standard residential mortgages are 'closed' contracts for 3 to 5 years. Paying out a closed mortgage early—including when selling your house—triggers a contractual prepayment charge.",
          "If you hold a closed variable-rate mortgage, the math is straightforward: the lender charges three months of interest at your current contract rate. On a $480,000 balance at 5.00%, three months' interest equals roughly $6,000. While never fun to pay, it is predictable.",
          "Fixed-rate mortgages are where sellers encounter five-figure shocks. Fixed contracts charge the greater of three months' interest OR the Interest Rate Differential (IRD). When market interest rates drop below the rate you locked in—or when a major bank calculates IRD using its inflated 'posted rate discount' formula—the IRD attempts to compensate the bank for every dollar of interest spread it loses over the remaining months of your term."
        ],
        formula: "Standard Fair-Lender IRD ≈ Remaining Balance × ( Your Contract Rate − Current Comparable Term Rate ) × ( Months Remaining ÷ 12 )",
        callout: {
          title: "Posted-Rate IRD Warning at Big Banks",
          body: "Major chartered banks often compare your contract rate against today's posted rate for the remaining term minus your original discount off the 5-year posted rate. Because original 5-year posted discounts are often 1.50% to 2.00% wide, big-bank IRD penalties can run 2x to 3x higher than mono-line lender IRD penalties on the exact same balance."
        }
      },
      {
        heading: "2. How Mortgage Porting Works (Same Balance vs. Upsizing)",
        paragraphs: [
          "Most fixed-rate contracts—and select variable mortgages after converting to fixed—include a portability privilege. Porting lets you move the security of your existing mortgage from Property A (the home you are selling) to Property B (the home you are buying), keeping your original interest rate, principal balance, and maturity date intact with zero break penalty.",
          "If you are upsizing and need a larger mortgage than your current balance, lenders typically offer either a 'Port and Top-Up' (creating a second mortgage segment) or a 'Blend and Extend' / 'Blend to Term'. Under a weighted-average blend, your existing balance keeps the benefit of your old rate while the new money is priced at current market rates, producing a single combined rate and payment."
        ],
        table: {
          caption: "Worked Blend-and-Extend Example: Porting $400,000 at 3.49% + Adding $200,000 New Funds at 4.99%",
          headers: ["Loan Tranche", "Principal Amount", "Weight of Total Loan", "Interest Rate", "Weighted Contribution"],
          rows: [
            ["Existing Ported Balance", "$400,000", "66.67%", "3.49%", "2.327%"],
            ["New Top-Up Funds", "$200,000", "33.33%", "4.99%", "1.663%"],
            ["Combined Blended Mortgage", "$600,000", "100.00%", "3.99% (Approx.)", "Saves ~1.00% vs. full market rate"]
          ]
        }
      },
      {
        heading: "3.When Breaking Your Mortgage Actually Beats Porting",
        paragraphs: [
          "Porting is not automatically the winner every time you move. You must run a two-column comparison over the remaining months of your term. First, if your existing fixed rate is 5.89% with 24 months left and current market rates have fallen to 4.29%, porting locks that expensive 5.89% slice onto your new home! Depending on the exact IRD quote from your lender's payout statement, paying the penalty (or negotiating a blend with a competing lender's switch cashback) may cost less than overpaying 1.60% interest for two more years.",
          "Second, porting requires full re-qualification of both you (income, credit, stress test) and the new property (appraisal, property type, lender geographic lending zones). Furthermore, if you are downsizing and shrinking your mortgage balance beyond your annual 15%–20% lump-sum prepayment allowance, the lender will charge a pro-rata penalty on the portion of principal permanently paid down.",
          "Third, watch the porting window carefully. Lenders typically allow 30 to 90 days (occasionally 120 days) between your sale closing date and purchase closing date. If your sale closes first, your lawyer pays the full prepayment penalty out of sale proceeds at closing, and the lender refunds that penalty in cash once the new purchase mortgage funds inside the deadline."
        ]
      }
    ],
    faqs: [
      {
        q: "Can I use my annual 15% or 20% lump-sum prepayment privilege right before breaking a mortgage to reduce the penalty?",
        a: "At many lenders, making an eligible lump-sum prepayment several days before payout reduces the principal balance on which the penalty is calculated—though several contracts prohibit using prepayment privileges within 30 days of a full discharge. Always read your mortgage commitment's prepayment clause before sending funds."
      },
      {
        q: "Are variable-rate mortgages portable?",
        a: "Usually not directly as a variable rate. Most lenders require you to either pay the 3-month interest penalty and open a brand-new mortgage on the next home, or convert the variable mortgage into an eligible fixed-rate term prior to porting."
      }
    ]
  },
  {
    slug: "selling-and-buying-simultaneously",
    title: "Selling and Buying a Home Simultaneously: Net Proceeds, Deposit Timing & Bridge Loan Math",
    seoTitle: "Selling & Buying Simultaneously: Net Equity & Bridge Math | NextMoveMath",
    metaDescription: "Calculate real net proceeds after commission, taxes, and mortgage payout, and learn how short-term bridge financing works when closing dates don't match.",
    category: "Selling & Moving Math",
    badge: "Move-Up Playbook",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "move",
    summary: "Move-up and downsizing homeowners face two interconnected math problems: calculating the exact net cash left after every selling deduction, and bridging the calendar gap when your purchase possession date arrives before your sale money clears.",
    keyTakeaways: [
      "Paper home equity (Home Value minus Mortgage Balance) typically overstates real spendable cash by $25,000 to $60,000+ once commission, sales tax on commission, legal fees, and penalties are deducted.",
      "In Canada, GST/HST applies on top of real estate commissions—meaning a 5% commission in a 13% HST province actually deducts 5.65% of the sale price.",
      "Bridge financing lets you take possession of your new home days or weeks before your old home closes, provided both transactions have firm, unconditional contracts.",
      "Even though bridge interest rates look higher (often Prime + 2% to 3%), you only pay daily interest for the exact number of bridge days."
    ],
    sections: [
      {
        heading: "1. Gross Equity vs. True Net Sale Proceeds",
        paragraphs: [
          "The single most common mistake repeat buyers make is subtracting their current mortgage balance from Zillow, HouseSigma, or neighbourhood comparable prices and treating that entire gap as their next down payment. On closing day, your lawyer's trust account pays off a strict waterfall of obligations before releasing a single dollar toward your next purchase.",
          "First comes the real estate brokerage commission—whether structured as a tiered Canadian split (for example, 7% on the first $100,000 and 2.5%–3.5% on the balance in parts of Western Canada, or 4%–5% total in Ontario) or negotiated buyer/listing agreements in the US—plus applicable GST/HST in Canada. Next comes your lender's official mortgage payout statement, which includes accrued per-diem interest, a $250–$400 provincial discharge administration fee, and any prepayment penalty if not porting. Finally come legal closing fees, pre-listing staging or repair bills, and moving costs."
        ],
        table: {
          caption: "Realistic Net Proceeds Waterfall on a $900,000 Sale ($510,000 Mortgage Balance)",
          headers: ["Transaction Line Item", "Gross Paper Math", "Real Trust Account Math"],
          rows: [
            ["Confirmed Sale Price", "$900,000", "$900,000"],
            ["Less: Existing Mortgage Principal", "-$510,000", "-$510,000"],
            ["Less: Commission (e.g., 4.5% + 5% GST)", "Ignored", "-$42,525"],
            ["Less: Legal Fees & Title Discharge", "Ignored", "-$1,800"],
            ["Less: Mortgage Break Penalty (If Not Porting)", "Ignored", "-$6,000"],
            ["Less: Pre-Sale Repairs, Staging & Movers", "Ignored", "-$4,000"],
            ["Spendable Cash Available for Next Move", "$390,000 (Illusion)", "$335,675 (True Net)"]
          ]
        }
      },
      {
        heading: "2. How Bridge Financing Solves Mismatched Closing Dates",
        paragraphs: [
          "Matching your sale closing and purchase closing on the exact same calendar day sounds tidy on paper, but creates enormous logistical stress: if the buyer of your home wires funds at 3:45 PM, your lawyer may miss the land title registration cutoff on your new home, leaving your moving truck parked overnight in limbo.",
          "To eliminate same-day wire stress—and give families a week or two to paint, clean carpets, and move calmly—lenders offer short-term Bridge Loans. Once you hold a firm, unconditional sale agreement on your current home AND a firm purchase agreement on your next home, the lender advances the net equity locked inside your current home early so your new purchase can close first.",
          "Bridge loans are priced higher than standard mortgages—commonly Prime + 2.00% to Prime + 3.00% plus a flat $250 to $500 setup fee—but because interest accrues strictly by the day, the dollar cost is modest."
        ],
        formula: "Bridge Loan Cost = Setup Fee + ( Net Equity Bridged × Annual Bridge Rate ÷ 365 × Number of Overlap Days )",
        callout: {
          title: "Worked 14-Day Bridge Loan Example",
          body: "Bridging $250,000 of down payment equity for 14 days at an 8.45% bridge rate plus a $350 setup fee costs $350 + ($250,000 × 0.0845 ÷ 365 × 14) = $350 + $810 = $1,160 total—often cheaper than storage pods and hotel rooms."
        }
      },
      {
        heading: "3. Where Does the Initial Deposit Come From Before Your Home Sells?",
        paragraphs: [
          "Remember one crucial timing detail that even bridge loans do not cover automatically: the initial earnest deposit due within 24 to 72 hours of having your purchase offer accepted (typically 3% to 5% of the purchase price). Because a bridge loan only funds on the completion/closing date—not the day you write an offer—you need liquid savings, a personal line of credit, or an existing Home Equity Line of Credit (HELOC) ready in advance to cut that deposit draft."
        ]
      }
    ],
    faqs: [
      {
        q: "Can I get a bridge loan if my current home hasn't sold yet?",
        a: "Standard bank bridge loans require a firm, unconditional sale agreement with all conditions waived. If you buy before selling without a firm sale, you would need specialized open/private bridge financing or an existing approved HELOC, both of which carry stricter equity and carrying-cost requirements."
      },
      {
        q: "Should I put all of my net sale proceeds into the next down payment?",
        a: "Not necessarily. Keeping $15,000 to $30,000 of your sale proceeds aside after covering buyer closing costs preserves an emergency cushion and avoids borrowing on high-interest credit cards for curtains, appliances, or unexpected repairs in the new home."
      }
    ]
  },
  {
    slug: "keep-home-as-rental-heloc",
    title: "Keeping Your Current Home as a Rental: HELOC Equity Rules, Rental Offset Math & Cash-Flow Reality",
    seoTitle: "Keep Home as Rental & Buy Another: HELOC & Cash-Flow Math | NextMoveMath",
    metaDescription: "Thinking of turning your current home into a rental and buying another? Model HELOC LTV limits, lender rental income offsets, vacancy, and true cash flow.",
    category: "Financing & Equity Strategy",
    badge: "Keep & Rent",
    readTime: "9 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "rent",
    summary: "Turning a starter condo or house into a long-term rental while moving into your next home can build multi-property equity—but only if the true net cash flow survives vacancy, maintenance, insurance, and the strict debt-service math lenders apply to two mortgages.",
    keyTakeaways: [
      "Refinancing or adding a HELOC to pull down-payment equity out of your current home is capped at 80% total Loan-to-Value (with revolving HELOC portions capped at 65% LTV in Canada).",
      "Lenders never count 100% of gross rent as qualifying income; most apply a 50% to 80% rental offset or worksheet calculation to account for vacancies and operating expenses.",
      "Comparing gross rent strictly against the mortgage payment ignores property tax, landlord insurance, strata/HOA dues, maintenance reserves, and vacancy.",
      "Changing a principal residence into an income-producing rental triggers important capital gains valuation and tax election rules in both Canada and the US."
    ],
    sections: [
      {
        heading: "1. How Much Equity Can You Actually Pull Out for Your Next Down Payment?",
        paragraphs: [
          "When homeowners decide not to sell their current property, they usually still need some of the equity trapped inside that home to fund the down payment and closing costs on their new primary residence. Both Canadian and US conventional lenders cap cash-out refinancing on residential properties at 80% Loan-to-Value (LTV) (often 75% LTV on US single-family investment cash-outs).",
          "In Canada, OSFI rules add an extra layer for readvanceable Home Equity Lines of Credit (HELOCs): while your combined mortgage plus HELOC can reach 80% of the appraised value, the pure revolving interest-only HELOC portion cannot exceed 65% of the home's value. Any borrowing between 65% and 80% LTV must sit inside an amortizing principal-and-interest mortgage segment."
        ],
        formula: "Maximum Accessible Equity = ( Appraised Value × 80% ) − Current Mortgage Balance",
        callout: {
          title: "Worked Equity Extraction Example",
          body: "If your current townhouse appraises at $750,000 and you owe $420,000, 80% of $750,000 equals $600,000. Subtracting your $420,000 balance leaves up to $180,000 in accessible equity before legal/appraisal fees—provided your household income qualifies to carry the increased debt."
        }
      },
      {
        heading: "2. Real Monthly Rental Cash Flow vs. Back-of-Napkin Optimism",
        paragraphs: [
          "Saying 'my mortgage is $2,350 and similar units rent for $2,650, so I'm cash-flow positive by $300 a month!' is one of the costliest miscalculations in personal finance. Once you move out, every ownership cost stays on your ledger—plus landlord insurance increases, tenant turnover gaps, appliance replacements, and strata or HOA assessments.",
          "Prudent small landlords deduct at least a 5% to 8% vacancy allowance (roughly 3 to 4 weeks empty every couple of years during tenant transitions), 5% to 8% for ongoing maintenance and capital repairs, full monthly property taxes, landlord liability/rental dwelling insurance, strata/HOA fees, property management fees (typically 8%–10% if not self-managing), AND the interest cost on any HELOC drawn for the next home's down payment."
        ],
        table: {
          caption: "Monthly Rental Reality Check: $2,850 Gross Rent vs. Full Carrying Costs",
          headers: ["Monthly Line Item", "Optimistic Estimate", "Full-Cost Reality Model"],
          rows: [
            ["Gross Market Rent", "+$2,850", "+$2,850"],
            ["5% Vacancy Allowance", "$0", "-$143"],
            ["Existing Mortgage (P&I)", "-$2,200", "-$2,200"],
            ["Property Tax + Landlord Insurance", "Ignored", "-$415"],
            ["Strata / HOA + Maintenance Reserve", "Ignored", "-$460"],
            ["Interest on $100k HELOC Down-Payment Draw", "Ignored", "-$500"],
            ["True Monthly Net Cash Flow", "+$650 / mo", "-$868 / mo (Subsidized)"]
          ]
        }
      },
      {
        heading: "3. How Lenders Underwrite Your New Home Purchase When Keeping a Rental",
        paragraphs: [
          "Even if you are comfortable subsidizing a small monthly shortfall for long-term appreciation, your new mortgage lender will scrutinize both properties simultaneously. Underwriters request a signed lease agreement or an independent Appraiser's Market Rent Schedule (Form A in Canada / Form 1007 in the US).",
          "Depending on the lender, they apply either a 'Rental Offset' (taking 50% to 80% of gross rent and subtracting the rental property's mortgage, taxes, heat, and condo fees, adding any deficit directly to your debt load) or a 'Rental Addback' (adding 50% of gross rent to your income while counting 100% of the rental's debt payments in TDS). Running both properties inside NextMoveMath's 'Keep one, buy another' mode lets you see both the real household cash flow and the HELOC carrying impact side by side."
        ]
      }
    ],
    faqs: [
      {
        q: "Is interest on a HELOC used for the down payment on my new primary home tax-deductible?",
        a: "In Canada, interest deductibility tracks the use of borrowed funds—not which property secures the loan. Borrowing against a rental property to buy a personal-use principal residence generally does NOT make that interest tax-deductible without specialized restructuring (such as cash-damming advice from a CPA). Always consult a qualified tax accountant before refinancing."
      },
      {
        q: "What happens to my Principal Residence Exemption when I convert my home to a rental?",
        a: "In Canada, converting a principal residence to an income-producing property triggers a 'deemed disposition' at fair market value unless you qualify for and file a Subsection 45(2) election with the CRA. Documenting a formal valuation at the conversion date is essential."
      }
    ]
  },
  {
    slug: "first-time-home-buyer-closing-guide",
    title: "First-Time Home Buyer Math: Minimum Down Payment Tiers, CMHC/PMI Insurance & Rebates",
    seoTitle: "First-Time Home Buyer Down Payment & CMHC/PMI Math | NextMoveMath",
    metaDescription: "Master minimum down payment tiers in Canada and the US, calculate CMHC and PMI mortgage default insurance, and compare putting 5%, 10%, or 20% down.",
    category: "Home Buying Strategy",
    badge: "First-Time Buyers",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "buy",
    summary: "Should you buy sooner with 5%–10% down and pay mortgage default insurance, or wait years trying to reach 20% while home prices and rents move? Understanding tiered down-payment formulas and default insurance math clarifies the real trade-off.",
    keyTakeaways: [
      "In Canada, minimum down payments are tiered: 5% on the first $500,000 and 10% on the portion above $500,000 up to the insured price cap (with 20% required on uninsured purchases).",
      "In the US, qualified conventional buyers can put 3%–5% down (3.5% for FHA), paying monthly Private Mortgage Insurance (PMI) that cancels once equity reaches 20%–22%.",
      "Canadian CMHC/Sagen insurance is a one-time lump-sum percentage (2.80% to 4.00%) rolled into the mortgage principal, though insured loans often receive lower interest rates than 20%-down uninsured loans.",
      "First-time home buyer savings vehicles (such as Canada's FHSA + RRSP Home Buyers' Plan) and transfer tax rebates substantially reduce upfront cash hurdles."
    ],
    sections: [
      {
        heading: "1. Minimum Down Payment Tiers: Canada vs. United States",
        paragraphs: [
          "A surprisingly persistent myth claims you must save a full 20% down payment to buy a home. In reality, both Canadian and American mortgage systems allow creditworthy buyers with smaller down payments to purchase using mortgage default insurance—which protects the lender against loss on default so banks will lend up to 90%–97% of the property's value.",
          "In Canada, the statutory minimum down payment uses a split formula. You need 5% on the first $500,000 of purchase price ($25,000), plus 10% on every dollar above $500,000 up to the insured purchase price limit (expanded to $1.5 million for eligible insured mortgages), and at least 20% on purchases above the insured cap. For example, on a $750,000 Canadian home, the minimum down payment is not 5% ($37,500)—it is $25,000 on the first $500,000 plus $25,000 (10% of the remaining $250,000), totaling $50,000 (6.67%).",
          "In the United States, Fannie Mae HomeReady and Freddie Mac Home Possible / Conventional 97 programs permit 3% down for eligible first-time buyers within conforming loan limits, standard conventional loans allow 5% down, FHA loans require 3.5% down, and VA loans for eligible veterans and service members allow 0% down with no monthly PMI."
        ],
        formula: "Canadian Tiered Minimum Down (Between $500k & Insured Cap) = $25,000 + 10% × ( Purchase Price − $500,000 )"
      },
      {
        heading: "2. How CMHC Default Insurance Differs from US Private Mortgage Insurance (PMI)",
        paragraphs: [
          "Although both CMHC insurance (Canada) and PMI (United States) apply when your down payment is under 20%, their payment structures work quite differently. In Canada, mortgage default insurance from CMHC, Sagen, or Canada Guaranty is calculated once at closing as a percentage of the loan amount—4.00% with 5%–9.99% down, 3.10% with 10%–14.99% down, and 2.80% with 15%–19.99% down (plus an additional 0.20% surcharge where 30-year insured amortizations apply). That premium is added to your mortgage balance and amortized over the life of the loan, meaning it does not drop off once you hit 20% equity.",
          "In the United States, conventional borrower-paid PMI is billed monthly (typically 0.30% to 0.95% of the loan per year depending on FICO score and LTV) and can be removed on request once your principal balance reaches 80% of the original value—or terminates automatically under the Homeowners Protection Act at 78% LTV."
        ],
        table: {
          caption: "Down Payment Comparison on a $650,000 Canadian Purchase (25-Yr Amortization)",
          headers: ["Down Payment Tier", "Cash Down", "Base Loan", "CMHC Insurance Rate", "Total Financed Mortgage"],
          rows: [
            ["Minimum Tiered (6.15%)", "$40,000", "$610,000", "4.00% (+$24,400)", "$634,400"],
            ["10% Down Payment", "$65,000", "$585,000", "3.10% (+$18,135)", "$603,135"],
            ["15% Down Payment", "$97,500", "$552,500", "2.80% (+$15,470)", "$567,970"],
            ["20% Conventional", "$130,000", "$520,000", "0.00% ($0)", "$520,000"]
          ]
        }
      },
      {
        heading: "3. Stacking Tax-Advantaged First-Time Buyer Programs",
        paragraphs: [
          "Notice in the table above how crossing from 9.9% down to exactly 10.0% down drops the CMHC premium rate from 4.00% to 3.10%—saving more than $6,200 in financed insurance fees! Whenever your savings sit close to the 10%, 15%, or 20% tier boundary, stretching slightly to hit the next bracket yields an outsized immediate return.",
          "Canadian first-time buyers can combine tax-deductible First Home Savings Account (FHSA) contributions with tax-free Home Buyers' Plan (HBP) RRSP withdrawals, plus provincial/municipal first-time land transfer tax rebates. US first-time buyers should check state housing finance agency (HFA) down-payment assistance grants, Mortgage Credit Certificates (MCCs), and penalty-free Roth IRA contribution or qualified first-home withdrawals."
        ]
      }
    ],
    faqs: [
      {
        q: "Why do 5%–15% down insured mortgages sometimes advertise lower interest rates than 20% down mortgages?",
        a: "Because an insured mortgage carries a 100% default guarantee backed by CMHC or regulated insurers, the lender faces virtually zero credit-loss risk and cheaper securitization funding—passing a 0.15% to 0.35% rate discount back to the insured borrower."
      },
      {
        q: "Does my down payment include my deposit?",
        a: "Yes! The earnest deposit you submit when your offer is accepted sits in trust and is credited directly toward your total down payment on closing day."
      }
    ]
  },
  {
    slug: "fixed-vs-variable-mortgage-math",
    title: "Fixed vs. Variable Mortgages & HELOCs: Compounding Nuances, Rate Risk & 5-Year Equity Math",
    seoTitle: "Fixed vs Variable Mortgage & HELOC 5-Year Math | NextMoveMath",
    metaDescription: "Compare fixed-rate mortgages, variable-rate loans, and revolving HELOCs across compounding formulas, 5-year principal paydown, and interest cost.",
    category: "Financing & Equity Strategy",
    badge: "5-Year Horizon",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "buy",
    summary: "Focusing solely on month-one mortgage payments hides what happens underneath the hood over your first 60 months: how much interest goes to the bank, how much principal builds real net worth, and how compounding conventions alter effective costs.",
    keyTakeaways: [
      "In the early years of a 25- or 30-year mortgage, roughly 60% to 75% of every monthly payment goes toward interest rather than principal reduction.",
      "Canadian fixed-rate mortgages compound semi-annually by federal law, making a 5.00% Canadian fixed rate slightly cheaper in effective annual yield (5.0625%) than a 5.00% monthly-compounded loan (5.1162%).",
      "Revolving HELOCs allow flexible interest-only minimum payments, which preserve monthly cash flow during renovations or transitions—but build $0 of principal equity unless you voluntarily pay extra.",
      "Comparing 5-year cumulative interest paid alongside 5-year principal paid reveals the true cost of every financing choice."
    ],
    sections: [
      {
        heading: "1. Semi-Annual vs. Monthly Compounding: The Hidden Mathematical Difference",
        paragraphs: [
          "If you enter the exact same $500,000 loan, 5.00% interest rate, and 25-year amortization into a US mortgage calculator and a Canadian mortgage calculator, the two tools return different monthly payments ($2,923 in the US vs. $2,908 in Canada). Neither calculator is broken—they are obeying different national compounding laws.",
          "Under Section 6 of Canada's federal Interest Act, fixed-rate mortgages secured by real estate must disclose rates compounded semi-annually (twice per year), not in advance. Converting a 5.00% nominal semi-annual rate into an effective monthly factor yields 0.41239% per month. In the United States (and on many variable-rate loans and HELOCs), interest compounds monthly: 5.00% divided by 12 equals 0.41667% per month. Over five years on a $500,000 balance, that tiny monthly decimal saves roughly $900 in interest."
        ],
        formula: "Canada Fixed Monthly Factor = (1 + r / 2)^(1 / 6) − 1   |   US Monthly Factor = r / 12"
      },
      {
        heading: "2. What Your First 60 Monthly Payments Really Accomplish",
        paragraphs: [
          "Because residential mortgages use level-payment amortization, your total monthly payment stays constant while the internal split between interest and principal shifts slowly every single month. In Month 1, interest is charged on the entire starting balance, leaving only a thin slice to reduce your debt. By Month 60, Principal Paid per month is meaningfully higher because five years of gradual principal reductions have shrunk the interest-bearing balance.",
          "Looking at the 5-year horizon—which NextMoveMath calculates automatically in the 'Your Estimate' panel—prevents short-sighted financing mistakes. Comparing a 25-year mortgage, a 30-year mortgage, and an interest-only HELOC on the same $500,000 borrowing amount illustrates the stark difference in wealth accumulation after five years."
        ],
        table: {
          caption: "60-Month (5-Year) Horizon Comparison on $500,000 Borrowed",
          headers: ["Financing Structure", "Monthly Payment", "5-Yr Interest Paid", "5-Yr Principal Paid", "Balance at Year 5"],
          rows: [
            ["25-Yr Fixed Mortgage (4.79% CA)", "$2,849 / mo", "$111,810", "$59,130", "$440,870"],
            ["30-Yr Fixed Mortgage (4.79% CA)", "$2,606 / mo", "$114,420", "$41,940", "$458,060"],
            ["HELOC Interest-Only (5.95%)", "$2,479 / mo", "$148,750", "$0", "$500,000"],
            ["HELOC + $600/mo Voluntary Principal", "$3,079 / mo", "$139,610", "$45,130", "$454,870"]
          ]
        }
      },
      {
        heading: "3. Fixed vs. Variable vs. Readvanceable HELOC: Choosing the Right Tool",
        paragraphs: [
          "Fixed-rate mortgages lock both your interest rate and payment for the duration of the term (or full 15–30 years in the US), offering budget certainty for households whose debt-to-income ratios sit near the top of their comfort zone. The trade-off in Canada is steeper IRD prepayment risk if life changes force an unexpected sale mid-term.",
          "Variable-rate mortgages float with the central bank's policy rate via your lender's Prime rate, pairing historically competitive long-run interest costs with low 3-month-interest exit penalties—ideal if you suspect you might relocate, renovate and refinance, or sell within 2 to 3 years. Readvanceable HELOCs shine for disciplined homeowners with strong cash-flow surpluses who want penalty-free lump-sum flexibility, renovation drawdowns, or instant emergency liquidity."
        ]
      }
    ],
    faqs: [
      {
        q: "What is the difference between a variable-rate mortgage with fixed payments vs. an adjustable-rate mortgage?",
        a: "With an adjustable-rate mortgage, your monthly payment rises or falls immediately whenever Prime changes, keeping your amortization schedule on track. With a static-payment variable mortgage, your total payment stays fixed when rates rise—causing more of each payment to go toward interest and less toward principal—until rates hit a 'trigger rate' where interest exceeds the entire payment."
      },
      {
        q: "Does making bi-weekly accelerated payments really shave years off a mortgage?",
        a: "Yes. Standard bi-weekly multiplies your monthly payment by 12 and divides by 26. Accelerated bi-weekly simply divides your monthly payment in half and pays it 26 times per year—squeezing in the equivalent of one extra full monthly payment every calendar year straight onto principal, often cutting 3 to 3.5 years off a 25-year amortization."
      }
    ]
  },
  {
    slug: "home-equity-rollover-downsizing-math",
    title: "Downsizing & Right-Sizing Math: Unlocking Tax-Free Home Equity Without Cash-Flow Traps",
    seoTitle: "Downsizing Home Equity & Right-Sizing Math Guide | NextMoveMath",
    metaDescription: "Calculate how much spendable cash downsizing actually unlocks after two sets of transaction costs, condo fees, and transfer taxes in Canada and the US.",
    category: "Selling & Moving Math",
    badge: "Downsizing Math",
    readTime: "8 min read",
    updatedDate: "October 2026",
    jurisdiction: "North America",
    calculatorMode: "move",
    summary: "Selling a $1,100,000 family house to buy a $750,000 bungalow or lock-and-leave townhome looks on paper like an instant $350,000 retirement windfall—until dual transaction friction, transfer taxes, and ongoing monthly condo fees enter the equation.",
    keyTakeaways: [
      "Downsizing triggers friction on both sides of the move: seller commission and legal fees on the large home PLUS land transfer tax and legal fees on the replacement home.",
      "Trading a $1,100,000 detached home for a $750,000 condo commonly consumes $65,000 to $85,000 in combined moving friction—turning a $350,000 price spread into ~$270,000 of real cash.",
      "Monthly strata or HOA fees on a condominium ($550–$950/month) partially offset property tax and utility savings, so compare net monthly carrying costs carefully.",
      "In Canada, Principal Residence Exemption generally shields the gain tax-free; in the US, IRC Section 121 excludes up to $250,000 single / $500,000 married filing jointly in capital gains."
    ],
    sections: [
      {
        heading: "1. The Double-Friction Rule of Downsizing",
        paragraphs: [
          "Empty-nesters and retirees frequently estimate downsizing proceeds by subtracting the listing price of the smaller condo from the estimated value of their family home. Because real estate commissions scale with the larger home's price while land transfer taxes scale with the replacement home's price, downsizing absorbs transaction friction at both ends simultaneously.",
          "As a practical rule of thumb, selling a detached home and purchasing a replacement property in a standard transfer-tax jurisdiction consumes roughly 6% to 8% of the sold home's value across combined commissions, sales tax on commissions, transfer taxes, legal fees, downsizing movers, and furniture replacement. If the price gap between your current home and replacement home is narrower than 15%, transaction friction can consume nearly half of the equity you hoped to free up."
        ],
        table: {
          caption: "Downsizing Reality Math: Selling $1,100,000 Detached Home → Buying $750,000 Townhome Mortgage-Free",
          headers: ["Downsizing Cash Step", "Naive Price-Gap Estimate", "Full-Friction Net Math"],
          rows: [
            ["Sale of Family Home", "$1,100,000", "$1,100,000"],
            ["Less: Commission + Tax + Legal + Prep", "Ignored", "-$56,800"],
            ["Net Cash in Hand After Sale", "$1,100,000", "$1,043,200"],
            ["Less: Purchase of Replacement Home", "-$750,000", "-$750,000"],
            ["Less: Buyer Transfer Tax, Legal & Movers", "Ignored", "-$16,400"],
            ["Net Investable Cash Unlocked", "$350,000", "$276,800 (-$73,200 friction)"]
          ]
        }
      },
      {
        heading: "2. Comparing Monthly Carrying Costs Before and After Downsizing",
        paragraphs: [
          "Unlocking $276,800 in tax-sheltered investable capital can generate $11,000 to $13,800 per year at a conservative 4%–5% portfolio yield—a meaningful boost to retirement income. However, always compare your old monthly carrying bill against your new monthly carrying bill.",
          "A paid-off detached house might cost $525/month in property taxes, $180/month in insurance, $240/month in heat/hydro, and $300/month in roof/yard upkeep ($1,245/month total). A luxury lock-and-leave condo might lower property taxes to $310/month, insurance to $65/month, and utilities to $95/month—but add a $740/month strata/HOA fee ($1,210/month total), plus occasional special assessments. Running the exact numbers ahead of time ensures downsizing delivers both lifestyle freedom and genuine financial margin."
        ]
      },
      {
        heading: "3. Principal Residence Capital Gains Rules: Canada vs. United States",
        paragraphs: [
          "Before finalizing a downsizing plan after decades of appreciation, confirm whether capital gains tax applies. In Canada, if the home served as your designated principal residence for every year you owned it (on land typically up to half a hectare) and was never used primarily to earn business or rental income, 100% of the capital gain is exempt under the Principal Residence Exemption—though the sale must still be reported on Schedule 3 and Form T2091 of your tax return.",
          "In the United States, Internal Revenue Code Section 121 excludes up to $250,000 of gain for single filers and up to $500,000 for married couples filing jointly, provided you owned and lived in the home for at least two of the preceding five years. Long-time owners in high-appreciation coastal US markets whose gain exceeds $500,000 should tally documented capital improvements (kitchen remodels, additions, roofs, HVAC upgrades) to increase their adjusted cost basis and trim taxable gain."
        ]
      }
    ],
    faqs: [
      {
        q: "Can retired downsizers qualify for a small mortgage or bridge loan on pension income?",
        a: "Yes. Lenders count verifiable CPP/OAS or Social Security, defined-benefit pensions, annuities, and structured RRIF/IRA retirement drawdowns—and many banks offer net-worth lending programs for borrowers with substantial liquid investments."
      },
      {
        q: "Should downsizers sell first or buy first?",
        a: "In balanced or slower markets, selling your larger detached home first with a flexible 60- to 90-day closing window gives you 100% certainty on your exact net budget before committing to the replacement purchase."
      }
    ]
  }
];

export function getGuideBySlug(slug) {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}
