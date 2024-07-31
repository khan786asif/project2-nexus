const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(400).send({ message: "User already exists" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, "secretKey", {
            expiresIn: "1h",
        });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;
