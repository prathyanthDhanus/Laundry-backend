const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { tryCatch } = require("../../utils/tryCatch");


router.route("/refresh-token/user").post(tryCatch(controller.refreshToken));
// router.route("/refresh-token/students").post(tryCatch(controller.refreshTokenStudent));  

module.exports = router;