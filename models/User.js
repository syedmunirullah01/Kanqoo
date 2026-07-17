// models/User.js - Updated schema
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Basic Info (Step 1)
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    default: null,
  },
  lastName: {
    type: String,
    trim: true,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // This automatically creates an index
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  company: {
    type: String,
    trim: true,
    default: null,
  },
  jobTitle: {
    type: String,
    trim: true,
    default: null,
  },
  allowedAdminSections: {
    type: [String],
    default: [],
  },
  inviteToken: {
    type: String,
    default: null,
  },
  inviteTokenExpiry: {
    type: Date,
    default: null,
  },
  invitedAt: {
    type: Date,
    default: null,
  },
  inviteAcceptedAt: {
    type: Date,
    default: null,
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  mustSetPassword: {
    type: Boolean,
    default: false,
  },

  // Additional Info (Step 2)
  handlerName: {
    type: String,
    trim: true,
    default: null,
  },
  links: {
    type: [String],
    default: [],
  },
  userType: {
    type: String,
    enum: ['creator', 'brand', 'agency', 'publisher'], // 'publisher' is already here
    default: 'publisher',
  },

  // NEW: Added a 'role' field for permissions
  role: {
    type: String,
    enum: ['admin', 'publisher', 'social media manager', 'data entry', 'user'],
    default: 'publisher',
  },

  // Publisher-specific fields
  pubId: {
    type: String,
    unique: true, // This automatically creates an index
    sparse: true, // Allow null for non-publishers
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'suspended', 'declined', 'faded'],
    default: 'pending',
  },
  revShare: {
    type: String,
    default: '50%',
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  pendingEarnings: {
    type: Number,
    default: 0,
  },
  statusBeforeFade: {
    type: String,
    default: null,
  },
  isFaded: {
    type: Boolean,
    default: false,
  },
  fadedAt: {
    type: Date,
    default: null,
  },
  fadeUntil: {
    type: Date,
    default: null,
  },

  // Email Verification
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpiry: {
    type: Date,
    default: null,
  },

  // Account Status
  isActive: {
    type: Boolean,
    default: true,
  },

  // Password Reset
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpiry: {
    type: Date,
    default: null,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Pre-save middleware: Generate pubId for publishers
UserSchema.pre('save', function (next) {
  if (!this.fullName) {
    const parts = [this.firstName || '', this.lastName || ''].filter(Boolean);
    if (parts.length) {
      this.fullName = parts.join(' ');
    }
  }
  if (!this.firstName && this.fullName) {
    const [first, ...rest] = this.fullName.split(' ');
    this.firstName = first || null;
    this.lastName = rest.length ? rest.join(' ') : null;
  }
  if (this.userType === 'publisher' && this.isModified('userType') && !this.pubId) {
    this.pubId = 'PUB-' + String(this._id.toString().slice(-4)).padStart(4, '0');
  }
  this.updatedAt = Date.now();
  next();
});

// Indexes
// 'unique: true' in the schema definition already handles them.
UserSchema.index({ userType: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ isFaded: 1, fadeUntil: 1 });
UserSchema.index({ role: 1 }); // Added index for new role field
UserSchema.index({ inviteToken: 1 });

// Support hot-reload in Next.js (avoid model overwrite errors)
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model("User", UserSchema);
