const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const admin = require("../admin/controller");

router
      .post("/register",tryCatch(admin.adminRegister))
      .post("/login",tryCatch(admin.adminLogin))







module.exports = router;
