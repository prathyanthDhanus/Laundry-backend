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
  totalAmount: {
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
      quantity: {
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
  },
});

// orderSchema.virtual('formattedDate').get(function() {
//   // Convert the date to a string in 'YYYY-MM-DD' format
//   return this.date.toISOString().split('T')[0];
// });

// orderSchema.virtual('formattedDateTime').get(function() {
//   // Convert the date to a string in 'YYYY-MM-DD HH:MM:SS' format
//   const year = this.date.getFullYear();
//   const month = String(this.date.getMonth() + 1).padStart(2, '0');
//   const day = String(this.date.getDate()).padStart(2, '0');
//   const hours = String(this.date.getHours()).padStart(2, '0');
//   const minutes = String(this.date.getMinutes()).padStart(2, '0');
//   const seconds = String(this.date.getSeconds()).padStart(2, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// });

const orderDetails = mongoose.model("orderDetails", orderSchema);
module.exports = orderDetails;
