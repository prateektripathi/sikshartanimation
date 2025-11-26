import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminRoute from "./routes/admin.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", adminRoute);
app.use("/api/hackathon", registrationRoutes);
app.use("/api/hackathon", statsRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
