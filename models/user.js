const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  token: String,
  resetToken: String,
  resetTokenExpiration: Date,
  shoppingCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
  wishList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  }],
  bookList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

userSchema.methods.addBookList = function (bookId) {
  this.bookList.push(bookId);
  this.save();
};

userSchema.methods.removeFromBookList = function (productId) {
  let index = this.bookList.indexOf(productId);
  this.bookList.splice(index, 1);
  this.save();
};

userSchema.methods.addToCart = function(bookId) {
   this.shoppingCart.push(bookId)
   this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;
