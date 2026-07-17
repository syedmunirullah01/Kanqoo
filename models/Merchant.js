// models/Merchant.js
import mongoose from 'mongoose';

const MerchantSchema = new mongoose.Schema({
  mid: { type: String, required: true, index: true },
  name: { type: String, required: true },
  url: String,
  logoUrl: String,
  description: String,
  termsUrl: String,
  status: { type: String, default: 'unknown', index: true },
  commission: String,
  returnDays: String,
  averagePaymentTime: String,
  commissionLastFetchedAt: Date,
  commissionFetchStatus: {
    type: String,
    enum: ['not_fetched', 'fetched', 'failed', 'unavailable'],
    default: 'not_fetched',
    index: true,
  },
  commissionUnavailableReason: String,
  commissionLastAttemptAt: Date,
  commissionRetryCount: { type: Number, default: 0 },
  network: { type: String, default: 'rakuten', index: true },
  country: String,
  categories: [String],
  shipsTo: [String],
  partnershipStatus: String,
  canPartner: Boolean,
  isEnriched: { type: Boolean, default: false },
  lastSyncedAt: Date,
  lastEnrichedAt: Date,
  raw: Object,
}, { timestamps: true });

MerchantSchema.index({ network: 1, mid: 1 }, { unique: true });
MerchantSchema.index({ name: 1 });
MerchantSchema.index({ country: 1 });
MerchantSchema.index({ categories: 1 });

export default mongoose.models.Merchant || mongoose.model('Merchant', MerchantSchema);
