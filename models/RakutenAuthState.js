// models/RakutenAuthState.js
import mongoose from 'mongoose';

const RakutenAuthStateSchema = new mongoose.Schema(
  {
    scope: {
      type: String,
      index: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.RakutenAuthState) {
  delete mongoose.models.RakutenAuthState;
}

export default mongoose.model('RakutenAuthState', RakutenAuthStateSchema);
