const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('./../../model/user')
const Post = require('./../../model/post')
const addToTimeline = require('../timeline/timeline')
const urlencodedbody = bodyParser.urlencoded({ extended: false });
const maxFileSize = 5000000

var filePath1, filePath2;
var fileSize;

var check = true;

const storage = multer.diskStorage({
    destination: "Misc/postUpload/",
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname))
        fileSize = file.size;
        if(check === true) {
            filePath1 = path.basename(file.originalname);
            check = false
        } else {
            filePath2 = path.basename(file.originalname)
        }
    }
})

const upload = multer({ 
    storage: storage,
    // limits: {
    //     fileSize: maxFileSize
    // }
})

// adding post to user

function addPostToUser(postId, user) {
    User.findOneAndUpdate(
        {
            email: user.email
        },
        {
            $push: {
                "posts.data" : postId
            },
            $inc: {
                "posts.postCount    ": 1
            }
        },
        (err, obj) => {
            if(err) {
                console.log(err);
            }
        }
    )
}

// uploading post

router.post('/uploadPost', urlencodedbody, upload.array('post', 2) ,async (req, res) => {
    const body = req.body;
    const email = body.email;
    const token = body.token;

    const user = await User.findOne({
        email: email
    }).exec();

    if(user === null) {
        res.json({
            success: false,
            error: 'user not found',
            post: null
        })
        return
    }

    if(user.token != token) {
        res.json({
            success: false,
            error: 'token not matched',
            post: null
        })
        return
    }

    if(fileSize > maxFileSize) {
        res.json({
            success: false,
            error: 'too large file',
            post: null
        })
        return
    }

    var d = new Date();
    filePath1 =  `.\\..\\server\\Misc\\postUpload\\${filePath1}`;
    filePath2 =  `.\\..\\server\\Misc\\postUpload\\${filePath2}`;
    const millisecs = Date.now()
    var newPost = new Post({
        postId: user.userName + millisecs,
        data: {
            before: fs.readFileSync(filePath1),
            after: fs.readFileSync(filePath2)
        },
        owner: user._id
    })

    // delete stored files
    try {
        fs.unlinkSync(filePath1)
        fs.unlinkSync(filePath2)
    } catch (err) {
        console.log(err);
    }

    await newPost.save().then((obj) => {
        res.json({
            success: true,
            error: null,
            post: null
        })
        // add to user
        
        addPostToUser(obj._id, user)
        addToTimeline(obj, user)
        
    }).catch((err) => {
        res.json({
            success: false,
            error: err,
            post: null
        })
    })
    return

})

module.exports.postUpload = router;