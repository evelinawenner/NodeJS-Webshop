const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();

const userRoute = require("./routes/userRoute");

//app middlewares
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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