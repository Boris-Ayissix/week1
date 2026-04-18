import express from "express"; 
import cors from "cors";
import analyticsRoutes from "./routes/analytics.routes.js";
import dotenv from "dotenv";

dotenv.config();
console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);

const app = express();

/**
 * CORS FIX (IMPORTANT)
 */
// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://https://branding-website-five.vercel.app/"
  ]
}));
app.use(express.json());

/**
 * HEALTH CHECK
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * ANALYTICS ROUTES
 */
app.use("/api/analytics", analyticsRoutes);



export default app;   // ← Important: Export the app so server.js can import it