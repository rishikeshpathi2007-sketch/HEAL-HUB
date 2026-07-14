import Journey from "../models/Journey.js";
import JourneyEntry from "../models/JourneyEntry.js";

export const addEntry = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({
        message: "Journey not found",
      });
    }

    if (journey.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const entry = await JourneyEntry.create({
      journey: journey._id,
      text: req.body.text,
      image,
    });

    res.status(201).json({
      message: "Entry added successfully",
      entry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await JourneyEntry.find({
      journey: req.params.id,
    }).sort({
      createdAt: 1,
    });

    res.json(entries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await JourneyEntry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    const journey = await Journey.findById(entry.journey);

    if (!journey) {
      return res.status(404).json({
        message: "Journey not found",
      });
    }

    if (journey.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await entry.deleteOne();

    res.json({
      message: "Entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
