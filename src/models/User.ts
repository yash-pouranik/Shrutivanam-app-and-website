import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  paymentStatus: "pending" | "paid" | "rejected";
  paymentScreenshot?: string; // Cloudinary URL
  paymentTransactionIdEncrypted?: string;
  paymentTransactionIdIv?: string;
  paymentTransactionIdTag?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "rejected"],
      default: "pending",
    },
    paymentScreenshot: {
      type: String,
      default: null,
    },
    paymentTransactionIdEncrypted: {
      type: String,
      default: null,
    },
    paymentTransactionIdIv: {
      type: String,
      default: null,
    },
    paymentTransactionIdTag: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
