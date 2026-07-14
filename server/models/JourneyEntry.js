import mongoose from "mongoose";

const journeyEntrySchema = new mongoose.Schema(
  {
    journey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journey",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const JourneyEntry = mongoose.model("JourneyEntry", journeyEntrySchema);

export default JourneyEntry;
