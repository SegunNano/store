import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { isValidObjectId } from "mongoose";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};


const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
});


const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send('Authorization failed, not an admin.');
    }
};

const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.status(404);
        throw new Error(`Invalid Object of: ${id}`);
        next();
    }
};



export { asyncHandler, isLoggedIn, isAdmin, checkId };
