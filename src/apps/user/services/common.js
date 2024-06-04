const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenUserModel = require("../../../apps/refreshToken/model/refreshTokenUser");
const { userRegisterDB, sendOtpDB } = require("./db");
const { sendOtpAndSave } = require("../../otp/sendOtp");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {

  //================== user payment details =====================

 userPaymentService : async(totalAmount)=>{

  let metadata = "thank you for purchasing from us, see you soon";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Sample Product',
            description: 'Laundry Service',
            images:['https://static.vecteezy.com/system/resources/previews/026/721/193/original/washing-machine-and-laundry-laundry-sticker-png.png'],
          },
          unit_amount: totalAmount * 100, // amount in rupees
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
    cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
    metadata: {
      script: metadata,
    },
  })
  return session.url
 },


  //===================== user login ===================

  userLoginService: async (findUser, password) => {
  
    const comparePassword = await bcrypt.compare(password, findUser?.password);
    if (!comparePassword) {
      throw new Error("Wrong password");
    }

    const sendOtp = await module.exports.sendOtpService(findUser);
    return sendOtp;
  },

  //================== generate token ==================

  tokenServiceUser: async (checkOtp, userId) => {
    if (checkOtp === true) {
      const secret = process.env.USERSECRET_KEY;
      const token = jwt.sign(
        {
          userId: userId,
          role:"user"
        },
        secret,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        {
          userId: userId,
          role:"user",
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

  //============== send otp ================

  sendOtpService: async (findUser) => {
   
    const sendOtp = await sendOtpAndSave(
      findUser?.email,
      findUser?._id,
      findUser?.userName
    );

    return sendOtp;
  },

 



};
