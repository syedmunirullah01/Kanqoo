import { NextResponse } from 'next/server';
import adapterManager from '@/lib/adapters/adapter-manager';

function parseRequestBody(request) {
  return request.json().catch(() => ({}));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const currency = searchParams.get('currency') || 'USD';
  const networkCountry = searchParams.get('networkCountry') || 'all';
  const advertiser = searchParams.get('advertiser');
  const memberId = searchParams.get('memberId');

  try {
    const adapter = adapterManager.getAdapter('rakuten');
    const data = await adapter.getReportingData({
      startDate,
      endDate,
      currency,
      networkCountry,
      advertiser,
      memberId,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GET /api/admin/reporting error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load reporting data',
    }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await parseRequestBody(request);
  const { startDate, endDate } = body;

  const credentials = {
    reportToken: process.env.RAKUTEN_REPORT_TOKEN,
  };

  if (!credentials.reportToken) {
    console.error('Missing RAKUTEN_REPORT_TOKEN environment variable');
    return NextResponse.json({
      success: false,
      error: 'Server configuration error: missing Rakuten report token',
    }, { status: 500 });
  }

  try {
    const adapter = adapterManager.getAdapter('rakuten');
    const result = await adapter.syncClicksReports(credentials, { startDate, endDate });
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('POST /api/admin/reporting error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to sync reporting data',
    }, { status: 500 });
  }
}
