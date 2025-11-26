import express from "express";
import { register } from "../controllers/registrationController.js";

const router = express.Router();

// PUBLIC ROUTE
router.post("/register", register);

export default router;
