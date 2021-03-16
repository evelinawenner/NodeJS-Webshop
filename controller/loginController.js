const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRender = async (req, res) => {
    res.render("login.ejs", { err:"" });
}

const loginCheck = async (req, res) => {
    //skickar email från input
    const { email, password } = req.body;
    //sök efter användare i db
    const user = await User.findOne({ email: email });

    //om användare inte hittas (connect-flash?)
    if(!user) return res.send("Hittade inget konto. Vänligen registrera ett konto.");

    //jämmför lösenord
    const validUser = await bcrypt.compare(password, user.password);

    if(!validUser) return res.send("Lösenordet stämmer inte. Vänligen prova igen");

    //skapa token, byt ut "secretKey"!
    const jwtToken = await jwt.sign({ user: user }, "secretKey");

    if(jwtToken) {
        const cookie = req.cookies.jwtToken
        if(!cookie) {
            //maxAge: 1h
            res.cookie("jwtToken", jwtToken, { maxAge: 3600000, httpOnly: true });
        }
        //returnerar användare till startsidan
        return res.redirect("/");
    }
    //användare behöver logga in igen pga expired token
    return res.redirect("/login");
}

module.exports = {
    loginRender,
    loginCheck
}