const express = require('express');
const User = require('../../model/user');
const router = express.Router()


router.get('/getFollowers', async (req, res) => {
    const email = req.query.email;
    const token = req.query.token;
    const currentUser = await User.findOne({
        email: email
    });
    if(currentUser == null) {
        res.json({
            success: false,
            error: "user not found",
            data: null
        })
        return;
    }
    if(currentUser.token != token) {
        res.json({
            succees: false,
            error: "user not found",
            data: null
        })
        return;
    }
    const followers = currentUser.followers.data;
    res.json({
        success: true,
        error: null,
        data: followers
    })
})

module.exports.getFollowers = router;