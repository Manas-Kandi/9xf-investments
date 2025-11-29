import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.CMS_PREVIEW_SECRET;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const redirect = searchParams.get('redirect') || '/';

  if (!PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(redirect, req.url));
}
