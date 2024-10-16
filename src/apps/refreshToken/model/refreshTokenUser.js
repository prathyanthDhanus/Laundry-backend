const mongoose = require("mongoose");

const refreshTokenUser = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

const refreshTokenUserModel = mongoose.model("refreshtokenUser", refreshTokenUser);
module.exports = refreshTokenUserModel;