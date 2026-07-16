"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askTwin = askTwin;
const prisma_1 = __importDefault(require("../config/prisma"));
const aiService_1 = require("../services/aiService");
async function askTwin(req, res) {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({ message: "Missing authenticated student." });
        }
        const { subject, prompt } = req.body;
        if (!subject || !prompt) {
            return res.status(400).json({ message: "Missing subject or prompt." });
        }
        const profile = await prisma_1.default.learningProfile.findMany({
            where: { studentId },
        });
        const learningSubjects = profile.map((item) => ({
            subject: item.subject,
            mastery: item.mastery,
        }));
        const responseText = (0, aiService_1.generateTwinResponse)(learningSubjects, subject, prompt);
        res.json({ reply: responseText });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Twin response failed." });
    }
}
