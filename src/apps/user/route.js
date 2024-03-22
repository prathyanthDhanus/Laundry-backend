const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const user = require("../user/controller");

router 
.post("/register",tryCatch(user.userRegister))
.post("/login",tryCatch(user.userlogin))










module.exports = router;