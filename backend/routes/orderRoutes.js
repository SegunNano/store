import express from "express";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn, } from "../middlewares/middleswares.js";
import { createOrder, getAllOrders, getUserOrders, ordersCount, calculateTotalSales, calculateTotalSalesByDate, getOrderById, markOrderAsPaid, markOrderAsDelivered } from "../controllers/orderController.js";

router.route('/')
    .post(isLoggedIn, asyncHandler(createOrder))
    .get(isLoggedIn, isAdmin, asyncHandler(getAllOrders));

router.route('/my-orders')
    .get(isLoggedIn, asyncHandler(getUserOrders));

router.route('/total-orders')
    .get(asyncHandler(ordersCount));

router.route('/total-sales')
    .get(asyncHandler(calculateTotalSales));

router.route('/total-sales-by-date')
    .get(asyncHandler(calculateTotalSalesByDate));

router.route('/:id')
    .get(isLoggedIn, asyncHandler(getOrderById));

router.route('/:id/pay')
    .put(isLoggedIn, asyncHandler(markOrderAsPaid));

router.route('/:id/delivered')
    .put(isLoggedIn, isAdmin, asyncHandler(markOrderAsDelivered));


export default router;