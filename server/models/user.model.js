const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    fbUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FBUser",
    },
});

module.exports = mongoose.model("User", UserSchema);