const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../../../apps/refreshToken/model/refreshTokenUser");
const { userRegisterDB, sendOtpDB } = require("./db");
const { sendOtpAndSave } = require("../../otp/sendOtp");

module.exports = {
  //----------- user register ------------

  userRegisterService: async (body) => {
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await userRegisterDB(body, hashedPassword);

    return userData;
  },

  //--------- user login ---------------

  userLoginService: async (findUser, password) => {
    const comparePassword = await bcrypt.compare(password, findUser?.password);
    if (!comparePassword) {
      throw new Error("Wrong password");
    }

    const sendOtp = await sendOtpAndSave(
      findUser?.email,
      findUser?._id,
      findUser.userName
    );

    return sendOtp;
  },

  //-------------- generate token ----------------

  tokenService: async (checkOtp, userId) => {
    if (checkOtp === true) {
      const secret = process.env.SECRET_KEY;
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
        const existingRefreshToken = await refreshTokenModel.findOne({
          userId: userId,
        });

        if (existingRefreshToken) {
          await refreshTokenModel.findByIdAndUpdate(existingRefreshToken?._id, {
            token: refreshToken,
          });
          return token;
        } else {
          const createRefreshToken = new refreshTokenModel({
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
};
