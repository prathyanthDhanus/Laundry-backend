const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const category = require("../category/controller");
const {tokenVerifyAdmin} = require("../../utils/jwtToken");


router
       .post("/category",tokenVerifyAdmin,tryCatch(category.addCategory))
       .get("/category",tokenVerifyAdmin,tryCatch(category.getCategory))
       .put('/category',tokenVerifyAdmin,tryCatch(category.updateCategory))
       .patch('/category',tokenVerifyAdmin,tryCatch(category.deleteCategory))



module.exports = router;