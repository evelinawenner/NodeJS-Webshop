const Book = require("../models/product");
require("dotenv").config();

const addBookForm = (req, res)=>{
    res.render("bookForm.ejs", {err:" "})
}

const addBookFormSubmit = async(req, res)=>{
    const {name, description, price}=   req.body
    // skapa course i database 
    const book = await new Book({name: name, description:description, price: price}).save();
    res.redirect("/showBooks")
}

const showBooks = async(req, res)=>{
    const books = await Book.find()
   res.render("showBooks.ejs", {err:" ", books:books})
   
   }
module.exports= {
    addBookForm, 
    addBookFormSubmit,
    showBooks
    
}