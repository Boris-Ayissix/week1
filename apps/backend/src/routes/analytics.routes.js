import express from "express";
import { db } from "../db/index.js";
import { events } from "../db/schema.js";
import { eq } from "drizzle-orm";
import pool from "../db.js";

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
 * ADMIN AUTH
 */
const checkAdmin = (req, res, next) => {
  const password =
    req.headers["x-admin-password"] || req.query.password;

  if (password !== process.env.ADMIN_PASSWORD) {
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
/**
 * POST EVENT → STORE IN DB
 */
router.post("/", async (req, res) => {
  try {
    const {
      event_name,
      page,
      cta_id,
      modal,
      option,
      plan,
      type,
      method,
    } = req.body;

    if (!event_name) {
      return res.status(400).json({ error: "event_name required" });
    }

    const result = await pool.query(
      `
      INSERT INTO events 
      (event_name, page, cta_id, modal, option, plan, type, method)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
      `,
      [event_name, page, cta_id, modal, option, plan, type, method]
    );

    console.log("✅ Event saved:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ DB INSERT ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});

  /**
 * GET ALL EVENTS
 */
  router.get("/", checkAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ DB FETCH ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
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
 router.get("/summary", checkAdmin, async (req, res) => {
    const allEvents = await db.select().from(events);
    let revenue = 0;

  /**
   * Track plan performance
   */
  const planCounts = {};

  allEvents.forEach((e) => {
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

  const getCount = (name) =>
    allEvents.filter(e => e.event_name === name).length;

  const summary = {
    page_views: getCount("page_view"),
    total_clicks: getCount("cta_click"),

    WORK_MODAL_OPENS: allEvents.filter(
      e => e.event_name === "modal_open" && e.data?.modal === "WORK"
    ).length,

    FREE_HELP_MODAL_OPENS: allEvents.filter(
      e => e.event_name === "modal_open" && e.data?.modal === "FREE_HELP"
    ).length,
     /**
     * FIXED: USE option_selected INSTEAD OF cta_id
     */

    DELIVER_PROJECT: allEvents.filter(
      e => e.event_name === "option_selected" && e.data?.option === "DELIVER_PROJECT"
    ).length,

    MENTOR_ME: allEvents.filter(
      e => e.event_name === "option_selected" && e.data?.option ===  "MENTOR_ME"
    ).length,

    COFFEE_CHAT: allEvents.filter(
      e => e.event_name === "option_selected" && e.data?.option === "COFFEE_CHAT"
    ).length,

       /**FIXED: REVENUE CALCULATION AND TOP PLAN
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