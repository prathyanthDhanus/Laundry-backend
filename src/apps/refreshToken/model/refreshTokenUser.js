const mongoose = require("mongoose");

const refreshToken = new mongoose.Schema(
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

const refreshTokenModel = mongoose.model("refreshtokens", refreshToken);
module.exports = refreshTokenModel;