const mongoose = require('mongoose')

const LinkPage = mongoose.model('LinkPage', new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }


}));

module.exports = mongoose.models.LinkPage || mongoose.model("LinkPage", LinkPage);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              