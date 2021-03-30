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
    showCart,
    addToShoppingCart,
    showWishList,
    addToWishList
 } = require("../controller/handleProduct");
 
 const {upload} = require("./../middleware/upload");
 const express = require("express");
 const verifyAdmin = require("../middleware/verifyAdmin")
 const verifyUser = require("../middleware/verifyUser");

const router = express.Router();


router.get("/admin", verifyAdmin, adminHomeRender) 
// router.get("/addBook", verifyAdmin, addBookForm);
router.post("/addBook", verifyAdmin, upload.single("imageurl"), addBookFormSubmit);
//removed verifyUser, för att se hemsidan
router.get("/", showBooks);
router.get("/showMyBooks", verifyAdmin, showAdminBooks)

router.get("/admin/edit/:id",verifyAdmin, adminEditBookRender)
router.post("/admin/edit/:id",verifyAdmin,upload.single("imageurl"), adminEditBook)
router.get("/admin/delete/:id", verifyAdmin, adminDeleteBook)

router.get("/showBook/:id", showBook);
router.get("/addToCart/:id", verifyUser, addToShoppingCart)
router.get("/shoppingcart", verifyUser, showCart)

router.get("/wishlist", verifyUser, showWishList)
router.get("/addToWish/:id", verifyUser, addToWishList);



 module.exports = router;