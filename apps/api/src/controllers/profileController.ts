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

    if (userId !== requestedId) {
      return res.status(403).json({
        message: "Access denied."
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
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: "Failed to load profile"
    });

  }
}



// CREATE LEARNING PROFILE

export async function createLearningProfile(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }


    const {
      subject,
      mastery,
      recommendation
    } = req.body;


    const profile = await prisma.learningProfile.create({

      data: {

        subject,
        mastery,
        recommendation,

        student: {
          connect: {
            id: req.user.id
          }
        }

      }

    });


    res.status(201).json(profile);


  } catch(error){

    res.status(500).json({

      message:"Failed to create learning profile"

    });

  }

}