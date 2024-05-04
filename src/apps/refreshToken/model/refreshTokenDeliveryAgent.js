const mongoose = require("mongoose");

const refreshTokenDeliveryAgent = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    deliveryAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'deliveryAgent',
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

const refreshTokenDeliveryAgentModel = mongoose.model("refreshtokenDeliveryAgent", refreshTokenDeliveryAgent);
module.exports = refreshTokenDeliveryAgentModel;