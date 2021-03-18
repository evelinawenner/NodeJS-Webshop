const { 
    adminHomeRender,
    // addBookForm, 
    addBookFormSubmit,
    showBooks,
    showAdminBooks
    
 } = require("../controller/handleProduct");
 
 const {upload} = require("./../middleware/upload");
 const express = require("express");
 const verifyAdmin = require("../middleware/verifyAdmin")
 const verifyUser = require("../middleware/verifyUser");

const router = express.Router();


router.get("/admin", verifyAdmin, adminHomeRender) 
// router.get("/addBook", verifyAdmin, addBookForm);
router.post("/addBook", verifyAdmin, upload.single("imageurl"), addBookFormSubmit);
router.get("/showBooks", verifyUser, showBooks);
router.get("/showMyBooks", verifyAdmin, showAdminBooks)


 module.exports = router;