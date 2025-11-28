import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

// ----------------------
// CORS (Allow frontend)
// ----------------------
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  })
);

// ----------------------
// RATE LIMITER
// ----------------------
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});
app.use(limiter);

// ----------------------
// GOOGLE GEMINI CLIENT
// ----------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------------------
// BASIC HEALTH CHECK
// ----------------------
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

// ----------------------
// MAIN AI ROUTE
// ----------------------
app.post("/generate", async (req, res) => {
  try {
    const { prompt, framework } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fullPrompt = `
You are an expert UI developer. Generate a SINGLE-FILE HTML COMPONENT.

Component request: ${prompt}
Framework: ${framework || "html-css"}

Requirements:
- Return ONLY valid HTML/CSS/JS code.
- Do NOT include explanation or comments.
- Must be a complete working HTML file.
    `;

    const result = await model.generateContent(fullPrompt);
    const output = result.response.text();

    res.json({ output });
  } catch (err) {
    console.error("Error generating AI content:", err);
    res.status(500).json({ error: "AI generation failed." });
  }
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
