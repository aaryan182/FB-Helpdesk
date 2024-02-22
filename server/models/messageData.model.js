const mongoose = require("mongoose");

const MessageTextSchema = new mongoose.Schema({
    from: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    to: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    text: {
        type: String,
        // required: true,
    },
    timestamp: {
        type: String,
        required: true,
    }
});

const MessageSchema = new mongoose.Schema({
    customer: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    messages: {
        type: [MessageTextSchema],
        required: true,
    },
});

const MessageDataSchema = new mongoose.Schema({
    fbEmail: {
        type: String,
        // ref: "FBUser",
        required: true,
    },
    messagesDataBase: {
        type: [MessageSchema],
        required: true,
    },
});

module.exports = mongoose.model("MessageData", MessageDataSchema);