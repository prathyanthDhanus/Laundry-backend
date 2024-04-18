const { adminLoginDb, adminRegisterDb } = require("../admin/services/db");

module.exports = {
  //----------------- admin register ---------------------

  adminRegister: async (req, res) => {
    const { userName, password } = req.body;
    const findAdmin = await adminRegisterDb(userName, password);

    return res.status(200).json({
      status: "success",
      message: "Admin Registered successfully",
      data: findAdmin,
    });
  },

  //------------------- admin login -----------------------

  adminLogin: async (req, res) => {
    const { userName, password, adminId } = req.body;
    // const password = req.body.password;
    const findAdmin = await adminLoginDb(userName, password, adminId);

    return res.status(200).json({
      status: "success",
      message: "Admin loggedin successfully",
      data: findAdmin,
    });
  },
};
