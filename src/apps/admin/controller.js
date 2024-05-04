const { adminLoginDb, adminRegisterDb,getAllOrdersDb } = require("../admin/services/db");

module.exports = {
  //================== admin register ====================

  adminRegister: async (req, res) => {
    const { userName, password ,adminKeyId } = req.body;
    const findAdmin = await adminRegisterDb(userName, password ,adminKeyId);

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

  //===================== get orders based on query ===================
  
    getAllOrders : async(req,res)=>{
     const query = req.query;
     const findOrders = await getAllOrdersDb(query);

     return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });

  }
  
};
