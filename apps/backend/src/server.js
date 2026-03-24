// server.js
// Basic Express server setup

const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;