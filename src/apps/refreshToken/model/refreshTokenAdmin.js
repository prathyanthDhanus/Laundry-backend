const mongoose = require("mongoose");

const refreshTokenAdmin = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin',
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

const refreshTokenAdminModel = mongoose.model("refreshtokenAdmin", refreshTokenAdmin);
module.exports = refreshTokenAdminModel;