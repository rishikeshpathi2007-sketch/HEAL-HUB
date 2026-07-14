import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createJourney,
  getMyJourneys,
  getJourney,
  deleteJourney,
  getPublicJourneys,
} from "../controllers/journeyController.js";

import {
  addEntry,
  getEntries,
  deleteEntry,
} from "../controllers/journeyEntryController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("coverImage"), createJourney);

router.get("/mine", authMiddleware, getMyJourneys);

router.get("/public", getPublicJourneys);

router.get("/:id", getJourney);

router.delete("/:id", authMiddleware, deleteJourney);

router.post("/:id/entries", authMiddleware, upload.single("image"), addEntry);

router.get("/:id/entries", getEntries);

router.delete("/:id/entries/:entryId", authMiddleware, deleteEntry);

export default router;
