const {
  addCategoryDb,
  getAllCategoryDb,
  updateCategoryDb,
  deleteCategoryDb,
} = require("./service/db");

module.exports = {
  //================= add category ===================

  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    const findCategory = await addCategoryDb(categoryName);

    return res.status(200).json({
      status: "success",
      message: "Category added successfully",
      data: findCategory,
    });
  },

  //================ get category ==================

  getCategory: async (req, res) => {
    const findCategory = await getAllCategoryDb();

    return res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: findCategory,
    });
  },

  //============== update catrgory name =============

  updateCategory: async (req, res) => {
    const { categoryId } = req.query;
    const { categoryName } = req.body;
    const findCategory = await updateCategoryDb(categoryId, categoryName);

    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: findCategory,
    });
  },

  //================ delete category =================

  deleteCategory: async (req, res) => {
    const { categoryId } = req.query;
    const findCategory = await deleteCategoryDb(categoryId);

    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: findCategory,
    });
  },
};
