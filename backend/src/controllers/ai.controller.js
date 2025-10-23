import { GoogleGenAI } from "@google/genai";
import { Groq } from "groq-sdk";

// Google GenAI setup
const googleAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Groq setup
const groq = new Groq();

export const AIController = {
    // Generate description using Google GenAI
    async generateDescriptionGoogle(req, res) {
        try {
            const { title, category } = req.body;

            if (!title?.trim()) return res.status(400).json({ success: false, message: "Site title is required" });
            if (!category?.trim()) return res.status(400).json({ success: false, message: "Category name is required" });

            const prompt = `Write a short, compelling description (2-4 sentences) 
                            for a website titled "${title}" in the "${category}" category. 
                            Make the paragraph approximately 250 characters long. 
                            Try to keep it concise, clear, and engaging.`;

            const response = await googleAI.models.generateContent({
                model: "gemini-1.5-flash",
                contents: prompt,
            });

            const text = response.text();
            console.log("Google AI response:", text);

            return res.status(201).json({ success: true, description: text });
        } catch (error) {
            console.error("Error in generateDescriptionGoogle:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Generate description using Groq
    async generateDescriptionGroq(req, res) {
        try {
            const { title, category } = req.body;

            if (!title?.trim()) return res.status(400).json({ success: false, message: "Site title is required" });
            if (!category?.trim()) return res.status(400).json({ success: false, message: "Category name is required" });

            const prompt = `Write a short, compelling description (2-3 sentences) for a website titled "${title}" in the "${category}" category. Keep it short`;

            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "openai/gpt-oss-20b",
                temperature: 1,
                max_completion_tokens: 8192,
                top_p: 1,
                stream: false, // streaming false for API response
                reasoning_effort: "medium",
            });

            // If streaming were true, you'd iterate chunks. Here, just get full text
            const text = chatCompletion.choices?.[0]?.message?.content?.trim();

            console.log("Groq AI response:", text);

            return res.status(201).json({ success: true, description: text });
        } catch (error) {
            console.error("Error in generateDescriptionGroq:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
};
