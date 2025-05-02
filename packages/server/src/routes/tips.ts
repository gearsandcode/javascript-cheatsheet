import express from "express";
import {
  getAllTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip,
  initDb,
  seedDb,
} from "../db/models/tip.js";

const router = express.Router();

// Initialize database
initDb()
  .then(() => {
    // Import initial tips data
    import("../../../client/src/data/initialTips.js")
      .then((module) => {
        // Transform the data format if necessary
        const initialTips = module.initialTips.map((tip) => ({
          title: tip.title,
          description: tip.description,
          code_snippet: tip.codeSnippet,
          categories: tip.categories,
        }));

        return seedDb(initialTips);
      })
      .catch((error) => console.error("Error importing initial tips:", error));
  })
  .catch((error) =>
    console.error("Error during database initialization:", error)
  );

// Get all tips
router.get("/", async (req, res) => {
  try {
    const tips = await getAllTips();
    res.json(tips);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tips" });
  }
});

// Get tip by ID
router.get("/:id", async (req, res) => {
  try {
    const tip = await getTipById(req.params.id);
    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }
    res.json(tip);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tip" });
  }
});

// Create new tip
router.post("/", async (req, res) => {
  try {
    const newTip = await createTip(req.body);
    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tip" });
  }
});

// Update tip
router.put("/:id", async (req, res) => {
  try {
    const updatedTip = await updateTip(req.params.id, req.body);
    if (!updatedTip) {
      return res.status(404).json({ error: "Tip not found" });
    }
    res.json(updatedTip);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tip" });
  }
});

// Delete tip
router.delete("/:id", async (req, res) => {
  try {
    await deleteTip(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tip" });
  }
});

export { router as tips };
