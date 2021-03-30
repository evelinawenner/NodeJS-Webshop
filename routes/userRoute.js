const express = require("express");
const {resetRender, resetSubmit, resetParams, resetFormSubmit} = require("../controller/resetPassword");
const router = express.Router();

const { loginRender, loginCheck } = require("../controller/loginController");
const { registerRender, registerSubmit } = require("../controller/registerController");
router.get("/register", registerRender);
router.post("/register", registerSubmit);

router.get("/login", loginRender);
router.post("/login", loginCheck);
router.get("/logut", (req,res)=>{
    res.clearCookie("jwtToken").redirect("/");
})
router.get("/reset", resetRender);
router.post("/reset", resetSubmit);
router.get("/reset/:resetToken", resetParams);
router.post("/resetPasswordForm", resetFormSubmit);

module.exports = router;

