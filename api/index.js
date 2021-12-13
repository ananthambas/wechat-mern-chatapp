const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const convRoute = require("./routes/conv");
const messagesRoute = require("./routes/messages");
const userRoute = require("./routes/user");
const { time } = require("console");
// const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

let users = [];

const addUser = (userId, username, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, username, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) => {



    console.log(`user connected : ${socket.id} ` + new Date().toTimeString());
    // console.log(users);
    io.emit("welcome", "hello this is socket server");


    //adding user
    socket.on("addUser", (userId, userName) => {
        console.log("user id " + userId + userName);
        addUser(userId, userName, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })

    //send message
    socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
        console.log(senderId, receiverId);
        const user = getUser(receiverId);
        console.log(user);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
            conversationId,
        });
    });

    //disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected " + socket.id + " " + new Date().toTimeString());
        // console.log(users);
        removeUser(socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })
})

server.listen(8700, () => {
    console.log("backend is running");
})

dotenv.config();

// app.listen(8700, () => {
//     console.log("backend is running");
// })

app.use(express.json());

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }))

app.use("/api/auth", authRoute);
app.use("/api/conv", convRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/user", userRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("DB connection successful"); })
    .catch((err) => { console.log(err); })