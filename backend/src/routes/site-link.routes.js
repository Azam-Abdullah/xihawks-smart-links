import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";
import { SiteLinkController } from "../controllers/site-link.controller.js";

const router = express.Router();

router.get("/", SiteLinkController.getAllSiteLinks);

router.get("/:id", SiteLinkController.getSiteLinkById);

router.post("/", authenticateToken, authorizeAdmin, SiteLinkController.createSiteLink);

router.delete("/:id", authenticateToken, authorizeAdmin, SiteLinkController.deleteSiteLink);

router.put("/:id", authenticateToken, authorizeAdmin, SiteLinkController.updateSiteLink);


export default router;
