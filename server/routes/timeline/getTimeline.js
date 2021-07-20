const express = require('express');
const Timeline = require('../../model/timeline');
const User = require('../../model/user');
const router = express.Router();

router.get('/getTimeline/:email/:token', async (req, res) => {
    const email = req.params.email;
    const token = req.params.token;

    const currentUser = await User.findOne({
        email: email
    });

    if(currentUser == null) {
        res.send({
            success: false,
            error: "no user found",
            data: null
        });
    }

    if(currentUser.token != token) {
        res.send({
            success: false,
            error: "token not matched",
            data: null
        })
    }

    const followingID = currentUser.following.data;
    var following = [];
    for(var i = 0; i < followingID.length; ++i) {
        const userToGet = followingID[i];
        const tempFollowing = await User.findById(userToGet);
        if(tempFollowing != null) {
            following.push(tempFollowing.email);
        }
    }

    const timelineData = await Timeline.find({});
    var timelineContent = [];
    for(var i = 0; i < timelineData.length; ++i) {
        /*
        if(following.constains(timelineData.ownerEmail) == true) {
            timelineContent.push(timelineData[i]);
        }
        */
       timelineContent.push(timelineData[i]);
    }
    res.json({
        success: true,
        error: null,
        data: timelineContent
    })
})

module.exports.getTimeline = router;