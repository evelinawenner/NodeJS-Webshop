const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyTokenAdmin = (req, res, next)=>{
  const userToken = req.cookies.jwToken;
    if(!userToken ) return res.render("login.ejs", {err:"Du måste logga in"})
  console.log('hej')
    const validUser = jwt.verify(userToken, process.env.SECRET_KEY)
    console.log(validUser)


    console.log(" verify Admin is triggered")
  //console.log(validUser.user.role)
  if(!validUser.user.role) return res.render("login.ejs", {err:"Du har inte authorization för att kunna göra detta"})
  req.user = validUser;
  next();
}

module.exports = verifyTokenAdmin;