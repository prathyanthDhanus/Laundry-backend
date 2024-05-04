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
      ({ subCategoryId, subCategoryName, quantity, totalAmount,categoryName }) => ({
        subCategoryId,
        subCategoryName,
        quantity,
        totalAmount,
        categoryName
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
    // Find the order based on userId and landmark
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
  
  getOrdersDb: async (
    userId,
    isCancelled,
    isCompleted,
    isPickedUp,
    filterPending,
    skip,
    limit,
    
  ) => {
    // Construct query based on provided filters
    let query = { userId };
    if (isCancelled !== undefined) query.isCancelled = isCancelled;
    if (isCompleted !== undefined) query.isCompleted = isCompleted;
    // if (isPickedUp !== undefined) query.isPickedUp = isPickedUp ;
    if (isPickedUp) {
      query.isPickedUp = true;
      query.isCompleted = false; 
    }
    if(filterPending){
      query.isPickedUp = false;
      query.isCompleted = false; 
      query.isCancelled = false; 
    }
    
    
    // Query orders with the constructed query, applying pagination
    const findOrders = await orderModel.find(query).skip(skip).limit(limit).populate('subcategory');
    
     

    // Return the fetched orders
    return findOrders;
  },

  //==============  Function to get total count of orders for a user ===============

  getTotalOrdersDb: async (userId) => {
    // Count documents in the order model matching the provided user ID
    const totalOrders = await orderModel.countDocuments({ userId });

    // Return the total count of orders
    return totalOrders;
  },

  //===========  Function to get total count of orders with provided filters =============

  getTotalOrdersWithFiltersDb: async (
    userId,
    isCancelled,
    isCompleted,
    isPickedUp
  ) => {
    // Construct query based on provided filters
    let query = { userId };
    if (isCancelled !== undefined) query.isCancelled = isCancelled;
    if (isCompleted !== undefined) query.isCompleted = isCompleted;
    if (isPickedUp !== undefined) query.isPickedUp = isPickedUp;

    // Count documents in the order model matching the constructed query
    const totalOrders = await orderModel.countDocuments(query);

    // Return the total count of orders with filters applied
    return totalOrders;
  },

  //================= cancel order =====================

  cancelOrdersDb: async (orderId, cancelledReason) => {
    const findOrders = await orderModel.findByIdAndUpdate(
      orderId,
      {
        isCancelled: true,
        cancelledReason: cancelledReason,
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

 //===================== get a order =======================

  getAorderDb:async(orderId)=>{
    
    const findOrders = await orderModel.find(orderId);
   
    if(findOrders.length===0){
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  },

  //===================== get full orders of a user ===============

  getFullOrderofUserDb: async(userId,page = 1, perPage = 10)=>{
    const skip = (page - 1) * perPage;
    // const findOrders = await orderModel.find({userId});

    const findOrders = await orderModel
    .find({ userId })
    .skip(skip)
    .limit(perPage);
       
    if(findOrders.length===0){
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  }
};
