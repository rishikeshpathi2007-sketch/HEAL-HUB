import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    createPost,
    getPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);

router.get("/", getPosts);

export default router;