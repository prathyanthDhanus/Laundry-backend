const subcategory = require("../../subCategory/modal/subCategorySchema");
const { addOrderDb, orderExisting } = require("../service/db");

module.exports = {
  
  //============= create an order ==============

  addOrderService: async (body, userId) => {
    const {
      // quantity,
      // subCategoryId,
      subcategories,
      primaryAddressLandMark,
      secondaryAddressLandMark,
      primaryAddress,
      secondaryAddress,
    } = body;

    //checking if the req address is primary or secondary
    let landMark, address;
    if (primaryAddress) {
      landMark = primaryAddressLandMark;
      address = primaryAddress;
    } else {
      landMark = secondaryAddressLandMark;
      address = secondaryAddress;
    }
    // Check if an order already exists for the user
    const orderExist = await orderExisting(
      userId,
      primaryAddressLandMark,
      landMark
    );
    // If an order already exists, return the existing order
    if (orderExist) {
      return orderExist;
    }

    const date = new Date().toISOString().split("T")[0];
    const subcategoryOrders = [];

    for (const { subCategoryId, quantity } of subcategories) {
      const findSubCategory = await subcategory.findById(subCategoryId);

      if (!findSubCategory) {
        throw new Error(`Subcategory with ID ${subCategoryId} not found`);
      }

      const serviceCharge = findSubCategory.serviceCharge;
      const subCategoryName = findSubCategory.subCategoryName;
      const totalAmount = quantity * serviceCharge;

      // Push subcategory details into subcategoryOrders array
      subcategoryOrders.push({
        subCategoryId,
        subCategoryName,
        quantity,
        totalAmount,
      });
    }

    // Calculate grandTotalAmount as the sum of totalAmounts of all subcategories
    const grandTotalAmount = subcategoryOrders.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0
    );

    // Save the order to the database
    const saveOrder = await addOrderDb(
      userId,
      date,
      grandTotalAmount,
      landMark,
      address,
      subcategoryOrders
    );

    return saveOrder;

    
  },
};
