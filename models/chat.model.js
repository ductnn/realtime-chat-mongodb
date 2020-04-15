const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createAt: {
        type: Date, 
        default: Date.now()
    }
});

const Chat = mongoose.model('Chat', chatSchema, 'chats');

module.exports = Chat;