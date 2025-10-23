import { pool } from "../../db/db.js";
import bcrypt from "bcrypt"

export const UserModel = {
    async createUser(username, email, password, role = "user") {
        try {

            const hashedPassword = await bcrypt.hash(password, 10)
            const query = `
            INSERT INTO users (username, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, email, role;
        `
            const values = [username, email, hashedPassword, role];
            const { rows } = await pool.query(query, values)

            return { success: true, user: rows[0] };
        } catch (err) {
            // Duplicate error code
            if (err.code === "23505") {
                // Unique constraint violation
                return {
                    success: false,
                    errorCode: "DUPLICATE",
                    message: "Username or email already exists",
                };
            }

            console.error("Database error in createUser:", err);
            return {
                success: false,
                errorCode: "DB_ERROR",
                message: "Internal server error",
            };
        }
    },
    async getUserByEmail(email, includePassword = false) {
        try {
            const query = includePassword
                ? `SELECT id, username, email, role, password FROM users WHERE email = $1`
                : `SELECT id, username, email, role, FROM users WHERE email = $1`;

            const { rows } = await pool.query(query, [email]);

            if (rows.length === 0) {
                return { 
                    success: false, 
                    errorCode: "NOT_FOUND", 
                    message: "User not found" 
                };
            }

            return { success: true, user: rows[0] };
        } catch (err) {
            console.error("Database error in getUserByEmail:", err);
            return { success: false, errorCode: "DB_ERROR", message: "Internal server error" };
        }
    }
}