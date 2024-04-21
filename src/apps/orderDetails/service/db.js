const orderModel = require("../../orderDetails/model/orderSchema");
const userModel = require("../../user/models/userSchema");

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
      orderedAdress: [
        { addressLandMark: landMark, address: address },
      ],
      subcategory: [{ subCategoryId, subCategoryName, quantity }],
    });
    return order.save();
  },

  //============ order is exist current date to the address =============

  orderExisting: async (userId, primaryAddressLandMark) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const existingOrder = await orderModel
      .findOne({ userId: userId, date: currentDate })
      .populate("userId");
    
    if (!existingOrder) {
      return;
    }
     
    const user = existingOrder.userId;
    
    const date = existingOrder.date.toISOString().split("T")[0];
    const orderedAddress = existingOrder.orderedAdress[0].addressLandMark;
        console.log(orderedAddress)
    let userAddressLandmark;
    if (primaryAddressLandMark) {
      userAddressLandmark = user.primaryAddressLandMark;
    } else {
      userAddressLandmark = user.secondaryAddressLandMark;
    }
    if (currentDate === date && userAddressLandmark === orderedAddress) {
      throw new Error("Order is already exist on current date and addresslandmark");
    }
    return ;
  },
};
