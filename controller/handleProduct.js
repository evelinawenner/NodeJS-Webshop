const Book = require("../models/product");
require("dotenv").config();
const User = require("../models/user");

const adminHomeRender = async (req, res) => {
  await Book.find().exec(function (err, books) {
    res.render("adminPage.ejs", {
      books,
    });
  });
};

// const addBookForm = (req, res)=>{
//     res.render("bookForm.ejs", {err:" "})
// }

const addBookFormSubmit = async (req, res) => {
  const { name, description, price } = req.body;
  const path = req.body.imageurl;
  console.log(path)
  // skapa course i database
  const book = await new Book({
    name: name,
    image: "/uploads/" + req.body.imageurl,
    description: description,
    price: price,
  }).save();
  const user = await User.findOne({ _id: req.user.user._id });

  user.addBookList(book._id);

  res.redirect("/admin");
};

const showAdminBooks = async (req, res) => {
  //hitta vilken user/Instructor som är inloggad
  // populera courseList
  // visa den till ejs template
  const user = await User.findOne({ _id: req.user.user._id }).populate(
    "bookList"
  );
  console.log(user.bookList);
  res.render("adminPage.ejs", { books: user.bookList, err: "" });
};

const showBooks = async (req, res) => {
  const books = await Book.find();
  res.render("showBooks.ejs", { err: " ", books: books });
};
module.exports = {
  adminHomeRender,
  // addBookForm,
  addBookFormSubmit,
  showBooks,
  showAdminBooks,
};
