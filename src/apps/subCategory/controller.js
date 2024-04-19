const {
  addSubCategoryDb,
  getAllSubCategoryDb,
  updtaeSubCategory,
  deleteSubCategoryDb,
} = require("./service/db");

module.exports = {
  //================== add sub-category ===================

  addSubCategory: async (req, res) => {
    const { body } = req;
    const findSubCategory = await addSubCategoryDb(body);

    return res.status(200).json({
      status: "success",
      message: "Sub_category created successfully",
      data: findSubCategory,
    });
  },

  //================== get all sub-category =================

  getAllSubCategory: async (req, res) => {
    const findSubCategory = await getAllSubCategoryDb();

    return res.status(200).json({
      status: "success",
      message: "Sub_category fetched successfully",
      data: findSubCategory,
    });
  },

  //================= update sub-category name ===============

  updtaeSubCategory: async (req, res) => {
    const { body } = req;
    const findSubCategory = await updtaeSubCategory(body);

    return res.status(200).json({
      status: "success",
      message: "Sub_category updated successfully",
      data: findSubCategory,
    });
  },

  //================= delete sub-category ===================

  deleteSubCategory: async (req, res) => {
    const { subCategoryId } = req.query;
    const findSubCategory = await deleteSubCategoryDb(subCategoryId);

    return res.status(200).json({
      status: "success",
      message: "Sub_category updated successfully",
      data: findSubCategory,
    });
  },
};
