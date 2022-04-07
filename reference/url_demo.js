const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

// Get serialized URL
console.log(myUrl.href);
console.log(myUrl.toString()); //same value

// Get host (root domain)
console.log(myUrl.host);

// Get hostname
console.log(myUrl.hostname); // difference? hostname doesn't include the port

// Path name
console.log(myUrl.pathname); // show the actual file

// Serialized query
console.log(myUrl.search); //everything after the ? mark in the URL

// Params object
console.log(myUrl.searchParams);

// Add params dynamically
myUrl.searchParams.append('abc', '123');
console.log(myUrl.search);
console.log(myUrl.searchParams);

// Loop through Params
myUrl.searchParams.forEach((value,name) => console.log(`${name}, ${value}`));
