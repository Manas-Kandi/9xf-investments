export type CmsContentSource = 'cms' | 'fallback';

export interface CmsEditorialContext {
  guidelines: string[];
  fallbackMessage?: string;
}

export interface CmsStep {
  title: string;
  description: string;
  icon?: 'shield' | 'wallet' | 'clock';
}

export interface CmsFaqItem {
  question: string;
  answer: string;
}

export interface LandingContent {
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stepsHeading: string;
  steps: CmsStep[];
  featuredHeading: string;
  moreHeading: string;
  riskTitle: string;
  riskParagraphs: string[];
  founderTitle: string;
  founderSubtitle: string;
  founderCtaLabel: string;
  founderCtaHref: string;
}

export interface HowItWorksContent {
  heroTitle: string;
  heroSubtitle: string;
  steps: CmsStep[];
  buyingTitle: string;
  buyingIntro: string;
  buyingBullets: string[];
  riskTitle: string;
  riskIntro: string;
  riskBullets: string[];
  faqHeading: string;
  faqs: CmsFaqItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface CampaignStoryContent {
  description: string;
  problem?: string;
  solution?: string;
  traction?: string;
  founderBio?: string;
  faqs?: CmsFaqItem[];
}

export interface CmsResolution<T> {
  data: T;
  source: CmsContentSource;
  context: CmsEditorialContext;
}

export type CmsContentType = 'landing' | 'howItWorks' | 'campaignStory';
