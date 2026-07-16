import { Router } from "express";

import {
  getProfile,
  createLearningProfile,
  updateLearningProfile,
  deleteLearningProfile,
} from "../controllers/profileController";

const router = Router();

router.get("/:id", getProfile);
router.post("/:id/learning-profiles", createLearningProfile);
router.put("/:id/learning-profiles/:profileId", updateLearningProfile);
router.delete("/:id/learning-profiles/:profileId", deleteLearningProfile);

export default router;