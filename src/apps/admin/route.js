const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const admin = require("../admin/controller");
const {tokenVerifyAdmin} = require('../../utils/jwtToken');


router
      .post("/register",tryCatch(admin.adminRegister))
      .post("/login",tryCatch(admin.adminLogin))
      .post("/assign/orders",tokenVerifyAdmin,tryCatch(admin.assignOrdersToDeliveryAgent))
     
      .put("/orders",tokenVerifyAdmin,tryCatch(admin.outForDeliveryStatus))
      
      .get("/orders",tokenVerifyAdmin,tryCatch(admin.getOrdersForAdmin))
      







module.exports = router;
