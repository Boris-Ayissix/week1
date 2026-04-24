/**
 * DATABASE CONNECTION (PostgreSQL - Railway)
 * Uses connection string from Railway env
 */

import pkg from "pg";
const { Pool } = pkg;

// Pool handles multiple connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Railway
  },
});

export default pool;