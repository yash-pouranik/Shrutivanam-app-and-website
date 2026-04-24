import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description?: string;
  type: "upload" | "youtube" | "link";
  url: string;
  thumbnail?: string;
  order: number;
  addedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["upload", "youtube", "link"],
      required: true,
    },
    url: {
      type: String,
      required: [true, "Video URL is required"],
    },
    thumbnail: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Video: Model<IVideo> =
  mongoose.models.Video ?? mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
