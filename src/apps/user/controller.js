const {
  passwordHashService,
  userLoginService,
  sendOtpService,
  tokenServiceUser,
} = require("./services/common");
const {
  userLoginDB,
  verifyotpLoginDb,
  userRegisterDB,
  createNewPasswordDb,
  adduserProfileDb,
  getUserProfileDb
} = require("./services/db");

module.exports = {
  //================== user register ==================

  userRegister: async (req, res) => {
    const { body } = req;

    const findUser = await userRegisterDB(body);

    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data: findUser,
    });
  },

  //============= user login ===============

  userlogin: async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    const findUser = await userLoginDB(email);
    const userData = await userLoginService(findUser, password);

    return res.status(200).json({
      status: "success",
      message: userData.otpMessage,
      data: userData.userId,
    });
  },

  //================ otp verification login ===============

  verifyOtpLogin: async (req, res) => {
    const { userId, otp } = req.body;
    const checkOtp = await verifyotpLoginDb(userId, otp);
    const token = await tokenServiceUser(checkOtp, userId);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: token,
    });
  },

  //============== otp verification ================

  verifyOtp: async (req, res) => {
    const { otp } = req.body;
    const userId = req.user?.userId || req.body.userId; //extracting the user id from the token.
    // more info : check jwtToken file.

    const checkOtp = await verifyotpLoginDb(userId, otp);

    return res.status(200).json({
      status: "success",
      message: "OTP validation success",
      data: checkOtp,
    });
  },

  //================ forgot password =================

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const findUser = await userLoginDB(email);
    const sendOtp = await sendOtpService(findUser);

    return res.status(200).json({
      status: "success",
      message: sendOtp.otpMessage,
      data: sendOtp.userId,
    });
  },

  //================ create new password =================

  createNewPassword: async (req, res) => {
    const { newPassword, userId } = req.body;
    const userData = await createNewPasswordDb(newPassword, userId);

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
      data: userData,
    });
  },

  //================ add profile =================

  addUserProfile: async (req, res) => {
    const { body } = req;
    const userId = req.user?.userId;
    const userData = await adduserProfileDb(body, userId);

    return res.status(200).json({
      status: "success",
      message: "Profile added successfully",
      data: userData,
    });
  },

  //================= get profile ================

  getUserProfile: async (req, res) => {
    const userId = req.user?.userId;
    const findUser = await getUserProfileDb(userId);

    return res.status(200).json({
      status: "success",
      message: "Profile fetched successfully",
      data: findUser,
    });
  },

  
};
