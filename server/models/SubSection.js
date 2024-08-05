const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    time: {
        type: String,
    },
    videoUrl: {
        type: String,
    }

});

module.exports = mongoose.model("SubSection", subSectionSchema);
