const orderModel = require("../../orderDetails/model/orderSchema");

module.exports = {
  addOrderDb: async (
    totalAmount,
    userId,
    subCategoryId,
    subCategoryName,
    quantity
  ) => {
    const order = new orderModel({
        totalAmount,
        userId,
        subcategory: [{ subCategoryId, subCategoryName, quantity }]
      });
      return order.save();
  },
};
