import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { tips } from "./routes/tips.js"; // Make sure this import is correct

// Load environment variables
dotenv.config({ path: "../../.env" });

const app = express();
const PORT = process.env.PORT || 5002;

// Configure CORS to allow requests from your client
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes - make sure these are proper paths (not URLs)
app.use("/api/tips", tips); // This should be a router, not a URL

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
