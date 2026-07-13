import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  toggleLike,
  addComment,
  deleteComment,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);

router.get("/", getPosts);

router.delete("/:id", authMiddleware, deletePost);

router.put("/:id", authMiddleware, upload.single("image"), updatePost);

router.post("/:id/like", authMiddleware, toggleLike);

router.post("/:id/comment", authMiddleware, addComment);

router.delete("/:postId/comment/:commentId", authMiddleware, deleteComment);

export default router;
