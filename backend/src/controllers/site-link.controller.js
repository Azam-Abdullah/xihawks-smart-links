import { SiteLinkModel } from "../models/site-link.model.js";

export const SiteLinkController = {
    // Create link
    async createSiteLink(req, res) {
        try {
            const { site_url, title, cover_image, description, category } = req.body;

            if (!site_url || !title || !category) {
                return res.status(400).json({ success: false, message: "site_url, title and category are required" });
            }

            const result = await SiteLinkModel.createSiteLink(site_url, title, cover_image, description, category);

            if (!result.success) {
                return res.status(500).json(result);
            }

            return res.status(201).json(result);
        } catch (error) {
            console.error("Error in createSiteLink controller:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Get all links
    async getAllSiteLinks(req, res) {
        try {
            const result = await SiteLinkModel.getAllSiteLinks();

            if (!result.success) {
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in getAllSiteLinks controller:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Get link by ID
    async getSiteLinkById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "Link ID is required" });
            }

            const result = await SiteLinkModel.getSiteLinkById(id);

            if (!result.success) {
                if (result.errorCode === "NOT_FOUND") {
                    return res.status(404).json(result);
                }
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in getSiteLinkById controller:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Update link
    async updateSiteLink(req, res) {
        try {
            const { id } = req.params;
            const { site_url, title, cover_image, description, category } = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: "Link ID is required" });
            }

            if (!site_url || !title || !category) {
                return res.status(400).json({ success: false, message: "site_url, title and category are required" });
            }

            const result = await SiteLinkModel.updateSiteLink(id, site_url, title, cover_image, description, category);

            if (!result.success) {
                if (result.errorCode === "NOT_FOUND") {
                    return res.status(404).json(result);
                }
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in updateSiteLink controller:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Delete link
    async deleteSiteLink(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "Link ID is required" });
            }

            const result = await SiteLinkModel.deleteSiteLink(id);

            if (!result.success) {
                if (result.errorCode === "NOT_FOUND") {
                    return res.status(404).json(result);
                }
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in deleteSiteLink controller:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
};
