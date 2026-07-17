import mongoose from 'mongoose';

const CurrencyRateSchema = new mongoose.Schema({
  baseCurrency: {
    type: String,
    default: 'USD',
    uppercase: true,
    trim: true,
  },
  rates: {
    type: Map,
    of: Number,
    required: true,
  },
  metadata: {
    source: { type: String, default: 'manual' },
    notes: { type: String },
  },
}, {
  timestamps: true,
  versionKey: false,
});

CurrencyRateSchema.index({ updatedAt: -1 });

const CurrencyRate = mongoose.models.CurrencyRate || mongoose.model('CurrencyRate', CurrencyRateSchema);

export default CurrencyRate;
