const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const user = require("../user/controller");
const category = require("../category/controller");
const subCategory = require("../subCategory/controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");



router
.post("/register",tryCatch(user.userRegister))
.post("/login",tryCatch(user.userlogin))
.post("/login/verify-otp",tryCatch(user.verifyOtpLogin))
.post("/resend-otp",tryCatch(user.userlogin))
.post("/verify-otp",tryCatch(user.verifyOtp))
.post("/forgot/password",tryCatch(user.forgotPassword))
.post("/new-password",tryCatch(user.createNewPassword))
.post("/profiles",tokenVerifyUser,tryCatch(user.addUserProfile))//profile adding and updating


.get("/profiles",tokenVerifyUser,tryCatch(user.getUserProfile))


.get("/category-user",tokenVerifyUser,tryCatch(category.getCategory))
.get("/sub-category/user",tokenVerifyUser,tryCatch(subCategory.getAllSubCategory))

.post('/payment',tokenVerifyUser,tryCatch(user.userPayment))









module.exports = router;