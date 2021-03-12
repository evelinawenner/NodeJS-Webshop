const express = require("express");

const router = express.Router();

const { registerSubmit } = require("../controller/registerController");
const { loginCheck } = require("../controller/loginController");


//Routes
router.get("/register");

router.post("/register", registerSubmit);

router.get("/login");

router.post("/login", loginCheck);

module.exports = router;

