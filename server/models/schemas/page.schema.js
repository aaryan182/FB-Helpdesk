const mongoose = require("mongoose");

// const TaskSchema = new mongoose.Schema({ type: String }, { strict: false });

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports = PageSchema;