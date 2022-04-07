const human = {
    name: 'Steven',
    age: 25
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My name is ${this.name} and my age is ${this.age}`); // don't forget the (``) to call this.name
    }
}

module.exports = human; //export the cont person
module.exports = Person; // Warning: we can't export 2 different modules. It will export the last called (here Person)