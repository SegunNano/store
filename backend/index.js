//packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

//utils
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

//routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const port = process.env.Port || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));

