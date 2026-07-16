"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("./config/prisma"));
async function main() {
    console.log("🌱 Seeding database...");
    // Create sample student
    const existingStudent = await prisma_1.default.student.findUnique({
        where: { email: "maya@neurolink.ai" },
    });
    if (existingStudent) {
        console.log("✓ Sample student already exists");
        return;
    }
    const hashedPassword = await bcrypt_1.default.hash("password123", 10);
    const student = await prisma_1.default.student.create({
        data: {
            name: "Maya Johnson",
            email: "maya@neurolink.ai",
            password: hashedPassword,
            learningProfiles: {
                create: [
                    {
                        subject: "Programming",
                        mastery: 92,
                        recommendation: "Great progress! Try advanced algorithms next.",
                    },
                    {
                        subject: "Mathematics",
                        mastery: 74,
                        recommendation: "Focus on calculus fundamentals for better foundation.",
                    },
                    {
                        subject: "Physics",
                        mastery: 61,
                        recommendation: "Practice mechanics problems to improve understanding.",
                    },
                    {
                        subject: "Design Systems",
                        mastery: 88,
                        recommendation: "Ready to explore component patterns and best practices.",
                    },
                    {
                        subject: "Writing",
                        mastery: 69,
                        recommendation: "Work on clarity and structure in technical writing.",
                    },
                ],
            },
        },
        include: {
            learningProfiles: true,
        },
    });
    console.log("✓ Sample student created:", student.name);
    console.log("✓ Learning profiles created:", student.learningProfiles.length);
    console.log("\n📝 Login credentials:");
    console.log("   Email: maya@neurolink.ai");
    console.log("   Password: password123");
}
main()
    .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
