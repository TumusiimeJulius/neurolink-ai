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
        if (userId !== requestedId) {
            return res.status(403).json({
                message: "Access denied."
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
                message: "Student not found"
            });
        }
        res.json(student);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to load profile"
        });
    }
}
// CREATE LEARNING PROFILE
async function createLearningProfile(req, res) {
    try {
        const studentId = req.user?.id;
        const { subject, mastery, recommendation } = req.body;
        const profile = await prisma_1.default.learningProfile.create({
            data: {
                subject,
                mastery,
                recommendation,
                studentId
            }
        });
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create learning profile"
        });
    }
}
// UPDATE LEARNING PROFILE
async function updateLearningProfile(req, res) {
    try {
        const id = Number(req.params.id);
        const updatedProfile = await prisma_1.default.learningProfile.update({
            where: {
                id
            },
            data: req.body
        });
        res.json(updatedProfile);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update learning profile"
        });
    }
}
// DELETE LEARNING PROFILE
async function deleteLearningProfile(req, res) {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.learningProfile.delete({
            where: {
                id
            }
        });
        res.json({
            message: "Learning profile deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete learning profile"
        });
    }
}
