import pkg from "pg";
import {config} from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Optional: test connection once at startup
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL (Neon)");
    client.release();
  })
  .catch(err => console.error("❌ Database connection error:", err.stack));
