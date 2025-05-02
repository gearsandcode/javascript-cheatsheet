import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../../../.env" });

const { Pool } = pg;

// Create a new pool using the connection string from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.query("SELECT NOW()", (err: any, res: { rows: { now: any }[] }) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected:", res.rows[0].now);
  }
});

export default pool;
