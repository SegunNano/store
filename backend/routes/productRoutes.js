import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn, checkId } from "../middlewares/middleswares.js";
import { addProduct, updateProductDetails, deleteProduct, fetchProducts, readProduct, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filteredProducts } from "../controllers/productController.js";

router.route('/')
    .get(asyncHandler(fetchProducts))
    .post(isLoggedIn, isAdmin, formidable(), asyncHandler(addProduct));

router.route('/allproducts')
    .get(asyncHandler(fetchAllProducts));

router.route('/top')
    .get(asyncHandler(fetchTopProducts));

router.route('/new')
    .get(asyncHandler(fetchNewProducts));

router.route('/filtered-products')
    .get(asyncHandler(filteredProducts));

router.route('/:id')
    .get(asyncHandler(readProduct))
    .put(isLoggedIn, isAdmin, formidable(), asyncHandler(updateProductDetails))
    .delete(isLoggedIn, isAdmin, formidable(), asyncHandler(deleteProduct));


router.route('/:id/reviews')
    .post(isLoggedIn, asyncHandler(addProductReview));


export default router;