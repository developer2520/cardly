const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    profilePic: String

}));

module.exports = mongoose.models.User || mongoose.model("User", User);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              