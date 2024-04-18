const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenUserModel = require("../../../apps/refreshToken/model/refreshTokenUser");
const { userRegisterDB, sendOtpDB } = require("./db");
const { sendOtpAndSave } = require("../../otp/sendOtp");

module.exports = {
  //--------- user login ---------------

  userLoginService: async (findUser, password) => {
    const comparePassword = await bcrypt.compare(password, findUser?.password);
    if (!comparePassword) {
      throw new Error("Wrong password");
    }

    const sendOtp = await module.exports.sendOtpService(findUser);
    return sendOtp;
  },

  //-------------- generate token ----------------

  tokenServiceUser: async (checkOtp, userId) => {
    if (checkOtp === true) {
      const secret = process.env.USERSECRET_KEY;
      const token = jwt.sign(
        {
          userId: userId,
        },
        secret,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        {
          userId: userId,
          date: Date.now(),
        },
        secret,
        { expiresIn: "7d" }
      );

      if (token && refreshToken) {
        const existingRefreshToken = await refreshTokenUserModel.findOne({
          userId: userId,
        });

        if (existingRefreshToken) {
          await refreshTokenUserModel.findByIdAndUpdate(
            existingRefreshToken?._id,
            {
              token: refreshToken,
            }
          );
          return token;
        } else {
          const createRefreshToken = new refreshTokenUserModel({
            token: refreshToken,
            userId: userId,
          });
          createRefreshToken.save();
          return token;
        }
      } else {
        throw new Error("Login failed");
      }
    }
  },

  //------------------ send otp -----------------

  sendOtpService: async (findUser) => {
    const sendOtp = await sendOtpAndSave(
      findUser?.email,
      findUser?._id,
      findUser?.userName
    );

    return sendOtp;
  },
};
