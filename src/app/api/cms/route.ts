import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { resolveCmsContent } from '@/lib/cms/content-service';
import { getCampaignBySlug } from '@/lib/mock-data';
import { CmsContentType } from '@/lib/cms/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug') || undefined;
  const preview = draftMode().isEnabled;

  if (!type) {
    return NextResponse.json({ error: 'type is required' }, { status: 400 });
  }

  try {
    const campaign = slug ? getCampaignBySlug(slug) : undefined;
    const payload = await resolveCmsContent(type as CmsContentType, preview, slug, campaign);
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
