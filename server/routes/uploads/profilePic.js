const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const storage = multer.diskStorage({
    destination: "Misc/profileUploads/",
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname) + path.extname(file.originalname))
    }
})
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

router.post('/profilePicUpload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.sendStatus(200);
  })

module.exports.profileUpload = router;