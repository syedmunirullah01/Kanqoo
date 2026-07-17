import mongoose from 'mongoose';

const AwinCommissionSyncJobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['running', 'paused', 'completed', 'failed'],
      required: true,
      default: 'running',
      index: true,
    },
    total: { type: Number, required: true, default: 0, min: 0 },
    processed: { type: Number, required: true, default: 0, min: 0 },
    updated: { type: Number, required: true, default: 0, min: 0 },
    failed: { type: Number, required: true, default: 0, min: 0 },
    remaining: { type: Number, required: true, default: 0, min: 0 },
    limit: { type: Number, required: true, default: 20, min: 1, max: 20 },
    staleHours: { type: Number, default: null, min: 1 },
    lockedUntil: { type: Date, default: null },
    startedAt: { type: Date, default: Date.now },
    lastRunAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    error: { type: String, default: '' },
  },
  { timestamps: true }
);

AwinCommissionSyncJobSchema.index({ startedAt: -1 });
AwinCommissionSyncJobSchema.index(
  { status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'running' },
    name: 'one_running_awin_commission_job',
  }
);

const AwinCommissionSyncJob =
  mongoose.models.AwinCommissionSyncJob ||
  mongoose.model(
    'AwinCommissionSyncJob',
    AwinCommissionSyncJobSchema,
    'awin_commission_sync_jobs'
  );

export default AwinCommissionSyncJob;
