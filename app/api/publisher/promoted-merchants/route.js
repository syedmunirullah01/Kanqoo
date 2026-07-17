import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Merchant from '@/models/Merchant';
import FeaturedMerchant from '@/models/FeaturedMerchant';

const DEFAULT_LIMIT = 4;

export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '', 10) || DEFAULT_LIMIT, 10);

    const featured = await FeaturedMerchant.find({ status: 'active' })
      .sort({ priority: 1, updatedAt: -1 })
      .limit(limit)
      .lean();

    if (featured.length === 0) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    const mids = featured.map(item => item.mid);
    const merchants = await Merchant.find({ mid: { $in: mids } }).lean();
    const merchantMap = new Map(merchants.map(merchant => [merchant.mid, merchant]));

    const data = featured.map(item => {
      const merchant = merchantMap.get(item.mid);
      return {
        mid: item.mid,
        headline: item.headline,
        summary: item.summary,
        badge: item.badge,
        category: item.category || merchant?.categories?.[0] || 'General',
        commission: item.commission || merchant?.commission || 'Contact us',
        logoUrl: item.logoUrl || merchant?.logoUrl || merchant?.logo || '',
        url: merchant?.url || merchant?.website || '',
        ctaText: item.ctaText || 'Promote now',
        priority: item.priority ?? 0
      };
    });

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('GET /api/publisher/promoted-merchants error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
