// EVENTS TABLE SCHEMA (Single source of truth)

import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),

  // Event name (cta_click, modal_open, etc)
  event_name: text("event_name").notNull(),

  // Flexible payload (cta_id, modal, etc)
  data: jsonb("data"),

  // Timestamp
  created_at: timestamp("created_at").defaultNow(),
});