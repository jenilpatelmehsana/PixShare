const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const { register }  = require('./routes/auth/regiseter')
const { login } = require('./routes/auth/login')
const app = express();

//.env config
dotenv.config({ path: "./config/config.env" });

//database connection
connectDB();


app.use('/', register);
app.use('/', login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`service running on ${PORT}`);
})