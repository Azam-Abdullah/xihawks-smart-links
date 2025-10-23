import { pool } from "../../db/db.js";

export const SiteLinkModel = {
    async createSiteLink(siteUrl, title, coverImage, description, category) {
        try {
            const query = `
                INSERT INTO site_links (site_url, title, cover_image, description, category)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, site_url, title, cover_image, description, category, created_at, updated_at;
            `;
            const values = [siteUrl, title, coverImage || null, description, category];
            const { rows } = await pool.query(query, values);

            return { success: true, siteLink: rows[0] };
        } catch (err) {
            console.error("Database error in createSiteLink:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    },

    async getAllSiteLinks() {
        try {
            const query = `
                SELECT id, site_url, title, cover_image, description, category, created_at, updated_at
                FROM site_links
                ORDER BY created_at DESC;
            `;
            const { rows } = await pool.query(query);
            return { success: true, siteLinks: rows };
        } catch (err) {
            console.error("Database error in getAllSiteLinks:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    },

    async getSiteLinkById(id) {
        try {
            const query = `
                SELECT id, site_url, title, cover_image, description, category, created_at, updated_at
                FROM site_links
                WHERE id = $1;
            `;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0)
                return { success: false, errorCode: "NOT_FOUND", message: "Site link not found" };
            return { success: true, siteLink: rows[0] };
        } catch (err) {
            console.error("Database error in getSiteLinkById:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    },

    async updateSiteLink(id, siteUrl, title, coverImage, description, category) {
        try {
            const query = `
                UPDATE site_links
                SET site_url = $1,
                    title = $2,
                    cover_image = $3,
                    description = $4,
                    category = $5,
                    updated_at = NOW()
                WHERE id = $6
                RETURNING id, site_url, title, cover_image, description, category, created_at, updated_at;
            `;
            const values = [siteUrl, title, coverImage || null, description, category, id];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0)
                return { success: false, errorCode: "NOT_FOUND", message: "Site link not found" };

            return { success: true, siteLink: rows[0] };
        } catch (err) {
            console.error("Database error in updateSiteLink:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    },

    async deleteSiteLink(id) {
        try {
            const query = `DELETE FROM site_links WHERE id = $1 RETURNING id;`;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0)
                return { success: false, errorCode: "NOT_FOUND", message: "Site link not found" };
            return { success: true, deletedId: rows[0].id };
        } catch (err) {
            console.error("Database error in deleteSiteLink:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    },
};
