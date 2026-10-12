import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';

interface CodeGeneratorProps {
  publisherId: string;
  slotId: string;
}

export default function CodeGenerator({ publisherId, slotId }: CodeGeneratorProps) {
  const [activeFile, setActiveFile] = useState<'component' | 'layout' | 'usage' | 'privacy' | 'terms' | 'routeFix' | 'pagesRouter' | 'types'>('component');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const files = {
    component: {
      name: 'app/components/AdBanner.tsx',
      title: 'AdBanner Component (Exact & Enhanced)',
      language: 'tsx',
      description: 'The Next.js Client Component responsible for rendering the Google AdSense <ins> tag and triggering adsbygoogle.push({}).',
      code: `// app/components/AdBanner.tsx
'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  dataAdSlot: string;
  dataAdClient?: string;
  dataAdFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid' | string;
  dataFullWidthResponsive?: boolean | string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({
  dataAdSlot,
  dataAdClient = '${publisherId || 'ca-pub-1925679446000087'}',
  dataAdFormat = 'auto',
  dataFullWidthResponsive = 'true',
  style,
  className = ''
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense tag error:', err);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '1.5rem 0', ...style }} className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={typeof dataFullWidthResponsive === 'boolean' ? String(dataFullWidthResponsive) : dataFullWidthResponsive}
      />
    </div>
  );
}`
    },
    layout: {
      name: 'app/layout.tsx',
      title: 'Root Layout (Script Loading)',
      language: 'tsx',
      description: 'Inject the Google AdSense script asynchronously in your App Router root layout using next/script.',
      code: `// app/layout.tsx
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js AdSense Powered Application',
  description: 'Built with Next.js App Router and optimized Google AdSense',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script Tag */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId || 'ca-pub-1925679446000087'}"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}`
    },
    usage: {
      name: 'app/page.tsx',
      title: 'Your Homeward page.tsx (With Ads Placed)',
      language: 'tsx',
      description: 'Your exact Homeward page with AdBanner imported and placed right below the hero path picker and between sections.',
      code: `// app/page.tsx
"use client";

import { useMemo, useState } from "react";
// 1. Import your AdBanner component
import AdBanner from "./components/AdBanner";

// ... your existing mortgage and HELOC calculation functions ...

export default function Home() {
  // ... your existing states ...

  return (
    <main>
      {/* 2. Your Existing Navigation & Hero */}
      <nav className="topbar">...</nav>
      <section className="hero" id="top">...</section>

      {/* 3. YOUR FIRST AD PLACEMENT (Top Leaderboard Banner) */}
      <div style={{ maxWidth: '1080px', margin: '2rem auto', textAlign: 'center' }}>
        <AdBanner
          dataAdSlot="${slotId || '8291048291'}"
          dataAdClient="${publisherId || 'ca-pub-1925679446000087'}"
          dataAdFormat="horizontal"
          dataFullWidthResponsive={true}
        />
      </div>

      {/* 4. Your Calculator Shell */}
      <section className="calculator-shell">
        {/* ... form panel & results panel ... */}
      </section>

      {/* 5. YOUR SECOND AD PLACEMENT (Mid-Content Unit) */}
      <div style={{ maxWidth: '1080px', margin: '3rem auto', textAlign: 'center' }}>
        <AdBanner
          dataAdSlot="4920194821"
          dataAdClient="${publisherId || 'ca-pub-1925679446000087'}"
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
        />
      </div>

      {/* 6. Your Stories & Comparison Sections */}
      <section className="finance-comparison">...</section>
      <section className="explainers">...</section>

      {/* 7. YOUR THIRD AD PLACEMENT (Pre-Footer) */}
      <div style={{ maxWidth: '1080px', margin: '2rem auto', textAlign: 'center' }}>
        <AdBanner
          dataAdSlot="1938204821"
          dataAdClient="${publisherId || 'ca-pub-1925679446000087'}"
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
        />
      </div>

      <footer>...</footer>
    </main>
  );
}`
    },
    privacy: {
      name: 'app/privacy/page.tsx',
      title: 'Privacy Policy (Google AdSense Compliant)',
      language: 'tsx',
      description: 'Dedicated Next.js page required by Google AdSense policy, detailing third-party cookie usage, personalization opt-outs, and local computation.',
      code: `// app/privacy/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Homeward',
  description: 'How Homeward handles your data, local calculations, and Google AdSense cookie usage.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-[#17312d]">
      <Link href="/" className="text-xs font-bold text-[#ec715a] uppercase tracking-wider hover:underline">
        ← Back to Calculator
      </Link>
      <h1 className="text-4xl font-serif font-bold mt-4 mb-2">Privacy Policy</h1>
      <p className="text-xs text-[#60746d] mb-8">Last Updated: September 2026 · Compliant with Google AdSense Publisher Terms</p>

      {/* Mandatory Google AdSense Cookie Disclosure */}
      <div className="p-5 rounded-2xl bg-[#cfe8d8]/50 border border-[#2e7450]/30 my-6">
        <h2 className="text-sm font-bold text-[#2e7450] uppercase tracking-wider mb-2">
          Google AdSense & Third-Party Advertising Notice
        </h2>
        <p className="text-xs text-[#17312d] leading-relaxed mb-3">
          This site uses Google AdSense to display advertisements. Google’s partner policies require clear disclosure of how advertising cookies are utilized:
        </p>
        <ul className="list-disc pl-5 text-xs space-y-1.5 text-[#2c443e]">
          <li>Third party vendors, including Google, use cookies to serve ads based on a user’s prior visits to your website or other websites.</li>
          <li>Google’s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-[#ec715a] underline font-bold">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-[#ec715a] underline font-bold">aboutads.info</a>.</li>
        </ul>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[#2c443e]">
        <h2 className="text-xl font-serif font-bold text-[#17312d]">1. Local In-Browser Calculations</h2>
        <p>NextMoveMath does not transmit, collect, or store the mortgage amounts, house prices, income, or debt figures you enter. All mathematics run directly inside your web browser.</p>

        <h2 className="text-xl font-serif font-bold text-[#17312d]">2. Contact Information</h2>
        <p>If you have any questions regarding privacy or cookie consent, contact our team at privacy@nextmovemath.com.</p>
      </div>
    </main>
  );
}`
    },
    terms: {
      name: 'app/terms/page.tsx',
      title: 'Terms of Service',
      language: 'tsx',
      description: 'Formal user agreement with explicit financial and lending disclaimers.',
      code: `// app/terms/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — NextMoveMath',
  description: 'User terms, disclaimers, and mathematical modeling conditions for NextMoveMath.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-[#17312d]">
      <Link href="/" className="text-xs font-bold text-[#ec715a] uppercase tracking-wider hover:underline">
        ← Back to Calculator
      </Link>
      <h1 className="text-4xl font-serif font-bold mt-4 mb-2">Terms of Service</h1>
      <p className="text-xs text-[#60746d] mb-8">Effective Date: September 2026</p>

      <div className="p-5 rounded-2xl bg-[#ec715a]/10 border border-[#ec715a]/30 my-6">
        <h2 className="text-xs font-bold text-[#ec715a] uppercase tracking-wider mb-2">
          Educational & Planning Purpose Only
        </h2>
        <p className="text-xs text-[#17312d] leading-relaxed">
          NextMoveMath provides mathematical planning illustrations. The figures generated by this calculator do not constitute an offer to lend, a formal mortgage pre-approval, financial advice, or legal counsel.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[#2c443e]">
        <h2 className="text-xl font-serif font-bold text-[#17312d]">1. Independent Verification Required</h2>
        <p>Lending rules, stress test benchmarks, tax brackets, and interest rates fluctuate daily. Always verify your real numbers with your licensed broker or lender.</p>

        <h2 className="text-xl font-serif font-bold text-[#17312d]">2. Limitation of Liability</h2>
        <p>NextMoveMath and its operators assume no liability for contracts entered into based on planning simulations.</p>
      </div>
    </main>
  );
}`
    },
    routeFix: {
      name: 'app/components/AdSenseRouteHandler.tsx',
      title: 'Next.js Route Change Protection',
      language: 'tsx',
      description: 'Crucial fix for Next.js App Router: Prevents "All ins elements already have ads in them" when users navigate with client-side routing.',
      code: `// app/components/AdSenseRouteHandler.tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * On Next.js client-side navigation (next/link), Google AdSense does NOT automatically
 * re-scan new page DOM elements. This lightweight listener ensures newly mounted
 * ads are populated on route transitions safely.
 */
export default function AdSenseRouteHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Give Next.js DOM reconciliation 200ms to mount new components
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          const unpopulatedAds = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
          unpopulatedAds.forEach(() => {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          });
        }
      } catch (err) {
        // Tag already initialized or unmounted
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}`
    },
    pagesRouter: {
      name: 'pages/_app.tsx',
      title: 'Next.js Pages Router Setup',
      language: 'tsx',
      description: 'For older or hybrid Next.js projects using the Pages router directory.',
      code: `// pages/_app.tsx
import type { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId || 'ca-pub-1925679446000087'}"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}`
    },
    types: {
      name: 'types/adsbygoogle.d.ts',
      title: 'TypeScript Global Declaration',
      language: 'typescript',
      description: 'Provides clean TypeScript types for window.adsbygoogle so no ts-ignore or any errors are thrown.',
      code: `// types/adsbygoogle.d.ts
declare global {
  interface Window {
    adsbygoogle: {
      push: (params: Record<string, any>) => void;
      loaded?: boolean;
    }[];
  }
}

export {};`
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      zip.file('app/components/AdBanner.tsx', files.component.code);
      zip.file('app/layout.tsx', files.layout.code);
      zip.file('app/page.tsx', files.usage.code);
      zip.file('app/privacy/page.tsx', files.privacy.code);
      zip.file('app/terms/page.tsx', files.terms.code);
      zip.file('app/components/AdSenseRouteHandler.tsx', files.routeFix.code);
      zip.file('pages/_app.tsx', files.pagesRouter.code);
      zip.file('types/adsbygoogle.d.ts', files.types.code);
      zip.file('public/ads.txt', `google.com, ${publisherId.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
      zip.file(
        'README.md',
        `# Homeward + Google AdSense Integration Bundle\n\nConfigured for Publisher ID: ${publisherId}\nDefault Slot: ${slotId}\n\n## Included Files:\n1. app/components/AdBanner.tsx — The AdSense ad unit component\n2. app/layout.tsx — Google Script tags\n3. app/page.tsx — Homeward calculator with AdBanner units\n4. app/privacy/page.tsx — AdSense compliant Privacy Policy with cookie notice\n5. app/terms/page.tsx — Terms of Service and lending disclaimers\n6. public/ads.txt — Google AdSense domain ownership verification\n`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nextjs-adsense-bundle-${publisherId.replace('ca-pub-', '') || 'starter'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const current = files[activeFile];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">How to Add Ads to Your Existing Website</h2>
          <p className="text-xs text-slate-400 mt-1">
            Since you already have a website built, here are the ready-to-copy files to insert your Google AdSense banner into it.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? 'Creating ZIP...' : 'Download Files (.ZIP)'}</span>
        </button>
      </div>

      {/* 3 Step Beginner Walkthrough Card */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          3 Simple Steps to Add This to Your Website
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
            <span className="font-bold text-white block mb-1">Step 1: Save the AdBanner</span>
            <p className="text-slate-300">
              Create a file called <code className="text-emerald-300 font-mono">AdBanner.tsx</code> in your website's <code className="text-emerald-300 font-mono">components</code> folder, and copy the code below into it.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
            <span className="font-bold text-white block mb-1">Step 2: Add Google Script</span>
            <p className="text-slate-300">
              In your main layout file (<code className="text-emerald-300 font-mono">layout.tsx</code> or <code className="text-emerald-300 font-mono">_app.tsx</code>), add the Google AdSense script tag once.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
            <span className="font-bold text-white block mb-1">Step 3: Drop It in Any Page</span>
            <p className="text-slate-300">
              Wherever you want an ad to appear (e.g. top of your blog, sidebar, or footer), just write <code className="text-emerald-300 font-mono">&lt;AdBanner dataAdSlot="..." /&gt;</code>!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs & Code Viewer */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        {/* File Tabs Header */}
        <div className="flex items-center overflow-x-auto border-b border-slate-800 bg-slate-900/80 px-2 py-1.5">
          {Object.entries(files).map(([key, f]) => (
            <button
              key={key}
              onClick={() => setActiveFile(key as any)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap ${
                activeFile === key
                  ? 'bg-slate-800 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* File Description & Copy Bar */}
        <div className="px-5 py-3 bg-slate-900/40 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-semibold text-slate-200">{current.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{current.description}</p>
          </div>

          <button
            onClick={() => handleCopy(activeFile, current.code)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors shrink-0"
          >
            {copiedKey === activeFile ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed max-h-[500px]">
          <pre>
            <code>{current.code}</code>
          </pre>
        </div>
      </div>

      {/* Production Best Practices / Common Errors Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Core Web Vitals & Zero CLS</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Always set a minimum container height (<code className="text-sky-300">minHeight: 100px</code> or <code className="text-sky-300">aspect-ratio</code>) on parent wrappers. When AdSense injects the iframe asynchronously, having reserved space stops the page from jumping.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>Next.js Client Routing Caution</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            In standard Next.js navigation with <code className="text-amber-300">&lt;Link&gt;</code>, the page doesn't reload. If your ad component re-runs <code className="text-amber-300">adsbygoogle.push(&#123;&#125;)</code> on an already-filled tag, AdSense throws an unhandled error. Our <code className="text-amber-300">AdSenseRouteHandler</code> handles this cleanly.
          </p>
        </div>
      </div>
    </div>
  );
}
