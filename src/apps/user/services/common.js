const bcrypt = require("bcrypt");
const {userRegisterDB} = require("./db");




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
    if(!comparePassword){
       throw new Error("Wrong password")
    }
     
  }

};