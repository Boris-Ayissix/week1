import express from "express";

const router = express.Router();

const events = []; // temporary storage

router.post("/", (req, res) => {
  const event = {
    ...req.body,
    createdAt: new Date(),
  };

  events.push(event);

  res.status(201).json(event);
});

router.get("/", (req, res) => {
  res.json(events);
});

export default router;