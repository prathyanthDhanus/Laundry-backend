const { addOrderService } = require("../orderDetails/service/common");
const { getOrdersDb, cancelOrdersDb } = require("../orderDetails/service/db");

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
    const userId = req.user?.userId;
    const findOrders = await getOrdersDb(userId);

    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });
  },

  //================== cancel order ===============

  cancelOrder: async (req, res) => {
    const orderId = req.params.orderId;
    const {cancelledReason} = req.body;
    findOrders = await cancelOrdersDb(orderId,cancelledReason);

    return res.status(200).json({
      status: "success",
      message: "Orders cancelled successfully",
      data: findOrders,
    });
  },
};
