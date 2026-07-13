import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const posts = await Post.find({
      author: user._id,
    })

      .sort({ createdAt: -1 });

    res.json({
      user,

      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
