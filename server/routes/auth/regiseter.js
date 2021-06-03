const express = require('express')
const router = express.Router();


router.post('/register', (req, res) => {
    // registerUser
    console.log('req just came in');
    console.log(req);
    // console.log(req);
    res.json({
        userName: "jenil is userName"
    })
})


function genreateToken() {
    var token = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < 30; ++i) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
}

module.exports.register = router;
module.exports.genreateToken = genreateToken;