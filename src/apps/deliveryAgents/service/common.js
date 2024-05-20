const jwt = require("jsonwebtoken");
const refreshTokenDeliveryAgentModel = require("../../refreshToken/model/refreshTokenDeliveryAgent");

module.exports={
    tokenServiceDeliveryAgent:async(checkOtp, deliveryAgentId)=>{
        if (checkOtp === true) {
            const secret = process.env.DELIVERY_AGENTSECRET_KEY;
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
              const existingRefreshToken = await refreshTokenDeliveryAgentModel.findOne({
                deliveryAgentId: deliveryAgentId,
              });
      
              if (existingRefreshToken) {
                await refreshTokenDeliveryAgentModel.findByIdAndUpdate(
                  existingRefreshToken?._id,
                  {
                    token: refreshToken,
                  }
                );
                return token;
              } else {
                const createRefreshToken = new refreshTokenDeliveryAgentModel({
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