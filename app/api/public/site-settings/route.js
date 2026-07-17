import { NextResponse } from 'next/server';
import { getSiteBranding, withLegacyBrandingAliases } from '@/lib/siteBranding';

export async function GET() {
  const branding = await getSiteBranding();
  return NextResponse.json(withLegacyBrandingAliases(branding));
}
