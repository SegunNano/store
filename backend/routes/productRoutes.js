import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn, checkId } from "../middlewares/middleswares.js";
import { addProduct, updateProductDetails, deleteProduct, fetchProducts, readProduct, fetchAllProducts, addProductReview } from "../controllers/productController.js";

router.route('/')
    .get(asyncHandler(fetchProducts))
    .post(isLoggedIn, isAdmin, formidable(), asyncHandler(addProduct));

router.route('/allproducts')
    .get(asyncHandler(fetchAllProducts));


router.route('/:id')
    .get(asyncHandler(readProduct))
    .put(isLoggedIn, isAdmin, formidable(), asyncHandler(updateProductDetails))
    .delete(isLoggedIn, isAdmin, formidable(), asyncHandler(deleteProduct));


router.route('/:id/reviews')
    .post(isLoggedIn, isAdmin, asyncHandler(addProductReview));


export default router;