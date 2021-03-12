const express = require("express");

const router = express.Router();

const { loginCheck } = require("../controller/loginController");


//Routes
router.get("/register");

router.post("/register");

router.get("/login");

router.post("/login", loginCheck);

module.exports = router;

