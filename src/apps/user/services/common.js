const bcrypt = require("bcrypt");
const {userRegisterDB} = require("./db");
const otpModel = require("../../otp/models/otpSchema");
const {sendEmail} = require("../../otp/models/nodeMailer")


module.exports = {

  //----------- user register ------------

  userRegisterService: async (body) => {
     
    const {password} = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await userRegisterDB(body,hashedPassword);
    
    return userData;
  },

//--------- user login ---------------

  userLoginService : async(findUser,password)=>{
   
    const comparePassword = await bcrypt.compare(password,findUser?.password);
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();//generate 4 digit otp
    const date = new Date();
    if(!comparePassword){
       throw new Error("Wrong password")
    }
     
    const otp = new otpModel({email:findUser?.email,otp:otpCode,expireAt:date});
    await otp.save();
    await sendEmail(findUser?.email,otpCode,findUser?.userName);
  } 
 
};