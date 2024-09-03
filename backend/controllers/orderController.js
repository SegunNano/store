import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/utils.js";


const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;
        const user = req.user._id;

        if (!orderItems.length) {
            res.status(400);
            throw new Error('No order items');
        }
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map(product => product._id) }
        });

        const dbOrderItems = orderItems.map(orderItem => {
            const matchOrderItem = itemsFromDB.find(itemFromDB => itemFromDB._id.toString() === orderItem._id);

            if (!matchOrderItem) {
                res.status(404);
                throw new Error(`Product ${orderItem._id} not found.`);
            }

            return {
                ...orderItem,
                product: orderItem._id,
                price: matchOrderItem.price,
                _id: undefined
            };
        });

        const prices = calcPrices(dbOrderItems);

        const order = new Order({
            user,
            orderItems: dbOrderItems,
            shippingAddress,
            paymentMethod,
            ...prices
        });
        await order.save();

        // const createdOrder = await order.save
        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', "id username");
        res.json(orders);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};


const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const ordersCount = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.json({ totalOrders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const calculateTotalSales = async (req, res) => {
    try {
        const orders = await Order.find();
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        res.json({ totalSales });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export { createOrder, getAllOrders, getUserOrders, ordersCount, calculateTotalSales }

