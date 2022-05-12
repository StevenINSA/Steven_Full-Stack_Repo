const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

//Get the user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

//Get the user by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

//Add user function (see /routes/users.js Register section)
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {     //will hash the password. Gensalt is like a random key that will hash the password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;    //replace password by the hashed one
            newUser.save(callback);     //and save it
        });
    });    
};

//Function for compare password to authenticate
module.exports.comparePassword = function(candidatePassword, hashPassword, callback){
    bcrypt.compare(candidatePassword, hashPassword, (err, isMatch)=> {
        if(err) throw err;
        callback(null, isMatch);
    });
};