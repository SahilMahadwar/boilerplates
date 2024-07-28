import mongoose, { Document, Schema } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OTPSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },

    expiresAt: { type: Date, index: { expires: "10m" } },
  },
  { timestamps: true }
);

OTPSchema.pre<IOTP>("save", function (next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Set expiry to 10 minutes from now
  }
  next();
});

export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
