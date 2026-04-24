CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"data" jsonb,
	"created_at" timestamp DEFAULT now()
);
