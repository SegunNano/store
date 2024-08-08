import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
        throw new Error('Please Fill All fields.');
    }


    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send('User already exists.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        generateToken(res, newUser._id);
        newUser.password = '';
        res.status(201).json(newUser);
    } catch {
        res.status(400);
        throw new Error('User not created.');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        throw new Error('Please Fill All fields.');
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (isPasswordMatch) {
            generateToken(res, existingUser._id);
            existingUser.password = '';
            res.status(201).json(existingUser);
            return;
        } else {
            console.log('password not match');
        }
    }
};

const logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'logged out succesfully👍' });
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const getProfileInfo = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
};

const updateProfileInfo = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        updatedUser.password = '';
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
};

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete an admin.');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User daleted' });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
};

const getUserInfo = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json({ user });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
};

const updateUserInfo = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();
        updatedUser.password = '';
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
};



export { register, login, logout, getAllUsers, getProfileInfo, updateProfileInfo, deleteUser, getUserInfo, updateUserInfo };