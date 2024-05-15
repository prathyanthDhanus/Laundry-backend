const {
  addDeleiveryAgentDb,
  getDeliveryAgentDb,
  updateDeliveryAgentDb,
  deleteDeliveryAgentDb,
  deliveryAgentLoginDb,
  assignedOrdersDeliveryAgentDb,
} = require("./service/db");

const { verifyotpLoginDb } = require("../user/services/db");
const { tokenServiceDeliveryAgent } = require("./service/common");

module.exports = {
  //================== creating a delivery agent by admin ===================

  addDeleiveryAgent: async (req, res) => {
    const deliveryAgentData = req.body;
    const saveDeliveryAgent = await addDeleiveryAgentDb(deliveryAgentData);

    return res.status(201).json({
      status: "success",
      message: "Delivery agent's profile registered successfully",
      data: saveDeliveryAgent,
    });
  },

  //================== getting delivery agent ===================

  getDeliveryAgent: async (req, res) => {
    //requiring delivery agent id from delivery agent token
    const deliveryAgentId = req.delivery_agent?.deliveryAgentId;
    const query = req.query; // query like isDeleted===true etc
    const findDeliveryAgent = await getDeliveryAgentDb(deliveryAgentId, query);

    return res.status(200).json({
      status: "success",
      message: "Delivery agent's profile registered successfully",
      data: findDeliveryAgent,
    });
  },

  //================== updating a delivery agent by admin ===================

  updateDeliveryAgent: async (req, res) => {
    const { body } = req;
    const findDeliveryAgent = await updateDeliveryAgentDb(body);

    return res.status(200).json({
      status: "success",
      message: "Delivery agent's profile updated successfully",
      data: findDeliveryAgent,
    });
  },

  //================== deleting a delivery agent by admin ===================

  deleteDeliveryAgent: async (req, res) => {
    const { deliveryAgentId } = req.body;
    const findDeliveryAgent = await deleteDeliveryAgentDb(deliveryAgentId);

    return res.status(200).json({
      status: "success",
      message: "Delivery agent's profile deleted successfully",
      data: findDeliveryAgent,
    });
  },

  //==================== delivery agent login using otp =====================

  deliveryAgentLogin: async (req, res) => {
    const { deliveryAgentMail } = req.body;
    const findDeliveryAgent = await deliveryAgentLoginDb(deliveryAgentMail);

    return res.status(200).json({
      status: "success",
      message: findDeliveryAgent?.otpMessage,
      data: findDeliveryAgent?.userId,
    });
  },

  //==================== verify otp ========================

  deliveryAgentOtp_Verify: async (req, res) => {
    const { userId, otp } = req.body; //userid means delivery agent id;
    const checkOtp = await verifyotpLoginDb(userId, otp);
    const token = await tokenServiceDeliveryAgent(checkOtp, userId);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: token,
    });
  },

  //=============== get assigned orders ====================

  assignedOrdersDeliveryAgent: async (req, res) => {
    //extracting delivery agent id from the token
    const deliveryAgentId = req?.delivery_agent?.deliveryAgentId;
    const query = req.query;
    const findOrders = await assignedOrdersDeliveryAgentDb(
      deliveryAgentId,
      query
    );

    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: findOrders,
    });
  },
};
