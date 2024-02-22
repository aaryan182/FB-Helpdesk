const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { email, fbUser } = req.body;
        const user = await User.create({ email, fbUser });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
};