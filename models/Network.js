// models/Network.js
import mongoose from 'mongoose';

const NetworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Network name is required'],
    trim: true,
    maxlength: [100, 'Network name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please enter a valid website URL'
    }
  },
  supportEmail: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /\S+@\S+\.\S+/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  
  // Adapter & Flexible Credentials
  adapter: {
    type: String,
    enum: ['rakuten', 'cj', 'awin', 'shareasale', 'tradetracker'],
    required: [true, 'Adapter type is required']
  },
  credentials: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Credentials object is required']
  },
  
  // Commission & Payments
  commission: {
    type: String,
    required: [true, 'Commission rate is required']
  },
  minimumPayout: { type: Number, default: 50 },
  payoutFrequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly'],
    default: 'monthly'
  },
  currency: { type: String, default: 'USD' },
  
  // Status & Sync
  status: {
    type: String,
    enum: ['connected', 'pending', 'disconnected', 'suspended'],
    default: 'pending'
  },
  lastSync: { type: Date, default: null },
  syncFrequency: {
    type: String,
    enum: ['1h', '6h', '12h', '24h', 'manual'],
    default: '6h'
  },
  autoSync: { type: Boolean, default: true },
  
  // API Status
  apiStatus: {
    type: String,
    enum: ['active', 'pending', 'inactive', 'error'],
    default: 'pending'
  },
  lastApiTest: { type: Date },
  
  // Performance Metrics
  totalEarnings: { type: Number, default: 0 },
  totalClicks: { type: Number, default: 0 },
  totalConversions: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  averageEPC: { type: Number, default: 0 },
  
  // Merchant Information
  merchantCount: { type: Number, default: 0 },
  productCount: { type: Number, default: 0 },
  topMerchants: [{
    name: String,
    commission: String,
    category: String
  }],
  
  // Settings & Configuration
  settings: {
    deepLinking: { type: Boolean, default: true },
    mobileTracking: { type: Boolean, default: true },
    realTimeStats: { type: Boolean, default: true },
    emailReports: { type: Boolean, default: true },
    emailFrequency: { 
      type: String, 
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    notifications: { type: Boolean, default: true }
  },
  
  // Authentication & Security
  authToken: { type: String },
  refreshToken: { type: String },
  tokenExpires: { type: Date },
  
  // Metadata
  isActive: { type: Boolean, default: true },
  connectionDate: { type: Date, default: Date.now },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  tags: [{ type: String }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  // Prevent version key errors
  versionKey: false 
});

// Indexes for better query performance
NetworkSchema.index({ name: 1 });
NetworkSchema.index({ adapter: 1 });
NetworkSchema.index({ status: 1 });
NetworkSchema.index({ apiStatus: 1 });
NetworkSchema.index({ isActive: 1 });

// Pre-save hook
NetworkSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static methods
NetworkSchema.statics.getActiveNetworks = function() {
  return this.find({ isActive: true, status: 'connected' });
};

NetworkSchema.statics.findByAdapter = function(adapter) {
  return this.find({ adapter, isActive: true });
};

// Instance methods
NetworkSchema.methods.testConnection = async function() {
  this.lastApiTest = new Date();
  this.apiStatus = 'active';
  await this.save();
  return this.apiStatus === 'active';
};

NetworkSchema.methods.updateStats = async function(stats) {
  Object.assign(this, stats);
  this.lastSync = new Date();
  await this.save();
};

// Virtuals
NetworkSchema.virtual('displayName').get(function() {
  return `${this.name} (${this.adapter})`;
});

NetworkSchema.virtual('isConnected').get(function() {
  return this.status === 'connected' && this.apiStatus === 'active';
});

// Ensure virtuals are included in JSON
NetworkSchema.set('toJSON', { virtuals: true });
NetworkSchema.set('toObject', { virtuals: true });

// Prevent model recompilation in development
const Network = mongoose.models.Network || mongoose.model('Network', NetworkSchema);

export default Network;