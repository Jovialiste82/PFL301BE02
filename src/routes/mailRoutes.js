// server/src/routes/mailRoutes.js
import express from "express";
import { submitForm, validateMail } from "../controllers/mailController.js";

const router = express.Router();

router.post("/", validateMail, submitForm);

export { router as mailRouter };
