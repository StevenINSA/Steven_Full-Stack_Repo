console.log("Hello from Node");

const Person = require('./person'); //import the module the last exported module from the file person.js. ./ mean current folder

const person1 = new Person('Noeline', 23);
const person2 = new Person('Alfred', 53);

console.log(person1.name);
person1.greeting();
person2.greeting();