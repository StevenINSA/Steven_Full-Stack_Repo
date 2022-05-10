// All of users' routes

const express = require('express');
const router = express.Router();

//Register route
router.get('/register', (req, res, next) => {   //as we are in the folder users.js, the route here is localhost:3000/users/register
    res.send('REGISTER');
});

//Authenticate route
router.get('/authenticate', (req, res, next) => {  
    res.send('AUTHENTICATE');
});

//Profile route
router.get('/profile', (req, res, next) => {  
    res.send('PROFILE');
});

//Validate route
router.get('/validate', (req, res, next) => {  
    res.send('VALIDATE');
});

module.exports = router;