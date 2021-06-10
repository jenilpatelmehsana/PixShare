const express = require('express')
const router = express.Router()
const User = require('./../../model/user')
const bodyParser = require('body-parser')
const validator = require('email-validator')
const urlencodedbody = bodyParser.urlencoded({ extended: false });

// login endpoint methods



//route
router.post('/login', urlencodedbody, async (req, res) => {
    const body = req.body;
    const email = body.email;
    // const password = body.password;
    const password = "hello you"
    console.log(body);
    if(validator.validate(email) == false) {
        res.json({
            success: false,
            error: "invalid email",
            user: null
        })
        return;
    }
    var user = await User.findOne({ email: email }).exec();
    if(user === null) {
        res.json({
            success: false,
            error: "no user found",
            user: null
        })
        return;
    }
    if(user.password !== password) {
        res.json({
            success: false,
            error: "wrong password",
            user: null
        })
        return;
    }
    if(user.token === null) {
        //must be found
        res.json({
            success: false,
            error: "contact authorization",
            user: null
        });
        return;
    }
    res.json({
        success: true,
        error: null,
        user: user
    });
})

module.exports.login = router;