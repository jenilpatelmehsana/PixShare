const express = require('express')
const bodyParser = require('body-parser')
const User = require('../../model/user')
const Post = require('../../model/post')
const Comment = require('../../model/comment')
const urlencodedbody = bodyParser.urlencoded({ extended: false });
const router = express.Router()

// endpoint methods

function generateCommentID(userName, postId) {
    const millisecs = Date.now()
    var commentId = postId + userName + millisecs;
    return commentId
}


router.put('/comment', urlencodedbody, async(req, res) => {
    const body = req.body
    const email = body.email
    const token = body.token
    const comment = body.comment
    const postId = body.postId

    const user = await User.findOne({
        email: email
    }).exec()

    if(user === null) {
        res.json({
            success: false,
            error: "user not found",
            comment: null
        })
        return
    }

    if(user.token != token) {
        res.json({
            success: false,
            error: "token not matched",
            comment: null
        })
        return
    }

    const post = await Post.findOne({
        postId: postId
    }).exec()

    if(post === null) {
        res.json({
            success: false,
            error: "post not found",
            comment: null
        })
        return
    }

    const newComment = new Comment({
        commentId: generateCommentID(user.userName, postId),
        comment: comment,
        commenterId: user._id
    })

    var savedComment = null
    await newComment.save().then((obj) => {
        savedComment = obj
    }).catch((err) => {
        res.json({
            success: false,
            errro: err,
            comment: null
        })
    })

    await Post.findOneAndUpdate(
        {
            postId: postId
        },
        {
            $push: {
                "comments.commenters": savedComment._id
            },
            $inc: {
                "comments.commentCount": 1
            }
        }
    ).then((obj) => {
        if(obj !== null) {
            res.json({
                success: true,
                error: null,
                comment: savedComment
            })
            return
        }
    }).catch((err) => {
        res.json({
            success: false,
            error: null,
            comment: null
        })
    })
})

module.exports.comment = router


/*
--> yet to implement likes on comment
--> delete comment
*/