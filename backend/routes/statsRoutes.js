import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

// PROTECTED route
router.get("/registrations", auth, async (req, res) => {
  const all = await import("../models/HackathonRegistration.js")
    .then(m => m.default.find().sort({ createdAt: -1 }));
  res.json(all);
});

router.get("/stats", auth, getStats);

export default router;
