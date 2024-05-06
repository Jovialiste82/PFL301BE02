// server/src/routes/mailRoutes.js
import express from "express";
import {
  getActiveProjects,
  addProject,
} from "../controllers/projectController.js"; // Import the controller
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getActiveProjects);
router.post("/", protect, addProject);

export { router as projectRouter };
