const jwt = require("jsonwebtoken");
const refreshTokenModel = require("./model/refreshTokenUser");
const refreshTokenAdminModel = require("./model/refreshTokenAdmin");

module.exports = {
  refreshTokenUser: async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(422).json({ error: "Access Token Not Found ❌" });
    }

    const token = authHeader?.split(" ")[1];
    const user = jwt.decode(token); //decoding the userid from the token
    const existingRefreshToken = await refreshTokenModel.findOne({
      userId: user?.userId,
    });
    // console.log("refersh",existingRefreshToken)

    if (existingRefreshToken) {
      jwt.verify(
        existingRefreshToken?.token,
        process.env.USERSECRET_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(422).json({ error: "Invalid refresh token ❌" });
          } else {
            const secret = process.env.USERSECRET_KEY;

            const refreshToken = jwt.sign(
              {
                userId: user?.userId,
                role:"user",
                date: Date.now()
              },
              secret,
              {
                expiresIn: "7d",
              }
            );

            await refreshTokenModel.findByIdAndUpdate(
              existingRefreshToken?._id,
              { token: refreshToken }
            );

            const token = jwt.sign(
              {
                userId: user?.userId,
                role:"user"           
              },
              secret,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              status: "success",
              message: "Successfully logged in",
              data: token,
            });
          }
        }
      );
    } else {
      return res.status(422).json({ error: "Refresh Token Not Available ❌" });
    }
  },

  refreshTokenAdmin:async(req,res)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(422).json({ error: "Access Token Not Found ❌" });
    }

    const token = authHeader?.split(" ")[1];
    const admin = jwt.decode(token);
    const existingRefreshToken = await refreshTokenAdminModel.findOne({
      adminId: admin?.adminId,
    });

    if (existingRefreshToken) {
      jwt.verify(
        existingRefreshToken?.token,
        process.env.ADMINSECRET_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(422).json({ error: "Invalid refresh token ❌" });
          } else {
            const secret = process.env.ADMINSECRET_KEY;

                    const refreshToken = jwt.sign({
                        adminId: admin?.adminId,
                        role:"admin",
                        date:Date.now()
                    },
                        secret,
                    {
                        expiresIn: '3d'
                    }
                    );

            await refreshTokenAdminModel.findByIdAndUpdate(
              existingRefreshToken?._id,
              { token: refreshToken }
            );

            const token = jwt.sign(
              {
                adminId: admin?.adminId,
                role:"admin"
              },
              secret,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              status: "success",
              message: "Successfully logged in",
              data: token,
            });
          }
        }
      );
    } else {
      return res.status(422).json({ error: "Refresh Token Not Available ❌" });
    }

  },

  refreshTokenDeliveryAgent:async(req,res)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(422).json({ error: "Access Token Not Found ❌" });
    }

    const token = authHeader?.split(" ")[1];
    const admin = jwt.decode(token);
    const existingRefreshToken = await refreshTokenAdminModel.findOne({
      adminId: admin?.adminId,
    });

    if (existingRefreshToken) {
      jwt.verify(
        existingRefreshToken?.token,
        process.env.DELIVERY_AGENTSECRET_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(422).json({ error: "Invalid refresh token ❌" });
          } else {
            const secret = process.env.DELIVERY_AGENTSECRET_KEY;

                    const refreshToken = jwt.sign({
                      deliveryAgentId: delivery_agent?.deliveryAgentId,
                        role:"deliveryAgent",
                        date:Date.now()
                    },
                        secret,
                    {
                        expiresIn: '3d'
                    }
                    );

            await refreshTokenAdminModel.findByIdAndUpdate(
              existingRefreshToken?._id,
              { token: refreshToken }
            );

            const token = jwt.sign(
              {
                deliveryAgentId: delivery_agent?.deliveryAgentId,
                role:"deliveryAgent"
              },
              secret,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              status: "success",
              message: "Successfully logged in",
              data: token,
            });
          }
        }
      );
    } else {
      return res.status(422).json({ error: "Refresh Token Not Available ❌" });
    }

  }
};
