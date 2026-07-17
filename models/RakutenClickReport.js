import mongoose from 'mongoose';

const RakutenClickReportSchema = new mongoose.Schema({
  recordHash: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  networkId: {
    type: Number,
    required: true,
  },
  networkCountry: {
    type: String,
    required: true,
    uppercase: true,
  },
  currency: {
    type: String,
    required: true,
    uppercase: true,
  },
  memberId: {
    type: String,
    required: true,
    index: true,
  },
  mid: {
    type: String,
    required: true,
    index: true,
  },
  advertiserName: {
    type: String,
    required: true,
    index: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  clickIpAddress: {
    type: String,
  },
  averageOrderValue: {
    type: Number,
    default: 0,
  },
  grossSales: {
    type: Number,
    default: 0,
  },
  salesAmount: {
    type: Number,
    default: 0,
  },
  estimatedOrders: {
    type: Number,
    default: 0,
  },
  consumerRegion: {
    type: String,
  },
  processDate: {
    type: Date,
  },
  lockStatus: {
    type: String,
  },
  totalCommission: {
    type: Number,
    default: 0,
  },
  transactionDate: {
    type: Date,
    index: true,
  },
  commissionStatus: {
    type: String,
  },
  raw: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
  versionKey: false,
});

RakutenClickReportSchema.index({ transactionDate: 1, networkId: 1 });
RakutenClickReportSchema.index({ memberId: 1, transactionDate: 1 });

const RakutenClickReport = mongoose.models.RakutenClickReport
  || mongoose.model('RakutenClickReport', RakutenClickReportSchema);

export default RakutenClickReport;
