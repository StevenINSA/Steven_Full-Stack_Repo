const http = require('http');

// Create a server object
http.createServer((req, res) => {
    //write a response 
    res.write("Hello World!");
    res.end();
}).listen(4000, () => console.log('Server is running...'));

// Here, the server will respond Hello World! to the port 8000 => run localhost:8000 to the browser to see it