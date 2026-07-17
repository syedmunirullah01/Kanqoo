import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Link from '@/models/Link';

const DEFAULT_LIMIT = 5;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  await dbConnect();
  const affiliateId = session.user.id;

  try {
    const links = await Link.find({ affiliateId })
      .sort({ createdAt: -1 })
      .limit(DEFAULT_LIMIT)
      .lean();

    const payload = links.map((link) => ({
      id: link._id?.toString() || link.shortId,
      name: link.merchantInfo?.name || link.trackingParams?.campaign || 'Untitled link',
      clicks: link.clickCount ?? 0,
      conversions: link.conversions ?? 0,
      earnings: link.earnings ?? '—',
      status: link.isActive ? 'active' : 'paused',
      url: link.destinationUrl || link.originalUrl,
      createdAt: link.createdAt?.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.error('GET /api/publisher/recent-links error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unable to load recent links' },
      { status: 500 }
    );
  }
}
