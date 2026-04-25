import { saveEvent, getEvents } from "../services/analytics.service.js";
/*
// POST /api/analytics
export const createEventController = (req, res) => {
  try {
    const event = saveEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/analytics (for testing/dashboard later)
export const getEventsController = (req, res) => {
  res.json(getEvents());
};*/

app.post("/api/analytics", async (req, res) => {
  try {
    console.log("Incoming analytics:", req.body);

    const { event, page } = req.body;

    // Validate input
    if (!event) {
      return res.status(400).json({
        error: "Missing 'event' field",
      });
    }

    // Simulate or save
    // await Analytics.create({ event, page });

    return res.status(200).json({
      message: "Analytics recorded",
    });

  } catch (error) {
    console.error("Analytics error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});
