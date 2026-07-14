import Journey from "../models/Journey.js";

export const createJourney = async (req, res) => {
  try {
    const { title, category, description, isPublic, showIdentity } = req.body;

    let coverImage = "";

    if (req.file) {
      coverImage = req.file.filename;
    }

    const journey = await Journey.create({
      user: req.user._id,
      title,
      category,
      description,
      coverImage,
      isPublic,
      showIdentity,
    });

    res.status(201).json({
      message: "Journey created successfully",
      journey,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(journeys);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id).populate(
      "user",
      "name profileImage",
    );

    if (!journey) {
      return res.status(404).json({
        message: "Journey not found",
      });
    }

    res.json(journey);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteJourney = async (req, res) => {
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

    await journey.deleteOne();

    res.json({
      message: "Journey deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPublicJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({
      isPublic: true,
    }).populate("user", "name profileImage");

    const publicJourneys = journeys.map((journey) => {
      const data = journey.toObject();

      if (!data.showIdentity) {
        data.user = {
          name: "Anonymous",
          profileImage: "",
        };
      }

      return data;
    });

    res.json(publicJourneys);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
