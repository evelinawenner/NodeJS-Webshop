const Book = require("../models/product");
require("dotenv").config();
const User = require("../models/user");

const adminHomeRender = async (req, res) => {
  await Book.find().exec(function (err, books) {
    res.render("adminPage.ejs", {
      books,
      id: ""
    });
  });
};

// const addBookForm = (req, res)=>{
//     res.render("bookForm.ejs", {err:" "})
// }

const addBookFormSubmit = async (req, res) => {
  const { name, description, price } = req.body;
  // skapa course i database
  const book = await new Book({
    name: name,
    image: "/uploads/" + req.file.filename,
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
  res.render("adminPage.ejs", { books: user.bookList, id: "", err: ""});
};

const adminEditBookRender = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id}).populate("bookList");
        res.render("adminPage.ejs", {id:id, books: user.bookList});
    } catch (error) {
        console.log(error);
    }
}

const adminEditBook = async (req,res) => {
    try {
        if (req.file == undefined) {
            console.log("undefined");
            await Book.updateOne({_id: req.params.id}, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            });
        }else {
            console.log("defined");
            await Book.updateOne({_id: req.params.id}, {
                name: req.body.name,
                image: "/uploads/" + req.file.filename,
                description: req.body.description,
                price: req.body.price,
            });
        }
        
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
}

const adminDeleteBook = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id});
        const id = req.params.id;

        user.removeFromBookList(id);
        await Book.deleteOne({_id: id});
        
        res.redirect("/admin")
    } catch (error) {
        console.log(error);
    }
}

const showBooks = async (req, res) => {
  const books = await Book.find();
  res.render("showBooks.ejs", { err: " ", books: books });
};

const showBook = async (req, res) => {
  try{
    const book = await Book.findOne({_id: req.params.id});
    res.render("singleBook.ejs", {err: " ", book: book});
  } catch (error) {
    console.log(error);
  }
  
}

const showCart = async (req, res)=>{
  try{
    const user = await (await User.findOne({_id:req.user.user._id}).populate('shoppingCart'))

  res.render("shoppingCart.ejs", { shoppingCart: user.shoppingCart, err: ""});
  }
 catch (error) {
  console.log(error);
}
}

const addToShoppingCart = async (req, res) => {
  try{
    // const bookId = req.params.id
    //const user = await User.findOne({_id:req.user.user._id})
    const book = await Book.findOne({_id: req.params.id});
   // user.addToCart(bookId);
    const cartUser = await (await User.findOne({_id:req.user.user._id})).populate("shoppingCart");
    cartUser.addToCart(book);
  res.redirect("/");
  }
  catch (error) {
    console.log(error);
   }
}

const showWishList = async (req, res)=>{
  try{
    const user = await (await User.findOne({_id:req.user.user._id}).populate('wishList'))

  res.render("wishlist.ejs", { wishList: user.wishList, err: ""});
  }
 catch (error) {
  console.log(error);
}
}

const addToWishList = async (req, res) => {
  try{
    const book = await Book.findOne({_id: req.params.id});
    const wishListUser = await (await User.findOne({_id:req.user.user._id})).populate("wishList");
    wishListUser.addToWish(book);
  res.redirect("/");
  }
  catch (error) {
    console.log(error);
   }
}


module.exports = {
  adminHomeRender,
  // addBookForm,
  addBookFormSubmit,
  showBooks,
  showAdminBooks,
  adminEditBookRender,
  adminEditBook,
  adminDeleteBook,
  showBook,
  showCart,
  addToShoppingCart,
  showWishList,
  addToWishList
};
