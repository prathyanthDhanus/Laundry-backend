const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    required: true,
    // default: Date.now,
  },
  grandTotalAmount: {
    type: Number,
    required: true,
  },
  orderedAdress: [{
    addressLandMark:{
      type: String,
    required: true,
    },
    address:{
      type: String,
    required: true,
    },
   
  
  }],
  subcategory: [
    {
      subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
      },
      subCategoryName: {
        type: String,
        required: true,
      },
      categoryName:{
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
  ],
  isCancelled: {
    type: Boolean,
    default: false,
  },
  cancelledReason: {
    type: String,
    default:""
  },
  isPickedUp:{
    type: Boolean,
    default: false,
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  deliveryAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deliveryAgent",
  },
  outOfDelivery: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});



const orderDetails = mongoose.model("orderDetails", orderSchema);
module.exports = orderDetails;
