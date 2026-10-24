import React, { useState, useEffect, useCallback } from 'react';
import NextMoveMathCalculator from './components/NextMoveMathCalculator';
import { getGuideBySlug } from './data/siteContent.js';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  return cleaned || '/';
}

function getPageSeo(pathname: string): { title: string; description: string; canonical: string } {
  const base = 'https://nextmovemath.com';
  const clean = normalizePath(pathname);

  if (clean === '/guides') {
    return {
      title: 'Real Estate & Mortgage Math Guides Library | NextMoveMath',
      description:
        'Explore in-depth guides on the Canadian mortgage stress test, US DTI ratios, quiet closing costs, mortgage porting, bridge loans, and rental HELOC math.',
      canonical: `${base}/guides`,
    };
  }

  if (clean.startsWith('/guides/')) {
    const slug = clean.slice('/guides/'.length);
    const article = getGuideBySlug(slug);
    if (article) {
      return {
        title: article.seoTitle,
        description: article.metaDescription,
        canonical: `${base}/guides/${article.slug}`,
      };
    }
  }

  if (clean === '/methodology') {
    return {
      title: 'Calculation Methodology & Mortgage Formulas | NextMoveMath',
      description:
        'Review the exact mathematical formulas, semi-annual vs. monthly compounding equations, OSFI B-20 stress test rules, and CFPB DTI benchmarks powering NextMoveMath.',
      canonical: `${base}/methodology`,
    };
  }

  if (clean === '/about') {
    return {
      title: 'About NextMoveMath — Independent Real Estate Math Platform',
      description:
        'Learn why NextMoveMath was built to give Canadian and US homebuyers transparent, ad-supported moving math with zero lead-gen spam or lender bias.',
      canonical: `${base}/about`,
    };
  }

  if (clean === '/contact') {
    return {
      title: 'Contact & Editorial Support | NextMoveMath',
      description:
        'Questions about a mortgage formula, regional tax rule, or editorial guide? Contact the NextMoveMath team directly.',
      canonical: `${base}/contact`,
    };
  }

  if (clean === '/privacy-policy') {
    return {
      title: 'Privacy Policy & Cookie Disclosure | NextMoveMath',
      description:
        'Read the NextMoveMath Privacy Policy, client-side calculation privacy guarantee, and Google AdSense DoubleClick cookie & opt-out disclosures.',
      canonical: `${base}/privacy-policy`,
    };
  }

  if (clean === '/terms-of-service') {
    return {
      title: 'Terms of Service & Planning Disclaimers | NextMoveMath',
      description:
        'Review the NextMoveMath Terms of Service, educational planning disclaimers, and regional real estate calculation accuracy terms.',
      canonical: `${base}/terms-of-service`,
    };
  }

  return {
    title: 'NextMoveMath — Real Estate & Moving Math Calculator',
    description:
      'See what you can afford, what selling leaves you with, and what your next move actually costs with real mortgage stress testing and quiet closing costs.',
    canonical: `${base}/`,
  };
}

export default function App() {
  const [country, setCountry] = useState<'CA' | 'US'>('CA');
  const [publisherId] = useState<string>('ca-pub-1925679446000087');
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [inspectOutlines] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizePath(window.location.pathname);
  });

  // Sync URL query params, legacy ?tab= links, and browser back/forward navigation
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const c = urlParams.get('country');
      if (c === 'US' || c === 'CA') {
        setCountry(c);
      }
      if (urlParams.get('simulate') === 'true') {
        setSimulationMode(true);
      }

      // Support legacy ?tab= bookmarks by mapping cleanly to real URLs
      const legacyTab = urlParams.get('tab');
      if (legacyTab && normalizePath(window.location.pathname) === '/') {
        const tabMap: Record<string, string> = {
          guides: '/guides',
          methodology: '/methodology',
          about: '/about',
          contact: '/contact',
          privacy: '/privacy-policy',
          terms: '/terms-of-service',
        };
        if (tabMap[legacyTab]) {
          window.history.replaceState({}, '', tabMap[legacyTab]);
          setCurrentPath(tabMap[legacyTab]);
        }
      }
    } catch {
      // ignore
    }

    const onPopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Dynamically sync <title>, meta description, and <link rel="canonical"> on route change
  useEffect(() => {
    try {
      const seo = getPageSeo(currentPath);
      document.title = seo.title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', seo.description);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', seo.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seo.description);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', seo.canonical);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', seo.canonical);
    } catch {
      // ignore
    }
  }, [currentPath]);

  const handleNavigate = useCallback(
    (targetPath: string, e?: React.MouseEvent) => {
      if (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return; // allow normal new-tab / middle-click behavior
        }
        e.preventDefault();
      }

      const normalized = normalizePath(targetPath);
      try {
        const nextUrl = new URL(normalized, window.location.origin);
        if (country === 'US') {
          nextUrl.searchParams.set('country', 'US');
        }
        window.history.pushState({}, '', nextUrl.pathname + nextUrl.search);
      } catch {
        // fallback if history pushState restricted
      }
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [country],
  );

  const handleShare = () => {
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('country', country);
      navigator.clipboard.writeText(currentUrl.toString());
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3200);
    } catch {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#17312d] flex flex-col font-sans">
      <main className="flex-1 w-full mx-auto">
        <NextMoveMathCalculator
          publisherId={publisherId}
          simulationMode={simulationMode}
          inspectOutlines={inspectOutlines}
          country={country}
          setCountry={setCountry}
          onShare={handleShare}
          onPrint={handlePrint}
          shareToast={shareToast}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />
      </main>

      {shareToast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-[#17312d] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fade-in"
          role="status"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="text-xs">
            <strong className="block text-emerald-400 font-bold">Calculation Link Copied!</strong>
            <span className="text-slate-300">Share this link with your spouse, realtor, or mortgage broker.</span>
          </div>
        </div>
      )}
    </div>
  );
}
