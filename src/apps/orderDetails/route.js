const express = require("express");
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');
const order = require("../orderDetails/controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");

router 
      .post("/orders",tokenVerifyUser,tryCatch(order.addOrder))
      .get("/orders",tokenVerifyUser,tryCatch(order.getOrders))
      .get("/orders/:orderId",tokenVerifyUser,tryCatch(order.getAorder))
      .get("/user-orders",tokenVerifyUser,tryCatch(order.getFullOrderofUser))
     
      .patch("/orders/:orderId",tokenVerifyUser,tryCatch(order.cancelOrder))
      

 module.exports = router;