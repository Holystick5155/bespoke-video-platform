const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/userModel');
const dotenv = require("dotenv");


dotenv.config();

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({ name, email, password, verificationToken, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Account Verification',
            text: `Please verify your account by clicking the link: http://localhost:5080/api/auth/verify/${verificationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ msg: 'Error sending email' });
            } else {
                res.status(200).json({ msg: 'Verification email sent' });
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Verify Controller
const verify = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) return res.status(400).json({ msg: 'Invalid verification token' });

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        res.status(200).json({ msg: 'Account verified' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        if (!user.isVerified) return res.status(400).json({ msg: 'Please verify your email first' });

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Forgot Password Controller
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires after one hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Please reset your password by clicking the link: http://localhost:5080/api/auth/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ msg: 'Error sending email' });
            } else {
                res.status(200).json({ msg: 'Password reset email sent' });
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { signup, login, forgotPassword, resetPassword }