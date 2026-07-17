import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Merchant from '@/models/Merchant';
import AwinCommissionSyncJob from '@/models/AwinCommissionSyncJob';
import {
  buildAwinCommissionCandidateQuery,
  normalizeAwinCommissionLimit,
  normalizeStaleHours,
  serializeAwinCommissionJob,
} from '@/lib/awin/commission-sync';

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

export async function POST(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    await dbConnect();

    // Check if running job already exists
    const runningJob = await AwinCommissionSyncJob.findOne({ status: 'running' });
    if (runningJob) {
      return jsonError('A commission sync job is already running.', 400);
    }

    const payload = await request.json().catch(() => ({}));
    const staleHours = normalizeStaleHours(payload.staleHours ?? 24);
    const limit = normalizeAwinCommissionLimit(payload.limit ?? 20);

    const query = buildAwinCommissionCandidateQuery(staleHours);
    const total = await Merchant.countDocuments(query);

    const job = await AwinCommissionSyncJob.create({
      status: 'running',
      total,
      processed: 0,
      updated: 0,
      failed: 0,
      remaining: total,
      limit,
      staleHours,
      startedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: serializeAwinCommissionJob(job),
    });
  } catch (err) {
    console.error('POST /api/admin/awin/commissions/start error:', err);
    return jsonError(err.message || 'Failed to start commission sync job', 500);
  }
}
