// Much of the Node.js core API is built around an idiomatic asynchronous event-driven  
// architecturein which certain kinds of objects (called "emitters") emit named events that cause Function 
// objects ("listeners") to be called.

const EventEmitter = require('events');

// Create an emitter class
class MyEmitter extends EventEmitter {}

// Init object
const myEmitter = new MyEmitter();

// Create an event listener
myEmitter.on('event', () => console.log('Event fired!')); //this object will do something when the event 'event' is launched

// Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');

// So here, we created an emitter and a listener, where the listener will be called after the emitter will send en event. 
