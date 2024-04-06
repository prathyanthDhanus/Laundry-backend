const {
  userRegisterService,
  userLoginService,
  tokenService,
} = require("./services/common");
const { userLoginDB, verifyotpDb } = require("./services/db");

module.exports = {
  //------------- user register ------------

  userRegister: async (req, res) => {
    const { body } = req;
    const userData = await userRegisterService(body);

    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data: userData,
    });
  },

  //----------- user login -------------

  userlogin: async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userLoginDB(email);
    const userData = await userLoginService(findUser, password);

    return res.status(200).json({
      status: "success",
      message: userData.otpMessage,
      data: userData.userId,
    });
  },

  //---------------- verify otp ---------------

  verifyOtp: async (req, res) => {
    const { userId, otp } = req.body;

    const checkOtp = await verifyotpDb(userId, otp);
    const token = await tokenService(checkOtp, userId);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: token,
    });
  },
};
