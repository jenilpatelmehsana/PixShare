const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    commentId: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        default: null
    },
    commentTime: {
        type: Date,
        default: Date.now
    },
    commenterId: {
        type: mongoose.ObjectId,
        required: true
    },
    likes: {
        type: [mongoose.ObjectId],
        default: null
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
module.exports.commentSchema = commentSchema

/*

comment schema 
--> comment ID
--> comment (string)
--> comment time (date & time)
--> commenterId --> userId
--> likes

*/