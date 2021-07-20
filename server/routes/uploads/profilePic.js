const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const User = require('./../../model/user')
const bodyParser = require('body-parser')
const urlencodedbody = bodyParser.urlencoded({ extended: false });
var filePath;
var fileSize;
const maxFileSize = 5000000
const storage = multer.diskStorage({
    destination: "Misc/profileUploads/",
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname))
        fileSize = file.size;
        filePath = path.basename(file.originalname);
    }
})
const upload = multer({ 
    storage: storage,
    // limits: {
    //     fileSize: maxFileSize
    // }
})

// endpoint methods

router.put('/profilePicUpload', urlencodedbody, upload.single('avatar'), async (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const email = req.body.email;
    const token = req.body.token;

    var user = await User.findOne({
        email: email
    }).exec();

    if(user === null) {
        res.json({
            success: false,
            error: "user not found",
            Buffer: null
        })
        return
    }

    if(user.token != token) {
        res.json({
            success: false,
            error: "token not matched",
            Buffer: null
        })
        return
    }

    if(fileSize > maxFileSize) {
        res.json({
            success: false,
            error: "file size too large",
            profilePicture: null
        })
        return
    }

    const query = {
        email: email
    }
    if(filePath === undefined) {
        res.json({
            success: false,
            error: undefined,
            user: null
        })
        return
    }
    filePath =  `.\\..\\server\\Misc\\profileUploads\\${filePath}`;
    const update = {
        profilePicture: { 
            data : fs.readFileSync(filePath),
        }
    }

    User.findOneAndUpdate(query, update, {new: true}).then((doc) => {
        res.json({
            success: true,
            error: null,
            profilePicture: doc.profilePicture.data
        })
        return
    }).catch((err) => {
        res.json({
            success: false,
            error: err.message,
            profilePicture: null
        })
        return
    })
  })

module.exports.profileUpload = router;