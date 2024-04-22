const orderModel = require("../../orderDetails/model/orderSchema");
const AppError = require("../../../utils/appError");
// const userModel = require("../../user/models/userSchema");

module.exports = {
  //================= create an order ===============

  addOrderDb: async (
    userId,
    date,
    grandTotalAmount,
    landMark,
    address,
    subcategoryOrders
  ) => {
    const subcategories = subcategoryOrders.map(
      ({ subCategoryId, subCategoryName, quantity, totalAmount }) => ({
        subCategoryId,
        subCategoryName,
        quantity,
        totalAmount,
      })
    );

    const order = new orderModel({
      userId,
      date,
      grandTotalAmount,
      orderedAdress: [{ addressLandMark: landMark, address }],
      subcategory: subcategories,
    });

    return order.save();
  },

  //============ order is exist current date to the address =============

  orderExisting: async (userId, primaryAddressLandMark, landMark) => {
    const currentDate = new Date().toISOString().split("T")[0];
    // Find the order based on userId, current date, and landmark
    const existingOrder = await orderModel
      .findOne({
        userId: userId,
        // date: currentDate,
        isPickedUp: false,
        "orderedAdress.addressLandMark": landMark,
        isCancelled: false,
      })
      .populate("userId"); //populating the user using userId

    if (!existingOrder) {
      return;
    }
    // Extract user details from the existing order
    const user = existingOrder.userId;
    // Extract date and ordered address from the existing order

    const checkPickedUp = existingOrder.isPickedUp;
    const orderedAddress = existingOrder.orderedAdress[0].addressLandMark;
    // Determine the user's address landmark based on primary/secondary
    let userAddressLandmark;
    if (primaryAddressLandMark) {
      userAddressLandmark = user.primaryAddressLandMark;
    } else {
      userAddressLandmark = user.secondaryAddressLandMark;
    }
    // Check if an order already exists for the current date and address landmark
    if (checkPickedUp === false && userAddressLandmark === orderedAddress) {
      throw new Error("Order is already exist on address");
    }
    return;
  },

  //================== get all orders ===================

  getOrdersDb: async (userId) => {
    const findOrders = await orderModel.find({ userId });

    if (findOrders.length === 0) {
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  },

  //================= cancel order =====================

  cancelOrdersDb: async (orderId, cancelledReason) => {
    const findOrders = await orderModel.findByIdAndUpdate(
      orderId,
      {
        isCancelled: true,
         cancelledReason:cancelledReason
      },

      { new: true }
    );

    if (!findOrders) {
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  },
};
