"use client";

import React, { useMemo, useState } from "react";
import { Share2, Printer, Check, BookOpen, Calculator as CalcIcon, ShieldCheck, Mail, Info } from "lucide-react";
import AdBanner from "./AdBanner";
import { ComplianceModal, CompliancePageType } from "./ComplianceModal";
import { EducationalGuides } from "./EducationalGuides";
import { MethodologyView } from "./MethodologyView";
import { AboutView } from "./AboutView";
import { ContactView } from "./ContactView";
import "../nextmovemath.css";

export type ActiveTab = "calculator" | "guides" | "methodology" | "about" | "contact";
type Mode = "buy" | "sell" | "move" | "rent";
type Financing = "mortgage" | "heloc";

export interface NextMoveMathCalculatorProps {
  publisherId: string;
  simulationMode: boolean;
  inspectOutlines: boolean;
  showHeroAd?: boolean;
  showMidAd?: boolean;
  showSidebarAd?: boolean;
  showBottomAd?: boolean;
  country?: "CA" | "US";
  setCountry?: (country: "CA" | "US") => void;
  onShare?: () => void;
  onPrint?: () => void;
  shareToast?: boolean;
  activeTab?: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
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
  if (principal <= 0) return 0;
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
  if (principal <= 0) return 0;
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

  // Sync external changes (presets, country toggles, reset) only when the user is not actively typing
  React.useEffect(() => {
    if (!isFocused) {
      setLocalVal(value === 0 ? "" : String(value));
    }
  }, [value, isFocused]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    // Allow empty string, digits, and at most one decimal point
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
    // On blur, normalize display: if empty or zero, keep empty for placeholder; otherwise strip leading zeroes
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap select-wrap">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </label>
  );
}

export default function NextMoveMathCalculator({
  publisherId,
  simulationMode,
  inspectOutlines,
  showHeroAd = true,
  showMidAd = false,
  showSidebarAd = true,
  showBottomAd = true,
  country = "CA",
  setCountry,
  onShare,
  onPrint,
  shareToast,
  activeTab,
  setActiveTab,
}: NextMoveMathCalculatorProps) {
  const currentCountry = country || "CA";
  const isUS = currentCountry === "US";
  const [internalTab, setInternalTab] = useState<ActiveTab>("calculator");
  const currentTab = activeTab || internalTab;

  const handleTabChange = (t: ActiveTab, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (setActiveTab) setActiveTab(t);
    else setInternalTab(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const money = useMemo(() => {
    return new Intl.NumberFormat(isUS ? "en-US" : "en-CA", {
      style: "currency",
      currency: isUS ? "USD" : "CAD",
      maximumFractionDigits: 0,
    });
  }, [isUS]);

  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [compliancePage, setCompliancePage] = useState<CompliancePageType>("privacy");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenCompliance = (p: CompliancePageType, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCompliancePage(p);
    setComplianceModalOpen(true);
  };

  const [mode, setMode] = useState<Mode>("move");
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
  const [propertyLocation, setPropertyLocation] = useState("Kelowna, BC");
  const [propertyType, setPropertyType] = useState("Detached home");
  const [squareFeet, setSquareFeet] = useState(1_850);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
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
      if (propertyLocation === "Kelowna, BC") setPropertyLocation("Seattle, WA");
    } else {
      if (amortization === 30) setAmortization(25);
      if (annualRate === 6.49) setAnnualRate(4.79);
      if (commissionRate === 5.0) setCommissionRate(3.2);
      if (propertyLocation === "Seattle, WA") setPropertyLocation("Kelowna, BC");
    }
  }, [isUS]);

  const figures = useMemo(() => {
    const commission = salePrice * (commissionRate / 100);
    // In Canada, GST/HST applies to commission. In US, direct commission
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
    const mortgageBalanceFiveYears = mortgageBalanceAfter(mortgage, annualRate, amortization, fiveYearMonths, isUS);
    const fiveYearTotalPayments = payment * fiveYearMonths;
    const fiveYearPrincipalPaid = Math.max(0, mortgage - mortgageBalanceFiveYears);
    const fiveYearInterestPaid = Math.max(0, fiveYearTotalPayments - fiveYearPrincipalPaid);
    const fiveYearHomeEquity = downPayment + fiveYearPrincipalPaid;

    // US Private Mortgage Insurance (PMI) if down payment < 20%
    const needsPmi = isUS && purchasePrice > 0 && downPayment < purchasePrice * 0.20 && mortgage > 0;
    const pmiMonthly = needsPmi ? (mortgage * 0.0055) / 12 : 0;

    const mortgageInterest = payment * amortization * 12 - mortgage;
    const heloc = simulateHeloc(mortgage, helocRate, helocPayment);
    const selectedPayment = financing === "mortgage" ? payment + pmiMonthly : heloc.payment;
    
    // Qualifying criteria: Canada stress test (+2%) vs US DTI
    const qualifyingRate = isUS ? annualRate : Math.max(5.25, annualRate + 2);
    const qualifyingPayment = monthlyMortgage(mortgage, qualifyingRate, amortization, isUS);
    const housingCosts = qualifyingPayment + propertyTax / 12 + heating + condoFees * 0.5 + pmiMonthly;
    const grossMonthlyIncome = householdIncome / 12;
    const gds = grossMonthlyIncome > 0 ? (housingCosts / grossMonthlyIncome) * 100 : 0;
    const tds = grossMonthlyIncome > 0 ? ((housingCosts + monthlyDebt) / grossMonthlyIncome) * 100 : 0;
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

  const helocPayoff =
    figures.heloc.monthsToPayoff === null
      ? "Not declining"
      : `${Math.floor(figures.heloc.monthsToPayoff / 12)} yr ${figures.heloc.monthsToPayoff % 12} mo`;

  return (
    <div className="nextmovemath-app homeward-app">
      <main>
        {/* Single Unified Header / Topbar */}
        <nav className="topbar">
          <div className="topbar-left">
            <a 
              className="brand" 
              href="#top" 
              onClick={(e) => handleTabChange("calculator", e)}
              aria-label="NextMoveMath home"
            >
              <span className="brand-mark">N</span>
              <span>NextMoveMath</span>
            </a>

            <div className="topbar-nav" role="navigation" aria-label="Main navigation">
              <button
                type="button"
                onClick={(e) => handleTabChange("calculator", e)}
                className={`nav-link ${currentTab === "calculator" ? "active" : ""}`}
              >
                Calculator
              </button>
              <button
                type="button"
                onClick={(e) => handleTabChange("guides", e)}
                className={`nav-link ${currentTab === "guides" ? "active" : ""}`}
              >
                Guides & Library
              </button>
              <button
                type="button"
                onClick={(e) => handleTabChange("methodology", e)}
                className={`nav-link ${currentTab === "methodology" ? "active" : ""}`}
              >
                Methodology
              </button>
              <button
                type="button"
                onClick={(e) => handleTabChange("about", e)}
                className={`nav-link ${currentTab === "about" ? "active" : ""}`}
              >
                About
              </button>
              <button
                type="button"
                onClick={(e) => handleTabChange("contact", e)}
                className={`nav-link ${currentTab === "contact" ? "active" : ""}`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Centered Country Selector */}
          <div className="topbar-center">
            <div className="country-switch-pill" role="group" aria-label="Select Country">
              <button
                type="button"
                onClick={() => setCountry?.("CA")}
                className={`country-btn ${!isUS ? "active" : ""}`}
                title="Canada: CAD, semi-annual compounding, Stress test (+2%), CMHC and transfer taxes"
              >
                <span>🇨🇦</span>
                <span>Canada</span>
              </button>
              <button
                type="button"
                onClick={() => setCountry?.("US")}
                className={`country-btn ${isUS ? "active" : ""}`}
                title="United States: USD, monthly compounding, DTI guidelines, PMI and escrow"
              >
                <span>🇺🇸</span>
                <span>United States</span>
              </button>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="topbar-actions">
            {currentTab === "calculator" ? (
              <>
                <button
                  type="button"
                  onClick={onShare}
                  className={`action-btn ${shareToast ? "copied" : ""}`}
                  title="Copy shareable link with your current calculation numbers"
                >
                  {shareToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{shareToast ? "Link Copied!" : "Share Move"}</span>
                </button>
                <button
                  type="button"
                  onClick={onPrint}
                  className="action-btn print-btn"
                  title="Print or save 1-page financial summary sheet to PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={(e) => handleTabChange("calculator", e)}
                className="action-btn print-btn cursor-pointer"
                title="Open interactive calculator"
              >
                <CalcIcon className="w-3.5 h-3.5" />
                <span>Open Calculator</span>
              </button>
            )}
          </div>
        </nav>

        {/* View Routing */}
        {currentTab === "guides" && (
          <EducationalGuides onGoToCalculator={() => handleTabChange("calculator")} isUS={isUS} />
        )}

        {currentTab === "methodology" && (
          <MethodologyView onGoToCalculator={() => handleTabChange("calculator")} />
        )}

        {currentTab === "about" && (
          <AboutView 
            onGoToCalculator={() => handleTabChange("calculator")}
            onGoToContact={() => handleTabChange("contact")}
          />
        )}

        {currentTab === "contact" && (
          <ContactView onGoToCalculator={() => handleTabChange("calculator")} />
        )}

        {currentTab === "calculator" && (
          <>
            {/* Hero Section */}
            <section className="hero" id="top">
          <div className="eyebrow">YOUR NEXT MOVE, MADE CLEAR</div>
          <h1>
            Buying a home should feel exciting.
            <span> The math shouldn’t ruin it.</span>
          </h1>
          {/* Hero Subtitle Card with Warm Background and Badge */}
          <div className="hero-subtitle-card">
            <div className="promise-header">
              <span className="promise-badge">
                <span className="promise-badge-dot" />
                PLAIN ENGLISH PROMISE
              </span>
            </div>
            <p>
              Traditional mortgage calculators only calculate a single payment in a vacuum. NextMoveMath calculates your real moving math in real time: 
              existing mortgage penalties, realtor commissions, bridge equity, closing adjustments, {isUS ? "DTI qualification guidelines" : "the Canadian stress test"}, and rental vacancy buffers—so you know your actual bottom line before making one of the biggest decisions of your life.
            </p>
          </div>

          {/* The 4 Quiet Costs That Catch People Off Guard */}
          <section className="explainers hero-explainers" id="plain-english-promise">
            <div className="explainer-intro">
              <span className="kicker">THE 4 QUIET COSTS</span>
              <h2>The numbers that usually catch people off guard.</h2>
              <p>NextMoveMath brings the quiet costs into the open, so the exciting part stays exciting.</p>
            </div>
            <div className="explainer-grid">
              <article>
                <span>01</span>
                <h3>Selling costs</h3>
                <p>
                  Commission, tax on commission, legal fees, discharge fees, mortgage penalties, and moving are all major costs to consider.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Closing costs</h3>
                <p>
                  Your down payment isn’t the only cash needed. Local tax, legal fees,
                  inspections, and other adjustments can arrive before the keys do.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>{isUS ? "DTI qualification" : "The stress test"}</h3>
                <p>
                  {isUS
                    ? "US conventional lenders evaluate Front-End DTI (≤28%) and Back-End DTI (≤36%–43%) across your housing and debt payments."
                    : "Canadian lenders check whether the mortgage fits at the higher of 5.25% or your contract rate plus 2%."}
                </p>
              </article>
              <article>
                <span>04</span>
                <h3>Rental reality</h3>
                <p>
                  Potential rent is only the beginning. Vacancy, insurance, maintenance, strata
                  or HOA costs, management, financing and taxes all affect what the property truly
                  contributes each month.
                </p>
              </article>
            </div>
          </section>

          {/* Top Banner Ad: Strategically placed between Quiet Costs and Path Picker */}
          {showHeroAd && (
            <div className={`homeward-ad-slot top-prime-ad ${inspectOutlines ? "inspected" : ""}`} style={{ margin: "24px auto 32px", maxWidth: "980px" }}>
              {inspectOutlines && (
                <div className="homeward-ad-label">
                  <span>📍 Ad Placement #1: Prime Pause Unit</span>
                  <span>High dwell view between Quiet Costs and Path Picker</span>
                </div>
              )}
              <AdBanner
                dataAdSlot="8392019482"
                dataAdClient={publisherId}
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                simulation={simulationMode}
                minHeight={120}
                creativeIndex={0}
                style={{ width: "100%", borderRadius: "14px", overflow: "hidden" }}
              />
            </div>
          )}

          <div className="path-picker" aria-label="Choose your situation">
            <p>First things first—what are you planning?</p>
            <div className="path-buttons">
              {paths.map((path, index) => (
                <button
                  key={path.id}
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
                  <h3>Two ways to finance your next home (Quick pros & cons)</h3>
                  <p>
                    We help you figure out financing in a few simple ways. Here’s a quick look at the pros and cons of both options so you can pick what fits your next move best:
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
                      <strong>Best for:</strong> Buyers seeking predictable monthly payments, automatic equity growth, and long-term stability.
                    </p>
                    <ul className="card-points">
                      <li>
                        <span className="icon">✓</span>
                        <span>Principal & interest paid down in every scheduled payment</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>Predictable term with defined amortization (e.g., 25–30 yrs)</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>Qualifies under {isUS ? "standard DTI guidelines" : "the Canadian stress test"}</span>
                      </li>
                      <li className="warn">
                        <span className="icon">•</span>
                        <span>Prepayment limits and lender discharge/breakage penalties apply</span>
                      </li>
                    </ul>
                  </article>

                  {/* Option 2: HELOC (Home Equity Line of Credit) */}
                  <article className="financing-card">
                    <div className="card-top">
                      <div>
                        <span className="card-tag">Flexible Revolving Credit</span>
                        <h4>HELOC <span className="full-name">(Home Equity Line of Credit)</span></h4>
                      </div>
                    </div>
                    <p className="card-suited">
                      <strong>Best for:</strong> Homeowners with existing equity who want flexible payment options, completing home renovations, consolidating high-interest debt, etc.
                    </p>
                    <ul className="card-points">
                      <li>
                        <span className="icon">✓</span>
                        <span>Interest-only minimum payments keep immediate carrying costs low</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>The less you owe, the more available credit you have at any time—with instant access via online banking or debit</span>
                      </li>
                      <li>
                        <span className="icon">✓</span>
                        <span>Pay off partial or the full principal anytime with no penalties</span>
                      </li>
                      <li className="warn">
                        <span className="icon">•</span>
                        <span>Variable interest rates; balance won't decrease unless extra is paid</span>
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
                    hint="Your lender can provide the exact amount."
                  />
                </div>
                <details>
                  <summary>
                    Additional selling costs <span className="text-xs text-slate-500 font-normal ml-1.5">(Legal, repairs & staging, moving)</span>
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
                      <p>Start with the property, its equity, and what a realistic rental could bring in.</p>
                    </div>
                  </div>
                  <div className="field-grid three-col">
                    <TextField
                      label="City, province/state, or ZIP/postal code"
                      value={propertyLocation}
                      onChange={setPropertyLocation}
                      placeholder="Kelowna, BC or Seattle, WA"
                    />
                    <SelectField
                      label="Property type"
                      value={propertyType}
                      onChange={setPropertyType}
                      options={["Detached home", "Townhome", "Condo", "Duplex", "Other"]}
                    />
                    <NumericField
                      label="Approx. square feet"
                      value={squareFeet}
                      onChange={setSquareFeet}
                      prefix=""
                      suffix="sq. ft."
                      step={50}
                    />
                    <NumericField
                      label="Bedrooms"
                      value={bedrooms}
                      onChange={setBedrooms}
                      prefix=""
                      step={1}
                    />
                    <NumericField
                      label="Bathrooms"
                      value={bathrooms}
                      onChange={setBathrooms}
                      prefix=""
                      step={0.5}
                    />
                    <NumericField
                      label="Estimated current value"
                      value={salePrice}
                      onChange={setSalePrice}
                      hint="Use a recent appraisal or conservative local estimate for now."
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
                      hint={`Estimated room currently: ${money.format(figures.estimatedHelocRoom)}`}
                    />
                    <NumericField
                      label="HELOC rate"
                      value={currentHelocRate}
                      onChange={setCurrentHelocRate}
                      prefix=""
                      suffix="%"
                      step={0.05}
                      hint="Usually variable and often tied to lender prime."
                    />
                  </div>
                  <div
                    className={`market-data-note ${
                      figures.estimatedHelocRoom > 0 ? "good" : "watch"
                    }`}
                  >
                    <div>
                      <span className="kicker">EQUITY CHECK</span>
                      <strong>{money.format(figures.estimatedHelocRoom)} estimated HELOC room</strong>
                      <p>
                        Conservative illustration using a 65% property-value ceiling less the mortgage
                        owing. Your lender’s appraisal, product structure and approval rules decide the
                        real amount.
                      </p>
                    </div>
                    <span className="data-status">Planning estimate</span>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-heading">
                    <span>02</span>
                    <div>
                      <h2>Your rental picture</h2>
                      <p>
                        Use a local rent estimate today. Later, this property profile can power live
                        nearby comparisons.
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
                  <div className="market-data-note">
                    <div>
                      <span className="kicker">LOCAL MARKET DATA</span>
                      <strong>
                        {propertyType} · {bedrooms} bed · {bathrooms} bath ·{" "}
                        {squareFeet.toLocaleString()} sq. ft.
                      </strong>
                      <p>
                        {propertyLocation || "Add a location"} — live sold-property and rental
                        comparisons need a licensed, reliable data source. The form is ready; until
                        connected, every market estimate remains clearly editable.
                      </p>
                    </div>
                    <span className="data-status">Data connection next</span>
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
                    <p>Fill in the info below and watch our calculator update instantly!</p>
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
                      hint={`Net sale equity: ${money.format(figures.netSale)}. Estimated cash remaining in your bank after closing: ${money.format(figures.cashAfterMove)}.`}
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
                        hint="Usually variable and often tied to lender prime."
                      />
                      <NumericField
                        label="Planned monthly payment"
                        value={helocPayment}
                        onChange={setHelocPayment}
                        step={50}
                        hint="Paying only interest will not reduce the balance."
                      />
                    </>
                  )}
                </div>
                <details>
                  <summary>
                    Additional purchase costs <span className="text-xs text-slate-500 font-normal ml-1.5">(Legal, inspection, local taxes)</span>
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
                      hint="Enter a local estimate—this can vary by province, state, municipality, property, and buyer."
                    />
                  </div>
                </details>

                {/* 5-Year Equity & Debt Horizon Dedicated Dropdown */}
                {figures.mortgage > 0 && financing === "mortgage" && (
                  <details className="horizon-details">
                    <summary>
                      5-Year Equity & Debt Horizon <span className="text-xs text-slate-500 font-normal ml-1.5">(Principal paid, interest & projected equity at 5 years)</span>
                    </summary>
                    <div className="horizon-dropdown-content">
                      <div className="horizon-stats-grid">
                        <div className="horizon-stat-box">
                          <span className="label">Principal Paid</span>
                          <span className="value">{money.format(figures.fiveYearPrincipalPaid)}</span>
                        </div>
                        <div className="horizon-stat-box">
                          <span className="label">Interest Paid</span>
                          <span className="value">{money.format(figures.fiveYearInterestPaid)}</span>
                        </div>
                        <div className="horizon-stat-box">
                          <span className="label">Balance in 5 Yrs</span>
                          <span className="value">{money.format(figures.mortgageBalanceFiveYears)}</span>
                        </div>
                        <div className="horizon-stat-box highlight">
                          <span className="label">Projected Equity</span>
                          <span className="value">{money.format(figures.fiveYearHomeEquity)}</span>
                        </div>
                      </div>
                      <div className="horizon-progress-container">
                        <div className="horizon-progress-label">
                          <span>Principal vs Interest Split</span>
                          <span>{((figures.fiveYearPrincipalPaid / (figures.fiveYearPrincipalPaid + figures.fiveYearInterestPaid || 1)) * 100).toFixed(0)}% to Principal</span>
                        </div>
                        <div className="horizon-progress-bar">
                          <div
                            className="horizon-progress-fill"
                            style={{
                              width: `${Math.min(100, Math.max(5, (figures.fiveYearPrincipalPaid / (figures.fiveYearPrincipalPaid + figures.fiveYearInterestPaid || 1)) * 100))}%`
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
                    hint="Your total household income before tax for the year—we divide it by 12 for this monthly comparison."
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
                  const comfortStatus = totalShare <= 36 ? "good" : totalShare <= 44 ? "watch" : "high";
                  const statusLabel =
                    totalShare <= 36
                      ? "Comfortable planning range"
                      : totalShare <= 44
                      ? "Manageable but Tight"
                      : "Above Standard Lender Limits";

                  return (
                    <div className={`comfort-summary status-${comfortStatus}`}>
                      {/* Top Row: Aligned Gross Income and Monthly Expenses with Combined Total Commitments */}
                      <div className="comfort-topline-grid">
                        <div className="comfort-stat-card">
                          <span className="kicker">GROSS MONTHLY INCOME</span>
                          <strong className="amount-display">
                            {money.format(householdIncome / 12)}
                            <small>/mo</small>
                          </strong>
                          <span className="stat-subtext">Before taxes ({money.format(householdIncome)}/year)</span>
                        </div>

                        <div className="comfort-stat-card">
                          <span className="kicker">MONTHLY TOTAL EXPENSES</span>
                          <strong className="amount-display">
                            {money.format(figures.enteredMonthlyTotal)}
                            <small>/mo</small>
                          </strong>
                          <span className="stat-subtext font-semibold text-[#17312d]">
                            Housing ({money.format(figures.enteredHousingTotal)}) + Debts ({money.format(monthlyDebt)})
                          </span>
                          <span className="text-[11px] text-[#556963] mt-1 block leading-tight">
                            Includes Mortgage ({money.format(figures.selectedPayment)}) + Taxes ({money.format(propertyTax / 12)}) + Heating ({money.format(heating)}){condoFees > 0 ? ` + Strata (${money.format(condoFees)})` : ""}
                          </span>
                        </div>

                        <div className={`comfort-stat-card commitment-status-card ${comfortStatus}`}>
                          <span className="kicker">TOTAL COMMITMENTS</span>
                          <strong className="amount-display">
                            {totalShare.toFixed(1)}%
                            <small>of income</small>
                          </strong>
                          <div className={`comfort-status-pill ${comfortStatus}`}>
                            <span className="status-dot" />
                            <span>{statusLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Row: GDS and TDS Side-by-Side Informational Cards */}
                      <div className="dti-explanation-grid">
                        {/* GDS Card */}
                        <div className={`dti-card ${figures.gds <= (isUS ? 28 : 39) ? "good" : "watch"}`}>
                          <div className="dti-card-header">
                            <div>
                              <span className="dti-type-tag">HOUSING EXPENSE RATIO</span>
                              <h4>{isUS ? "Front-End DTI (Housing Ratio)" : "GDS (Gross Debt Service)"}</h4>
                            </div>
                            <div className="dti-ratio-badge">
                              <strong>{figures.gds.toFixed(1)}%</strong>
                              <small>{isUS ? "Lender Guide: ≤28%" : "Lender Guide: ≤39%"}</small>
                            </div>
                          </div>
                          <p className="dti-description">
                            {isUS
                              ? "The percentage of gross income allocated strictly to housing payments (mortgage principal, interest, taxes, insurance, and HOA). Most conventional lenders look for 28% or lower to ensure housing alone doesn't overwhelm your monthly budget."
                              : "The percentage of your pre-tax monthly income required to cover housing costs alone (mortgage P&I, property taxes, heating, and 50% of condo fees). Canadian lenders use 39% as the maximum benchmark to qualify you for a prime mortgage."}
                          </p>
                        </div>

                        {/* TDS Card */}
                        <div className={`dti-card ${figures.tds <= (isUS ? 43 : 44) ? "good" : "watch"}`}>
                          <div className="dti-card-header">
                            <div>
                              <span className="dti-type-tag">TOTAL DEBT COMMITMENT RATIO</span>
                              <h4>{isUS ? "Back-End DTI (Total Debt Ratio)" : "TDS (Total Debt Service)"}</h4>
                            </div>
                            <div className="dti-ratio-badge">
                              <strong>{figures.tds.toFixed(1)}%</strong>
                              <small>{isUS ? "Lender Guide: ≤36%–43%" : "Lender Guide: ≤44%"}</small>
                            </div>
                          </div>
                          <p className="dti-description">
                            {isUS
                              ? "The percentage of gross income needed to cover all housing costs PLUS all other monthly debt obligations (car loans, credit cards, student debt). Lenders use back-end DTI to set your ultimate qualification ceiling."
                              : "The percentage of your pre-tax monthly income needed to cover your housing costs PLUS all other monthly debt obligations (car loans, student loans, credit card balances, lines of credit). In Canada, 44% is the hard ceiling for prime mortgage approval."}
                          </p>
                        </div>
                      </div>

                      {/* Visual Dynamic Correlation Gauge */}
                      <div
                        className="comfort-track"
                        aria-label={`Total commitments are ${totalShare.toFixed(1)} percent of gross income`}
                      >
                        <span className="comfort-divider first" aria-hidden="true" />
                        <span className="comfort-divider second" aria-hidden="true" />
                        <i
                          style={{
                            left: `${Math.min(100, Math.max(0, totalShare))}%`,
                            background: comfortStatus === "good" ? "#2e7450" : comfortStatus === "watch" ? "#d97706" : "#dc2626",
                          }}
                        />
                      </div>
                      <div className="comfort-scale">
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
                          <strong>Above standard lender limits</strong>
                          <small>44–100%</small>
                        </span>
                      </div>
                      <p>
                        A practical planning target is around 32% or less for mortgage, property tax, heat and condo fees. 
                        Lender qualification guidelines ({isUS ? "28% Front / 36-43% Back DTI" : "39% GDS / 44% TDS"}) represent approval thresholds—not guarantees that a budget will feel comfortable.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Sticky Results Sidebar Column */}
          <div className="results-sidebar-column">
            {/* Separate Medium Sticky Top Ad (~95px - double previous slim size) */}
            {showSidebarAd && (
              <div className={`sticky-top-ad-card ${inspectOutlines ? "inspected" : ""}`}>
                {inspectOutlines && (
                  <div className="sidebar-ad-label">
                    <span>📍 Sticky Top Ad: 100% Active View Viewability</span>
                    <span>Directly above results card: ~150px high-yield display sponsor card</span>
                  </div>
                )}
                <div className="sticky-ad-box">
                  <AdBanner
                    dataAdSlot="3029184719"
                    dataAdClient={publisherId}
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    simulation={simulationMode}
                    size="large"
                    minHeight={148}
                    creativeIndex={2}
                    style={{ width: "100%", borderRadius: "10px", overflow: "hidden" }}
                  />
                </div>
              </div>
            )}

            <aside
              className={`results-panel ${mode === "rent" ? "rental-results-panel" : ""}`}
              aria-live="polite"
            >
              <div className="results-panel-header">
                <span className="results-label">YOUR ESTIMATE</span>
                {mode !== "sell" && (
                  <div className="results-financing-toggle" role="group" aria-label="Select Financing Type">
                    <button
                      type="button"
                      className={`toggle-option ${financing === "mortgage" ? "active" : ""}`}
                      onClick={() => setFinancing("mortgage")}
                    >
                      Mortgage
                    </button>
                  <button
                    type="button"
                    className={`toggle-option ${financing === "heloc" ? "active" : ""}`}
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
                <div className="big-number">{money.format(figures.netSale)}</div>
                <div className="quip">
                  {figures.netSale >= 300_000
                    ? "That equity came prepared."
                    : "Now you can plan with the real number."}
                </div>
                <div className="breakdown">
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
                <div className="breakdown purchase-breakdown">
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
                <div className="breakdown rental-breakdown">
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
                    <strong>{figures.helocLoanToValue.toFixed(1)}%</strong>
                    <small>
                      A standalone HELOC is generally limited to 65% of the new home’s value. A
                      combined mortgage-and-HELOC product may be structured differently.
                    </small>
                  </div>
                )}
                <div className="rental-cashflow-total">
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
                <div className="rent-final-payment">
                  <div className="final-payment-input">
                    <span>New home payment</span>
                    <strong>{money.format(figures.selectedPayment)}/mo</strong>
                  </div>
                  <div className="rent-final-result">
                    <p className="result-title">Final estimated monthly payment</p>
                    <div className="big-number">
                      {money.format(Math.max(0, figures.combinedMonthlyGap))}
                      <small>/mo</small>
                    </div>
                  </div>
                </div>
                <p className="stress-note">
                  Rental income treatment, HELOC approval and mortgage qualification vary by lender.
                  This is a planning view, not a qualification result.
                </p>
              </>
            ) : (
              <>
                <p className="result-title">
                  {financing === "mortgage"
                    ? "Estimated monthly mortgage"
                    : "Planned monthly HELOC payment"}
                </p>
                <div className="big-number">
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
                <div className="breakdown">
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
                      <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                        Includes estimated US PMI of ~{money.format(figures.pmiMonthly)}/mo (under 20% down payment).
                      </p>
                    )}
                    <p className="stress-note">
                      {isUS
                        ? `Standard qualifying rate evaluated at contract rate ${annualRate.toFixed(2)}%.`
                        : `Canadian stress-tested at ${figures.qualifyingRate.toFixed(2)}% (contract + 2%).`}
                    </p>
                  </>
                ) : (
                  <div
                    className={`heloc-limit ${
                      figures.mortgage <= figures.standaloneHelocLimit ? "good" : "watch"
                    }`}
                  >
                    <span>Estimated loan-to-value</span>
                    <strong>{figures.helocLoanToValue.toFixed(1)}%</strong>
                    <small>
                      {figures.mortgage <= figures.standaloneHelocLimit
                        ? `Within the general 65% standalone HELOC ceiling (${money.format(
                            figures.standaloneHelocLimit,
                          )} here). Approval still varies.`
                        : `Above the general 65% standalone HELOC ceiling (${money.format(
                            figures.standaloneHelocLimit,
                          )} here). A larger down payment or combined product may be needed.`}
                    </small>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </section>

        {/* SEO Scenario & FAQ Accordion Section */}
        <section className="faq-section" id="faqs">
          <div className="faq-header">
            <h2>Real Questions & Scenarios</h2>
          </div>

          <div className="faq-editorial-layout">
            <div className="faq-list">
              {[
                {
                  q: "How do I calculate net proceeds when selling and buying at the same time?",
                  a: "Your net equity isn't just your sale price minus your mortgage balance. NextMoveMath subtracts realtor commissions (and applicable sales tax), mortgage prepayment break penalties (typically 3 months interest or Interest Rate Differential), legal fees and title discharges, plus home staging or moving costs. The remainder is your true bridge down payment for your next home.",
                },
                {
                  q: "Can I keep my current home as a rental and pull equity out for my next down payment?",
                  a: "Yes. Homeowners frequently use a Home Equity Line of Credit (HELOC) or refinance up to 65%–80% of their existing home's value to fund their next down payment. However, you must account for rental vacancy buffers, property taxes, HOA/strata fees, and maintenance. Lenders typically only count 50%–70% of gross market rent toward your qualifying debt-service ratios.",
                },
                {
                  q: isUS ? "What is the standard Debt-to-Income (DTI) ratio in the United States?" : "What is the Canadian mortgage stress test (+2%)?",
                  a: isUS
                    ? "In the United States, conventional conforming mortgages (Fannie Mae & Freddie Mac) evaluate two metrics: Front-End DTI (housing costs shouldn't exceed 28% of gross income) and Back-End DTI (total debt payments including student loans, cars, and credit cards shouldn't exceed 36% to 43% of gross income)."
                    : "In Canada, federal rules (OSFI) require every borrower to qualify at the higher of 5.25% or their actual contract rate plus 2.0%. This ensures you could still afford your monthly payment if interest rates rise upon 5-year renewal.",
                },
                {
                  q: "What are the 'quiet closing costs' that catch buyers off guard?",
                  a: `Your down payment is only part of the cash required on closing day. Quiet costs include ${isUS ? "county transfer stamps, title insurance, escrow settlement fees" : "provincial land transfer taxes (PTT/LTT), legal disbursements, title insurance"}, home inspections, property tax adjustments, and utility hookups. These generally add 1.5% to 3.5% of the purchase price on top of your down payment.`,
                },
                {
                  q: "What is mortgage porting, and when does it make financial sense?",
                  a: "Porting allows you to transfer your existing mortgage interest rate, term, and balance from your current property to your new home. If your current rate is lower than prevailing market rates, porting saves you from paying thousands in prepayment break penalties. If you need more money, lenders usually provide a 'blend-and-extend' rate on the additional amount.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="faq-question-btn"
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-700 text-xl font-mono">{openFaq === idx ? "−" : "+"}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Editorial Side Ad Placement */}
            {showBottomAd && (
              <aside className="faq-sidebar-column">
                <div className={`faq-sidebar-ad-card ${inspectOutlines ? "inspected" : ""}`}>
                  {inspectOutlines && (
                    <div className="homeward-ad-label">
                      <span>📍 Scenario Partner Ad</span>
                      <span>High viewability beside active questions</span>
                    </div>
                  )}
                  <div className="faq-ad-box">
                    <span className="faq-sponsor-tag">Partner Rates & Resources</span>
                    <AdBanner
                      dataAdSlot="4920194821"
                      dataAdClient={publisherId}
                      dataAdFormat="auto"
                      dataFullWidthResponsive={true}
                      simulation={simulationMode}
                      minHeight={250}
                      creativeIndex={1}
                      style={{ width: "100%", borderRadius: "12px", overflow: "hidden" }}
                    />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>
        </>
        )}

        {/* Footer */}
        <footer>
          <div className="brand">
            <span className="brand-mark">N</span>
            <span>NextMoveMath</span>
          </div>
          <div className="footer-center">
            <p>
              Helpful estimates for planning—not a lending decision or financial advice. Local taxes
              and closing costs vary by province or state, municipality, property type, and buyer
              eligibility. Adjust any amount to match your situation and confirm final costs with your
              lawyer or notary, lender, and local authority.
            </p>
            {/* Dedicated AdSense Compliance & Navigation Links */}
            <div className="footer-links">
              <button
                type="button"
                onClick={(e) => handleTabChange("calculator", e)}
                className={`footer-link cursor-pointer ${currentTab === "calculator" ? "highlight font-bold" : ""}`}
              >
                Calculator
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleTabChange("guides", e)}
                className={`footer-link cursor-pointer ${currentTab === "guides" ? "highlight font-bold" : ""}`}
              >
                Educational Guides
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleTabChange("methodology", e)}
                className={`footer-link cursor-pointer ${currentTab === "methodology" ? "highlight font-bold" : ""}`}
              >
                Methodology
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleTabChange("about", e)}
                className={`footer-link cursor-pointer ${currentTab === "about" ? "highlight font-bold" : ""}`}
              >
                About Us
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleTabChange("contact", e)}
                className={`footer-link cursor-pointer ${currentTab === "contact" ? "highlight font-bold" : ""}`}
              >
                Contact
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleOpenCompliance("privacy", e)}
                className="footer-link highlight cursor-pointer"
                title="View Google AdSense compliant Privacy Policy"
              >
                Privacy Policy (Cookie Notice)
              </button>
              <span className="dot">·</span>
              <button
                type="button"
                onClick={(e) => handleOpenCompliance("terms", e)}
                className="footer-link cursor-pointer"
                title="View Terms of Service"
              >
                Terms of Service
              </button>
              <span className="dot">·</span>
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ color: "#60746d" }}
                title="Google Ad Personalization Settings"
              >
                Ad Choices ↗
              </a>
              <span className="dot">·</span>
              <a
                href="/nextmovemath-source.zip"
                download="nextmovemath-source.zip"
                className="footer-link"
                style={{ color: "#2e7450", fontWeight: 700 }}
                title="Download complete production package (Vercel & Namecheap ready)"
              >
                📦 Download Code (Vercel Ready)
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCountry?.(isUS ? "CA" : "US")}
            className="footer-jurisdiction cursor-pointer hover:text-emerald-700 transition-colors"
            title="Click to toggle country"
          >
            {isUS ? "Active: 🇺🇸 United States (Switch to 🇨🇦 Canada)" : "Active: 🇨🇦 Canada (Switch to 🇺🇸 United States)"}
          </button>
        </footer>

        {/* Dedicated Clean Print Sheet (Visible ONLY when printing / saving PDF) */}
        <section className="print-only-summary" aria-hidden="true">
          <div className="print-header">
            <div>
              <h1>NextMoveMath — Financial Planning Summary</h1>
              <p style={{ margin: "4px 0 0", color: "#4b5563", fontSize: "13px" }}>
                Target Scenario: {paths.find((p) => p.id === mode)?.label} · Jurisdiction: {isUS ? "United States (USD)" : "Canada (CAD)"}
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: "12px", color: "#6b7280" }}>
              Printed: {new Date().toLocaleDateString(isUS ? "en-US" : "en-CA", { dateStyle: "long" })}
            </div>
          </div>

          <div className="print-section">
            <h2 style={{ fontSize: "16px", marginBottom: "10px", color: "#111827", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
              Key Financial Figures
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
                    <span>Financed Mortgage Amount</span>
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
                    <span>Mortgage Payout Balance</span>
                    <strong>{money.format(mortgageOwing)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Total Selling Costs (Realtor + Legal)</span>
                    <strong>{money.format(figures.sellingCosts)}</strong>
                  </div>
                  <div className="print-box">
                    <span>Net Equity Available</span>
                    <strong>{money.format(figures.netSale)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {figures.mortgage > 0 && (
            <div className="print-section">
              <h2 style={{ fontSize: "16px", marginBottom: "10px", color: "#111827", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
                5-Year Horizon Breakdown ({annualRate.toFixed(2)}% over {amortization} Yrs)
              </h2>
              <div className="print-grid">
                <div className="print-box">
                  <span>5-Year Principal Paid Off</span>
                  <strong>{money.format(figures.fiveYearPrincipalPaid)}</strong>
                </div>
                <div className="print-box">
                  <span>5-Year Total Interest Paid</span>
                  <strong>{money.format(figures.fiveYearInterestPaid)}</strong>
                </div>
                <div className="print-box">
                  <span>Mortgage Balance at Year 5</span>
                  <strong>{money.format(figures.mortgageBalanceFiveYears)}</strong>
                </div>
                <div className="print-box">
                  <span>Total Projected Equity (Down + Principal)</span>
                  <strong>{money.format(figures.fiveYearHomeEquity)}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="print-disclaimer">
            <strong>Planning Disclaimer:</strong> NextMoveMath provides mathematical illustrations for consumer planning. Actual mortgage approval, rates, mortgage insurance, and legal costs must be formally verified with a licensed broker, lender, and attorney.
          </div>
        </section>

        {/* Dedicated Compliance Pages Modal */}
        <ComplianceModal
          isOpen={complianceModalOpen}
          page={compliancePage}
          onClose={() => setComplianceModalOpen(false)}
          onSelectPage={(p) => setCompliancePage(p)}
        />
      </main>
    </div>
  );
}
