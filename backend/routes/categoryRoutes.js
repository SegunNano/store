import express from "express";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn } from "../middlewares/middleswares.js";
import { createCategory, updateCategory, deleteCategory, listCategory, readCategory } from "../controllers/categoryController.js";

router.route('/')
    .post(isLoggedIn, isAdmin, asyncHandler(createCategory))
    .get(isLoggedIn, isAdmin, asyncHandler(listCategory));

router.route('/:categoryId')
    .put(isLoggedIn, isAdmin, asyncHandler(updateCategory))
    .delete(isLoggedIn, isAdmin, asyncHandler(deleteCategory))
    .get(isLoggedIn, isAdmin, asyncHandler(readCategory));

// router.route('/categories')
//     .get(isLoggedIn, isAdmin, asyncHandler(listCategory));










export default router;