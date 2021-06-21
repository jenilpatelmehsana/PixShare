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
const app = express();

//.env config
dotenv.config({ path: "./config/config.env" });

//database connection
mongoose.set('useFindAndModify', false);
connectDB();


app.use('/', register);
app.use('/', login);
app.use('/', profileUpload)
app.use('/', postUpload)
app.use('/', like)
app.use('/', comment)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`service running on ${PORT}`);
})