const express = require("express");

const router = express.Router();

const { loginCheck } = require("../controller/loginController");
const { registerRender, registerSubmit } = require("../controller/registerController");
router.get("/register", registerRender);

router.post("/register", registerSubmit);

router.get("/login");

router.post("/login", loginCheck);

module.exports = router;

