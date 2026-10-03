import { AdPreset, AdSimulationCreative } from '../types/ad';

export const AD_PRESETS: AdPreset[] = [
  {
    id: 'auto-responsive',
    name: 'Auto Responsive (Default)',
    category: 'responsive',
    width: '100%',
    height: 'auto',
    adFormat: 'auto',
    fullWidthResponsive: true,
    description: 'Google AdSense dynamically selects optimal size based on container width & device screen.',
    recommendedPosition: 'Header, Between Content Paragraphs, Above Footer',
    avgCPM: '$2.80 - $6.50'
  },
  {
    id: 'leaderboard-728',
    name: 'Leaderboard (728 × 90)',
    category: 'fixed',
    width: 728,
    height: 90,
    adFormat: 'horizontal',
    fullWidthResponsive: false,
    description: 'The standard horizontal desktop ad unit. High viewability when positioned directly above main content.',
    recommendedPosition: 'Top of page, below site header navigation',
    avgCPM: '$3.20 - $7.10'
  },
  {
    id: 'billboard-970',
    name: 'Large Leaderboard / Billboard (970 × 250)',
    category: 'fixed',
    width: 970,
    height: 250,
    adFormat: 'horizontal',
    fullWidthResponsive: false,
    description: 'Premium high-impact display unit for modern widescreen desktop monitors.',
    recommendedPosition: 'Top billboard position on high-traffic homepages',
    avgCPM: '$5.50 - $12.00'
  },
  {
    id: 'med-rectangle-300',
    name: 'Medium Rectangle (300 × 250)',
    category: 'article',
    width: 300,
    height: 250,
    adFormat: 'rectangle',
    fullWidthResponsive: false,
    description: 'Highest performing ad unit across both desktop and mobile devices according to Google benchmarks.',
    recommendedPosition: 'Embedded naturally within body text or right sidebar',
    avgCPM: '$4.10 - $9.20'
  },
  {
    id: 'large-rectangle-336',
    name: 'Large Rectangle (336 × 280)',
    category: 'article',
    width: 336,
    height: 280,
    adFormat: 'rectangle',
    fullWidthResponsive: false,
    description: 'Yields higher ad inventory demand than 300x250 due to increased visual engagement.',
    recommendedPosition: 'End of article, before comments or related posts',
    avgCPM: '$4.80 - $10.50'
  },
  {
    id: 'half-page-300',
    name: 'Half Page / Skyscraper (300 × 600)',
    category: 'sidebar',
    width: 300,
    height: 600,
    adFormat: 'vertical',
    fullWidthResponsive: false,
    description: 'Massive screen real estate, ideal for sticky sidebars. Highest dwell-time and advertiser bid rates.',
    recommendedPosition: 'Sticky sidebar adjacent to long-form reading content',
    avgCPM: '$6.00 - $14.50'
  },
  {
    id: 'mobile-banner-320',
    name: 'Mobile Leaderboard (320 × 50)',
    category: 'mobile',
    width: 320,
    height: 50,
    adFormat: 'horizontal',
    fullWidthResponsive: false,
    description: 'Compact mobile header or sticky footer unit. Low intrusion with reliable fill rates.',
    recommendedPosition: 'Mobile top header or fixed bottom screen anchor',
    avgCPM: '$1.90 - $4.20'
  },
  {
    id: 'large-mobile-320',
    name: 'Large Mobile Banner (320 × 100)',
    category: 'mobile',
    width: 320,
    height: 100,
    adFormat: 'horizontal',
    fullWidthResponsive: false,
    description: 'Twice the height of standard mobile banner. Excellent balance between revenue and readability.',
    recommendedPosition: 'Mobile content breaks or below first article paragraph',
    avgCPM: '$3.40 - $6.80'
  },
  {
    id: 'fluid-in-article',
    name: 'In-Article Fluid Native',
    category: 'article',
    width: '100%',
    height: 'auto',
    adFormat: 'fluid',
    fullWidthResponsive: true,
    description: 'Seamlessly matches publisher typography, margin width, and editorial aesthetic.',
    recommendedPosition: 'Every 350-400 words inside long editorial content',
    avgCPM: '$3.90 - $8.40'
  }
];

export const SAMPLE_AD_CREATIVES: AdSimulationCreative[] = [
  {
    id: 'creative-cloud',
    brand: 'Vantage Cloud Platform',
    domain: 'vantage-cloud.io',
    headline: 'Deploy High-Concurrency Microservices with Zero Cold Starts',
    description: 'Accelerate next-generation web apps with managed serverless clusters and sub-millisecond edge KV cache.',
    ctaText: 'Start Free Trial',
    accentColor: '#0284c7',
    category: 'Cloud Infrastructure',
    image: '/src/assets/images/ad_creative_cloud_1790734675216.jpg'
  },
  {
    id: 'creative-developer',
    brand: 'Synthetix Developer Suite',
    domain: 'synthetix.dev',
    headline: 'Ship TypeScript 4x Faster with Instant CI/CD & Auto-Testing',
    description: 'Unified toolchain for Next.js, Vite, and Node. Native static analysis and real-time dependency audits.',
    ctaText: 'Explore Docs',
    accentColor: '#d97706',
    category: 'Developer Tools',
    image: '/src/assets/images/ad_creative_developer_1790734687408.jpg'
  },
  {
    id: 'creative-observability',
    brand: 'MetricPulse Telemetry',
    domain: 'metricpulse.com',
    headline: 'Real User Monitoring & Core Web Vitals Tracking for Modern Web',
    description: 'Pinpoint FID, LCP, and CLS layout shifts down to the exact DOM element before users bounce.',
    ctaText: 'View Live Demo',
    accentColor: '#059669',
    category: 'Web Performance'
  }
];
