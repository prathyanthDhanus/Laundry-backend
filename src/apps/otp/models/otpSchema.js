const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    
  email:{
    type:String,
    required:true
  },
  otp:{
    type:Number,

  },
  expireAt: {
    type: Date,
    expires: 300
}
  
  
  

  

},{timestamps:true});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;