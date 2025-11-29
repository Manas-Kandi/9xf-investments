import {
  buildCampaignFallbackContent,
  editorialGuidelines,
  fallbackHowItWorksContent,
  fallbackLandingContent,
} from './fallback-content';
import {
  CampaignStoryContent,
  CmsContentType,
  CmsResolution,
  HowItWorksContent,
  LandingContent,
} from './types';
import { fetchCampaignStoryContent, fetchHowItWorksContent, fetchLandingContent } from './client';
import { Campaign } from '@/types/database';

export async function resolveLandingContent(preview: boolean): Promise<CmsResolution<LandingContent>> {
  const data = await fetchLandingContent(preview, fallbackLandingContent);
  return {
    data,
    source: data === fallbackLandingContent ? 'fallback' : 'cms',
    context: editorialGuidelines,
  };
}

export async function resolveHowItWorksContent(preview: boolean): Promise<CmsResolution<HowItWorksContent>> {
  const data = await fetchHowItWorksContent(preview, fallbackHowItWorksContent);
  return {
    data,
    source: data === fallbackHowItWorksContent ? 'fallback' : 'cms',
    context: editorialGuidelines,
  };
}

export async function resolveCampaignStoryContent(
  preview: boolean,
  slug: string,
  campaign?: Campaign,
): Promise<CmsResolution<CampaignStoryContent>> {
  const fallback = campaign ? buildCampaignFallbackContent(campaign) : undefined;
  const data = await fetchCampaignStoryContent(preview, slug, fallback || buildCampaignFallbackContent({
    // Defensive placeholder when campaign is missing
    id: '',
    company_name: slug,
    tagline: '',
    description: '',
    logo_url: '',
    cover_image_url: '',
    media_urls: [],
    founder_name: '',
    founder_bio: '',
    problem: '',
    solution: '',
    traction: '',
    min_investment: 0,
    max_investment_per_person: 0,
    target_amount: 0,
    amount_raised: 0,
    crowd_percentage: 0,
    status: 'draft',
    slug,
    created_at: '',
    updated_at: '',
  }));

  return {
    data,
    source: fallback && data !== fallback ? 'cms' : 'fallback',
    context: editorialGuidelines,
  };
}

export async function resolveCmsContent(type: CmsContentType, preview: boolean, slug?: string, campaign?: Campaign) {
  switch (type) {
    case 'landing':
      return resolveLandingContent(preview);
    case 'howItWorks':
      return resolveHowItWorksContent(preview);
    case 'campaignStory':
      if (!slug) throw new Error('slug is required for campaign story content');
      return resolveCampaignStoryContent(preview, slug, campaign);
    default:
      throw new Error('Unknown CMS content type');
  }
}
