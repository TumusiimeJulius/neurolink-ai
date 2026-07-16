import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../config/prisma";
import { predictLearning } from "../services/predictionService";

export async function getPredictions(
  req: AuthRequest,
  res: Response
) {
  try {
    const requestedId = Number(req.params.id);
    const userId = req.user?.id;

    if (userId !== requestedId) {
      return res.status(403).json({ message: "Access denied." });
    }

    const profiles = await prisma.learningProfile.findMany({
      where: { studentId: requestedId },
    });

    const predictions = profiles.map((profile) =>
      predictLearning({
        subject: profile.subject,
        mastery: profile.mastery,
      })
    );

    res.json({ predictions });
  } catch (error) {
    res.status(500).json({
      message: "Prediction failed",
    });
  }
}
