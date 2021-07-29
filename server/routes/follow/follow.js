const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const User = require('../../model/user');
const urlencodedbody = bodyParser.urlencoded({ extended: false });


async function updateFollower(currentUser, followUser) {
    const user = await User.findOne({
        email:followUser.email
    })
    if((user.followers.data).includes(currentUser._id) == true) return;
    User.findOneAndUpdate(
        {
            email: followUser.email
        },
        {
            $push:{
                "followers.data": currentUser._id
            },
            $inc: {
                "followers.followerCount": 1
            }
        },
        (err,obj) => {
            if(err) {
                console.log(err);
            }
        }
    )
}

async function updateFollowing(currentUser, followUser) {
    const user = await User.findOne({
        email: currentUser.email
    })
    if((user.following.data).includes(followUser._id) == true) return;
    User.findOneAndUpdate(
        {
            email: currentUser.email
        },
        {
            $push:{
                "following.data": followUser._id
            },
            $inc: {
                "following.followingCount": 1
            }
        },
        (err,obj) => {
            if(err) {
                console.log(err);
            }
        }
    )
}

router.post('/follow',urlencodedbody, async (req, res) => {
    const email = req.body.email;
    const token = req.body.token;
    const followEmail = req.body.followEmail;

    const currentUser = await User.findOne({
        email: email
    });
    
    if(currentUser == null) {
        res.json({
            success: false,
            error: "user not found"
        })
        return;
    }
    
    if(currentUser.token != token) {
        res.json({
            success: false,
            error: "token not matched"
        })
        return;
    }

    const followUser = await User.findOne({
        email: followEmail
    })

    if(followUser == null) {
        res.json({
            success: false,
            error: "something went wrong"
        })
        return;
    }
    
    updateFollowing(currentUser, followUser);
    updateFollower(currentUser,followUser);

    res.json({
        status: true,
        error: null
    })
})

module.exports.follow = router;