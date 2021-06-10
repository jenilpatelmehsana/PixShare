const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const User = require('./../../model/user')
const bodyParser = require('body-parser')
const urlencodedbody = bodyParser.urlencoded({ extended: false });
var filePath;
const storage = multer.diskStorage({
    destination: "Misc/profileUploads/",
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname))
        filePath = path.basename(file.originalname);
    }
})
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

// endpoint methods

async function addImageToDatabase(email, token) {
    var user = await User.findOne({
        email: email
    }).exec();
    if(user.token != token) {
        return false;
    }
    const query = {
        email: email
    }
    filePath =  `.\\..\\server\\Misc\\profileUploads\\${filePath}`;
    console.log(filePath);
    const update = {
        profilePicture: { 
            data : fs.readFileSync(filePath),
        }
    }
    console.log('ok');
    await User.findOneAndUpdate(query, update, {new: true}, (err, doc) => {
        if(err !== null) {
            console.log(err.message);
        } else {

        }
        console.log(doc);
    })
}


router.post('/profilePicUpload', urlencodedbody, upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const email = req.body.email;
    const token = req.body.token;
    const resp = addImageToDatabase(email, token);
    if(resp === false) {
        return;
    }
    res.sendStatus(200);
  })

module.exports.profileUpload = router;