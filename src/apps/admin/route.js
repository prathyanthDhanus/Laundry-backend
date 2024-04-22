const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const admin = require("../admin/controller");
const {tokenVerifyAdmin} = require('../../utils/jwtToken');
router
      .post("/register",tryCatch(admin.adminRegister))
      .post("/login",tryCatch(admin.adminLogin))
      .get("/orders",tokenVerifyAdmin,tryCatch(admin.getAllOrders))
      







module.exports = router;
