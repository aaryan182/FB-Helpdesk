const FBUser = require("../models/fbUser.model");
// const User = require("../models/user.model");

const getAllFBUsers = async (req, res) => {
    try {
        const fbUsers = await FBUser.find();
        res.status(200).json(fbUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFBUser = async (req, res) => {
    try {
        const { userEmail, name, email, fbId, accessToken, picture, pages } = req.body;
        const fbUser = await FBUser.create({ userEmail, name, email, fbId, accessToken, picture, pages });
        // const user = await User.create({ email, fbUser });
        res.status(201).json(fbUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFBUserByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const fbUser = await FBUser.findOne({ userId });
        res.status(200).json(fbUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllFBUsers,
    createFBUser,
    getFBUserByUserId,
};