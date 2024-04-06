const {
  userRegisterService,
  userLoginService,
  tokenService,
  sendOtpService
} = require("./services/common");
const { userLoginDB, verifyotpLoginDb } = require("./services/db");

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
    const userData = await userLoginService(findUser,password);

    return res.status(200).json({
      status: "success",
      message: userData.otpMessage,
      data: userData.userId,
    });
  },

  //---------------- otp verification login ---------------

  verifyOtpLogin: async (req, res) => {
    const { userId, otp } = req.body;

    const checkOtp = await verifyotpLoginDb(userId, otp);
    const token = await tokenService(checkOtp, userId);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: token,
    });
  },

  //---------------- otp verification ------------------

  verifyOtp: async (req, res) => {
    const { otp } = req.body;
    const userId = req.user.userId; //extracting the user id from the token.
    // more info : check jwtToken file.

    const checkOtp = await verifyotpLoginDb(userId, otp);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: checkOtp,
    });
  },

  //-------------- forgot password ------------------

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const findUser = await userLoginDB(email);
    const sendOtp = await sendOtpService(findUser);

    return res.status(200).json({
      status: "success",
      message: sendOtp.otpMessage,
    });
  },
};
