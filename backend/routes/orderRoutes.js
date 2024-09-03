import express from "express";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn, } from "../middlewares/middleswares.js";
import { createOrder, getAllOrders, getUserOrders, ordersCount, calculateTotalSales} from "../controllers/orderController.js";

router.route('/')
    .post(isLoggedIn, asyncHandler(createOrder))
    .get(isLoggedIn, isAdmin, asyncHandler(getAllOrders));

router.route('/my-orders')
    .get(isLoggedIn, asyncHandler(getUserOrders));

router.route('/total-orders')
    .get(asyncHandler(ordersCount));

router.route('/total-sales')
    .get(asyncHandler(calculateTotalSales));


export default router;