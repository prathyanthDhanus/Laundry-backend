const userModel = require("../models/userSchema");
const AppError = require("../../../utils/appError");
const otpModel = require("../../otp/models/otpSchema");


module.exports = {
  //----------- user register ------------

  userRegisterDB: async (body, hashedPassword) => {
    const { email } = body;
    const user = await userModel.findOne({ email });
    const userCreate = new userModel({ ...body, password: hashedPassword });

    if (user) {
      throw new AppError(
        "Field validation error:User already exist",
        "User already exist",
        409
      );
    }

    await userCreate.save();
    return userCreate;
  },

  //--------------- user login --------------

  userLoginDB: async (email) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return findUser;
    }

    throw new AppError(
      "Field validation error:Login failed",
      "User not found",
      404
    );
  },

  //------------- verify otp ---------------

  verifyotpDb: async (userId, otp) => {
  
    const numOtp = +otp; // conveting the otp in number
    const findUser = await otpModel
    .find({userId:userId})
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
};
