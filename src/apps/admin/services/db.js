const jwt = require("jsonwebtoken");
const AppError = require("../../../utils/appError");
const adminModal = require("../model.js/adminSchema");
const refreshTokenAdminModal = require("../../refreshToken/model/refreshTokenAdmin");
const bcrypt = require("bcrypt");



module.exports = {

    //------------------- admin register ---------------------

  adminRegisterDb: async (userName, password) => {
    const findAdmin = await adminModal.findOne({ userName: userName });
    if (findAdmin) {
      throw new AppError(
        "Field validation error:Admin already exist,choose another username for admin",
        "Admin already exist,choose another username for admin",
        409
      );
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const createAdmin = new adminModal({userName:userName,password:hashedPassword})
    await createAdmin.save();
  },

  //----------------------- admin login -----------------------

  adminLoginDb: async (userName, password,adminId) => {
    // const username = process.env.ADMIN_USERNAME; //requiring username
    // const passWord = process.env.ADMIN_PASSWORD; // password ,
    // const adminsecretkey = process.env.ADMINSECRET_KEY; //admin secrete key from .env
    
    const findAdmin = await adminModal.findOne({userName:userName});
    const comparePassword = await bcrypt.compare(password, findAdmin?.password);

    if (!comparePassword) {
      throw new AppError(
        "Field validation error:User already exist",
        "User already exist",
        409
      );
    }
    // const token = jwt.sign({userName},adminsecretkey, { expiresIn: "1h" })
    const adminsecretkey = process.env.ADMINSECRET_KEY;
    const token = jwt.sign(
      {
        adminId: adminId,
      },
      adminsecretkey,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        adminId: adminId,
        date: Date.now(),
      },
      adminsecretkey,
      { expiresIn: "7d" }
    );

    if (token && refreshToken) {
      const existingRefreshToken = await refreshTokenAdminModal.findOne({
        adminId: adminId,
      });

      if (existingRefreshToken) {
        await refreshTokenAdminModal.findByIdAndUpdate(
          existingRefreshToken?._id,
          {
            token: refreshToken,
          }
        );
        return token;
      } else {
        const createRefreshToken = new refreshTokenAdminModal({
          token: refreshToken,
          adminId: adminId,
        });
        createRefreshToken.save();
        return token;
      }
    } else {
      throw new Error("Login failed");
    }
  },
};
