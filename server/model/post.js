const mongoose = require('mongoose')
const userSchema = require('./user')

const postSchema = mongoose.Schema({
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
        type: userSchema,
        require: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: Number,
        required: true,
        default: 0
    },
    reports: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = postSchema;