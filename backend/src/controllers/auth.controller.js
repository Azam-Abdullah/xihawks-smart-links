import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "1d";

export const AuthController = {
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            const result = await UserModel.createUser(username, email, password, "user");

            if (!result.success) {
                const status = result.errorCode === "DUPLICATE" ? 409 : 500;
                return res.status(status).json({
                    success: false,
                    message: result.message,
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: result.user.id, role: result.user.role, email: result.user.email },
                process.env.JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            // Remove password from user object
            delete result.user.password;

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                user: result.user,
                token,
            });
        } catch (err) {
            console.error("Unexpected error in Signup:", err);
            res.status(500).json({
                success: false,
                message: "Unexpected server error",
            });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required",
                });
            }

            const result = await UserModel.getUserByEmail(email, true);

            if (!result.success) {
                if (result.errorCode === "NOT_FOUND") {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials",
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: result.message,
                });
            }

            const user = result.user;
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, role: user.role, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            delete user.password;

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: user,
                token,
            });
        } catch (err) {
            console.error("Unexpected error in Login:", err);
            res.status(500).json({
                success: false,
                message: "Unexpected server error",
            });
        }
    },
};
