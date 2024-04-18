const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  primaryAddress: {
    type: String,
    default: "",
  },
  primaryAddressLandMark: {
    type: String,
    default: "",
  },
  secondaryAddress: {
    type: String,
    default: "",
  },
  secondaryAddressLandMark: {
    type: String,
    default: "",
  },
  primaryPhoneNumber: {
    type: String,
  },
  secondaryPhoneNumber: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
