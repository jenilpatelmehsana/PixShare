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
            status: "error",
            error: "invalid email"
        })
        return;
    }
    var user = await User.findOne({ email: email }).exec();
    if(user === null) {
        res.json({
            status: "error",
            error: "no user found"
        })
        return;
    }
    if(user.password !== password) {
        res.json({
            status: "error",
            error: "wrong password"
        })
        return;
    }
    if(user.token === null) {
        //must be found
        res.sendStatus(500);
        console.log(`${user.email} token not found`);
        return;
    }
    res.send(user)
})

module.exports.login = router;