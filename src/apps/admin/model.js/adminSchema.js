const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
    userName: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})
const admin = mongoose.model("admin", adminschema)
module.exports = admin