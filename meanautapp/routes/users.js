// All of users' routes

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { addListener } = require('../models/user');

const router = express.Router();


//Register route
router.post('/register', (req, res, next) => {   //as we are in the folder users.js, the route here is localhost:3000/users/register
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // Call the function Add user from /models/user (store in the database?)
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({sucess: false, msg: 'Failed to register'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

//Authenticate route
router.post('/authenticate', (req, res, next) => {  
    res.send('AUTHENTICATE');
});

//Profile route
router.get('/profile', (req, res, next) => {  
    res.send('PROFILE');
});

module.exports = router;