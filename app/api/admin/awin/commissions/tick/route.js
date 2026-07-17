// app/api/admin/awin/commissions/tick/route.js
// VPS/Linux cron command (runs every minute):
// * * * * * flock -n /tmp/kanqoo-awin-commission.lock curl -s -X POST "http://127.0.0.1:3001/api/admin/awin/commissions/tick" -H "Authorization: Bearer YOUR_CRON_SECRET" >> /var/log/kanqoo-awin-commission.log 2>&1

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Merchant from '@/models/Merchant';
import AwinCommissionSyncJob from '@/models/AwinCommissionSyncJob';
import { fetchProgrammeDetails } from '@/lib/networks/awin/client';
import { normalizeProgrammeDetails } from '@/lib/networks/awin/normalizer';
import {
  buildAwinCommissionCandidateQuery,
  normalizeAwinCommissionLimit,
  serializeAwinCommissionJob,
} from '@/lib/awin/commission-sync';


const LOCK_DURATION_MS = 5 * 60 * 1000;

function getCredentials() {
  const oauthToken = process.env.AWIN_OAUTH_TOKEN || process.env.AWIN_ACCESS_TOKEN;
  const publisherId = process.env.AWIN_PUB_ID || process.env.AWIN_PUBLISHER_ID;

  if (!oauthToken) {
    throw new Error('Missing Awin OAuth token. Please define AWIN_OAUTH_TOKEN or AWIN_ACCESS_TOKEN.');
  }

  if (!publisherId) {
    throw new Error('Missing Awin Publisher ID. Please define AWIN_PUB_ID or AWIN_PUBLISHER_ID.');
  }

  return {
    oauthToken: oauthToken.trim(),
    publisherId: publisherId.trim(),
  };
}

async function authorizeTick(request) {
  const cronSecret = process.env.CRON_SECRET || process.env.INTERNAL_CRON_SECRET;
  const authorization = request.headers.get('authorization') || '';

  if (cronSecret) {
    if (authorization === `Bearer ${cronSecret}`) return { ok: true };
  }

  // Fallback in development or if header matches
  if (process.env.NODE_ENV !== 'production') {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role ? String(session.user.role).toLowerCase() : '';
    if (session?.user?.id && role === 'admin') {
      return { ok: true };
    }
  }

  if (cronSecret && authorization !== `Bearer ${cronSecret}`) {
    return { ok: false, status: 401, message: 'Unauthorized' };
  }

  return { ok: false, status: 503, message: 'Authorization configuration missing or invalid' };
}

export async function POST(request) {
  const auth = await authorizeTick(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.message }, { status: auth.status });
  }

  await dbConnect();

  const now = new Date();
  let job = await AwinCommissionSyncJob.findOneAndUpdate(
    {
      status: 'running',
      $or: [
        { lockedUntil: null },
        { lockedUntil: { $exists: false } },
        { lockedUntil: { $lte: now } },
      ],
    },
    { $set: { lockedUntil: new Date(now.getTime() + LOCK_DURATION_MS) } },
    { new: true, sort: { startedAt: -1 } }
  );

  if (!job) {
    const runningJob = await AwinCommissionSyncJob.findOne({ status: 'running' }).sort({ startedAt: -1 });
    const summary = serializeAwinCommissionJob(runningJob);
    return NextResponse.json({
      success: true,
      message: runningJob ? 'Job already processing' : 'No running job',
      job: summary,
    });
  }

  const batchLimit = normalizeAwinCommissionLimit(job.limit);
  const candidateQuery = buildAwinCommissionCandidateQuery(job.staleHours ?? null);
  let batchSize = 0;

  try {
    const credentials = getCredentials();

    const merchants = await Merchant.find(candidateQuery)
      .sort({ commissionLastFetchedAt: 1, commissionLastAttemptAt: 1, createdAt: 1 })
      .select('_id mid name commission returnDays averagePaymentTime commissionLastFetchedAt commissionFetchStatus commissionUnavailableReason commissionLastAttemptAt commissionRetryCount')
      .limit(batchLimit)
      .lean();

    batchSize = merchants.length;

    let successCount = 0;
    let failedCount = 0;

    if (batchSize > 0) {
      for (const merchant of merchants) {
        const advertiserId = String(merchant.mid || '').trim();
        if (!advertiserId) {
          failedCount++;
          continue;
        }

        try {
          const detail = await fetchProgrammeDetails(advertiserId, credentials);
          const normalized = detail ? normalizeProgrammeDetails(detail) : null;

          if (!normalized) {
            // mark commissionFetchStatus = "unavailable"
            await Merchant.updateOne(
              { _id: merchant._id },
              {
                $set: {
                  commissionFetchStatus: 'unavailable',
                  commissionUnavailableReason: 'No programme details returned',
                  commissionLastAttemptAt: new Date(),
                },
              }
            );
            failedCount++;
          } else {
            const updateFields = {
              commissionFetchStatus: 'fetched',
              commissionRetryCount: 0,
              commissionLastFetchedAt: new Date(),
              commissionLastAttemptAt: new Date(),
              commission: normalized.commission || merchant.commission || 'N/A',
              returnDays: normalized.returnDays || merchant.returnDays || '',
              averagePaymentTime: normalized.averagePaymentTime || merchant.averagePaymentTime || '',
              partnershipStatus: normalized.partnershipStatus || merchant.partnershipStatus || 'Joined',
              canPartner: normalized.canPartner ?? merchant.canPartner,
              isEnriched: true,
              lastEnrichedAt: new Date(),
            };

            if (normalized.description) updateFields.description = normalized.description;
            if (normalized.url) updateFields.url = normalized.url;
            if (normalized.logoUrl) updateFields.logoUrl = normalized.logoUrl;
            if (Array.isArray(normalized.categories) && normalized.categories.length) updateFields.categories = normalized.categories;
            if (Array.isArray(normalized.shipsTo) && normalized.shipsTo.length) updateFields.shipsTo = normalized.shipsTo;
            if (normalized.country) updateFields.country = normalized.country;
            if (normalized.raw) updateFields.rawDetails = normalized.raw;

            await Merchant.updateOne(
              { _id: merchant._id },
              { $set: updateFields }
            );
            successCount++;
          }
        } catch (error) {
          console.error(`[AwinCommissionSyncJob] Sync failed for merchant ${advertiserId}:`, error.message);
          const retryCount = (merchant.commissionRetryCount || 0) + 1;
          await Merchant.updateOne(
            { _id: merchant._id },
            {
              $set: {
                commissionFetchStatus: 'failed',
                commissionLastAttemptAt: new Date(),
                commissionRetryCount: retryCount,
                commissionUnavailableReason: error.message,
              },
            }
          );
          failedCount++;
        }
      }

      const remaining = await Merchant.countDocuments(candidateQuery);
      const nextStatus = remaining === 0 ? 'completed' : 'running';

      const update = {
        processed: job.processed + batchSize,
        updated: job.updated + successCount,
        failed: job.failed + failedCount,
        remaining,
        lastRunAt: new Date(),
        lockedUntil: null,
        error: '',
      };

      if (nextStatus === 'completed') {
        update.status = 'completed';
        update.completedAt = new Date();
      }

      job = await AwinCommissionSyncJob.findByIdAndUpdate(
        job._id,
        { $set: update },
        { new: true }
      );
    } else {
      // No merchants found to process, mark completed
      job = await AwinCommissionSyncJob.findByIdAndUpdate(
        job._id,
        {
          $set: {
            status: 'completed',
            processed: job.total,
            remaining: 0,
            lastRunAt: new Date(),
            completedAt: new Date(),
            lockedUntil: null,
            error: '',
          },
        },
        { new: true }
      );
    }

    const summary = serializeAwinCommissionJob(job);
    return NextResponse.json({
      success: true,
      message: job.status === 'completed' ? 'Awin commission sync completed' : 'Awin commission sync tick completed',
      job: summary,
    });
  } catch (error) {
    job = await AwinCommissionSyncJob.findByIdAndUpdate(
      job._id,
      {
        $set: {
          status: 'failed',
          lastRunAt: new Date(),
          lockedUntil: null,
          error: error?.message || 'Awin commission sync failed',
        },
        ...(batchSize > 0 ? { $inc: { failed: batchSize } } : {}),
      },
      { new: true }
    );

    console.error('POST /api/admin/awin/commissions/tick failed:', error);
    const summary = serializeAwinCommissionJob(job);
    return NextResponse.json(
      {
        success: false,
        error: job.error,
        job: summary,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return POST(request);
}
