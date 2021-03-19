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
            
        }
    ],
    wishList: [
        {

        }
    ],
    bookList: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "book"
    }] 
});

userSchema.methods.addBookList = function(bookId){

    this.bookList.push(bookId);
    this.save();

}

const User = mongoose.model("user", userSchema);

module.exports = User;