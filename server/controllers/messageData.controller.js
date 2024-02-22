const MessageData = require('../models/messageData.model');

const getAllMessageData = async (req, res) => {
    try {
        const messageData = await MessageData.find();
        res.status(200).json(messageData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createMessageData = async (req, res) => {
    try {
        const { fbEmail, messagesDataBase } = req.body;
        console.log(fbEmail, messagesDataBase[0].messages[0].text);
        const messageData = await MessageData.create({ fbEmail, messagesDataBase });
        res.status(201).json(messageData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMessageDataByMessageDataId = async (req, res) => {
    try {
        const { messageDataId } = req.params;
        const messageData = await MessageData.findOne({ messageDataId });
        res.status(200).json(messageData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllMessageData,
    createMessageData,
    getMessageDataByMessageDataId
};