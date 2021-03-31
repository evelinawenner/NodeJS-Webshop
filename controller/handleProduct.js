const Book = require("../models/product");
require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user");
const showHomeAdmin = async(req,res) =>{
  const user = await User.findOne({ _id: req.user.user._id });
  res.render("showBookAdmin.ejs", {user:user, books})
}
const showHomeUser = async(req,res) =>{
  const user = await User.findOne({ _id: req.user.user._id });
  res.render("showBookUser.ejs", {user:user, books})
}
const adminHomeRender = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  await Book.find().exec(function (err, books) {
    res.render("adminPage.ejs", {
      books,
      id: "",
      user:user
    });
  });
};

// const addBookForm = (req, res)=>{
//     res.render("bookForm.ejs", {err:" "})
// }

const addBookFormSubmit = async (req, res) => {
  const { name, author, description, price } = req.body;
  const book = await new Book({
    name: name,
    author: author,
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
  res.render("adminPage.ejs", { books: user.bookList, id: "", err: "", user:user});
};

const adminEditBookRender = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id}).populate("bookList");
        res.render("adminPage.ejs", {id:id, books: user.bookList, user:user});
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
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
            });
        }else {
            console.log("defined");
            await Book.updateOne({_id: req.params.id}, {
                name: req.body.name,
                author: req.body.author,
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
  const page = +req.query.page || 1;
  try {
    const totalProducts = await Book.find().countDocuments();
    const productsPerReq = 4;
    const pageGeneration = Math.ceil(totalProducts/productsPerReq);

    const showProducts = productsPerReq * page;

    const books = await Book.find().limit(showProducts);
    res.render("showBooks.ejs", { err: " ", books,
    totalProducts, productsPerReq, pageGeneration, showProducts });
  } catch(error) {
    console.log(error);
  }
};

const showBook = async (req, res) => {
  try{
    const user = await User.findOne({user: req.params.name});
    const book = await Book.findOne({_id: req.params.id});
    res.render("singleBook.ejs", {err: " ",user:user, book: book});
  } catch (error) {
    console.log(error);
  }
}
const singleBookAdmin = async(req,res) => {
  //const role = req.body
  const role = await User.findOne(req.user.role)
  const userRole = await User.findOne({role:role})
  if(userRole === "admin"){
    return res.render("singleBookAdmin.ejs",{user:user, err: " ", books:books})
  } else{
    return res.render("singleBookUser.ejs", {err:" ", user:user, books:books})
  }
}

const showCart = async (req, res) => {
  try {
    const user = await (await User.findOne({_id:req.user.user._id}).populate('shoppingCart'))

  res.render("shoppingCart.ejs", { shoppingCart: user.shoppingCart, err: ""});
  }
 catch (error) {
  console.log(error);
  }
}

const addToShoppingCart = async (req, res) => {
  try {
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


const showWishList = async (req, res) => {
  try {
    const user = await (await User.findOne({_id:req.user.user._id}).populate('wishList'));
    res.render("wishlist.ejs", { wishList: user.wishList, err: ""});
  }
 catch (error) {
  console.log(error);
  }
}

const addToWishList = async (req, res) => {
  try {
    const book = await Book.findOne({_id: req.params.id});
    const wishListUser = await (await User.findOne({_id:req.user.user._id})).populate("wishList");
    wishListUser.addToWish(book);
  res.redirect("/");
  }
  catch (error) {
    console.log(error);
  }
}


const checkout = async (req,res) => {
  const user = await  User.findOne({_id:req.user.user._id}).populate("shoppingCart");
  console.log(user.shoppingCart);
  const session = await Stripe.checkout.sessions.create({
      success_url: 'http://localhost:5001/shoppingSuccess',
      cancel_url: 'https://localhost:5001/shoppingCart',
      payment_method_types: ['card'],
      line_items: user.shoppingCart.map(course =>{
          return{
              name:course.name,
              amount : course.price,
              quantity: 1,
              currency:"sek"
          }
      }),
      mode: 'payment',
    });
    console.log(session);
    res.render("checkout.ejs", {cartItem:user.shoppingCart, sessionId: session.id});
  //skica session Id till checkout ejs
}
const shoppingSuccess = async (req,res) => {
  const user = await User.findOne({_id:req.user.user._id});
  user.shoppingCart = [];
  user.save();
  res.send("din varukorg är tomt. vi skickar din beställning inom 3 dagar");
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
  showHomeAdmin,
  showHomeUser,
  singleBookAdmin,
  showCart,
  addToShoppingCart,
  checkout,
  shoppingSuccess,
  showWishList,
  addToWishList
};
