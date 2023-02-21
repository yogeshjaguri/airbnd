const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const becryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'chfddfsssdtfd';

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173/',
}));

mongoose.connect(process.env.MONGO_URL);

//bTx633hotEGN6Zro

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    try {
    const userdoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, becryptSalt),
    });
    res.json(userdoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const{email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({email:userDoc.email, id:userdoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            });
            res.cookie(422).json("pass not ok")

        } else {
            res.json('pass not ok');
        }
    }else{
        res.json('not found');
    }
})
 
app.listen(4000);