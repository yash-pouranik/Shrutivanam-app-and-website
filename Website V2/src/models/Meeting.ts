import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  description?: string;
  joinUrl: string;
  scheduledAt: Date;
  duration: number; // minutes
  addedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema = new Schema<IMeeting>(
  {
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    joinUrl: {
      type: String,
      required: [true, "Zoom join URL is required"],
    },
    scheduledAt: {
      type: Date,
      required: [true, "Meeting date & time is required"],
    },
    duration: {
      type: Number,
      required: true,
      default: 60, // 60 minutes default
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Meeting: Model<IMeeting> =
  mongoose.models.Meeting ??
  mongoose.model<IMeeting>("Meeting", MeetingSchema);

export default Meeting;
