const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const { register }  = require('./routes/auth/regiseter')

const app = express();

//.env config
dotenv.config({ path: "./config/config.env" });

//database connection
connectDB();

app.use('/', register);

const PORT = process.env.PORT || 3000;

app.get('/jenil',(req, res) => {
    console.log('asking for /jeinl');
    res.json({
        userName: "Jenil"
    })
})

app.listen(PORT, () => {
    console.log(`service running on ${PORT}`);
})