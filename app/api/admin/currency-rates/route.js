import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CurrencyRate from '@/models/CurrencyRate';

function normalizeRatesInput(rates) {
  if (!rates || typeof rates !== 'object') {
    return null;
  }

  const normalized = {};
  Object.entries(rates).forEach(([key, value]) => {
    if (!key) return;
    const upperKey = key.toUpperCase();
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
      normalized[upperKey] = numeric;
    }
  });

  if (!normalized.USD) {
    normalized.USD = 1;
  }

  return normalized;
}

export async function GET() {
  try {
    await dbConnect();
    const latest = await CurrencyRate.findOne().sort({ updatedAt: -1 }).lean();

    if (!latest) {
      return NextResponse.json({
        success: true,
        data: {
          baseCurrency: 'USD',
          rates: { USD: 1 },
        },
      });
    }

    const rates = latest.rates instanceof Map ? Object.fromEntries(latest.rates.entries()) : latest.rates;
    if (!rates.USD) {
      rates.USD = 1;
    }

    return NextResponse.json({
      success: true,
      data: {
        baseCurrency: latest.baseCurrency || 'USD',
        rates,
        updatedAt: latest.updatedAt,
      },
    });
  } catch (error) {
    console.error('GET /api/admin/currency-rates error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load currency rates',
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { baseCurrency = 'USD', rates } = body;

    const normalizedRates = normalizeRatesInput(rates);
    if (!normalizedRates) {
      return NextResponse.json({
        success: false,
        error: 'Invalid rates payload',
      }, { status: 400 });
    }

    const document = new CurrencyRate({
      baseCurrency: (baseCurrency || 'USD').toUpperCase(),
      rates: normalizedRates,
      metadata: body.metadata || { source: 'manual' },
    });

    await document.save();

    return NextResponse.json({
      success: true,
      data: {
        baseCurrency: document.baseCurrency,
        rates: Object.fromEntries(document.rates),
        updatedAt: document.updatedAt,
      },
    });
  } catch (error) {
    console.error('PUT /api/admin/currency-rates error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update currency rates',
    }, { status: 500 });
  }
}
