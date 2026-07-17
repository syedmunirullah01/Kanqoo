// app/api/admin/awin/merchants/sync/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import adapterManager from '@/lib/adapters/adapter-manager';
import Merchant from '@/models/Merchant';
import Network from '@/models/Network';

function getCredentials() {
  const oauthToken = process.env.AWIN_OAUTH_TOKEN || process.env.AWIN_ACCESS_TOKEN;
  const publisherId = process.env.AWIN_PUB_ID || process.env.AWIN_PUBLISHER_ID;

  if (!oauthToken) {
    throw new Error('Missing Awin OAuth token. Please define AWIN_OAUTH_TOKEN or AWIN_ACCESS_TOKEN inside your environment variables.');
  }

  if (!publisherId) {
    throw new Error('Missing Awin Publisher ID. Please define AWIN_PUB_ID or AWIN_PUBLISHER_ID inside your environment variables.');
  }

  return {
    oauthToken: oauthToken.trim(),
    publisherId: publisherId.trim(),
  };
}

function normalizeForDb(merchant) {
  return {
    ...(merchant || {}),
    mid: String(merchant?.mid || '').trim(),
    network: 'awin',
    commission: merchant?.commission || 'N/A',
    lastSyncedAt: new Date(),
  };
}

export async function POST() {
  try {
    await dbConnect();

    const adapter = adapterManager.getAdapter('awin');
    const result = await adapter.syncMerchants(getCredentials());
    const merchants = Array.isArray(result.merchants) ? result.merchants : [];

    let bulkResult = { upsertedCount: 0, modifiedCount: 0 };

    if (merchants.length > 0) {
      const operations = merchants
        .map(normalizeForDb)
        .filter((merchant) => merchant.mid && merchant.name)
        .map((merchant) => ({
          updateOne: {
            filter: { mid: merchant.mid, network: 'awin' },
            update: {
              $set: merchant,
              $setOnInsert: {
                commissionLastFetchedAt: null,
              },
            },
            upsert: true,
          },
        }));

      if (operations.length > 0) {
        bulkResult = await Merchant.bulkWrite(operations, { ordered: false });
      }
    }

    const merchantCount = await Merchant.countDocuments({ network: 'awin' });
    await Network.updateMany(
      { adapter: 'awin', isActive: true },
      {
        $set: {
          status: 'connected',
          apiStatus: 'active',
          lastSync: new Date(),
          merchantCount,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({
      success: true,
      network: 'awin',
      totalRecordsParsed: result.totalRecordsParsed ?? result.total ?? merchants.length,
      totalSynced: merchants.length,
      nUpserted: bulkResult.upsertedCount || 0,
      nModified: bulkResult.modifiedCount || 0,
      merchantCount,
    });
  } catch (error) {
    console.error('Awin merchant sync failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
