const {
  adminLoginDb,
  adminRegisterDb,
  getOrdersForAdminDb,
  assignOrdersToDeliveryAgentDb,
} = require("../admin/services/db");

module.exports = {
  //================== admin register ====================

  adminRegister: async (req, res) => {
    const { userName, password, adminKeyId } = req.body;
    const findAdmin = await adminRegisterDb(userName, password, adminKeyId);

    return res.status(200).json({
      status: "success",
      message: "Admin Registered successfully",
      data: findAdmin,
    });
  },

  //====================== admin login =====================

  adminLogin: async (req, res) => {
    const { userName, password } = req.body;
    const findAdmin = await adminLoginDb(userName, password);

    return res.status(200).json({
      status: "success",
      message: "Admin loggedin successfully",
      data: findAdmin,
    });
  },

  //===================== get orders based on query for admin ===================

  //   getAllOrders : async(req,res)=>{
  //    const query = req.query;
  //    const findOrders = await getAllOrdersDb(query);

  //    return res.status(200).json({
  //     status: "success",
  //     message: "Orders fetched successfully",
  //     data: findOrders,
  //   });

  // },

  //====================== get orders based on query for admin ===================

  getOrdersForAdmin: async (req, res) => {
    // const {fromDate,toDate} = req.body;
    // const query = req.query;

    const { fromDate, toDate } = req.query; // Retrieve fromDate and toDate from query parameters
    const query = req.query;
    const findOrders = await getOrdersForAdminDb(fromDate, toDate, query);

    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });
  },

  //============================= assign orders to delivery agent ==========================

  assignOrdersToDeliveryAgent: async (req, res) => {
    const { deliveryAgentId, orderId } = req.body;
    const findOrders = await assignOrdersToDeliveryAgentDb(
      deliveryAgentId,
      orderId
    );

    return res.status(200).json({
      status: "success",
      message: "Orders assigned successfully",
      data: findOrders,
    });
  },

  //
};
