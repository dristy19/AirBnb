const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = (async (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to add a review.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();

  listing.reviews.push(newReview);
  await listing.save();
  req.flash("success", "New review created successfully!");
  res.redirect(`/listings/${listing._id}`);
});

module.exports.deleteReview = (async (req, res) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  // Only allow the author to delete
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
});