const mongoose = require("mongoose");

const timelineSchema = mongoose.Schema({
    postingDate: {
        type: String,
        required: true
    },
    postID: {
        type: mongoose.ObjectId,
        required: true
    },
    owner: {
        type: mongoose.ObjectId,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    }
})

const Timeline = mongoose.model("Timeline", timelineSchema)

module.exports = Timeline
module.exports.timelineSchema = timelineSchema


/*

--> posting Date
--> postID
--> posterID

*/
