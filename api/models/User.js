const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        profilePic: { type: String, default: "" },
        contacts: {type:Array}
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);