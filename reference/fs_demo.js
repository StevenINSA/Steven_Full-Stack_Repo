// What we can access in the file:
// (function (exports, require, module, __filename, __dirname) {})
// console.log(__dirname, __filename)

const fs = require('fs');
const path = require ('path'); // path and fs are already included in nodejs

//Create a folder inside our (here create a folder test in reference)
// fs.mkdir(path.join(__dirname, 'test'), {}, function(err){   //mkdir is asynchronous (go through even we didn't finished)
//       if (err) throw err;                                   //Asynchronous implies callback function, which will be called when finished
//       console.log('Folder created');                        //we have a synchronous version but we use this one more often. 
// });

// Create and write to file
// fs.writeFile(path.join(__dirname, 'test', 'Hello.txt'), 'Hello World!', err => {  
//     if (err) throw err;             //if err throw it
//     console.log('File written to'); //if not print    

//     // We added the function into the callback function. Callback function is like a '.then' 
//     // Add additionnal text into an already exiting one
//     fs.appendFile(path.join(__dirname, 'test', 'Hello.txt'), ' I love Node.js', err => {  
//         if (err) throw err;             //if err throw it
//         console.log('File written to'); //if not print                                                    
//     });
// });

// Read file
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf-8', (err, data) => { 
        if (err) throw err;                                   
        console.log(data);    // data here is the uncoded data of hello.txt that we will print                   
 });

 // Rename a file
 fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'helloWorld.txt'), (err) => { 
    if (err) throw err;                                   
    console.log('File renamed...');                      
});
