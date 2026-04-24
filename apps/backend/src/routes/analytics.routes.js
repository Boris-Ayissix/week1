import express from "express";
import  pool  from "../db/index.js";
import { events } from "../db/schema.js";
import { eq } from "drizzle-orm";

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
const tempevents = [];

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
 router.get("/filter", checkAdmin, async (req, res) => {
  try {
    const { event_name, cta_id } = req.query;

    // Build query dynamically with parameters to prevent SQL injection
    let query = "SELECT * FROM events";
    const conditions = [];
    const values = [];

    if (event_name) {
      values.push(event_name);
      conditions.push(`event_name = $${values.length}`);
    }

    if (cta_id) {
      values.push(cta_id);
      conditions.push(`cta_id = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ FILTER ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});


/**
 * =========================
 * SUMMARY (DASHBOARD API)
 * =========================
 */
 router.get("/summary", checkAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");

    const events = result.rows;

    let revenue = 0;
    const planCounts = {};

    events.forEach((e) => {
      if (e.event_name === "plan_selected") {
        const price = PLAN_PRICES[e.type]?.[e.plan] || 0;
        revenue += price;

        const key = `${e.type}_${e.plan}`;
        planCounts[key] = (planCounts[key] || 0) + 1;
      }
    });

    let topPlan = null;
    let max = 0;

    for (const key in planCounts) {
      if (planCounts[key] > max) {
        max = planCounts[key];
        topPlan = key;
      }
    }

    const summary = {
      total_clicks: events.filter(e => e.event_name === "cta_click").length,
      page_views: events.filter(e => e.event_name === "page_view").length,

      WORK_MODAL_OPENS: events.filter(
        e => e.event_name === "modal_open" && e.modal === "WORK"
      ).length,

      FREE_HELP_MODAL_OPENS: events.filter(
        e => e.event_name === "modal_open" && e.modal === "FREE_HELP"
      ).length,

      DELIVER_PROJECT: events.filter(
        e => e.event_name === "option_selected" && e.option === "DELIVER_PROJECT"
      ).length,

      MENTOR_ME: events.filter(
        e => e.event_name === "option_selected" && e.option === "MENTOR_ME"
      ).length,

      COFFEE_CHAT: events.filter(
        e => e.event_name === "option_selected" && e.option === "COFFEE_CHAT"
      ).length,

      revenue,
      top_plan: topPlan || "No data yet",
    };

    res.json(summary);
  } catch (err) {
    console.error("❌ SUMMARY ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;



