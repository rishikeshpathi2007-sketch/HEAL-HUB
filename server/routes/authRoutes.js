import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  signup,
  login,
  verifyOTP,
  updateProfile,
  getProfile,
  getMyPosts,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-otp", verifyOTP);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOTP);

router.post("/reset-password", resetPassword);

router.get("/profile", authMiddleware, getProfile);

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile,
);

router.get("/profile/posts", authMiddleware, getMyPosts);

export default router;
