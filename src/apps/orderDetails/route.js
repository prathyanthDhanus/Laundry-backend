const express = require("express");
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');
const order = require("../orderDetails/controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");

router 
      .post("/order",tokenVerifyUser,tryCatch(order.addOrder))


 module.exports = router;