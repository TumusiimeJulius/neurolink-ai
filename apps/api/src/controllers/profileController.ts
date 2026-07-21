import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../config/prisma";

// GET STUDENT PROFILE
export async function getProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const requestedId = Number(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (userId !== requestedId) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: requestedId,
      },
      include: {
        learningProfiles: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.json(student);
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Failed to load profile",
    });
  }
}


// CREATE LEARNING PROFILE
export async function createLearningProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const studentId = Number(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (userId !== studentId) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const {
      subject,
      mastery,
      recommendation,
    } = req.body;

    if (!subject || mastery === undefined || !recommendation) {
      return res.status(400).json({
        message:
          "Subject, mastery, and recommendation are required.",
      });
    }

    const profile = await prisma.learningProfile.create({
      data: {
        subject,
        mastery: Number(mastery),
        recommendation,
        student: {
          connect: {
            id: studentId,
          },
        },
      },
    });

    return res.status(201).json(profile);
  } catch (error) {
    console.error("Create learning profile error:", error);

    return res.status(500).json({
      message: "Failed to create learning profile",
    });
  }
}


// UPDATE LEARNING PROFILE
export async function updateLearningProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const studentId = Number(req.params.id);
    const profileId = Number(req.params.profileId);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (userId !== studentId) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const existingProfile =
      await prisma.learningProfile.findFirst({
        where: {
          id: profileId,
          studentId: studentId,
        },
      });

    if (!existingProfile) {
      return res.status(404).json({
        message: "Learning profile not found",
      });
    }

    const {
      subject,
      mastery,
      recommendation,
    } = req.body;

    const updatedProfile =
      await prisma.learningProfile.update({
        where: {
          id: profileId,
        },
        data: {
          ...(subject !== undefined && {
            subject,
          }),

          ...(mastery !== undefined && {
            mastery: Number(mastery),
          }),

          ...(recommendation !== undefined && {
            recommendation,
          }),
        },
      });

    return res.json(updatedProfile);
  } catch (error) {
    console.error("Update learning profile error:", error);

    return res.status(500).json({
      message: "Failed to update learning profile",
    });
  }
}


// DELETE LEARNING PROFILE
export async function deleteLearningProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const studentId = Number(req.params.id);
    const profileId = Number(req.params.profileId);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (userId !== studentId) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const existingProfile =
      await prisma.learningProfile.findFirst({
        where: {
          id: profileId,
          studentId: studentId,
        },
      });

    if (!existingProfile) {
      return res.status(404).json({
        message: "Learning profile not found",
      });
    }

    await prisma.learningProfile.delete({
      where: {
        id: profileId,
      },
    });

    return res.json({
      message: "Learning profile deleted successfully",
    });
  } catch (error) {
    console.error("Delete learning profile error:", error);

    return res.status(500).json({
      message: "Failed to delete learning profile",
    });
  }
}