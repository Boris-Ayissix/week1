// server.js
// Basic Express server setup



import app from "./app.js";

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

export default app; // for testing
