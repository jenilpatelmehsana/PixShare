const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('./../../model/user');
const urlencodedbody = bodyParser.urlencoded({ extended: false });


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

function convertToUser(req) {
    const x = req.body; // worse naming
    const newUser = new User({
        userName: x.userName,
        email: x.email,
        password: x.password,
        token: generateToken()
    })
    if(x.phone !== undefined) {
        newUser.phone = x.phone
    } else {
        newUser.phone = null
    }
    // console.log(newUser);
    return newUser;
}

async function registerNewUser(newUser) {
        await newUser.save((err, adv) => {
            if(err != null) {
                console.log(err.code);
            } else {
                console.log('success');
            }
        });
}

router.post('/register', urlencodedbody, (req, res) => {
    const newUser = convertToUser(req);
    registerNewUser(newUser);
    res.send('done')
})

module.exports.register = router;