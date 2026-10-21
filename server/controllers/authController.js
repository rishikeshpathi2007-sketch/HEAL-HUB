import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import sendEmail from "../utils/sendEmail.js";
// ==========================
// Signup
// ==========================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,

      isVerified: false,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    await newUser.save();

    await sendEmail(
      email,
      "Heal Hub Email Verification",
      `Welcome to Heal Hub!

Your verification code is:

${otp}

This OTP is valid for 10 minutes.`,
    );

    res.status(201).json({
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Login
// ==========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Email verified successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.bio !== undefined) {
      user.bio = req.body.bio;
    }

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    })

      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ==========================
   Forgot Password
========================== */
export const forgotPassword = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
      isVerified: true,
    });
    console.log("Forgot password email:", normalizedEmail);
    console.log("Verified user found:", !!user);

    // Avoid revealing whether an email is registered.
    if (!user) {
      return res.status(200).json({
        message:
          "If a verified account exists for this email, a reset OTP will be sent.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();
    console.log("Attempting to send password reset email...");

    await sendEmail(
      normalizedEmail,
      "Heal Hub Password Reset",
      `Your password reset OTP is:

${otp}

This code expires in 10 minutes. If you did not request a password reset, ignore this email.`,
    );

    return res.status(200).json({
      message:
        "If a verified account exists for this email, a reset OTP will be sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      message: "Unable to process your request. Please try again.",
    });
  }
};

/* ==========================
   Verify Password Reset OTP
========================== */
export const verifyResetOTP = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({
      email,
      isVerified: true,
    });

    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    if (user.resetOtp !== String(otp)) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    if (user.resetOtpExpires.getTime() < Date.now()) {
      user.resetOtp = "";
      user.resetOtpExpires = null;
      await user.save();

      return res.status(400).json({
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    // A short-lived token authorizes the password-reset step.
    const resetToken = jwt.sign(
      {
        id: user._id.toString(),
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // Invalidate the OTP so it cannot be reused.
    user.resetOtp = "";
    user.resetOtpExpires = null;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.error("Verify reset OTP error:", error);
    return res.status(500).json({
      message: "Unable to verify OTP. Please try again.",
    });
  }
};

/* ==========================
   Reset Password
========================== */
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (
      typeof resetToken !== "string" ||
      typeof newPassword !== "string" ||
      newPassword.length < 8
    ) {
      return res.status(400).json({
        message:
          "A valid reset token and a password of at least 8 characters are required.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        message: "Reset session expired. Please start again.",
      });
    }

    if (decoded.purpose !== "password-reset" || !decoded.id) {
      return res.status(401).json({
        message: "Invalid password reset session.",
      });
    }

    const user = await User.findOne({
      _id: decoded.id,
      isVerified: true,
    });

    if (!user) {
      return res.status(400).json({
        message: "Unable to reset password. Please start again.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
      message:
        "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      message: "Unable to reset password. Please try again.",
    });
  }
};
