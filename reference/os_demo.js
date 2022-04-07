// os gives us information about our environment and operating system

const os = require('os');

// What platform are we? OS, Windows, ...
console.log(os.platform()); //Logs darwin, which is the platform for Mac.

// CPU architecture
console.log(os.arch());

// CPU core info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());