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
    addressLandMark,
      address
  ) => {
    const order = new orderModel({
      totalAmount,
      userId,
      date:date,
      orderedAdress :[{ addressLandMark,address}],
      subcategory: [{ subCategoryId, subCategoryName, quantity }],
    });
    return order.save();
  },

  //============ order is exist current date to the address =============

  orderExisting: async (userId, addressLandMark) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const existingOrders = await orderModel.find({userId:userId},{date:currentDate}).populate("userId");
    // console.log("existingOrder",existingOrders)
    if (existingOrders.length === 0) {
        return;
      }
      for (const existingOrder of existingOrders) {
        const date = existingOrder.date.toISOString().split("T")[0];
        const user = existingOrder.userId; 
        const userAddressLandmark = user.primaryAddressLandMark;
        
        // Check if the order matches the current address landmark
        if (currentDate === date && userAddressLandmark === addressLandMark) {
         throw new Error("exist")
        }
      }
    
      // If no matching order found, return undefined
      return;
    // const date = existingOrder.date.toISOString().split("T")[0];
    // const user = existingOrder.userId; 
    // // const userAddress = user.primaryAddress;
    // const userAddressLandmark = user.primaryAddressLandMark;
    // console.log("llllllll",userAddressLandmark,addressLandMark)
    // // console.log(addressLandMark,address)
    // // const findUser = await userModel.findById( userId);
    // // console.log(findUser)
    // // const userAddress = existingOrder.primaryAddress;
    // // console.log("kkkkkkkkk",userAddress)
    // // const userAddressLandmark = existingOrder.primaryAddressLandMark;
    // if (
    //     currentDate === date &&
    //     (userAddressLandmark === addressLandMark)
    //   ) {
    //     throw new Error("An order already exists for the current address and date.");
    //   }
  },
};
