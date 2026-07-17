"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const recommendationRoutes_1 = __importDefault(require("./routes/recommendationRoutes"));
const predictionRoutes_1 = __importDefault(require("./routes/predictionRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/predictions", authMiddleware_1.authenticateToken, predictionRoutes_1.default);
app.use("/api/profile", authMiddleware_1.authenticateToken, profileRoutes_1.default);
app.use("/api/recommendations", authMiddleware_1.authenticateToken, recommendationRoutes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "NeuroLink AI API running 🚀"
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
