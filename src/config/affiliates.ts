/**
 * NextMoveMath — Affiliate & Partner Network Configuration
 * 
 * You can update these links anytime with your own affiliate tracking links
 * from networks like Impact.com, Fintel Connect, CJ Affiliate, Ratehub, LendingTree,
 * or direct private mortgage broker partnerships!
 */

export interface DirectBrokerSponsor {
  enabled: boolean;
  name: string;
  title: string;
  brokerage: string;
  location: string;
  phone: string;
  email: string;
  consultationUrl: string;
  avatarUrl?: string;
  badgeText?: string;
}

export interface AffiliateConfig {
  // Canadian Mortgage Comparison Network
  canadaRatesUrl: string;
  canadaRatesPartnerName: string;

  // US Mortgage Comparison Network
  usRatesUrl: string;
  usRatesPartnerName: string;

  // Reduced Commission Real Estate Partner
  realtorPartnerUrl: string;
  realtorPartnerName: string;

  // Direct Local Mortgage Broker Sponsor (Optional flat-fee sponsorship)
  directBroker: DirectBrokerSponsor;
}

export const AFFILIATE_CONFIG: AffiliateConfig = {
  // Canada comparison portal (Replace with your Fintel Connect / Impact / Ratehub / Nesto tracking link)
  canadaRatesUrl: "https://www.ratehub.ca/best-mortgage-rates",
  canadaRatesPartnerName: "National Canadian Mortgage Rate Network",

  // US comparison portal (Replace with your Impact.com / LendingTree / Credible tracking link)
  usRatesUrl: "https://www.lendingtree.com/home/mortgage/",
  usRatesPartnerName: "US LendingTree Partner Network",

  // Realtor commission savings partner (Replace with your Clever Real Estate / Redfin referral link)
  realtorPartnerUrl: "https://listwithclever.com/",
  realtorPartnerName: "Pre-Vetted Low Commission Realtor Network",

  // Direct Broker Sponsor Slot
  // Set enabled: true and fill in their info when a local broker pays you a monthly fee!
  directBroker: {
    enabled: false,
    name: "Marcus Vance",
    title: "Senior Accredited Mortgage Professional (AMP)",
    brokerage: "Apex Financial & Lending Group",
    location: "Licensed in BC & Ontario / Nationwide US",
    phone: "(800) 555-0199",
    email: "marcus@apexmortgagegroup.com",
    consultationUrl: "https://calendly.com/",
    badgeText: "⭐ Verified Partner Specialist",
  },
};
