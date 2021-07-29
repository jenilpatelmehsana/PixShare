const express = require('express')
const router = express.Router()
const User = require('../../model/user')

router.get('/getUserById', async(req, res) => {
    const id = req.query.id;
    if(id == null) {
        res.json({
            success: false,
            error: "invalid id",
            data : null
        })
        return;
    }
    var user = await User.findById(id);
    if(user == null) {
        res.json({
            succees: false,
            error: "user not found",
            data : null
        })
        return;
    }
    user.password = null;
    user.token = null;
    res.json({
        success: true,
        error: null,
        data : user
    })
})

module.exports.getUserById = router;
