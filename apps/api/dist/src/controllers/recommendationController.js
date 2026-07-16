"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = getRecommendations;
const prisma_1 = __importDefault(require("../config/prisma"));
const aiService_1 = require("../services/aiService");
async function getRecommendations(req, res) {
    try {
        const studentId = Number(req.params.id);
        const profile = await prisma_1.default.learningProfile.findMany({
            where: {
                studentId
            }
        });
        const recommendations = (0, aiService_1.generateRecommendation)(profile.map(item => ({
            subject: item.subject,
            mastery: item.mastery
        })));
        res.json({
            recommendations
        });
    }
    catch (error) {
        res.status(500).json({
            message: "AI analysis failed"
        });
    }
}
