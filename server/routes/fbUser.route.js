const express = require("express");
const router = express.Router();
const fbUserController = require("../controllers/fbUser.controller");

router.get("/", fbUserController.getAllFBUsers);
router.post("/", fbUserController.createFBUser);
router.get("/:userId", fbUserController.getFBUserByUserId);


module.exports = router;