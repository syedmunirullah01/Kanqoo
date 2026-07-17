import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import AwinCommissionSyncJob from '@/models/AwinCommissionSyncJob';
import { serializeAwinCommissionJob } from '@/lib/awin/commission-sync';

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

    await dbConnect();

    // Fetch the most recently started job
    const job = await AwinCommissionSyncJob.findOne().sort({ startedAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: serializeAwinCommissionJob(job),
    });
  } catch (err) {
    console.error('GET /api/admin/awin/commissions/status error:', err);
    return jsonError(err.message || 'Failed to fetch job status', 500);
  }
}
