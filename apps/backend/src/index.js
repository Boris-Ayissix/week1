// src/index.js
// Purpose: Express app + health endpoint (production-ready structure)

const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Health route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Only start server if NOT in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;