// All of users' routes

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { addListener } = require('../models/user');
const config = require('../config/database');

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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                // const token = jwt.sign(user, config.secret, {    //not working
                //     expiresIn: 604800 //1 week
                // });
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id, 
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else { //if not match
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//Profile route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {     //To protoect /profile route
    res.json({user: req.user});
});

module.exports = router;