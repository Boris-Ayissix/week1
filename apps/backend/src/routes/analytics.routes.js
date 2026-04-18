import express from "express";

const router = express.Router();

/**
 * =========================
 * PLAN PRICING MAP
 * (Single source of truth)
 * =========================
 */
const PLAN_PRICES = {
  DELIVER_PROJECT: {
    Starter: 200,
    Pro: 500,
    Accelerator: 1000,
  },
  MENTOR_ME: {
    Starter: 50,
    Pro: 150,
    Accelerator: 300,
  },
  COFFEE_CHAT: {
    Quick: 10,
    Deep: 25,
    VIP: 50,
  },
};

/**
 * SIMPLE ADMIN AUTH MIDDLEWARE
 */
const checkAdmin = (req, res, next) => {
  const password =
    req.headers["x-admin-password"] ||
    req.query.password; //  fallback for browser

  if (password !== process.env.ADMIN_PASSWORD) {
    console.log("❌ Wrong password:", password); // debug
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};



/**
 * TEMP DATA STORE (Replace with MongoDB later)
 */
const events = [];

/**
 * =========================
 * POST EVENT
 * =========================
 * Stores analytics event
 */
router.post("/", (req, res) => {
  const { event_name } = req.body;

  // VALIDATION
  if (!event_name) {
    return res.status(400).json({
      error: "event_name is required",
    });
  }

  const event = {
    ...req.body,
    createdAt: new Date(),
  };

  events.push(event);

  console.log("New Event:", event); // Debugging

  res.status(201).json(event);
});

/**
 * =========================
 * GET ALL EVENTS (ADMIN PROTECTED)
 * =========================
 */
router.get("/", checkAdmin, (req, res) => {
  const apiKey = req.headers["x-admin-password"];

  if (apiKey !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  res.json(events);
});

/**
 * =========================
 * FILTER EVENTS
 * =========================
 * Example:
 * /api/analytics/filter?event_name=cta_click
 */
router.get("/filter", (req, res) => {
  let filtered = [...events];

  const { event_name, cta_id } = req.query;

  // FILTER BY EVENT TYPE
  if (event_name) {
    filtered = filtered.filter(
      (e) => e.event_name === event_name
    );
  }

  // FILTER BY CTA
  if (cta_id) {
    filtered = filtered.filter(
      (e) => e.cta_id === cta_id
    );
  }

  res.json(filtered);
});

/**
 * =========================
 * SUMMARY (DASHBOARD API)
 * =========================
 */
 router.get("/summary", checkAdmin, (req, res) => {

    let revenue = 0;

  /**
   * Track plan performance
   */
  const planCounts = {};

  events.forEach((e) => {
    if (e.event_name === "plan_selected") {
      const { type, plan } = e;

      // Revenue calculation
      const price = PLAN_PRICES[type]?.[plan] || 0;
      revenue += price;

      // Count plan usage
      const key = `${type}_${plan}`;
      planCounts[key] = (planCounts[key] || 0) + 1;
    }
  });

  /**
   * FIND TOP PERFORMING PLAN
   */
  let topPlan = null;
  let max = 0;

  for (const key in planCounts) {
    if (planCounts[key] > max) {
      max = planCounts[key];
      topPlan = key;
    }
  }

  /**
   * SUMMARY OBJECT
   */

  const summary = {
    total_clicks: events.filter(e => e.event_name === "cta_click").length,
    page_views: events.filter(e => e.event_name === "page_view").length,

    WORK_MODAL_OPENS: events.filter(
      e => e.event_name === "modal_open" && e.modal === "WORK"
    ).length,

    FREE_HELP_MODAL_OPENS: events.filter(
      e => e.event_name === "modal_open" && e.modal === "FREE_HELP"
    ).length,

     /**
     * FIXED: USE option_selected INSTEAD OF cta_id
     */

    DELIVER_PROJECT: events.filter(
      e => e.event_name === "option_selected" && e.option === "DELIVER_PROJECT"
    ).length,

    MENTOR_ME: events.filter(
      e => e.event_name === "option_selected" && e.option ===  "MENTOR_ME"
    ).length,

    COFFEE_CHAT: events.filter(
      e => e.event_name === "option_selected" && e.option === "COFFEE_CHAT"
    ).length,

       /**
     * 💰 NEW METRICS
     */
    revenue,
    top_plan: topPlan || "No data yet",
  };

  /**
   * Add plan performance data
   */
  for (const key in planCounts) {
    summary[key] = planCounts[key];
  };

  res.json(summary);
});

export default router;