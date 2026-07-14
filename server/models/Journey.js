import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },
    showIdentity: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
