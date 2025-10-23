// scripts/init-db.js
import fs from "fs";
import { pool } from "../db.js";

const schema = fs.readFileSync("./db/schema.sql", "utf8");

(async () => {
  try {
    await pool.query(schema);
    console.log("✅ Database schema initialized");
  } catch (err) {
    console.error("❌ Error initializing schema:", err);
  } finally {
    await pool.end();
  }
})();
