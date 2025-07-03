import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImage: { type: String },
  content: { type: String, required: true },
  htmlContent: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  readTime: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);
