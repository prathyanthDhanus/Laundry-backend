const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
    deliveryAgentName: {
    type: String,
    required: true,
  },
  deliveryAgentNameAddress: {
    type:String,
    required:true,
  },
  deliveryAgentPhonenumber: {
    type: Number,
    required: true,
  },
  deliveryAgentMail: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  jobDetails:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderDetails",
  }

});

const deliveryAgent = mongoose.model("deliveryAgent", deliveryAgentSchema);
module.exports = deliveryAgent;
