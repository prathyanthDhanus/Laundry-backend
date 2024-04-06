const jwt = require("jsonwebtoken");
const refreshTokenModel = require("./model/refreshTokenUser");

module.exports = {
  refreshToken: async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(422).json({ error: "Access Token Not Found ❌" });
    }

    const token = authHeader?.split(" ")[1];
    const user = jwt.decode(token);
    const existingRefreshToken = await refreshTokenModel.findOne({
      userId: user?.userId,
    });

    if (existingRefreshToken) {
      jwt.verify(
        existingRefreshToken?.token,
        process.env.SECRET_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(422).json({ error: "Invalid refresh token ❌" });
          } else {
            const secret = process.env.SECRET_KEY;

            const refreshToken = jwt.sign(
              {
                userId: user?.userId,
                date: Date.now(),
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
                roleId: user?.roleId,
                designation: user?.designation,
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
};
