const { addOrderService } = require("../orderDetails/service/common");
const {
  getOrdersDb,
  cancelOrdersDb,
  getTotalOrdersDb,
  getTotalOrdersWithFiltersDb,
  getAorderDb,
  getFullOrderofUserDb
} = require("../orderDetails/service/db");

module.exports = {
  //=============== add order ==============

  addOrder: async (req, res) => {
    const { body } = req;
    const userId = req.user?.userId;
    const findOrders = await addOrderService(body, userId);

    return res.status(200).json({
      status: "success",
      message: "Order placed successfully",
      data: findOrders,
    });
  },

  //================ get orders ==============

  getOrders: async (req, res) => {
    // Extract user ID from request
    const userId = req.user?.userId;

    // Parse pagination parameters or use defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
   
    // Extract filter parameters from request
    const filterCancelled =
      req.query.isCancelled !== undefined
        ? Boolean(req.query.isCancelled)
        : undefined;
    const filterCompleted =
      req.query.isCompleted !== undefined
        ? Boolean(req.query.isCompleted)
        : undefined;
    const filterPickedUp =
      req.query.isPickedUp !== undefined
        ? Boolean(req.query.isPickedUp)
        : undefined;
        const filterPending =
        req.query.isPending !== undefined
          ? Boolean(req.query.isPending)
          : undefined;

    let findOrders;
    let totalOrders;

    // Check if any filter is provided
    if (
      filterCancelled !== undefined ||
      filterCompleted !== undefined ||
      filterPickedUp !== undefined  ||
      filterPending
    ) {
      // If filters are provided, query orders with filters and get total count with filters
      findOrders = await getOrdersDb(
        userId,
        filterCancelled,
        filterCompleted,
        filterPickedUp,
        filterPending,
        skip,
        limit,
       
      );
      totalOrders = await getTotalOrdersWithFiltersDb(
        userId,
        filterCancelled,
        filterCompleted,
        filterPickedUp
      );
    } else {
      // If no filters are provided, query all orders for the user and get total count
      findOrders = await getOrdersDb(
        userId,
        undefined,
        undefined,
        undefined,
        skip,
        limit
      );
      totalOrders = await getTotalOrdersDb(userId);
    }

    // Return response with fetched orders, pagination details, and status
    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  },

  //================== cancel order ===============

  cancelOrder: async (req, res) => {
    const orderId = req.params.orderId;
    const { cancelledReason } = req.body;
    findOrders = await cancelOrdersDb(orderId, cancelledReason);

    return res.status(200).json({
      status: "success",
      message: "Orders cancelled successfully",
      data: findOrders,
    });
  },
  
  //================= get a order =================
  
  getAorder :async(req,res)=>{
    
    const orderId = req.params.orderId;
    const findOrders = await getAorderDb(orderId);
    
    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });
  },

  //===================== get full orders of a user ===============

  getFullOrderofUser : async(req,res)=>{
    const userId = req.user?.userId;
    const findOrders = await getFullOrderofUserDb(userId);

    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });
  }
};