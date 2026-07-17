import mongoose from 'mongoose';

const FeaturedMerchantSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: [true, 'MID is required'],
    trim: true,
    unique: true
  },
  headline: { type: String, default: 'Top pick' },
  summary: { type: String, default: '' },
  badge: { type: String, default: 'Featured' },
  logoUrl: { type: String },
  category: { type: String },
  commission: { type: String },
  ctaText: { type: String, default: 'Promote' },
  priority: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['active', 'paused', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true,
});

FeaturedMerchantSchema.index({ status: 1, priority: 1 });

const FeaturedMerchant =
  mongoose.models.FeaturedMerchant ||
  mongoose.model('FeaturedMerchant', FeaturedMerchantSchema);

export default FeaturedMerchant;
