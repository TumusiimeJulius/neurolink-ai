import { Request, Response } from "express";
import prisma from "../config/prisma";
import { generateTwinResponse } from "../services/aiService";
import { AuthRequest } from "../types/auth";

export async function askTwin(req: AuthRequest, res: Response) {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({ message: "Missing authenticated student." });
    }

    const { subject, prompt } = req.body;
    if (!subject || !prompt) {
      return res.status(400).json({ message: "Missing subject or prompt." });
    }

    const profile = await prisma.learningProfile.findMany({
      where: { studentId },
    });

    const learningSubjects = profile.map((item) => ({
      subject: item.subject,
      mastery: item.mastery,
    }));

    const responseText = generateTwinResponse(learningSubjects, subject, prompt);

    res.json({ reply: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Twin response failed." });
  }
}
