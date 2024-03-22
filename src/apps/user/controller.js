const { userRegisterService,userLoginService } = require("./services/common");
const {userLoginDB}  = require("./services/db")

module.exports = {

    //------------- user register ------------
  
    userRegister: async (req, res) => {
      
      const { body } = req;
      const userData = await userRegisterService(body);
  
      return res.status(200).json({
        status: "success",
        message: "User registered successfully",
        data: userData,
      });
    },
  
    //----------- user login -------------
  
    userlogin: async (req, res) => {
  
      const { email,password } = req.body;
      const findUser = await userLoginDB(email);
      const userData = await userLoginService(findUser,password);
    
      return res.status(200).json({
        status: "success",
        message: "User verified successfully ",
        data: userData,
      });
    },

    
  };