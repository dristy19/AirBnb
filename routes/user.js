const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const Listing = require("../models/listing.js"); // Import your Listing model

// ====== Home Page (show all listings) ======
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings }); 
}));

// ====== Signup ======
router.route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signupForm));

// ====== Login ======
router.route("/login")
    .get(userController.renderLogin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.loginForm
    );

// ====== Logout ======
router.get("/logout", userController.logout);

module.exports = router;