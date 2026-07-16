import { Router } from "express";
import { getPredictions } from "../controllers/predictionController";

const router = Router();

router.get("/:id", getPredictions);

export default router;