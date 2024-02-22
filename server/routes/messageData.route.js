const express = require("express");
const router = express.Router();
const messageDataController = require("../controllers/messageData.controller");

router.get("/", messageDataController.getAllMessageData);
router.post("/", messageDataController.createMessageData);
router.get("/:messageDataId", messageDataController.getMessageDataByMessageDataId);

module.exports = router;