const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const PageSchema = require("./schemas/page.schema");

const FBUserSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    fbId: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    pages: {
        type: PageSchema,
    },
});

module.exports = mongoose.model("FBUser", FBUserSchema);