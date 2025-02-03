import express from "express";
import { getAllOrder } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.get("/", getAllOrder);

export default orderRoutes;
