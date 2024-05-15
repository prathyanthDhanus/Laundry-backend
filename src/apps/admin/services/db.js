const jwt = require("jsonwebtoken");
const AppError = require("../../../utils/appError");
const adminModal = require("../model.js/adminSchema");
const refreshTokenAdminModal = require("../../refreshToken/model/refreshTokenAdmin");
const orderModel = require("../../orderDetails/model/orderSchema");
const bcrypt = require("bcrypt");

module.exports = {
  //================= admin register ===================

  adminRegisterDb: async (userName, password, adminKeyId) => {
    const findAdmin = await adminModal.findOne({ userName: userName });

    if (findAdmin) {
      throw new AppError(
        "Field validation error:Admin already exist,choose another username for admin",
        "Admin already exist,choose another username for admin",
        409
      );
    }

    const adminScreteKey = process.env.ADMINSECRET_KEY_REGISTER;
    if (adminScreteKey === adminKeyId) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createAdmin = new adminModal({
        userName: userName,
        password: hashedPassword,
      });
      await createAdmin.save();
    } else {
      throw new AppError(
        "Field validation error:Unauthorized",
        "Unauthorized entry",
        401
      );
    }
  },

  //===================== admin login ====================

  adminLoginDb: async (userName, password) => {
    const findAdmin = await adminModal.findOne({ userName: userName });
    const adminId = findAdmin?._id;
    const comparePassword = await bcrypt.compare(password, findAdmin?.password);

    if (!comparePassword) {
      throw new AppError(
        "Field validation error:Admin already exist",
        "Admin already exist",
        409
      );
    }
    // const token = jwt.sign({userName},adminsecretkey, { expiresIn: "1h" })
    const adminsecretkey = process.env.ADMINSECRET_KEY;
    const token = jwt.sign(
      {
        adminId: adminId,
        role: "admin",
      },
      adminsecretkey,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        adminId: adminId,
        role: "admin",
        date: Date.now(),
      },
      adminsecretkey,
      { expiresIn: "7d" }
    );

    if (token && refreshToken) {
      const existingRefreshToken = await refreshTokenAdminModal.findOne({
        adminId: adminId,
      });

      if (existingRefreshToken) {
        await refreshTokenAdminModal.findByIdAndUpdate(
          existingRefreshToken?._id,
          {
            token: refreshToken,
          }
        );
        return token;
      } else {
        const createRefreshToken = new refreshTokenAdminModal({
          token: refreshToken,
          adminId: adminId,
        });
        createRefreshToken.save();
        return token;
      }
    } else {
      throw new Error("Login failed");
    }
  },

  //======================== get orders based on query ====================

  // getAllOrdersDb:async(query)=>{
  //    const findOrders = await orderModel.find(query);

  //    if(findOrders.length===0){
  //     throw new AppError(
  //       "Field validation error:Orders not found",
  //       "Orders not found",
  //       404
  //     );
  //    }
  //    return findOrders
  // },

  //=================== get orders for admin =====================

  getOrdersForAdminDb: async (fromDate, toDate, query) => {
    // const findOrdersOnDate = await orderModel.find({
    //   date: { $gte: fromDate, $lte: toDate },...query,
    // });

    // console.log(fromDate,toDate)

    const filter = { ...query }; // Spread the query object to include other filters
    if (fromDate && toDate) {
      // Check if fromDate and toDate are provided

      filter.date = { $gte: fromDate, $lte: toDate };
      delete filter.fromDate; // Remove fromDate from the filter object
      delete filter.toDate; // Add date range filter if provided
    }
    // console.log(filter)

    const findOrdersOnDate = await orderModel.find(filter).populate("userId");

    if (findOrdersOnDate.length === 0) {
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrdersOnDate;
  },

  //============================ assign orders to delivery agent =======================

  assignOrdersToDeliveryAgentDb: async (deliveryAgentId, orderId) => {
    const findOrders = await orderModel.findByIdAndUpdate(orderId, {
      isAssigned: true,
      deliveryAgentId: deliveryAgentId,
    });

    if (!findOrders) {
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }

    return findOrders
  },
};
