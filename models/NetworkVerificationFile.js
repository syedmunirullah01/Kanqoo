import mongoose, { Schema } from 'mongoose';

const NetworkVerificationFileSchema = new Schema(
  {
    filename: { type: String, required: true, unique: true, trim: true },
    originalFilename: { type: String, required: true, trim: true },
    publicPath: { type: String, required: true, unique: true, trim: true },
    content: { type: Buffer, required: true },
    mimeType: { type: String, required: true, trim: true },
    extension: { type: String, required: true, trim: true, lowercase: true },
    sizeBytes: { type: Number, required: true, min: 0 },
    provider: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    isActive: { type: Boolean, default: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

NetworkVerificationFileSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.models.NetworkVerificationFile ||
  mongoose.model('NetworkVerificationFile', NetworkVerificationFileSchema);
