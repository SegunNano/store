import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn, checkId } from "../middlewares/middleswares.js";
import { addProduct } from "../controllers/productController.js";

router.route('/')
    .post(isLoggedIn, isAdmin, formidable(), asyncHandler(addProduct));


export default router;