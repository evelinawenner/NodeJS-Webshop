const User = require("../models/user");
const Book = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRender = async (req, res) => {
    res.render("login.ejs", { err:"" });
}

const loginCheck = async (req, res) => {
    //skickar email från input
    const { email, password, role } = req.body;
    //sök efter användare i db
    const user = await User.findOne({ email: email });

    //om användare inte hittas (connect-flash?)
    if(!user) return res.send("Hittade inget konto. Vänligen registrera ett konto.");

    //jämmför lösenord
    const validUser = await bcrypt.compare(password, user.password);

    if(!validUser) return res.send("Lösenordet stämmer inte. Vänligen prova igen");

    //skapa token, byt ut "secretKey"!
    const jwToken = await jwt.sign({ user: user }, process.env.SECRET_KEY);

    if(jwToken) {
        const cookie = req.cookies.jwToken
        if(!cookie) {
            //maxAge: 1h
            res.cookie("jwToken", jwToken, { maxAge: 3600000, httpOnly: true });
        }
        //returnerar användare till startsidan
        
        const userRole = await User.findOne({role:role})
        const books = await Book.find();
        if(userRole === "admin") {
            return res.render("showBookAdmin.ejs",{user:user, err: " ", books:books})
        }else{
            return res.render("showBookUser.ejs", {err:" ", user:user, books:books})
        }
        
        //return res.redirect("/");
    }
    //användare behöver logga in igen pga expired token
    return res.redirect("/login");
}

module.exports = {
    loginRender,
    loginCheck
}