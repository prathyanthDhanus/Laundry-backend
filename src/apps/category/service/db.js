const categoryModel = require("../model/categorySchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //==================== add category ==================

  addCategoryDb: async (categoryName) => {
    // Find if the category already exists
    const findCategory = await categoryModel.find({
      categoryName: categoryName,
      isDeleted: false,
    });

    if (findCategory.length > 0) {
      throw new AppError(
        "Field validation error:Category already exist",
        "Category already exist",
        409
      );
    }
    // Category doesn't exist, so save the category name
    const createCategory = new categoryModel({ categoryName: categoryName });
    await createCategory.save();
    return createCategory;
  },

  //================== get category ===================

  getAllCategoryDb: async () => {
    // Find all categories that are not deleted
    const findCategory = await categoryModel.find({ isDeleted: false });
    if (findCategory.length===0) {
      throw new AppError(
        "Field validation error:Category not found",
        "Category not found",
        404
      );
    }
    return findCategory;
  },

  //================ update category name ================

  updateCategoryDb: async (categoryId, categoryName) => {
    // Find the category
    const findCategory = await categoryModel.find(
      { _id: categoryId },
      { isDeleted: false }
    );
    console.log(findCategory)
    if (findCategory.length === 0) {
      throw new AppError(
        "Field validation error:Category not found",
        "Category not found",
        404
      );
    }
    // update the category name
    const updateCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { categoryName: categoryName },
      { new: true }
    );

    return updateCategory;
  },

  //==================== delete category ================

  deleteCategoryDb: async (categoryId) => {
    //finding the category and update the isDelete:true
    const findCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { isDeleted: true },
      { new: true }
    );
    if (!findCategory) {
      throw new AppError(
        "Field validation error:Category not found",
        "Category not found",
        404
      );
    }
    return findCategory;
  },
};
