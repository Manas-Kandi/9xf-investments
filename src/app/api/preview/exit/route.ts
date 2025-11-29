import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  draftMode().disable();
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get('redirect') || '/';
  return NextResponse.redirect(new URL(redirect, req.url));
}
