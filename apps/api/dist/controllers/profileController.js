"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
const prisma_1 = __importDefault(require("../config/prisma"));
async function getProfile(req, res) {
    try {
        const requestedId = Number(req.params.id);
        const userId = req.user?.id;
        if (userId !== requestedId) {
            return res.status(403).json({ message: "Access denied." });
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
