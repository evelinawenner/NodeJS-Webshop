const { 
    adminHomeRender,
    // addBookForm, 
    addBookFormSubmit,
    showBooks,
    showAdminBooks,
    adminEditBookRender,
    adminEditBook,
    adminDeleteBook,
    showBook,
    showHomeAdmin,
    showHomeUser
 } = require("../controller/handleProduct");
 
 const {upload} = require("./../middleware/upload");
 const express = require("express");
 const verifyAdmin = require("../middleware/verifyAdmin")
 const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

router.get("/admin", verifyAdmin, adminHomeRender) 
// router.get("/addBook", verifyAdmin, addBookForm);
router.post("/addBook", verifyAdmin, upload.single("imageurl"), addBookFormSubmit);
router.get("/", showBooks);
router.get("/", verifyUser, showBooks);
router.get("/Home", verifyUser, showHomeUser)
router.get("/adminHome", verifyAdmin, showHomeAdmin)
router.get("/showMyBooks", verifyAdmin, showAdminBooks)
router.get("/admin/edit/:id",verifyAdmin, adminEditBookRender)
router.post("/admin/edit/:id",verifyAdmin,upload.single("imageurl"), adminEditBook)
router.get("/admin/delete/:id", verifyAdmin, adminDeleteBook)
router.get("/showBook/:id", showBook);
 module.exports = router;