const { ObjectID } = require('bson');
const mongoose = require('mongoose')
const postSchema = require('./post');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    followers: {
        data: {
            type: [mongoose.ObjectId],
            required: true,
            default: null,
        },
        followerCount: {
            type: Number,
            default: 0
        }
    },
    following: {
        data: {
            type: [mongoose.ObjectId],
            required: true,
            default: null,
        },
        followingCount: {
            type: Number,
            default: 0
        }
    },
    posts: {
        data: {
            type: [mongoose.ObjectId],
            required: true,
            default: null,
        },
        postCount: {
            type: Number,
            default: 0
        }
    },
    phone: {
        type: Number,
        required: false
    },
    profilePicture: {
        data: Buffer,
    },
    registrationDate: {
        type: Date,
        required: true
    },
    tokenRefreshDate: {
        type: Date,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
module.exports.userSchema = userSchema;