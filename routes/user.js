const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// ====== Home Page ======
router.get("/", (req, res) => {
    res.render("home"); // Make sure views/home.ejs exists
});

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
