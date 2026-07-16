"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recommendationController_1 = require("../controllers/recommendationController");
const twinController_1 = require("../controllers/twinController");
const router = (0, express_1.Router)();
router.get("/:id", recommendationController_1.getRecommendations);
router.post("/twin", twinController_1.askTwin);
exports.default = router;
