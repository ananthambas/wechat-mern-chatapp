const router = require("express").Router();
const User = require("../models/User");



//get by username

router.get("/un/:username", async (req, res) => {
    try {
        // console.log(req.params.username);
        const user = await User.findOne({
            username: req.params.username
        })
        if (!user) {
            return res.status(204).json("user doesnt exist");
        }
        const { password, ...details } = user._doc;
        res.status(200).json(details);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get by userid

router.get("/id/:userId", async (req, res) => {
    try {
        // console.log("raj");
        // console.log(req.params.userId);
        const user = await User.findById(req.params.userId);
        const { password, ...details } = user._doc;
        res.status(200).json(details);
    } catch (err) {
        res.status(500).json(err);
    }
})
//update contacts

router.put("/id/:userId", async (req, res) => {
    const contact = req.body.contact;
    const username = req.body.username;
    try {
        const user = await User.findByIdAndUpdate(req.params.userId,
            {
                "$push": { "contacts": { contact, username } }
            },
            { new: true }
        );
        const { password, ...details } = user._doc;
        res.status(200).json(details);
    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;