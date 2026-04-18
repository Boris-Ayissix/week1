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

const allowedOrigins = [
  "http://localhost:5173",//local dev
  "https://branding-website-five.vercel.app"//production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-admin-password"],

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