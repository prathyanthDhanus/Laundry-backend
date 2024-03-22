const userModel = require("../models/userSchema");
const AppError = require("../../../utils/appError");

module.exports = {

  //----------- user register ------------

  userRegisterDB: async (body,hashedPassword) => {

    const { email } = body;
    const user = await userModel.findOne({ email });
    const userCreate = new userModel({ ...body,password:hashedPassword });
    
    if (user) {
      throw new AppError(
        "Field validation error:User already exist",
        "User already exist",
        409
      );
    }

    await userCreate.save();
    return userCreate;
  },

  //--------------- user login --------------

  userLoginDB : async(email) =>{
    
    const findUser = await userModel.findOne({email});
   
    if(findUser){
     return findUser
    }

    throw new AppError(
      "Field validation error:Login failed",
      "User not found",
      404
    );

    
  }
};
