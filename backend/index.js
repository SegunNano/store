//packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

//utils
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.Port || 5000;

connectDB();

// const corsOptions = {
//     origin: "http://localhost:5173"
// };

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));

