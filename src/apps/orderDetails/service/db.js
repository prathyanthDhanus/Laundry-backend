const orderModel = require("../../orderDetails/model/orderSchema");
const AppError = require("../../../utils/appError");
// const userModel = require("../../user/models/userSchema");

module.exports = {
  //================= create an order ===============

  addOrderDb: async (
    totalAmount,
    userId,
    subCategoryId,
    subCategoryName,
    quantity,
    date,
    landMark,
    address
  ) => {
    //saving the order to the server
    const order = new orderModel({
      totalAmount,
      userId,
      date: date,
      orderedAdress: [{ addressLandMark: landMark, address: address }],
      subcategory: [{ subCategoryId, subCategoryName, quantity }],
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
        isPickedUp:false,
        "orderedAdress.addressLandMark": landMark,
        isCancelled:false
      })
      .populate("userId"); //populating the user using userId

    if (!existingOrder) {
      return;
    }
    // Extract user details from the existing order
    const user = existingOrder.userId;
    // Extract date and ordered address from the existing order
    // const date = existingOrder.date.toISOString().split("T")[0];
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
      throw new Error(
        "Order is already exist on address"
      );
    }
    return;
  },

  //================== get all orders ===================

  getOrdersDb : async(userId)=>{
    const findOrders = await orderModel.find({userId});

    if(findOrders.length===0){
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  },

  //================= cancel order =====================

  cancelOrders : async(req,res)=>{
    
  }
};
