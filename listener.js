const Logger = require('./logger');

const logger = new Logger(); // As Logger is a class, we have to initate it

// let's listen the emitter and do something with the data returned when the emitter emits
//logger.on('message', (data) => console.log(`Called listener: ${data}`));  this syntax is wrong because data is not an object
logger.on('event_message', (data) => console.log('Called listener:', data));

// let's call the log method to emit the event
logger.log('Hello World');
logger.log('Hey');
logger.log('new message');



/*

To sum up:

We created a class Emitter (called Logger) that will emit a certain event, here the event is called 'message'
The event will also create an id and print the message that is included in the log function

We also created a listener that will do something when this event 'message' is emited. 

So, when we call the log function with a message argument, it will emit an event with an id and the message
In the other hand, the listener will catch the event 'message' when emited and print the data inside the event sent
Here, the data is the new uuid and the message included in the log function.

Every time we call the log function, it will create an id and print the message.

*/