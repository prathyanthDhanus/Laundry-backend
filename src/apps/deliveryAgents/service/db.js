const deliveryAgentModel = require("../model/deliveryAgentSchema");
const AppError = require("../../../utils/appError");
const { sendOtpAndSave } = require("../../otp/sendOtp");
const orderModel = require("../../orderDetails/model/orderSchema");

module.exports = {
  //================== creating a delivery agent by admin ===================

  addDeleiveryAgentDb: async (deliveryAgentData) => {
    const { deliveryAgentMail } = deliveryAgentData;
    const findDeliveryAgent = await deliveryAgentModel.findOne({
      deliveryAgentMail: deliveryAgentMail,
    });
    // console.log(findDeliveryAgent)

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
    const findDeliveryAgent = await deliveryAgentModel.findOne({
      deliveryAgentMail: deliveryAgentMail,
      isDeleted: false,
    });

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

  //========================= get asssigned orders ==========================

  assignedOrdersDeliveryAgentDb: async (deliveryAgentId, query) => {
    //query based on assigned true or false
    const findOrders = await orderModel
      .find({
        deliveryAgentId: deliveryAgentId,
        ...query,
      })
      .populate("userId");

    if (findOrders.length === 0) {
      throw new AppError(
        "Field validation error:Orders not found",
        "Orders not found",
        404
      );
    }
    return findOrders;
  },

  //===================== update isPickedUp status ====================

  updateIsPickedUp: async (isPickedUp, orderId) => {
    console.log(orderId, isPickedUp);
    const findOrders = await orderModel.findByIdAndUpdate(
      orderId,
      { isPickedUp: isPickedUp },
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

  //=================== checking payment is done before the isCompleted field update  ====================

  
  checkPaymentIsDoneDb: async (orderId) => {
    const findOrders = await orderModel
      .find({ _id: orderId, isPaid: true })
      .populate("userId");
    if (!findOrders) {
      throw new AppError(
        "Field validation error:Payment not completed",
        "Payment not completed",
        102
      );
    }
  
    const userInfo = findOrders[0]?.userId;


    //if isPaid is true generating otp here
    const sendOtp = await sendOtpAndSave(
      userInfo?.email,
      userInfo?._id,
      userInfo?.userName
    );
    return sendOtp;
  },

  //=========================== update the isCompleted status =========================

  updateIsCompletedFieldDb: async (checkOtp, orderId) => {
    if (checkOtp === true) {
      const findOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { isCompleted: true },
        { new: true }
      );

      if (!findOrder) {
        throw new AppError(
          "Field validation error:Orders not found",
          "Orders not found",
          404
        );
      }
      return findOrder;
    }
  },
};
