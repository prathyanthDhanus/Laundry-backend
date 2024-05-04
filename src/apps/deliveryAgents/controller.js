const {
  addDeleiveryAgentDb,
  getDeliveryAgentDb,
  updateDeliveryAgentDb,
  deleteDeliveryAgentDb,
  deliveryAgentLoginDb
} = require("./service/db");

const {verifyotpLoginDb} = require("../user/services/db");
const {tokenServiceDeliveryAgent} = require("./service/common");

module.exports = {
  //================== updating a delivery agent by admin ===================

  addDeleiveryAgent: async (req, res) => {
    const deliveryAgentData = req.body;
    const saveDeliveryAgent = await addDeleiveryAgentDb(deliveryAgentData);

    return res.status(200).json({
      status: "success",
      message: "Delivery agent's profile registered successfully",
      data: saveDeliveryAgent,
    });
  },

  //================== deleting a delivery agent by admin ===================

  getDeliveryAgent: async (req, res) => {
    const deliveryAgentId = req.delivery_agent?.deliveryAgentId;
    const query = req.query;
    const findDeliveryAgent = await getDeliveryAgentDb(deliveryAgentId, query);

    return res.status(200).json({
      status: "success",
      message: "Delivery agent's profile registered successfully",
      data: findDeliveryAgent,
    });
  },

  //================== deleting a delivery agent by admin ===================

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
      message: "Delivery agent's profile updated successfully",
      data: findDeliveryAgent,
    });
  },

  //==================== delivery agent login using otp =====================

  deliveryAgentLogin:async(req,res)=>{
    const {deliveryAgentMail} = req.body;
    const findDeliveryAgent = await deliveryAgentLoginDb(deliveryAgentMail);

    return res.status(200).json({
        status: "success",
        message: findDeliveryAgent.otpMessage,
        data: findDeliveryAgent,
      });
  },

  //==================== verify otp ========================

  deliveryAgentOtp_Verify:async(req,res)=>{
    const { userId, otp } = req.body;//userid means delivery agent id;
    const checkOtp = await verifyotpLoginDb(userId,otp);
    const token = await tokenServiceDeliveryAgent(checkOtp, userId);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: token,
    });
  }

  
};
