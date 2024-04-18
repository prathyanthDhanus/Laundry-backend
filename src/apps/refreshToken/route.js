const express = require("express");
const router = express.Router();
const controller = require("./controller");
const tryCatch = require("../../utils/tryCatch");


router.route("/refresh-token/user").post(tryCatch(controller.refreshTokenUser));
router.route("/refresh-token/admin").post(tryCatch(controller.refreshTokenAdmin));  

module.exports = router;