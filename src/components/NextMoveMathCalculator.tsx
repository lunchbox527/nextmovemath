"use client";

import React, { useMemo, useState } from "react";
import { Share2, Printer, Check } from "lucide-react";
import { ComplianceModal, CompliancePageType } from "./ComplianceModal";
import "../nextmovemath.css";

type Mode = "buy" | "sell" | "move" | "rent";
type Financing = "mortgage" | "heloc";

export interface NextMoveMathCalculatorProps {
  country?: "CA" | "US";
  setCountry?: (country: "CA" | "US") => void;
  onShare?: () => void;
  onPrint?: () => void;
  shareToast?: boolean;
}

const paths: { id: Mode; label: string; detail: string }[] = [
  { id: "buy", label: "I’m buying", detail: "Exciting! Let's see what you can afford." },
  { id: "sell", label: "I’m selling", detail: "Potential profits after sale" },
  { id: "move", label: "I’m selling & buying", detail: "Roll your equity into your next home" },
  { id: "rent", label: "I’m renting & buying", detail: "Keep one. Buy another." },
];

function getMonthlyRate(annualRate: number, isUS = false) {
  if (isUS) {
    // US monthly compounding
    return annualRate / 100 / 12;
  }
  // Canadian standard semi-annual compounding
  return Math.pow(1 + annualRate / 100 / 2, 2 / 12) - 1;
}

function monthlyMortgage(principal: number, annualRate: number, years: number, isUS = false) {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = getMonthlyRate(annualRate, isUS);
  const payments = years * 12;
  if (monthlyRate === 0) return principal / payments;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
}

function mortgageBalanceAfter(
  principal: number,
  annualRate: number,
  years: number,
  monthsPaid: number,
  isUS = false,
) {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = getMonthlyRate(annualRate, isUS);
  const payment = monthlyMortgage(principal, annualRate, years, isUS);
  if (monthlyRate === 0) return Math.max(0, principal - payment * monthsPaid);
  const growth = Math.pow(1 + monthlyRate, monthsPaid);
  return Math.max(0, principal * growth - payment * ((growth - 1) / monthlyRate));
}

function simulateHeloc(balance: number, annualRate: number, plannedPayment: number) {
  const monthlyRate = annualRate / 100 / 12;
  const firstInterest = balance * monthlyRate;
  const payment = Math.max(plannedPayment, firstInterest);
  let remaining = balance;
  let totalInterest = 0;
  let month = 0;
  let balanceAfterFiveYears = balance;

  while (remaining > 0.01 && month < 600) {
    const interest = remaining * monthlyRate;
    const actualPayment = Math.min(remaining + interest, Math.max(payment, interest));
    const principalPaid = Math.max(0, actualPayment - interest);
    totalInterest += interest;
    remaining = Math.max(0, remaining - principalPaid);
    month += 1;
    if (month === 60) balanceAfterFiveYears = remaining;
    if (principalPaid <= 0) break;
  }

  if (month < 60 && remaining === 0) balanceAfterFiveYears = 0;

  return {
    payment,
    firstInterest,
    firstPrincipal: Math.max(0, payment - firstInterest),
    balanceAfterFiveYears,
    monthsToPayoff: remaining > 0.01 ? null : month,
    totalInterest: remaining > 0.01 ? null : totalInterest,
  };
}

function NumericField({
  label,
  value,
  onChange,
  prefix = "$",
  suffix,
  step = 1000,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  hint?: string;
}) {
  const [localVal, setLocalVal] = useState<string>(value === 0 ? "" : String(value));
  const [isFocused, setIsFocused] = useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setLocalVal(value === 0 ? "" : String(value));
    }
  }, [value, isFocused]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const cleaned = raw.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    const sanitized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;

    setLocalVal(sanitized);

    if (sanitized === "" || sanitized === ".") {
      onChange(0);
    } else {
      const num = parseFloat(sanitized);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (localVal === "" || Number(localVal) === 0) {
      setLocalVal("");
      onChange(0);
    } else {
      const num = parseFloat(localVal);
      if (!isNaN(num)) {
        setLocalVal(String(num));
        onChange(num);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = parseFloat(localVal) || 0;
      const next = Math.round((current + step) * 1000) / 1000;
      setLocalVal(String(next));
      onChange(next);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseFloat(localVal) || 0;
      const next = Math.max(0, Math.round((current - step) * 1000) / 1000);
      setLocalVal(String(next));
      onChange(next);
    }
  };

  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        {prefix && <span className="affix">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={localVal}
          placeholder="0"
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {suffix && <span className="affix suffix">{suffix}</span>}
      </div>
      {hint && <small>{hint}</small>}
    </label>
  );
}

export default function NextMoveMathCalculator({
  country = "CA",
  setCountry,
  onShare,
  onPrint,
  shareToast,
}: NextMoveMathCalculatorProps) {
  const currentCountry = country || "CA";
  const isUS = currentCountry === "US";

  const money = useMemo(() => {
    return new Intl.NumberFormat(isUS ? "en-US" : "en-CA", {
      style: "currency",
      currency: isUS ? "USD" : "CAD",
      maximumFractionDigits: 0,
    });
  }, [isUS]);

  const [mode, setMode] = useState<Mode>("move");
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<CompliancePageType>("terms");

  const openLegalModal = (tab: CompliancePageType) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const [financing, setFinancing] = useState<Financing>("mortgage");
  const [salePrice, setSalePrice] = useState(900_000);
  const [mortgageOwing, setMortgageOwing] = useState(510_000);
  const [commissionRate, setCommissionRate] = useState(3.2);
  const [prepaymentPenalty, setPrepaymentPenalty] = useState(6_000);
  const [saleLegal, setSaleLegal] = useState(1_800);
  const [prepCosts, setPrepCosts] = useState(4_000);
  const [movingCosts, setMovingCosts] = useState(2_500);
  const [purchasePrice, setPurchasePrice] = useState(1_050_000);
  const [cashDown, setCashDown] = useState(210_000);
  const [moveDownPayment, setMoveDownPayment] = useState(300_000);
  const [annualRate, setAnnualRate] = useState(4.79);
  const [amortization, setAmortization] = useState(25);
  const [helocRate, setHelocRate] = useState(6.25);
  const [helocPayment, setHelocPayment] = useState(4_500);
  const [currentHelocRate, setCurrentHelocRate] = useState(6.25);
  const [householdIncome, setHouseholdIncome] = useState(180_000);
  const [monthlyDebt, setMonthlyDebt] = useState(800);
  const [propertyTax, setPropertyTax] = useState(4_800);
  const [heating, setHeating] = useState(150);
  const [condoFees, setCondoFees] = useState(0);
  const [purchaseLegal, setPurchaseLegal] = useState(2_200);
  const [inspection, setInspection] = useState(650);
  const [transferTaxes, setTransferTaxes] = useState(0);
  const [helocDraw, setHelocDraw] = useState(75_000);
  const [estimatedRent, setEstimatedRent] = useState(3_400);
  const [currentMortgagePayment, setCurrentMortgagePayment] = useState(3_150);
  const [rentalInsurance, setRentalInsurance] = useState(180);
  const [rentalMaintenance, setRentalMaintenance] = useState(250);
  const [rentalManagement, setRentalManagement] = useState(0);
  const [rentalPropertyTax, setRentalPropertyTax] = useState(4_800);
  const [rentalStrataFee, setRentalStrataFee] = useState(0);

  // Sync regional presets upon country change
  React.useEffect(() => {
    if (isUS) {
      if (amortization === 25) setAmortization(30);
      if (annualRate === 4.79) setAnnualRate(6.49);
      if (commissionRate === 3.2) setCommissionRate(5.0);
    } else {
      if (amortization === 30) setAmortization(25);
      if (annualRate === 6.49) setAnnualRate(4.79);
      if (commissionRate === 5.0) setCommissionRate(3.2);
    }
  }, [isUS]);

  const figures = useMemo(() => {
    const commission = salePrice * (commissionRate / 100);
    const commissionTax = isUS ? 0 : commission * 0.05;
    const sellingCosts =
      commission + commissionTax + prepaymentPenalty + saleLegal + prepCosts + movingCosts;
    const netSale = Math.max(0, salePrice - mortgageOwing - sellingCosts);
    const purchaseCosts = transferTaxes + purchaseLegal + inspection;
    const estimatedHelocRoom = Math.max(0, salePrice * 0.65 - mortgageOwing);
    const usableHelocDraw = Math.min(helocDraw, estimatedHelocRoom);
    const downPayment =
      mode === "buy"
        ? Math.min(cashDown, purchasePrice)
        : mode === "rent"
        ? Math.min(cashDown + usableHelocDraw, purchasePrice)
        : Math.min(Math.max(0, moveDownPayment), purchasePrice);
    const mortgage = Math.max(0, purchasePrice - downPayment);
    const payment = monthlyMortgage(mortgage, annualRate, amortization, isUS);
    const monthlyRate = getMonthlyRate(annualRate, isUS);
    const mortgageFirstInterest = mortgage * monthlyRate;
    const mortgageFirstPrincipal = Math.max(0, payment - mortgageFirstInterest);

    // 5-Year Horizon Calculations (60 months)
    const fiveYearMonths = 60;
    const mortgageBalanceFiveYears = mortgageBalanceAfter(
      mortgage,
      annualRate,
      amortization,
      fiveYearMonths,
      isUS,
    );
    const fiveYearTotalPayments = payment * fiveYearMonths;
    const fiveYearPrincipalPaid = Math.max(0, mortgage - mortgageBalanceFiveYears);
    const fiveYearInterestPaid = Math.max(0, fiveYearTotalPayments - fiveYearPrincipalPaid);
    const fiveYearHomeEquity = downPayment + fiveYearPrincipalPaid;

    // Estimated US Private Mortgage Insurance (PMI) if down payment < 20%
    const needsPmi = isUS && purchasePrice > 0 && downPayment < purchasePrice * 0.2 && mortgage > 0;
    const pmiMonthly = needsPmi ? (mortgage * 0.0055) / 12 : 0;

    const mortgageInterest = payment * amortization * 12 - mortgage;
    const heloc = simulateHeloc(mortgage, helocRate, helocPayment);
    const selectedPayment = financing === "mortgage" ? payment + pmiMonthly : heloc.payment;

    // Qualifying estimate: Canada stress-test illustration (+2%) vs US note rate
    const qualifyingRate = isUS ? annualRate : Math.max(5.25, annualRate + 2);
    const qualifyingPayment = monthlyMortgage(mortgage, qualifyingRate, amortization, isUS);
    const housingCosts =
      qualifyingPayment + propertyTax / 12 + heating + condoFees * 0.5 + pmiMonthly;
    const grossMonthlyIncome = householdIncome / 12;
    const gds = grossMonthlyIncome > 0 ? (housingCosts / grossMonthlyIncome) * 100 : 0;
    const tds =
      grossMonthlyIncome > 0 ? ((housingCosts + monthlyDebt) / grossMonthlyIncome) * 100 : 0;
    const cashAfterMove = Math.max(0, netSale - downPayment - purchaseCosts);
    const standaloneHelocLimit = purchasePrice * 0.65;
    const helocLoanToValue = purchasePrice > 0 ? (mortgage / purchasePrice) * 100 : 0;
    const effectiveRent = estimatedRent;
    const rentalOperatingCosts =
      rentalPropertyTax / 12 +
      rentalStrataFee +
      rentalInsurance +
      rentalMaintenance +
      rentalManagement;
    const currentHomeHelocInterest = usableHelocDraw * (currentHelocRate / 100 / 12);
    const rentalCashFlow =
      effectiveRent - rentalOperatingCosts - currentMortgagePayment - currentHomeHelocInterest;
    const combinedMonthlyGap = selectedPayment - rentalCashFlow;
    const enteredHousingTotal = selectedPayment + propertyTax / 12 + heating + condoFees;
    const retainedHomeTopUp = mode === "rent" ? Math.max(0, -rentalCashFlow) : 0;
    const enteredMonthlyTotal = enteredHousingTotal + monthlyDebt + retainedHomeTopUp;
    const enteredHousingShare =
      grossMonthlyIncome > 0 ? (enteredHousingTotal / grossMonthlyIncome) * 100 : 0;
    const enteredTotalShare =
      grossMonthlyIncome > 0 ? (enteredMonthlyTotal / grossMonthlyIncome) * 100 : 0;
    const comfortTarget = grossMonthlyIncome * 0.32;

    return {
      commission,
      commissionTax,
      sellingCosts,
      netSale,
      transferTaxes,
      purchaseCosts,
      downPayment,
      mortgage,
      payment,
      selectedPayment,
      mortgageFirstInterest,
      mortgageFirstPrincipal,
      mortgageBalanceFiveYears,
      fiveYearPrincipalPaid,
      fiveYearInterestPaid,
      fiveYearHomeEquity,
      fiveYearTotalPayments,
      needsPmi,
      pmiMonthly,
      mortgageInterest,
      heloc,
      standaloneHelocLimit,
      helocLoanToValue,
      qualifyingRate,
      gds,
      tds,
      cashAfterMove,
      estimatedHelocRoom,
      usableHelocDraw,
      effectiveRent,
      rentalOperatingCosts,
      currentHomeHelocInterest,
      rentalCashFlow,
      combinedMonthlyGap,
      enteredHousingTotal,
      retainedHomeTopUp,
      enteredMonthlyTotal,
      enteredHousingShare,
      enteredTotalShare,
      comfortTarget,
    };
  }, [
    mode,
    salePrice,
    mortgageOwing,
    commissionRate,
    prepaymentPenalty,
    saleLegal,
    prepCosts,
    movingCosts,
    purchasePrice,
    cashDown,
    moveDownPayment,
    annualRate,
    amortization,
    helocRate,
    helocPayment,
    financing,
    householdIncome,
    monthlyDebt,
    propertyTax,
    heating,
    condoFees,
    purchaseLegal,
    inspection,
    transferTaxes,
    helocDraw,
    estimatedRent,
    currentMortgagePayment,
    rentalInsurance,
    currentHelocRate,
    rentalMaintenance,
    rentalManagement,
    rentalPropertyTax,
    rentalStrataFee,
    isUS,
  ]);

  return (
    <div className="nextmovemath-app homeward-app">
      <main>
        {/* Clean Single-Page Header */}
        <header className="topbar">
          <div className="topbar-left">
            <a
              className="brand whitespace-nowrap shrink-0"
              href="#top"
              aria-label="NextMoveMath home"
            >
              <span className="brand-mark">N</span>
              <span>NextMoveMath</span>
            </a>
          </div>

          {/* Country Selector */}
          <div className="topbar-center">
            <div className="country-switch-pill" role="group" aria-label="Select Country">
              <button
                type="button"
                onClick={() => setCountry?.("CA")}
                className={`country-btn whitespace-nowrap shrink-0 ${!isUS ? "active" : ""}`}
                title="Canada: CAD, semi-annual compounding, stress-test illustration"
              >
                <span>🇨🇦</span>
                <span>Canada</span>
              </button>
              <button
                type="button"
                onClick={() => setCountry?.("US")}
                className={`country-btn whitespace-nowrap shrink-0 ${isUS ? "active" : ""}`}
                title="United States: USD, monthly compounding, DTI illustration"
              >
                <span>🇺🇸</span>
                <span>United States</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="topbar-actions">
            <button
              type="button"
              onClick={onShare}
              className={`action-btn whitespace-nowrap shrink-0 ${shareToast ? "copied" : ""}`}
              title="Copy link to share NextMoveMath"
            >
              {shareToast ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              <span>{shareToast ? "Link Copied!" : "Share Move"}</span>
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="action-btn print-btn whitespace-nowrap shrink-0"
              title="Print or save 1-page summary sheet to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero" id="top">
          <div className="eyebrow">YOUR NEXT MOVE, MADE CLEAR</div>
          <h1>
            Buying a home should feel exciting.
            <span> The math shouldn’t ruin it.</span>
          </h1>

          {/* Plain English Promise Intro */}
          <div className="hero-subtitle-card">
            <p>
              Traditional mortgage calculators only calculate a single payment in a vacuum.
              NextMoveMath estimates your moving numbers side by side in real time—existing mortgage
              payouts, realtor commissions, net equity rollover, closing costs,{" "}
              {isUS ? "debt-to-income ratios" : "stress-test estimates"}, and rental cash flow—so
              you can explore scenarios before talking to your lender or realtor.
            </p>
          </div>

          {/* The 4 Quiet Costs That Catch People Off Guard */}
          <section className="explainers hero-explainers" id="plain-english-promise">
            <div className="explainer-intro">
              <span className="kicker">THE 4 QUIET COSTS</span>
              <h2>The numbers that usually catch people off guard.</h2>
              <p>
                NextMoveMath brings the quiet costs into the open, so you can plug in your own
                numbers and test scenarios cleanly.
              </p>
            </div>
            <div className="explainer-grid">
              <article>
                <span>01</span>
                <h3>Selling costs</h3>
                <p>
                  Commission, applicable tax on commission, legal fees, discharge fees, mortgage
                  prepayment penalties, and moving all reduce walk-away equity.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Closing costs</h3>
                <p>
                  Your down payment isn’t the only cash needed. Local transfer taxes, legal fees,
                  inspections, and adjustments arrive on or before closing day.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>{isUS ? "DTI guidelines" : "Stress-test buffer"}</h3>
                <p>
                  {isUS
                    ? "Lenders commonly compare your housing costs and total monthly debts against your gross income using debt-to-income (DTI) benchmarks."
                    : "Lenders commonly check whether a mortgage still fits at a higher qualifying rate (for example, 5.25% or your contract rate plus 2%)."}
                </p>
              </article>
              <article>
                <span>04</span>
                <h3>Rental reality</h3>
                <p>
                  Expected rent is only the starting line. Insurance, maintenance, strata or HOA
                  fees, property management, financing, and taxes shape net monthly cash flow.
                </p>
              </article>
            </div>
          </section>

          <div className="path-picker" aria-label="Choose your situation">
            <p>First things first—what are you planning?</p>
            <div className="path-buttons">
              {paths.map((path, index) => (
                <button
                  key={path.id}
                  type="button"
                  className={mode === path.id ? "active" : ""}
                  onClick={() => setMode(path.id)}
                  aria-pressed={mode === path.id}
                >
                  <span className="path-number">0{index + 1}</span>
                  <strong>{path.label}</strong>
                  <small>{path.detail}</small>
                </button>
              ))}
            </div>

            {mode !== "sell" && (
              <div className="financing-picker">
                <div className="financing-picker-header">
                  <h3>Two ways to finance your next home (Quick pros &amp; cons)</h3>
                  <p>
                    Compare a traditional amortizing mortgage against a revolving Home Equity Line
                    of Credit (HELOC) right inside the estimate panel:
                  </p>
                </div>
                <div className="financing-options-grid" aria-label="Financing options comparison">
                  {/* Option 1: Mortgage */}
                  <article className="financing-card">
                    <div className="card-top">
                      <div>
                        <span className="card-tag">Structured Repayment</span>
                        <h4>Mortgage</h4>
                      </div>
                    </div>
                    <p className="card-suited">
                      <strong>Commonly used for:</strong> Predictable scheduled payments and steady
                      principal paydown over a set amortization period.
                    </p>
                    <ul className="card-points">
                      <li>
                        <span className="icon">✓</span>
                        <span>Principal &amp; interest paid down in every scheduled payment</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>Structured amortization timeline (e.g., 25–30 years)</span>
                      </li>
                      <li className="warn">
                        <span className="icon">•</span>
                        <span>Prepayment limits and early discharge penalties often apply</span>
                      </li>
                    </ul>
                  </article>

                  {/* Option 2: HELOC */}
                  <article className="financing-card">
                    <div className="card-top">
                      <div>
                        <span className="card-tag">Flexible Revolving Credit</span>
                        <h4>
                          HELOC <span className="full-name">(Home Equity Line of Credit)</span>
                        </h4>
                      </div>
                    </div>
                    <p className="card-suited">
                      <strong>Commonly used for:</strong> Homeowners with substantial equity who
                      want open prepayment flexibility.
                    </p>
                    <ul className="card-points">
                      <li>
                        <span className="icon">✓</span>
                        <span>Interest-only minimum payments keep baseline obligations flexible</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>Pay down extra principal anytime without prepayment penalties</span>
                      </li>
                      <li className="warn">
                        <span className="icon">•</span>
                        <span>
                          Rates are typically variable, and principal only drops when you pay extra
                        </span>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Calculator Shell */}
        <section className="calculator-shell">
          <div className="form-panel">
            {(mode === "sell" || mode === "move") && (
              <div className="form-section">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h2>Your current home</h2>
                    <p>Let’s see what could actually make it into your pocket.</p>
                  </div>
                </div>
                <div className="field-grid">
                  <NumericField
                    label="Expected sale price"
                    value={salePrice}
                    onChange={setSalePrice}
                  />
                  <NumericField
                    label="Mortgage currently owing"
                    value={mortgageOwing}
                    onChange={setMortgageOwing}
                  />
                  <NumericField
                    label="Estimated realtor commission"
                    value={commissionRate}
                    onChange={setCommissionRate}
                    prefix=""
                    suffix="%"
                    step={0.1}
                    hint="Editable—commissions vary and are negotiable."
                  />
                  <NumericField
                    label="Mortgage penalty"
                    value={prepaymentPenalty}
                    onChange={setPrepaymentPenalty}
                    hint="Your lender can provide your exact payout penalty."
                  />
                </div>
                <details>
                  <summary>
                    Additional selling costs{" "}
                    <span className="text-xs text-slate-500 font-normal ml-1.5">
                      (Legal, repairs &amp; staging, moving)
                    </span>
                  </summary>
                  <div className="field-grid details-grid">
                    <NumericField
                      label="Legal & discharge"
                      value={saleLegal}
                      onChange={setSaleLegal}
                      step={100}
                    />
                    <NumericField
                      label="Repairs, staging & cleaning"
                      value={prepCosts}
                      onChange={setPrepCosts}
                      step={250}
                    />
                    <NumericField
                      label="Moving costs"
                      value={movingCosts}
                      onChange={setMovingCosts}
                      step={250}
                    />
                  </div>
                </details>
              </div>
            )}

            {mode === "rent" && (
              <>
                <div className="form-section rental-intro">
                  <div className="section-heading">
                    <span>01</span>
                    <div>
                      <h2>The home you’re keeping</h2>
                      <p>Enter your current property value, mortgage balance, and any HELOC draw.</p>
                    </div>
                  </div>
                  <div className="field-grid">
                    <NumericField
                      label="Estimated current value"
                      value={salePrice}
                      onChange={setSalePrice}
                      hint="Use a conservative market estimate."
                    />
                    <NumericField
                      label="Mortgage currently owing"
                      value={mortgageOwing}
                      onChange={setMortgageOwing}
                    />
                    <NumericField
                      label="Current mortgage payment"
                      value={currentMortgagePayment}
                      onChange={setCurrentMortgagePayment}
                      step={50}
                      suffix="/mo"
                    />
                    <NumericField
                      label="HELOC amount to use"
                      value={helocDraw}
                      onChange={setHelocDraw}
                      hint={`65% LTV illustration room: ${money.format(figures.estimatedHelocRoom)}`}
                    />
                    <NumericField
                      label="HELOC rate"
                      value={currentHelocRate}
                      onChange={setCurrentHelocRate}
                      prefix=""
                      suffix="%"
                      step={0.05}
                      hint="Typically variable."
                    />
                  </div>
                  <div
                    className={`market-data-note ${
                      figures.estimatedHelocRoom > 0 ? "good" : "watch"
                    }`}
                  >
                    <div>
                      <span className="kicker">EQUITY ESTIMATE</span>
                      <strong>
                        {money.format(figures.estimatedHelocRoom)} illustrated HELOC room
                      </strong>
                      <p>
                        Illustrated using 65% of estimated value minus current mortgage owing.
                        Actual borrowing limits depend on your lender’s appraisal and product rules.
                      </p>
                    </div>
                    <span className="data-status">Estimate only</span>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-heading">
                    <span>02</span>
                    <div>
                      <h2>Your rental picture</h2>
                      <p>
                        Enter expected monthly rent and ongoing landlord expenses to estimate net
                        monthly cash flow.
                      </p>
                    </div>
                  </div>
                  <div className="field-grid three-col">
                    <NumericField
                      label="Expected monthly rent"
                      value={estimatedRent}
                      onChange={setEstimatedRent}
                      step={50}
                    />
                    <NumericField
                      label="Landlord insurance"
                      value={rentalInsurance}
                      onChange={setRentalInsurance}
                      step={10}
                      suffix="/mo"
                    />
                    <NumericField
                      label="Current-home property tax"
                      value={rentalPropertyTax}
                      onChange={setRentalPropertyTax}
                      step={100}
                      suffix="/year"
                    />
                    <NumericField
                      label="Current-home condo / strata / HOA fee"
                      value={rentalStrataFee}
                      onChange={setRentalStrataFee}
                      step={25}
                      suffix="/mo"
                    />
                    <NumericField
                      label="Maintenance allowance"
                      value={rentalMaintenance}
                      onChange={setRentalMaintenance}
                      step={25}
                      suffix="/mo"
                    />
                    <NumericField
                      label="Property management"
                      value={rentalManagement}
                      onChange={setRentalManagement}
                      step={25}
                      suffix="/mo"
                    />
                  </div>
                </div>
              </>
            )}

            {(mode === "buy" || mode === "move" || mode === "rent") && (
              <div className="form-section">
                <div className="section-heading">
                  <span>{mode === "move" ? "02" : mode === "rent" ? "03" : "01"}</span>
                  <div>
                    <h2>Your next home</h2>
                    <p>Fill in the info below and watch the estimate update in real time.</p>
                  </div>
                </div>
                <div className="field-grid">
                  <NumericField
                    label="Next home price"
                    value={purchasePrice}
                    onChange={setPurchasePrice}
                  />
                  {mode === "buy" ? (
                    <NumericField
                      label="Cash down payment"
                      value={cashDown}
                      onChange={setCashDown}
                    />
                  ) : mode === "rent" ? (
                    <NumericField
                      label="Cash down payment"
                      value={cashDown}
                      onChange={setCashDown}
                      hint={`Plus ${money.format(figures.usableHelocDraw)} from the current home HELOC.`}
                    />
                  ) : (
                    <NumericField
                      label="Down payment from sale proceeds"
                      value={moveDownPayment}
                      onChange={setMoveDownPayment}
                      hint={`Estimated net sale equity: ${money.format(figures.netSale)}. Estimated cash left after closing: ${money.format(figures.cashAfterMove)}.`}
                    />
                  )}
                  {financing === "mortgage" ? (
                    <>
                      <NumericField
                        label="Mortgage rate"
                        value={annualRate}
                        onChange={setAnnualRate}
                        prefix=""
                        suffix="%"
                        step={0.05}
                      />
                      <NumericField
                        label="Amortization"
                        value={amortization}
                        onChange={setAmortization}
                        prefix=""
                        suffix="years"
                        step={5}
                      />
                    </>
                  ) : (
                    <>
                      <NumericField
                        label="HELOC rate"
                        value={helocRate}
                        onChange={setHelocRate}
                        prefix=""
                        suffix="%"
                        step={0.05}
                        hint="Typically variable."
                      />
                      <NumericField
                        label="Planned monthly payment"
                        value={helocPayment}
                        onChange={setHelocPayment}
                        step={50}
                        hint="Paying only interest will not reduce the principal balance."
                      />
                    </>
                  )}
                </div>
                <details>
                  <summary>
                    Additional purchase costs{" "}
                    <span className="text-xs text-slate-500 font-normal ml-1.5">
                      (Legal, inspection, local taxes)
                    </span>
                  </summary>
                  <div className="field-grid details-grid">
                    <NumericField
                      label="Legal / notary / title fees"
                      value={purchaseLegal}
                      onChange={setPurchaseLegal}
                      step={100}
                    />
                    <NumericField
                      label="Home inspection"
                      value={inspection}
                      onChange={setInspection}
                      step={50}
                    />
                    <NumericField
                      label="Local tax"
                      value={transferTaxes}
                      onChange={setTransferTaxes}
                      step={500}
                      hint="Enter a local transfer tax estimate—varies by province, state, municipality, and buyer."
                    />
                  </div>
                </details>

                {/* 5-Year Equity & Debt Horizon Dedicated Dropdown */}
                {figures.mortgage > 0 && financing === "mortgage" && (
                  <details className="horizon-details">
                    <summary>
                      5-Year Equity &amp; Debt Horizon{" "}
                      <span className="text-xs text-slate-500 font-normal ml-1.5">
                        (Principal paid, interest &amp; projected equity at 5 years)
                      </span>
                    </summary>
                    <div className="horizon-dropdown-content">
                      <div className="horizon-stats-grid">
                        <div className="horizon-stat-box">
                          <span className="label">Principal Paid</span>
                          <span className="value tabular-nums">
                            {money.format(figures.fiveYearPrincipalPaid)}
                          </span>
                        </div>
                        <div className="horizon-stat-box">
                          <span className="label">Interest Paid</span>
                          <span className="value tabular-nums">
                            {money.format(figures.fiveYearInterestPaid)}
                          </span>
                        </div>
                        <div className="horizon-stat-box">
                          <span className="label">Balance in 5 Yrs</span>
                          <span className="value tabular-nums">
                            {money.format(figures.mortgageBalanceFiveYears)}
                          </span>
                        </div>
                        <div className="horizon-stat-box highlight">
                          <span className="label">Projected Equity</span>
                          <span className="value tabular-nums">
                            {money.format(figures.fiveYearHomeEquity)}
                          </span>
                        </div>
                      </div>
                      <div className="horizon-progress-container">
                        <div className="horizon-progress-label">
                          <span>Principal vs Interest Split</span>
                          <span className="tabular-nums">
                            {(
                              (figures.fiveYearPrincipalPaid /
                                (figures.fiveYearPrincipalPaid + figures.fiveYearInterestPaid ||
                                  1)) *
                              100
                            ).toFixed(0)}
                            % to Principal
                          </span>
                        </div>
                        <div className="horizon-progress-bar">
                          <div
                            className="horizon-progress-fill"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  5,
                                  (figures.fiveYearPrincipalPaid /
                                    (figures.fiveYearPrincipalPaid + figures.fiveYearInterestPaid ||
                                      1)) *
                                    100,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            )}

            {(mode === "buy" || mode === "move" || mode === "rent") && (
              <div className="form-section compact-section">
                <div className="section-heading">
                  <span>{mode === "move" ? "03" : mode === "rent" ? "04" : "02"}</span>
                  <div>
                    <h2>Your monthly repayment comfort zone</h2>
                    <p>Because qualifying and feeling comfortable aren’t always the same thing.</p>
                  </div>
                </div>
                <div className="field-grid three-col">
                  <NumericField
                    label="Annual gross household income"
                    value={householdIncome}
                    onChange={setHouseholdIncome}
                    hint="Total household income before tax—divided by 12 for this monthly comparison."
                  />
                  <NumericField
                    label="Other monthly debt"
                    value={monthlyDebt}
                    onChange={setMonthlyDebt}
                    step={50}
                  />
                  <NumericField
                    label="Annual property tax"
                    value={propertyTax}
                    onChange={setPropertyTax}
                    step={100}
                  />
                  <NumericField
                    label="Monthly heating"
                    value={heating}
                    onChange={setHeating}
                    step={25}
                  />
                  <NumericField
                    label="Monthly strata / HOA fees"
                    value={condoFees}
                    onChange={setCondoFees}
                    step={50}
                  />
                </div>
                {(() => {
                  const totalShare = figures.enteredTotalShare;
                  const comfortStatus =
                    totalShare <= 36 ? "good" : totalShare <= 44 ? "watch" : "high";
                  const statusLabel =
                    totalShare <= 36
                      ? "Comfortable planning range"
                      : totalShare <= 44
                      ? "Manageable but tight"
                      : "High monthly commitment";

                  return (
                    <div className={`comfort-summary status-${comfortStatus}`}>
                      <div className="comfort-topline-grid">
                        <div className="comfort-stat-card">
                          <span className="kicker">GROSS MONTHLY INCOME</span>
                          <strong className="amount-display tabular-nums">
                            {money.format(householdIncome / 12)}
                            <small>/mo</small>
                          </strong>
                          <span className="stat-subtext">
                            Before taxes ({money.format(householdIncome)}/year)
                          </span>
                        </div>

                        <div className="comfort-stat-card">
                          <span className="kicker">MONTHLY TOTAL EXPENSES</span>
                          <strong className="amount-display tabular-nums">
                            {money.format(figures.enteredMonthlyTotal)}
                            <small>/mo</small>
                          </strong>
                          <span className="stat-subtext font-semibold text-[#17312d]">
                            Housing ({money.format(figures.enteredHousingTotal)}) + Debts (
                            {money.format(monthlyDebt)})
                          </span>
                          <span className="text-[11px] text-[#556963] mt-1 block leading-tight">
                            Includes Payment ({money.format(figures.selectedPayment)}) + Taxes (
                            {money.format(propertyTax / 12)}) + Heating ({money.format(heating)})
                            {condoFees > 0 ? ` + Strata/HOA (${money.format(condoFees)})` : ""}
                          </span>
                        </div>

                        <div
                          className={`comfort-stat-card commitment-status-card ${comfortStatus}`}
                        >
                          <span className="kicker">TOTAL COMMITMENTS</span>
                          <strong className="amount-display tabular-nums">
                            {totalShare.toFixed(1)}%<small>of income</small>
                          </strong>
                          <div className={`comfort-status-pill ${comfortStatus}`}>
                            <span>{statusLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* GDS / TDS or Front / Back DTI Informational Cards */}
                      <div className="dti-explanation-grid">
                        <div
                          className={`dti-card ${
                            figures.gds <= (isUS ? 28 : 39) ? "good" : "watch"
                          }`}
                        >
                          <div className="dti-card-header">
                            <div>
                              <span className="dti-type-tag">HOUSING EXPENSE RATIO</span>
                              <h4>
                                {isUS ? "Front-End DTI (Housing)" : "GDS (Gross Debt Service)"}
                              </h4>
                            </div>
                            <div className="dti-ratio-badge tabular-nums">
                              <strong>{figures.gds.toFixed(1)}%</strong>
                              <small>
                                {isUS ? "Common guide: ≤28%" : "Common guide: ≤39%"}
                              </small>
                            </div>
                          </div>
                          <p className="dti-description">
                            {isUS
                              ? "Estimated share of gross monthly income allocated to housing costs. Many conventional lenders use ~28% as a general reference point, though actual limits vary by loan program."
                              : "Estimated share of pre-tax monthly income allocated to qualifying housing costs (evaluated using the stress-test rate, taxes, heating, and half of condo fees). Actual lender limits vary."}
                          </p>
                        </div>

                        <div
                          className={`dti-card ${
                            figures.tds <= (isUS ? 43 : 44) ? "good" : "watch"
                          }`}
                        >
                          <div className="dti-card-header">
                            <div>
                              <span className="dti-type-tag">TOTAL DEBT RATIO</span>
                              <h4>
                                {isUS ? "Back-End DTI (Total Debt)" : "TDS (Total Debt Service)"}
                              </h4>
                            </div>
                            <div className="dti-ratio-badge tabular-nums">
                              <strong>{figures.tds.toFixed(1)}%</strong>
                              <small>
                                {isUS ? "Common guide: ≤36%–43%" : "Common guide: ≤44%"}
                              </small>
                            </div>
                          </div>
                          <p className="dti-description">
                            {isUS
                              ? "Estimated share of gross monthly income needed for housing costs plus recurring monthly debts. Actual lender thresholds depend on credit profile, reserves, and loan type."
                              : "Estimated share of pre-tax monthly income needed for qualifying housing costs plus other monthly debt obligations. Actual underwriting rules vary by lender and borrower."}
                          </p>
                        </div>
                      </div>

                      {/* Visual Gauge */}
                      <div
                        className="comfort-track"
                        aria-label={`Total commitments are ${totalShare.toFixed(
                          1,
                        )} percent of gross income`}
                      >
                        <span className="comfort-divider first" aria-hidden="true" />
                        <span className="comfort-divider second" aria-hidden="true" />
                        <i
                          style={{
                            left: `${Math.min(100, Math.max(0, totalShare))}%`,
                            background:
                              comfortStatus === "good"
                                ? "#2e7450"
                                : comfortStatus === "watch"
                                ? "#d97706"
                                : "#dc2626",
                          }}
                        />
                      </div>
                      <div className="comfort-scale tabular-nums">
                        <span>0%</span>
                        <span>32%</span>
                        <span>44%</span>
                        <span>100%</span>
                      </div>
                      <div className="comfort-zone-copy">
                        <span className="green">
                          <strong>Comfortable range</strong>
                          <small>0–32%</small>
                        </span>
                        <span className="yellow">
                          <strong>Manageable but tight</strong>
                          <small>32–44%</small>
                        </span>
                        <span className="red">
                          <strong>Stretched range</strong>
                          <small>44%+</small>
                        </span>
                      </div>
                      <p>
                        Many households aim for around 32% or less of gross income for housing so
                        day-to-day life still has breathing room. All ratios shown here are
                        general planning illustrations, not lender qualification decisions.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Sticky Results Sidebar Column */}
          <div className="results-sidebar-column">
            <aside
              className={`results-panel ${mode === "rent" ? "rental-results-panel" : ""}`}
              aria-live="polite"
            >
              <div className="results-panel-header">
                <span className="results-label">YOUR ESTIMATE</span>
                {mode !== "sell" && (
                  <div
                    className="results-financing-toggle"
                    role="group"
                    aria-label="Select Financing Type"
                  >
                    <button
                      type="button"
                      className={`toggle-option whitespace-nowrap ${
                        financing === "mortgage" ? "active" : ""
                      }`}
                      onClick={() => setFinancing("mortgage")}
                    >
                      Mortgage
                    </button>
                    <button
                      type="button"
                      className={`toggle-option whitespace-nowrap ${
                        financing === "heloc" ? "active" : ""
                      }`}
                      onClick={() => setFinancing("heloc")}
                    >
                      HELOC
                    </button>
                  </div>
                )}
              </div>

              {mode === "sell" ? (
                <>
                  <p className="result-title">Estimated cash after sale</p>
                  <div className="big-number tabular-nums">{money.format(figures.netSale)}</div>
                  <div className="quip">
                    {figures.netSale >= 300_000
                      ? "That equity came prepared."
                      : "Now you can plan with a clearer number."}
                  </div>
                  <div className="breakdown tabular-nums">
                    <div>
                      <span>Sale price</span>
                      <strong>{money.format(salePrice)}</strong>
                    </div>
                    <div>
                      <span>Mortgage paid out</span>
                      <strong>− {money.format(mortgageOwing)}</strong>
                    </div>
                    <div>
                      <span>Estimated selling costs</span>
                      <strong>− {money.format(figures.sellingCosts)}</strong>
                    </div>
                  </div>
                </>
              ) : mode === "rent" ? (
                <>
                  <h3 className="sidebar-section-title">New home purchase</h3>
                  <div className="breakdown purchase-breakdown tabular-nums">
                    <div>
                      <span>Purchase price</span>
                      <strong>{money.format(purchasePrice)}</strong>
                    </div>
                    <div>
                      <span>HELOC used for down payment</span>
                      <strong>{money.format(figures.usableHelocDraw)}</strong>
                    </div>
                    <div>
                      <span>Cash down payment</span>
                      <strong>{money.format(cashDown)}</strong>
                    </div>
                    <div>
                      <span>Total down payment</span>
                      <strong>{money.format(figures.downPayment)}</strong>
                    </div>
                    <div>
                      <span>New-home amount financed</span>
                      <strong>{money.format(figures.mortgage)}</strong>
                    </div>
                    <div className="purchase-payment-total">
                      <span>New home payment</span>
                      <strong>{money.format(figures.selectedPayment)}/mo</strong>
                    </div>
                  </div>
                  <h3 className="sidebar-section-title rental-title">Current home rental</h3>
                  <div className="breakdown rental-breakdown tabular-nums">
                    <div>
                      <span>Expected monthly rent</span>
                      <strong>{money.format(figures.effectiveRent)}</strong>
                    </div>
                    <div>
                      <span>Rental operating costs</span>
                      <strong>− {money.format(figures.rentalOperatingCosts)}</strong>
                    </div>
                    <div>
                      <span>Current mortgage payment</span>
                      <strong>− {money.format(currentMortgagePayment)}</strong>
                    </div>
                    <div>
                      <span>HELOC interest estimate</span>
                      <strong>− {money.format(figures.currentHomeHelocInterest)}</strong>
                    </div>
                  </div>
                  {financing === "heloc" && (
                    <div
                      className={`heloc-limit ${
                        figures.mortgage <= figures.standaloneHelocLimit ? "good" : "watch"
                      }`}
                    >
                      <span>New-home HELOC loan-to-value</span>
                      <strong className="tabular-nums">
                        {figures.helocLoanToValue.toFixed(1)}%
                      </strong>
                      <small>
                        Standalone HELOCs are commonly capped near 65% of property value, though
                        combined mortgage-HELOC products vary by lender.
                      </small>
                    </div>
                  )}
                  <div className="rental-cashflow-total tabular-nums">
                    <div className="sidebar-total-row">
                      <span>Rental cash flow</span>
                      <strong className={figures.rentalCashFlow >= 0 ? "positive" : "negative"}>
                        {figures.rentalCashFlow >= 0 ? "+ " : "− "}
                        {money.format(Math.abs(figures.rentalCashFlow))}/mo
                      </strong>
                    </div>
                  </div>
                  <div className="equation-operator" aria-hidden="true">
                    {figures.rentalCashFlow >= 0 ? "−" : "+"}
                  </div>
                  <div className="rent-final-payment tabular-nums">
                    <div className="final-payment-input">
                      <span>New home payment</span>
                      <strong>{money.format(figures.selectedPayment)}/mo</strong>
                    </div>
                    <div className="rent-final-result">
                      <p className="result-title">Final estimated monthly outlay</p>
                      <div className="big-number">
                        {money.format(Math.max(0, figures.combinedMonthlyGap))}
                        <small>/mo</small>
                      </div>
                    </div>
                  </div>
                  <p className="stress-note">
                    Illustrative estimate only. Rental income offsets, HELOC limits, and mortgage
                    qualification vary by lender.
                  </p>
                </>
              ) : (
                <>
                  <p className="result-title">
                    {financing === "mortgage"
                      ? "Estimated monthly mortgage"
                      : "Planned monthly HELOC payment"}
                  </p>
                  <div className="big-number tabular-nums">
                    {money.format(figures.selectedPayment)}
                    <small>/mo</small>
                  </div>
                  {financing === "heloc" && (
                    <div className="quip">
                      {figures.heloc.firstPrincipal > 0
                        ? "This payment reduces the balance in the first month."
                        : "An interest-only payment leaves the balance unchanged."}
                    </div>
                  )}
                  <div className="breakdown tabular-nums">
                    <div>
                      <span>Down payment</span>
                      <strong>{money.format(figures.downPayment)}</strong>
                    </div>
                    <div>
                      <span>Amount financed</span>
                      <strong>{money.format(figures.mortgage)}</strong>
                    </div>
                    {financing === "heloc" && (
                      <>
                        <div>
                          <span>First month’s interest</span>
                          <strong>{money.format(figures.heloc.firstInterest)}</strong>
                        </div>
                        <div>
                          <span>First month’s principal</span>
                          <strong>{money.format(figures.heloc.firstPrincipal)}</strong>
                        </div>
                      </>
                    )}
                    <div>
                      <span>Local tax</span>
                      <strong>{money.format(figures.transferTaxes)}</strong>
                    </div>
                    <div>
                      <span>Estimated purchase costs</span>
                      <strong>{money.format(figures.purchaseCosts)}</strong>
                    </div>
                    {mode === "move" && (
                      <div>
                        <span>Cash left after the move</span>
                        <strong>{money.format(figures.cashAfterMove)}</strong>
                      </div>
                    )}
                  </div>
                  {financing === "mortgage" ? (
                    <>
                      {figures.needsPmi && (
                        <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                          Includes estimated US PMI illustration of ~
                          {money.format(figures.pmiMonthly)}/mo (under 20% down payment).
                        </p>
                      )}
                      <p className="stress-note">
                        {isUS
                          ? `Illustrated at entered rate of ${annualRate.toFixed(2)}%.`
                          : `Stress-test ratio illustrated at ${figures.qualifyingRate.toFixed(
                              2,
                            )}% (higher of 5.25% or rate + 2%).`}
                      </p>
                    </>
                  ) : (
                    <div
                      className={`heloc-limit ${
                        figures.mortgage <= figures.standaloneHelocLimit ? "good" : "watch"
                      }`}
                    >
                      <span>Estimated loan-to-value</span>
                      <strong className="tabular-nums">
                        {figures.helocLoanToValue.toFixed(1)}%
                      </strong>
                      <small>
                        {figures.mortgage <= figures.standaloneHelocLimit
                          ? `Within a typical 65% standalone HELOC ceiling (${money.format(
                              figures.standaloneHelocLimit,
                            )}). Lender terms vary.`
                          : `Above a typical 65% standalone HELOC ceiling (${money.format(
                              figures.standaloneHelocLimit,
                            )}). A larger down payment or combined product may be required.`}
                      </small>
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        </section>

        {/* Clean Single-Page Footer with Protective Disclaimer */}
        <footer>
          <a href="#top" className="brand whitespace-nowrap" aria-label="NextMoveMath top">
            <span className="brand-mark">N</span>
            <span>NextMoveMath</span>
          </a>
          <div className="footer-center">
            <p>
              <strong>For illustrative estimation only — not financial, mortgage, tax, or legal advice.</strong>{" "}
              Every rate, fee, tax, and ratio in this calculator is an editable planning estimate
              provided &ldquo;as-is&rdquo; without warranty of accuracy or lender approval. Always
              verify exact figures independently with a licensed mortgage professional, lawyer or
              notary, and tax advisor before making any real estate or financial decisions.
            </p>
            <div className="footer-links">
              <button
                type="button"
                onClick={() => openLegalModal("terms")}
                className="footer-link cursor-pointer bg-transparent border-0 p-0"
              >
                Terms &amp; Disclaimer
              </button>
              <span className="dot" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => openLegalModal("privacy")}
                className="footer-link cursor-pointer bg-transparent border-0 p-0"
              >
                Privacy Notice
              </button>
              {typeof window !== "undefined" &&
                !window.location.hostname.includes("nextmovemath.com") && (
                  <>
                    <span className="dot" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href="/nextmovemath-source.zip"
                      download="nextmovemath-source.zip"
                      className="footer-link font-bold text-[#2e7450]"
                      title="Download complete production package (Vercel & GitHub ready)"
                    >
                      Download Code (Vercel Ready)
                    </a>
                  </>
                )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCountry?.(isUS ? "CA" : "US")}
            className="footer-jurisdiction cursor-pointer hover:text-emerald-700 transition-colors"
            title="Click to switch country"
          >
            {isUS
              ? "Active: 🇺🇸 United States (Switch to 🇨🇦 Canada)"
              : "Active: 🇨🇦 Canada (Switch to 🇺🇸 United States)"}
          </button>
        </footer>

        {/* Dedicated Clean Print Sheet (Visible ONLY when printing / saving PDF) */}
        <section className="print-only-summary" aria-hidden="true">
          <div className="print-header">
            <div>
              <h1>NextMoveMath — Moving Estimate Summary</h1>
              <p className="mt-1 text-gray-600 text-[13px]">
                Scenario: {paths.find((p) => p.id === mode)?.label} · Region:{" "}
                {isUS ? "United States (USD)" : "Canada (CAD)"}
              </p>
            </div>
            <div className="text-right text-xs text-gray-500">
              Printed:{" "}
              {new Date().toLocaleDateString(isUS ? "en-US" : "en-CA", { dateStyle: "long" })}
            </div>
          </div>

          <div className="print-section">
            <h2 className="text-base mb-2.5 text-gray-900 border-b border-gray-200 pb-1">
              Estimated Scenario Figures
            </h2>
            <div className="print-grid">
              {mode !== "sell" && (
                <>
                  <div className="print-box">
                    <span>Target Purchase Price</span>
                    <strong>{money.format(purchasePrice)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Total Down Payment</span>
                    <strong>{money.format(figures.downPayment)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Financed Amount</span>
                    <strong>{money.format(figures.mortgage)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Estimated Monthly Payment</span>
                    <strong>{money.format(figures.selectedPayment)} / month</strong>
                  </div>
                </>
              )}
              {(mode === "sell" || mode === "move" || mode === "rent") && (
                <>
                  <div className="print-box">
                    <span>Current Home Sale / Value</span>
                    <strong>{money.format(salePrice)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Mortgage Balance</span>
                    <strong>{money.format(mortgageOwing)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Estimated Selling Costs</span>
                    <strong>{money.format(figures.sellingCosts)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Estimated Net Equity</span>
                    <strong>{money.format(figures.netSale)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {figures.mortgage > 0 && financing === "mortgage" && (
            <div className="print-section">
              <h2 className="text-base mb-2.5 text-gray-900 border-b border-gray-200 pb-1">
                5-Year Horizon Illustration ({annualRate.toFixed(2)}% over {amortization} Yrs)
              </h2>
              <div className="print-grid">
                <div className="print-box">
                  <span>5-Year Principal Paid</span>
                  <strong>{money.format(figures.fiveYearPrincipalPaid)}</strong>
                </div>
                <div className="print-box">
                  <span>5-Year Interest Paid</span>
                  <strong>{money.format(figures.fiveYearInterestPaid)}</strong>
                </div>
                <div className="print-box">
                  <span>Estimated Balance at Year 5</span>
                  <strong>{money.format(figures.mortgageBalanceFiveYears)}</strong>
                </div>
                <div className="print-box">
                  <span>Projected Equity (Down + Principal)</span>
                  <strong>{money.format(figures.fiveYearHomeEquity)}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="print-disclaimer">
            <strong>Disclaimer:</strong> NextMoveMath provides illustrative mathematical estimates
            only and does not constitute financial, mortgage, tax, or legal advice. Verify all
            rates, taxes, fees, and qualification requirements with licensed professionals before
            making any real estate or financial decisions.
          </div>
        </section>

        <ComplianceModal
          isOpen={legalModalOpen}
          page={legalModalTab}
          onClose={() => setLegalModalOpen(false)}
          onSelectPage={(tab) => setLegalModalTab(tab)}
        />
      </main>
    </div>
  );
}
