import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(200).json({
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Error in signin controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in signout controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({
            _id: req.user._id,
            fullName: req.user.fullName,
            email: req.user.email,
        });
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
