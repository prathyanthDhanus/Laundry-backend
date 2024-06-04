const userModel = require("../models/userSchema");
const AppError = require("../../../utils/appError");
const otpModel = require("../../otp/models/otpSchema");
// const { passwordHashService } = require("./common");
const bcrypt = require("bcrypt");
const orderModel = require('../../orderDetails/model/orderSchema');

module.exports = {

  //================ user register ===============

  userRegisterDB: async (body) => {
    const { email, password } = body;
    const user = await userModel.findOne({ email });

    if (user) {
      throw new AppError(
        "Field validation error:User already exist",
        "User already exist",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = new userModel({ ...body, password: hashedPassword });
    await userCreate.save();
    return userCreate;
  },

  //================ user login ================

  userLoginDB: async (email) => {
    const findUser = await userModel.findOne({ email: email });
   
    if (findUser) {
      return findUser;
    }

    throw new AppError(
      "Field validation error:Login failed",
      "User not found",
      404
    );
  },

  //================= verify otp ================

  verifyotpLoginDb: async (userId, otp) => {
    const numOtp = +otp; // conveting the otp in number
    const findUser = await otpModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(1); // find latest created otp

    if (!findUser.length) {
      throw new AppError(
        "Field validation error:No OTP found for the user",
        "OTP not found",
        400
      );
    }
    
    const otpData = findUser[0]?.otp;
    if (otpData !== numOtp) {
      throw new AppError(
        "Field validation error:OTP validation failed",
        "Incorrect OTP",
        401
      );
    }
    return otpData === numOtp;
  },

  //================= create new password ================

  createNewPasswordDb: async (newPassword, userId) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const findUser = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!findUser) {
      throw new AppError(
        "Field validation error:Password updation failed",
        "User not found",
        404
      );
    }
    return findUser;
  },

  //================= add user profile ==================

  adduserProfileDb: async (body, userId) => {
    const findUser = await userModel.findByIdAndUpdate(userId, body);

    if (!findUser) {
      throw new AppError(
        "Field validation error:Profile updation failed",
        "User not found",
        404
      );
    }

    return findUser;
  },

  //=============== get user profile =================

  getUserProfileDb: async (userId) => {
    const findUser = await userModel.findById({ _id: userId });
    if (!findUser) {
      throw new AppError(
        "Field validation error:User finding failed",
        "User not found",
        404
      );
    }
    return findUser;
  },

  //==================== payment section ===================

  userPaymentDb : async(orderId)=>{
    
    const findOrder = await orderModel.find({_id:orderId , outForDelivery:true});
  
    if(findOrder.length===0){
      throw new AppError(
        "Field validation error:Payment failed",
        "Order process out for delivery is not completed",
        401
      );
    }
    
    const totalAmount = findOrder[0].grandTotalAmount;
 
    return totalAmount;
  },
};
