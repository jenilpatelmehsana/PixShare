const mongoose = require('mongoose')
const register = require('../routes/auth/regiseter');
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
    posts: {
        type: [postSchema]
    },
    following: {
        type: [userSchema],
        default: null
    },
    follower: {
        type: [user],
        default: null
    },
    phone: {
        type: Number,
        required: false
    }
})

userSchema.token = register.genreateToken();

module.exports = userSchema;