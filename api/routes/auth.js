
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("express");

//Register

router.post("/register", async (req, res) => {
    const saltRounds = 10;
    console.log(req.body);
    const user = new User(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);


        const newUser = await user.save();
        const { password, ...details } = newUser._doc;
        console.log(newUser);
        res.status(200).json(details);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//login

router.post("/login", async (req, res) => {
    console.log("ananth");
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                
                const accessToken = jwt.sign(
                    { id: user._id },
                    process.env.SECRET_KEY,
                    { expiresIn: "50d" }
                );

                const { password, ...info } = user._doc;
                return res.status(200).json({...info, accessToken});
            }
        }
        res.status(400).json("invalid username or password");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;