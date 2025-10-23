const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
});

userSchema.plugin(passportLocalMongoose); // uses "username" by default

module.exports = mongoose.model("User", userSchema);
