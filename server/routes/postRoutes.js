import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    createPost,
    getPosts,
    deletePost,
    updatePost,
    toggleLike,
} from "../controllers/postController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);

router.get("/", getPosts);

router.delete(
    "/:id",
    authMiddleware,
    deletePost
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updatePost
);

router.post(
    "/:id/like",
    authMiddleware,
    toggleLike
);

export default router;