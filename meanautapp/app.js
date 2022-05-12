//Bring in the useful modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session'); //debug

//Importing
const users = require('./routes/users');
const config = require('./config/database');

//Connect function from mongooose to connect to our database
mongoose.connect(config.database);

//To know if we are connected to the database
mongoose.connection.on('connected', () => {
    console.log('Connected to the database'+config.database);
});

//Check if database error
mongoose.connection.on('error', (err) => {
    console.log('Database error'+config.database);
});


//initilize our app variable
const app = express(); 

//Port number
const PORT = 3000; //variable for the port we are using

//Session support middleware
app.use(session({ secret: 'melody hensley is my spirit animal' }));

//Cors middleware
app.use(cors()); //cors is useful to disable some routes during the authentication phase

//Set static folder 
app.use(express.static(path.join(__dirname, 'public'))); //Remainder: static folder automatically detect the request path and run the code included in the right route file

//Body-parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users); //everything that coming from the route localhost:3000/users/xxx will be computed by the users route file

//Index route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
});

//Start server
app.listen(PORT, () => {
    console.log('Server started on port'+PORT);
});



