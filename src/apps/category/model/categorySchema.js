const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName : {
        type:String,
        required:true
    },
    isDeleted : {
        type:Boolean,
        default : false
    }
})

const category = mongoose.model('category',categorySchema)
module.exports = category;
