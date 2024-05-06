// server/src/routes/chatRoutes.js
import express from "express";
import { submitChat, validateChat } from "../controllers/chatController.js";

const router = express.Router();
router.post("/", validateChat, submitChat);

export { router as chatRouter };
