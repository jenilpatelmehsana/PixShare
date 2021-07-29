const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const { register }  = require('./routes/auth/regiseter')
const { login } = require('./routes/auth/login')
const { like } = require('./routes/postUtils/like');
const { postUpload } = require('./routes/uploads/uploadPost')
const { profileUpload } = require('./routes/uploads/profilePic');
const { comment } = require('./routes/postUtils/comment');
const bodyParser = require('body-parser');
const { getTimeline } = require('./routes/timeline/getTimeline');
const { follow } = require('./routes/follow/follow');
const { getFollowers } = require('./routes/follow/getFollowers');
const app = express();

//.env config
dotenv.config({ path: "./config/config.env" });

//database connection
mongoose.set('useFindAndModify', false);
connectDB();

app.use(bodyParser.json())

app.use('/', register);
app.use('/', login);
app.use('/', profileUpload)
app.use('/', postUpload)
app.use('/', like)
app.use('/', comment)
app.use('/', getTimeline)
app.use('/', follow)
app.use('/', getFollowers)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`service running on ${PORT}`);
})