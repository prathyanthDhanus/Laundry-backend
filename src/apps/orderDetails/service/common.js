const subcategory = require("../../subCategory/modal/subCategorySchema");
const { addOrderDb, orderExisting } = require("../service/db");

module.exports = {
  //============= create an order ==============

  addOrderService: async (body, userId) => {
    const { quantity, subCategoryId, primaryAddressLandMark,secondaryAddressLandMark,primaryAddress,secondaryAddress } =
      body;
    // Check if an order already exists for the user
    const orderExist = await orderExisting(userId,primaryAddressLandMark);
    // If an order already exists, return the existing order
    if (orderExist) {
      return orderExist;
    }
     
    const findSubCategory = await subcategory.findById({ _id: subCategoryId });

    if (!findSubCategory) {
      throw new Error("something went wrong");
    }
    // Calculate total amount based on quantity and service charge
    const date = new Date().toISOString().split("T")[0];
   
    const serviceCharge = findSubCategory.serviceCharge;
    const subCategoryName = findSubCategory.subCategoryName;
    const totalAmount = quantity * serviceCharge;

    let landMark,address;
    if(primaryAddress){
      landMark = primaryAddressLandMark;
      address = primaryAddress;
    }else{
      landMark = secondaryAddressLandMark;
      address = secondaryAddress;
    }

    // Save the order to the database
    const saveOrder = await addOrderDb(
      totalAmount,
      userId,
      subCategoryId,
      subCategoryName,
      quantity,
      date,
      landMark,
      address
    );
    return saveOrder;
  },
};
