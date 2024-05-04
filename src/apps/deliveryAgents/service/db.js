const deliveryAgentModel = require("../model/deliveryAgentSchema");
const AppError = require("../../../utils/appError");
const { sendOtpAndSave } = require("../../otp/sendOtp");

module.exports = {
  //================== creating a delivery agent by admin ===================

  addDeleiveryAgentDb: async (deliveryAgentData) => {
    const { deliveryAgentMail } = deliveryAgentData;
    const findDeliveryAgent = await deliveryAgentModel.findOne({
      deliveryAgentMail: deliveryAgentMail,
    });

    if (findDeliveryAgent) {
      throw new AppError(
        "Field validation error:Delivery agent already exists",
        "Delivery agent already exists with the provided mail-id",
        409
      );
    }
    const newDeliveryAgent = new deliveryAgentModel(deliveryAgentData);
    await newDeliveryAgent.save();
    return newDeliveryAgent;
  },

  //================== getting delivery agent ===================

  getDeliveryAgentDb: async (deliveryAgentId, query) => {
    let findDeliveryAgent;
    if (deliveryAgentId) {
      findDeliveryAgent = await deliveryAgentModel.findById(deliveryAgentId);
    } else {
      findDeliveryAgent = await deliveryAgentModel.find(query);
    }

    if (findDeliveryAgent.length === 0 || !findDeliveryAgent) {
      throw new AppError(
        "Field validation error:Delivery agent not found",
        "Delivery agent not found",
        404
      );
    }
    return findDeliveryAgent;
  },

  //================== updating a delivery agent by admin ===================

  updateDeliveryAgentDb: async (body) => {
    const { deliveryAgentId } = body;
    const findDeliveryAgent = await deliveryAgentModel.findByIdAndUpdate(
      deliveryAgentId,
      { ...body },
      { new: true }
    );
    if (!findDeliveryAgent) {
      throw new AppError(
        "Field validation error: Delivery agent's profile updation failed",
        "Delivery agent's profile updation failed",
        400
      );
    }
    return findDeliveryAgent;
  },

  //================== deleting a delivery agent by admin ===================

  deleteDeliveryAgentDb: async (deliveryAgentId) => {
    const findDeliveryAgent = deliveryAgentModel.findByIdAndUpdate(
      deliveryAgentId,
      { isDeleted: true },
      { new: true }
    );
    if (!findDeliveryAgent) {
      throw new AppError(
        "Field validation error:Delivery agent not found",
        "Delivery agent not found",
        404
      );
    }
    return findDeliveryAgent;
  },

  //==================== delivery agent login =====================

  deliveryAgentLoginDb: async (deliveryAgentMail) => {
    const findDeliveryAgent = await deliveryAgentModel.findOne(
      deliveryAgentMail
    );
    if (!findDeliveryAgent) {
      throw new AppError(
        "Field validation error:Mail id not found",
        "Mail id not found",
        404
      );
    }
    const sendOtp = await sendOtpAndSave(
      findDeliveryAgent?.deliveryAgentMail,
      findDeliveryAgent?._id,
      findDeliveryAgent?.deliveryAgentName
    );
    return sendOtp;
  },
  
};
