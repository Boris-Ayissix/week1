import { saveEvent, getEvents } from "../services/analytics.service.js";

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
};