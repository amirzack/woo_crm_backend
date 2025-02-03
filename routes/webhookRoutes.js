import express from "express";
import { sseHandler, webhookHandler } from "../controllers/orderController.js";

const webhookRoutes = express.Router();

webhookRoutes.post("/", webhookHandler);
webhookRoutes.get("/", sseHandler);

export default webhookRoutes;
