const { 
    addBookForm, 
    addBookFormSubmit,
    showBooks
   
 } = require("../controller/handleProduct");
 
 const express = require("express");

const router = express.Router();



router.get("/addBook", addBookForm);
router.post("/addBook", addBookFormSubmit);
router.get("/showBooks", showBooks);


 module.exports = router;