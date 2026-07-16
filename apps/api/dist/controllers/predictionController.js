"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPredictions = getPredictions;
const prisma_1 = __importDefault(require("../config/prisma"));
const predictionService_1 = require("../services/predictionService");
async function getPredictions(req, res) {
    try {
        const requestedId = Number(req.params.id);
        const userId = req.user?.id;
        if (userId !== requestedId) {
            return res.status(403).json({ message: "Access denied." });
        }
        const profiles = await prisma_1.default.learningProfile.findMany({
            where: { studentId: requestedId },
        });
        const predictions = profiles.map((profile) => (0, predictionService_1.predictLearning)({
            subject: profile.subject,
            mastery: profile.mastery,
        }));
        res.json({ predictions });
    }
    catch (error) {
        res.status(500).json({
            message: "Prediction failed",
        });
    }
}
