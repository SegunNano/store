import express from "express";
const router = express.Router();
import { asyncHandler, isAdmin, isLoggedIn } from "../middlewares/middleswares.js";
import { register, login, logout, getAllUsers, getProfileInfo, updateProfileInfo, deleteUser, getUserInfo, updateUserInfo } from "../controllers/userController.js";


router.route('/')
    .post(asyncHandler(register));
// .get(isLoggedIn, isAdmin, asyncHandler(getAllUsers));

router.route('/auth')
    .post(asyncHandler(login));

router.route('/logout')
    .post(asyncHandler(logout));

router.route('/profile')
    .get(isLoggedIn, asyncHandler(getProfileInfo))
    .put(isLoggedIn, asyncHandler(updateProfileInfo));

router.route('/admin')
    .get(isLoggedIn, isAdmin, asyncHandler(getAllUsers));

router.route('/admin/:id')
    .get(isLoggedIn, isAdmin, asyncHandler(getUserInfo))
    .put(isLoggedIn, isAdmin, asyncHandler(updateUserInfo))
    .delete(isLoggedIn, isAdmin, asyncHandler(deleteUser));




export default router;
