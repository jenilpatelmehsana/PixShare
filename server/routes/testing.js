const User = require('./../model/user')
const fs = require('fs')
const express = require('express')
const router = express.Router()

router.get('/test', async (req, res) => {
    const user = await User.findOne({
        email: "jenilpatelmehsana@gmail.com"
    }).exec();
    res.send(user)
})

module.exports.test = router;