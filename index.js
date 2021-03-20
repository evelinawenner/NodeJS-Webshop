const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute");

require("dotenv").config();
const app = express();

let path = require('path')

// för att kunna parsa/konvertera json data till js 
app.use(express.json());

// för att kunna parsa/konvertera ejs data till js 
app.use(express.urlencoded({extended:false}))

// för att kunna läsa cookies // behövs npm i cookie-parser
app.use(cookieParser())


//app middlewares
app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.static( __dirname + "/public"))


//router middlewares
app.use(productRoute);
app.use(userRoute);

//connection to db
const options = { 
    useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true,
}

mongoose.connect(process.env.DB_CONNECT, options, (err) => {
    if (err) {
        console.log(err);
        return;
    }
console.log("Connected to db!");
app.listen(5001, () => console.log("Server Up and running"));
});