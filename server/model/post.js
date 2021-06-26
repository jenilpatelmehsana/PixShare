const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    data: {
        before: {
            type: Buffer,
            require: true
        },
        after: {
            type: Buffer,
            required: true
        }
    },
    postingTime: {
        type: Date,
        require: true,
        default: Date.now
    },
    owner: {
        type: mongoose.ObjectId,
        require: true
    },
    likes: {
        likers: {
            type: [mongoose.ObjectId],
            default: null
        },
        likeCount: {
            type: Number,
            default: 0
        }
    },
    comments: {
        commenters: {
            type: [mongoose.ObjectId],
            default: null
        },
        commentCount: {
            type: Number,
            default:0
        }
    },
    reports: {
        type: Number,
        default: 0
    }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;
module.exports.postSchema = postSchema;