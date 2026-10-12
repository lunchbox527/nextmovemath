export interface AdPreset {
  id: string;
  name: string;
  category: 'responsive' | 'fixed' | 'article' | 'sidebar' | 'mobile';
  width: number | string;
  height: number | string;
  adFormat: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
  fullWidthResponsive: boolean;
  description: string;
  recommendedPosition: string;
  avgCPM: string;
}

export interface AdSimulationCreative {
  id: string;
  brand: string;
  domain: string;
  headline: string;
  description: string;
  ctaText: string;
  accentColor: string;
  category: string;
  image?: string;
}

export interface AdSenseConfig {
  publisherId: string;
  defaultSlotId: string;
  liveScriptEnabled: boolean;
  simulationMode: boolean;
  preventCLS: boolean;
  testModeEnabled: boolean;
}
