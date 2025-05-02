import pool from "../connection.js";
import { v4 as uuidv4 } from "uuid";

export interface Tip {
  id: string;
  title: string;
  description: string;
  code_snippet: string;
  categories: string[];
}

export async function initDb() {
  try {
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tips (
        id VARCHAR(36) PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        code_snippet TEXT,
        categories TEXT[]
      )
    `);

    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function seedDb(tips: Omit<Tip, "id">[]) {
  try {
    // Check if table is empty
    const result = await pool.query("SELECT COUNT(*) FROM tips");
    if (parseInt(result.rows[0].count) === 0) {
      console.log("Seeding database...");

      // Insert initial tips
      for (const tip of tips) {
        await pool.query(
          "INSERT INTO tips (id, title, description, code_snippet, categories) VALUES ($1, $2, $3, $4, $5)",
          [
            uuidv4(),
            tip.title,
            tip.description,
            tip.code_snippet,
            tip.categories,
          ]
        );
      }

      console.log("Database seeded");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

export async function getAllTips(): Promise<Tip[]> {
  try {
    const result = await pool.query("SELECT * FROM tips");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tips:", error);
    throw error;
  }
}

export async function getTipById(id: string): Promise<Tip> {
  try {
    const result = await pool.query("SELECT * FROM tips WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching tip:", error);
    throw error;
  }
}

export async function createTip(tip: Omit<Tip, "id">): Promise<Tip> {
  try {
    const id = uuidv4();
    const result = await pool.query(
      "INSERT INTO tips (id, title, description, code_snippet, categories) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, tip.title, tip.description, tip.code_snippet, tip.categories]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating tip:", error);
    throw error;
  }
}

export async function updateTip(
  id: string,
  tip: Omit<Tip, "id">
): Promise<Tip> {
  try {
    const result = await pool.query(
      "UPDATE tips SET title = $1, description = $2, code_snippet = $3, categories = $4 WHERE id = $5 RETURNING *",
      [tip.title, tip.description, tip.code_snippet, tip.categories, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating tip:", error);
    throw error;
  }
}

export async function deleteTip(id: string): Promise<void> {
  try {
    await pool.query("DELETE FROM tips WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting tip:", error);
    throw error;
  }
}
