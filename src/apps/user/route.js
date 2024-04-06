const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const user = require("../user/controller");

router 
.post("/register",tryCatch(user.userRegister))
.post("/login",tryCatch(user.userlogin))
.post("/login/verify-otp",tryCatch(user.verifyOtpLogin))
.post("/resend-otp",tryCatch(user.userlogin))
.post("/verify-otp",tryCatch(user.verifyOtp))
.post("/forgot/password",tryCatch(user.forgotPassword))












module.exports = router;