const mongoose = require('mongoose');
const Chat = require('../models/chat.model');

const Home = (app, io) => {
    app.get("/api", async (req, res) => {
        const chatList = await Chat.find()
            .sort({ date: -1 })
            .limit(4);
        return res.json({ chats: chatList});
    });

    // Socket part
    io.of("/").on("connect", async socket => {
        console.log("Connected ...");

        socket.on("typing", async msg => {
            console.log(msg);
            socket.broadcast.emit("typing", { msg: msg.name });
        });

        // msg submit
        try {
            socket.on("msg", async msg => {
                // When the Req come save them
                const chatList = await Chat.find()
                    .sort({ date: -1 })
                    .limit(4);
                io.emit("msg", { chats: chatList });

                const chat = new Chat({
                    username: msg.name,
                    message: msg.msg
                });
                await chat.save();
                const chats = await Chat.find()
                    .sort({ date: -1 })
                    .limit(4);
                io.emit("msg", { chats: chats });
            });
        } catch (error) {
            console.log(error.message);
        };

        socket.on("typing", name => {
            io.emit("typing", { name: `${name.name}` });
        });
        socket.on("disconnect", () => {
            console.log("Disconnected ...");
        });
    });
};

module.exports = Home;