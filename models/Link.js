// models\Link.js
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const linkSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(7), // e.g. "Ab3xYzQ"
        },
        originalUrl: {
            type: String,
            required: true,
        },
        affiliateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        merchantId: {
            type: String,
            required: true,
            index: true,
        },
        networkName: {
            type: String,
            required: true,
            default: 'rakuten',
            index: true,
        },
        destinationUrl: {
            type: String,
            required: true,
        },
        trackingParams: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        clickCount: {
            type: Number,
            default: 0,
            index: true,
        },
        lastClickedAt: {
            type: Date,
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
        merchantInfo: {
            name: String,
            category: String,
            network: String,
        },
    },
    {
        timestamps: true, // adds createdAt/updatedAt
    }
);

// helpful compound indexes for later analytics/lookups
linkSchema.index({ affiliateId: 1, merchantId: 1 });
linkSchema.index({ affiliateId: 1, destinationUrl: 1 });

linkSchema.methods.recordClick = async function () {
    this.clickCount += 1;
    this.lastClickedAt = new Date();
    return this.save();
};

const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);

export default Link;
