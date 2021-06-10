const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('./../../model/user')
const validator = require('email-validator')
const urlencodedbody = bodyParser.urlencoded({ extended: false })


function generateToken() {
    var token = "";
    const toeknLength = 300
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for(var i = 0; i < toeknLength; ++i) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
}

//register endpoint methods

async function registerNewUser(newUser) {
        await newUser.save((err, adv) => {
            if(err != null) {
                console.log(err.code);
            } else {
                console.log('success');
            }
        });
}

router.post('/register', urlencodedbody, async (req, res) => {

    // converting to User
    const body = req.body;
    var newUser = new User({
        userName: "",
        email: "",
        password: "",
        token: generateToken()
    })
    const email = body.email;
    if(validator.validate(email) === false) {
        res.json({
            success: false,
            error: "invalid email",
            user: null
        })
        return;
    }

    const password = body.password;
    const userName = body.userName;

    newUser.email = email;
    newUser.password = password;
    newUser.userName = userName;
    if(body.phone !== undefined) {
        newUser.phone = body.phone
    }

    // saving new user to the database

    // registerNewUser(newUser);

    var user;
    await newUser.save().then((savedUser) => {
        res.json({
            success: true,
            error: null,
            user: savedUser
        })
        return;
    }).catch((err) => {
        res.send({
            success: false,
            error: "email already exist" + err.code,
            user: null
        })
        return;
    })
})

module.exports.register = router;