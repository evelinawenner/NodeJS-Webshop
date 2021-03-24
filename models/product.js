const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({

    name:{type:String, required:true}, 
    description:String, 
    price :{type:Number, required:true},
    image:{type:String},
    author:String


})

const Book = mongoose.model("book", bookSchema)

module.exports = Book;