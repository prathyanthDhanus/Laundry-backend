const subCategoryModal = require("../modal/subCategorySchema");
const AppError = require("../../../utils/appError");
const subCategory = require("../modal/subCategorySchema");

module.exports = {
  addSubCategoryDb: async (body) => {
    // Extracting subCategoryName from the request body
    const { subCategoryName } = body;
    // Checking if the subcategory already exists
    const findSubCategory = await subCategoryModal.find({
      subCategoryName: subCategoryName,
    });
    if (findSubCategory.length > 0) {
      throw new AppError(
        "Field validation error:Sub_category already exist",
        "Sub_category already exist",
        409
      );
    }
    // Creating a new subcategory document
    const subCategorySave = new subCategoryModal({ ...body });
    await subCategorySave.save();
    return subCategorySave;
  },

  //================== get all sub-category =================

  getAllSubCategoryDb: async () => {
    // Finding all subcategories that are not deleted
    const findSubCategory = await subCategoryModal.find({
      isDeleted: false,
    });
    if (findSubCategory.length === 0) {
      throw new AppError(
        "Field validation error:Sub_category not found",
        "Sub_category not found",
        404
      );
    }
    return findSubCategory;
  },

  //=============== update sub-category name ================

  updtaeSubCategory: async (body) => {
    const { subCategoryId } = body;
    const findSubCategory = await subCategoryModal.findByIdAndUpdate(
      subCategoryId,
      { ...body },
      { new: true }
    );
    if (!findSubCategory) {
      throw new AppError(
        "Field validation error:Sub_category not found",
        "Sub_category not found",
        404
      );
    }
    return findSubCategory;
  },

  //================= delete sub-category ===================

  deleteSubCategoryDb: async (subCategoryId) => {
    const findSubCategory = await subCategory.findByIdAndUpdate(
      subCategoryId,
      { isDeleted: true },
      { new: true }
    );
    if(!findSubCategory){
        throw new AppError(
            "Field validation error:Sub_category not found",
            "Sub_category not found",
            404
          );
    }
    return findSubCategory
  },
};
