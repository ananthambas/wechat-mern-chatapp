const mongoose = require("mongoose");

const convSchema = new mongoose.Schema(
    {
        members: {
            type: Array, default: undefined
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Conversation", convSchema);