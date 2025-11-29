'use client';

import type { Campaign } from '@/types/database';
import { mockCampaigns } from '@/lib/mock-data';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

let campaignsPromise: Promise<Campaign[]> | null = null;
const campaignPromises = new Map<string, Promise<Campaign | undefined>>();

export function getCampaigns() {
  if (!campaignsPromise) {
    campaignsPromise = (async () => {
      await delay();
      return mockCampaigns;
    })();
  }

  return campaignsPromise;
}

export function getCampaignBySlug(slug: string) {
  if (!campaignPromises.has(slug)) {
    campaignPromises.set(
      slug,
      (async () => {
        const campaigns = await getCampaigns();
        return campaigns.find((campaign) => campaign.slug === slug);
      })()
    );
  }

  return campaignPromises.get(slug)!;
}
