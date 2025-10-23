import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import siteLinkRoutes from './routes/site-link.routes.js';
import aiRoutes from './routes/ai.routes.js'


const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRoutes);

app.use("/api/site-links",siteLinkRoutes);

app.use("/api/ai",aiRoutes);




app.get("/api/", (req, res) => {
  res.json({ message: "Server is live" });
});


export default app;