const { sendEmail } = require("../../utils/nodeMailer");
const otpModel = require("./models/otpSchema");

module.exports = {
  sendOtpAndSave: async (email, userId, userName) => {
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate 4 digit otp
    let otpSent = false;
    let otpMessage;

    if (email) {
      otpSent = await sendEmail(email, otpCode, userName);
      otpMessage =
        "A verification code has been sent to your email address.Please verify";
    }

    if (otpSent) {
      const otp = new otpModel({
        userId,
        otp: otpCode,
        expireAt: new Date(), // 5 minutes expiry
      });
      await otp.save();
      return { otpMessage,userId };
    } else {
      throw new Error("Failed to send verification code");
    }
  },
};
