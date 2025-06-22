import express from "express";
import { askAssistant } from "../AI/ai.controller";

const router = express.Router();

router.post("/assistant", askAssistant);

export default router;
