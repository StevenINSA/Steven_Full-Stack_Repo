const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //Let's test and see where the url is
    //console.log(req.url);  //this will print the url of the request, here '/' or if we go to localhost:4000/about, it will show '/about'
    // if (req.url === '/'){

    //     //when we are in the homepage, let's launch the index.html page
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => { //Here we gonna read the file located in our current path/public/index.html
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'}); //This will say that everything is ok (200) and say that we using html in a content-type variable
    //         res.end(content); //send the content of the file as a response
    //     });
    // }

    // if (req.url === '/about'){

    //     //when we are in the homepage, let's launch the index.html page
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => { //Here we gonna read the file located in our current path/public/index.html
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'}); //This will say that everything is ok (200) and say that we using html in a content-type variable
    //         res.end(content); //send the content of the file as a response
    //     });
    // }

    // //However, in a REST API, we should work with JSON data
    // if (req.url === '/api/users'){
    //     const users = [
    //         { name: 'Steven Gobet', age: 25 },
    //         { name: 'Noeline Migeon', age: 23 },
    //         { name: 'Wesley Gobet', age: 20 }
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'}); //Don't forget to put content type as a JSON
    //     res.end(JSON.stringify(users));
    // }

    //This way of adding pages are unefficient because you have to add the path everytime and if you want to add pictures or CSS, it doesn't gonna work
    //Better way to do:

    // Let's make the file path dynamic
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url); // if req.url === '/' then load 'index.html', else I want req.url whatever that is.

    // Let's now get the extension of the file. Indeed, we have to update the content-type according to the type of the file
    let extname = path.extname(filePath); // Give the extension of the file that is being uploaded, or being sent

    // Let's initate the default content type
    let contentType = 'text/html';

    // Check the extension and change the content type accordingly
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //So we took care of the path of the file and the content type. Now, we need to load the file

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err){
            if (err.code == 'ENOENT'){
                //if page not found
                //We'll load an error page
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                })
            } else {
                // If it is an other error, then it's a server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // If no errors, success!
            res.writeHead(200, {'Content-Type': contentType}); 
            res.end(content, 'utf-8');
        }
    });

});

//the customer would like maybe to decide which port he wants
//we store this choice into an environment virable
//if this virable is found, it will use it. If not, it will use port 5000.
const PORT = process.env.PORT || 4000;            

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//Note: run nodemon to change the code without reloading the server everytime.