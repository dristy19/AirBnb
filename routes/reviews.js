const express = require("express");
const router = express.Router({ mergeParams: true }); // 👈 important to access :id from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const ExpressError = require("../utils/ExpressError.js");

// ✅ Create a review for a listing
router.post("/", validateReview, wrapAsync(reviewController.createReview));



// ✅ Delete review
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewController.deleteReview));

module.exports = router;
