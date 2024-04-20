const expres = require("express");
const router = expres.Router();
const tryCatch = require("../../utils/tryCatch");
const subCategory =  require('./controller');
const {tokenVerifyAdmin} = require("../../utils/jwtToken");


router
      .post("/sub-category",tokenVerifyAdmin,tryCatch(subCategory.addSubCategory))
      .get("/sub-category",tokenVerifyAdmin,tryCatch(subCategory.getAllSubCategory))
      .put("/sub-category",tokenVerifyAdmin,tryCatch(subCategory.updtaeSubCategory))
      .put("/sub-category",tokenVerifyAdmin,tryCatch(subCategory.updtaeSubCategory))
      .delete("/sub-category",tokenVerifyAdmin,tryCatch(subCategory.deleteSubCategory))

module.exports = router;