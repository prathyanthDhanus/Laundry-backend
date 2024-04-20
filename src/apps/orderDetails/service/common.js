const subcategory = require("../../subCategory/modal/subCategorySchema");
const { addOrderDb } = require("../service/db");

module.exports = {
  addOrderService: async (body, userId) => {
    const { quantity, subCategoryId } = body;
    const findSubCategory = await subcategory.findById({ _id: subCategoryId });
    if(!findSubCategory){
        throw new Error("something went wrong")
    }
    const serviceCharge = findSubCategory.serviceCharge;
    const subCategoryName = findSubCategory.subCategoryName;
    const totalAmount = quantity * serviceCharge;
    const saveOrder = await addOrderDb(
      totalAmount,
      userId,
      subCategoryId,
      subCategoryName,quantity
    );
    return saveOrder;
  },
};
