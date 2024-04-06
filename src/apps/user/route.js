const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const user = require("../user/controller");

router 
.post("/register",tryCatch(user.userRegister))
.post("/login",tryCatch(user.userlogin))
.post("/verifyotp",tryCatch(user.verifyOtp))
.post("/resendotp",tryCatch(user.userlogin))












module.exports = router;