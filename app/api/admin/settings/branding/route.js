import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getSiteBranding, saveSiteBranding, withLegacyBrandingAliases } from '@/lib/siteBranding';

const jsonError = (message, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ? String(session.user.role).toLowerCase() : '';
  if (!session?.user?.id || role !== 'admin') {
    return { error: true, response: jsonError('Unauthorized', 401) };
  }
  return { error: false, session };
}

export async function GET() {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    const branding = await getSiteBranding();

    return NextResponse.json({
      success: true,
      data: withLegacyBrandingAliases(branding),
    });
  } catch (error) {
    console.error('GET /api/admin/settings/branding error:', error);
    return jsonError('Unable to load branding settings.', 500);
  }
}

export async function POST(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    const payload = await request.json().catch(() => ({}));
    
    // Upload new base64 uploads to Cloudinary
    const { uploadDataUrl } = await import('@/lib/server/cloudinary');
    
    if (payload.logoUrl) {
      payload.logoUrl = await uploadDataUrl(payload.logoUrl, 'branding/logos');
    }
    if (payload.footerLogoUrl) {
      payload.footerLogoUrl = await uploadDataUrl(payload.footerLogoUrl, 'branding/logos');
    }
    if (payload.faviconUrl) {
      payload.faviconUrl = await uploadDataUrl(payload.faviconUrl, 'branding/favicons');
    }

    const branding = await saveSiteBranding(payload || {});

    return NextResponse.json({
      success: true,
      data: withLegacyBrandingAliases(branding),
    });
  } catch (error) {
    console.error('POST /api/admin/settings/branding error:', error);
    return jsonError('Unable to save branding settings.', 500);
  }
}
