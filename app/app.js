import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "../routes/orderRoutes.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads",express.static("uploads"));

//Routes

app.use("/api/v1/order", orderRoutes);


//Error Middlewares
app.use(notFound);
app.use(globalErrHandler);

export default app;
