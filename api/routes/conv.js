const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req, res) => {

    if (!req.body.senderId || !req.body.receiverId) {
        return res.status(400).json("invalid input");
    }

    try {
        const conversation = await Conversation.find({
            members: { $all: [req.body.senderId, req.body.receiverId] },
        });
        if (conversation.length) {
            console.log("already exist", conversation);
            return res.status(400).json(conversation);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all conv of the user

router.get("/user/:userId", async (req, res) => {
    // console.log("ananthraj");
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get conv details of 2 users

router.get("/user/", async (req, res) => {
    // console.log("ananth");
    const senderId = req.query.sender;
    const receiverId = req.query.receiver;
    // console.log(senderId, receiverId);
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;
