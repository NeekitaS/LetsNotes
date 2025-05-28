const User = require('../models/User');
const Category = require('../models/Category');
const Note = require('../models/Note');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User alredy exists"
                })
        }

        user = await User.create({
            name,
            email,
            password
        })

        const token = await user.generateToken();

        res.status(201)
            .cookie("token", token, {
                expirees: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Allow cross-site requests
            })
            .json({
                success: true,
                user,
                message: "Registration Successful"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password").populate("notes categories");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found with this email"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = await user.generateToken();

        res.status(200).
            cookie("token", token, {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Allow cross-site requests
            })
            .json({
                success: true,
                user,
                token,
                message: "Login successful"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Allow cross-site requests
            })
            .json({
                success: true,
                message: "Logged out successfully"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("notes categories");

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name } = req.body;

        if (name) {
            user.name = name;
            await user.save();

            res.status(200).json({
                success: true,
                user,
                message: "Profile updated successfully"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Name is required"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("notes categories")

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        //deleting all the notes created by this user
        for (let i = 0; i < user.notes.length; i++) {
            await Note.findByIdAndDelete(user.notes[i]._id);
        }

        //deleting all the categories created by this user
        for (let i = 0; i < user.categories.length; i++) {
            await Category.findByIdAndDelete(user.categories[i]._id);
        }

        await User.findByIdAndDelete(req.user._id);

        //logout the user
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Allow cross-site requests
        })

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}