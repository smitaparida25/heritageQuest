import mongoose from "mongoose";

const authLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    action: {
      type: String,
      enum: ["signup", "login"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    reason: {
      type: String,
      default: "",
      trim: true,
    },
    ip: {
      type: String,
      default: "",
      trim: true,
    },
    userAgent: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

authLogSchema.index({ userId: 1, createdAt: -1 });
authLogSchema.index({ email: 1, createdAt: -1 });

const AuthLog = mongoose.model("AuthLog", authLogSchema);

export default AuthLog;
