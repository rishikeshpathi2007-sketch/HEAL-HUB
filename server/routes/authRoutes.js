import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  signup,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile,
);

export default router;
