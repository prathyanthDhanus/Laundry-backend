const expres = require("express");
const router = expres.Router();
const tryCatch = require("../../utils/tryCatch");
const subCategory =  require('./controller');



router
      .post("/sub-category",tryCatch(subCategory.addSubCategory))
      .get("/sub-category",tryCatch(subCategory.getAllSubCategory))
      .put("/sub-category",tryCatch(subCategory.updtaeSubCategory))
      .put("/sub-category",tryCatch(subCategory.updtaeSubCategory))
      .delete("/sub-category",tryCatch(subCategory.deleteSubCategory))

module.exports = router;