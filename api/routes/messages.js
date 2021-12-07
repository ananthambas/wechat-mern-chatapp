const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
    const body = req.body;
    if (!body.conversationId || !body.sender || !body.text) {
        return res.status(400).json("invalid input");
    }
    const newMessage = new Message(body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})


//get

router.get("/:convId", async (req, res) => {
    const query = req.query.last;
    try {
        if (query) {
            const messages = await Message.findOne({
                conversationId: req.params.convId
            }).sort({_id: -1});
            // console.log(messages);
            res.status(200).json(messages);
        } else {
            const messages = await Message.find(
                {
                    conversationId: req.params.convId
                },
            );
            res.status(200).json(messages);
        }
    } catch (err) {
        res.status(500).json(err);
    }
})



//get last

router.get("/find/:convId", async (req, res) => {
    try {
        const messages = await Message.findOne(
            {
                conversationId: req.params.convId
            },
            // {
            //     sort: { 'created_at' : -1 }
            // }
        );
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
