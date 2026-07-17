// app/api/admin/merchants/route.js
'use server';

import { NextResponse } from 'next/server';
import adapterManager from '@/lib/adapters/adapter-manager';
import Merchant from '@/models/Merchant';
import dbConnect from '@/lib/mongodb';
import { getRakutenAccessToken } from '@/lib/rakuten-auth';

const PAGE_SIZE = 50;

/**
* GET: Fetch merchants from the database with server-side filtering and pagination.
* (No changes needed here)
*/
export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || PAGE_SIZE);
  const network = searchParams.get('network');
  const category = searchParams.get('category');
  const country = searchParams.get('country');
  const search = searchParams.get('search');

  try {
    // Build the MongoDB query object
    const query = { status: 'active' };
    if (network && network !== 'all') {
      query.network = network;
    }
    if (category && category !== 'all') {
      query.categories = { $regex: new RegExp(`^${category}$`, 'i') }; // Case-insensitive match
    }
    if (country && country !== 'all') {
      query.country = country;
    }
    if (search) {
      const searchRegex = { $regex: new RegExp(search, 'i') }; // Case-insensitive regex
      query.$or = [
        { name: searchRegex },
        { mid: searchRegex },
        { categories: searchRegex }
      ];
    }

    // Get total count for pagination
    const total = await Merchant.countDocuments(query);

    // Fetch paginated merchants
    const merchants = await Merchant.find(query)
      .sort({ name: 1 }) // Sort by name
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const normalizedMerchants = merchants.map((merchant) => {
      const shipsTo =
        Array.isArray(merchant.shipsTo) && merchant.shipsTo.length > 0
          ? merchant.shipsTo
          : merchant.raw?.policies?.international_capabilities?.ships_to || [];

      const resolvePartnershipStatus = () => {
        if (merchant.partnershipStatus) return merchant.partnershipStatus;
        if (merchant.canPartner === true) return 'available';
        if (merchant.canPartner === false) return 'not available';
        if (merchant.raw?.can_partner === true) return 'available';
        if (merchant.raw?.can_partner === false) return 'not available';
        return merchant.status || 'unknown';
      };

      return {
        ...merchant,
        shipsTo,
        partnershipStatus: resolvePartnershipStatus(),
      };
    });

    const hasMore = (page * limit) < total;

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      hasMore,
      data: normalizedMerchants,
    });

  } catch (error) {
    console.error('GET /api/admin/merchants error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
* POST: Trigger a sync of merchants from the specified network.
* (CHANGES APPLIED HERE)
*/
export async function POST(request) {
  await dbConnect();

  // We only support rakuten sync for now
  const network = 'rakuten';

  const reportToken = process.env.RAKUTEN_REPORT_TOKEN;
  if (!reportToken) {
    console.error('Missing Rakuten report token (RAKUTEN_REPORT_TOKEN).');
    return NextResponse.json({ error: 'Server configuration error: Missing Rakuten report token.' }, { status: 500 });
  }

  try {
    const { accessToken: bearerToken } = await getRakutenAccessToken();
    const credentials = {
      bearerToken,
      reportToken,
    };

    const adapter = adapterManager.getAdapter(network);

    // **CHANGE: Poora credentials object adapter ko pass karein**
    const result = await adapter.syncMerchants(credentials);

    return NextResponse.json({
      success: true,
      message: `Sync complete for ${network}.`,
      ...result
    });

  } catch (error) {
    console.error(`POST /api/admin/merchants (sync) error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
