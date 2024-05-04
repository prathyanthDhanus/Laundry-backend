const jwt = require("jsonwebtoken");
const refreshTokenUserModel = require("../../refreshToken/model/refreshTokenDeliveryAgent");

module.exports={
    tokenServiceDeliveryAgent:async(checkOtp, deliveryAgentId)=>{
        if (checkOtp === true) {
            const secret = process.env.USERSECRET_KEY;
            const token = jwt.sign(
              {
                deliveryAgentId: deliveryAgentId,
                role:"deliveryAgent"
              },
              secret,
              { expiresIn: "1h" }
            );
      
            const refreshToken = jwt.sign(
              {
                deliveryAgentId: deliveryAgentId,
                role:"deliveryAgent",
                date: Date.now(),
              },
              secret,
              { expiresIn: "7d" }
            );
      
            if (token && refreshToken) {
              const existingRefreshToken = await refreshTokenUserModel.findOne({
                deliveryAgentId: deliveryAgentId,
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
                  deliveryAgentId: deliveryAgentId,
                });
                createRefreshToken.save();
                return token;
              }
            } else {
              throw new Error("Login failed");
            }
          }
       
    }
}