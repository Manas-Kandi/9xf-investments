import { editorialGuidelines } from './fallback-content';
import { CampaignStoryContent, HowItWorksContent, LandingContent } from './types';

interface ContentfulEntry<T> {
  fields: T;
}

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;

const hasCmsConfig = Boolean(SPACE && (DELIVERY_TOKEN || PREVIEW_TOKEN));

async function fetchContentfulEntries<T>(
  contentType: string,
  preview: boolean,
): Promise<ContentfulEntry<T>[]> {
  if (!hasCmsConfig) {
    throw new Error('CMS not configured');
  }

  const token = preview ? PREVIEW_TOKEN : DELIVERY_TOKEN;
  const host = preview ? 'preview.contentful.com' : 'cdn.contentful.com';

  if (!token) {
    throw new Error('Missing Contentful token');
  }

  const url = new URL(`https://${host}/spaces/${SPACE}/environments/${ENVIRONMENT}/entries`);
  url.searchParams.set('content_type', contentType);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: preview ? 0 : 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch CMS content: ${res.status}`);
  }

  const data = await res.json();
  return data.items || [];
}

function safeGet<T>(entries: ContentfulEntry<Partial<T>>[], fallback: T): T {
  if (!entries.length) return fallback;
  return { ...fallback, ...entries[0].fields } as T;
}

export async function fetchLandingContent(preview: boolean, fallback: LandingContent): Promise<LandingContent> {
  try {
    const entries = await fetchContentfulEntries<LandingContent>('landingPage', preview);
    return safeGet(entries, fallback);
  } catch (error) {
    console.warn('[CMS] Falling back to static landing content', error);
    return fallback;
  }
}

export async function fetchHowItWorksContent(
  preview: boolean,
  fallback: HowItWorksContent,
): Promise<HowItWorksContent> {
  try {
    const entries = await fetchContentfulEntries<HowItWorksContent>('howItWorks', preview);
    return safeGet(entries, fallback);
  } catch (error) {
    console.warn('[CMS] Falling back to static how-it-works content', error);
    return fallback;
  }
}

export async function fetchCampaignStoryContent(
  preview: boolean,
  slug: string,
  fallback: CampaignStoryContent,
): Promise<CampaignStoryContent> {
  try {
    const entries = await fetchContentfulEntries<CampaignStoryContent>('campaignStory', preview);
    const fromCms = entries.find((entry) => (entry.fields as { slug?: string }).slug === slug);
    return safeGet(fromCms ? [fromCms] : [], fallback);
  } catch (error) {
    console.warn('[CMS] Falling back to static campaign story', error);
    return fallback;
  }
}

export function getEditorialContext() {
  return editorialGuidelines;
}
