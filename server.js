const express = require('express'); 
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('./middleware/logger');


const app = express(); //Initialize express

//Init Middleware function
app.use(logger); //see logger.js 

//Body parser middleware
app.use(express.json());    //will handle raw JSON
app.use(express.urlencoded({ extended: false}));

//Handlebars middleware 
//app.engine('handlebars', engine({defaultLayout: 'main'}));
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));  //We setup our template engine to Handlebars and setting the default laying to the file name
//app.set('view engine', 'handlebars');      //Setting the view engine.

app.get('/', (req, res) => res.render('index'));

app.get('/', (req, res) => {
    //to send from scratch
    //res.send('<h1>Hello World!</h1>')

    //to send from a file
    //res.sendFile(path.join(__dirname, 'public', 'index.html'))  //__dirname is the file path until server.js file

    //Create a static folder
    app.use(express.static(path.join(__dirname, 'public')));  //use can include middlewares. 'public' is the static folder
});

//Members API Routes
app.use('/api/members', require('./routes/api/members'));   //We use app.use this way to call the router.get function from members file.
//As we set here 'api/members', we can delete it in the members file.



const PORT = process.env.PORT || 5500; // we will check if the server is running in a specific port, or run on port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));