import express from "express";
import { getAllOrder, webhookHandler } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.get("/", getAllOrder);

orderRoutes.post("/webhook", webhookHandler);

export default orderRoutes;
