const mongoose = require("mongoose");
const pictureSchema = new mongoose.Schema({
    name:{type:String, required:true}, 
    path:{type:String, required:true}
})
const Picture = mongoose.model("picture", pictureSchema)
module.exports = Picture;