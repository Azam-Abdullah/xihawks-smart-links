import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";
import { AIController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate-description", authenticateToken, authorizeAdmin, AIController.generateDescriptionGroq);

export default router;
