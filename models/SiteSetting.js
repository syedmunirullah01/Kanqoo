import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema);
