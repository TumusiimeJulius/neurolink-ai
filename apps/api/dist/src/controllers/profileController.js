"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.createLearningProfile = createLearningProfile;
exports.updateLearningProfile = updateLearningProfile;
exports.deleteLearningProfile = deleteLearningProfile;
const prisma_1 = __importDefault(require("../config/prisma"));
// GET STUDENT PROFILE
async function getProfile(req, res) {
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
        const student = await prisma_1.default.student.findUnique({
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
    }
    catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({
            message: "Failed to load profile",
        });
    }
}
// CREATE LEARNING PROFILE
async function createLearningProfile(req, res) {
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
        const { subject, mastery, recommendation, } = req.body;
        if (!subject || mastery === undefined || !recommendation) {
            return res.status(400).json({
                message: "Subject, mastery, and recommendation are required.",
            });
        }
        const profile = await prisma_1.default.learningProfile.create({
            data: {
                subject,
                mastery: Number(mastery),
                recommendation,
                student: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return res.status(201).json(profile);
    }
    catch (error) {
        console.error("Create learning profile error:", error);
        return res.status(500).json({
            message: "Failed to create learning profile",
        });
    }
}
// UPDATE LEARNING PROFILE
async function updateLearningProfile(req, res) {
    try {
        const requestedId = Number(req.params.id);
        const profileId = Number(req.params.profileId);
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
        const existingProfile = await prisma_1.default.learningProfile.findFirst({
            where: {
                id: profileId,
                studentId: userId,
            },
        });
        if (!existingProfile) {
            return res.status(404).json({
                message: "Learning profile not found",
            });
        }
        const { subject, mastery, recommendation, } = req.body;
        const profile = await prisma_1.default.learningProfile.update({
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
        return res.json(profile);
    }
    catch (error) {
        console.error("Update learning profile error:", error);
        return res.status(500).json({
            message: "Failed to update learning profile",
        });
    }
}
// DELETE LEARNING PROFILE
async function deleteLearningProfile(req, res) {
    try {
        const requestedId = Number(req.params.id);
        const profileId = Number(req.params.profileId);
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
        const existingProfile = await prisma_1.default.learningProfile.findFirst({
            where: {
                id: profileId,
                studentId: userId,
            },
        });
        if (!existingProfile) {
            return res.status(404).json({
                message: "Learning profile not found",
            });
        }
        await prisma_1.default.learningProfile.delete({
            where: {
                id: profileId,
            },
        });
        return res.json({
            message: "Learning profile deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete learning profile error:", error);
        return res.status(500).json({
            message: "Failed to delete learning profile",
        });
    }
}
