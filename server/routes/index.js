const express = require("express");
const router = express.Router();

const userRoutes = require('./user.route');
const fbUserRoutes = require('./fbUser.route');
const messageDataRoutes = require('./messageData.route');

router.use('/users', userRoutes);
router.use('/fbusers', fbUserRoutes);
router.use('/messageData', messageDataRoutes);

module.exports = router;