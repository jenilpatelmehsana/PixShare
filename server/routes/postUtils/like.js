const express = require('express')
const Post = require('../../model/post')
const bodyParser = require('body-parser')
const urlencodedbody = bodyParser.urlencoded({ extended: false });
const User = require('../../model/user')
const router = express.Router()

router.post('/like', urlencodedbody, async (req, res) => {
    const body = req.body
    const email = body.email
    const token = body.token
    const postId = body.postId

    const user = await User.findOne({
        email: email
    }).exec()

    if(user === null) {
        res.json({
            success: false,
            error: "user not found"
        })
        return
    }

    if(user.token != token) {
        res.json({
            success: false,
            error: "token not matched"
        })
        return
    }

    const post = await Post.findOne({
        postId: postId
    }).exec()

    if(post === null) {
        res.json({
            success: false,
            error: "post not found"
        })
        return
    }

    if((post.likes.likers).includes(user._id) === true) {
        res.json({
            success: true,
            error: null
        })
        return
    }

    await Post.findOneAndUpdate(
        {
            postId: postId 
        },
        {
            $push: {
                "likes.likers": user._id
            },
            $inc: {
                "likes.likeCount": 1
            }
        }
    ).then((obj) => {
        if(obj !== null) {
            res.json({
                success: true,
                error: null
            })
            return
        }
    }).catch((err) => {
        res.json({
            success: false,
            error: err
        })
        return
    })
})

module.exports.like = router