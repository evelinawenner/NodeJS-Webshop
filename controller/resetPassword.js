const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const transport = nodemailer.createTransport({service:"gmail",
auth:{user:"bockshop123@gmail.com", pass:"lei123zhang"}})
const resetRender = (req, res) =>{
    res.render("reset.ejs", {err:" "});
}
const resetSubmit = async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({email:email});
    if(!user) return res.redirect("/register");
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    transport.sendMail({
        from:"a173245655@gmail.com",
        to:user.email,
        subject:"Reset password requested",
        html:`<strong> Klick <a href="http://localhost:5001/reset/${user.resetToken}"> link</a> för att kunna återställ lösenord`
    })
    res.render("checkMail.ejs")
}
const resetParams = async (req, res)=>{
const resetToken = req.params.resetToken;
console.log(req.params)
try{
const user = await User.findOne({resetToken:resetToken, resetTokenExpiration:{ $gt: Date.now()}});
console.log(user)
if(!user) return res.redirect("/register");
res.render("resetPasswordForm.ejs", {err:" ", email:user.email});
}
catch(err){
    res.render("/reset.ejs", {err:"Please try again"});
}
}
const resetFormSubmit = async (req,res)=>{
    const password = req.body.newPassword;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(12);
    const hashadPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({email:email});
    user.password = hashadPassword;
    await user.save();
    res.redirect("/login");
}
module.exports = {
    resetSubmit,
    resetRender,
    resetParams,
    resetFormSubmit
}