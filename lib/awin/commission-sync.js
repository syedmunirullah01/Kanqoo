export const AWIN_COMMISSION_MAX_BATCH_SIZE = 20;

export function normalizeAwinCommissionLimit(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return AWIN_COMMISSION_MAX_BATCH_SIZE;
  }
  return Math.min(Math.floor(parsed), AWIN_COMMISSION_MAX_BATCH_SIZE);
}

export function normalizeStaleHours(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return Math.floor(parsed);
}

export function buildAwinCommissionCandidateQuery(staleHours = null) {
  const conditions = [
    { commissionFetchStatus: { $exists: false } },
    { commissionFetchStatus: 'not_fetched' },
    {
      commissionFetchStatus: 'failed',
      $or: [
        { commissionRetryCount: { $exists: false } },
        { commissionRetryCount: { $lt: 3 } },
      ],
    },
    { commissionLastFetchedAt: { $exists: false }, commissionFetchStatus: { $ne: 'unavailable' } },
    { commissionLastFetchedAt: null, commissionFetchStatus: { $ne: 'unavailable' } },
  ];

  if (staleHours !== null) {
    conditions.push({
      commissionLastFetchedAt: {
        $lt: new Date(Date.now() - staleHours * 60 * 60 * 1000),
      },
    });
  }

  return { network: 'awin', $or: conditions };
}

export function serializeAwinCommissionJob(job) {
  if (!job) return null;
  const value = typeof job.toObject === 'function' ? job.toObject() : job;

  // Calculate percentage safely
  const percentage = value.total > 0 ? Math.min(Math.round((value.processed / value.total) * 100), 100) : 0;

  return {
    id: value._id ? String(value._id) : undefined,
    status: value.status,
    total: value.total,
    processed: value.processed,
    updated: value.updated,
    failed: value.failed,
    remaining: value.remaining,
    limit: value.limit,
    staleHours: value.staleHours ?? null,
    percentage,
    startedAt: value.startedAt ?? null,
    lastRunAt: value.lastRunAt ?? null,
    completedAt: value.completedAt ?? null,
    error: value.error || '',
  };
}
