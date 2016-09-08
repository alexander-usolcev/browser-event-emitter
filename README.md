# browser-event-emitter
Simple implementation of [EventEmitter](https://nodejs.org/api/events.html) in browser.

For building you can use [Webpack](https://webpack.github.io/) or something like it.

## Install
``` js
npm install browser-event-emitter --save-dev
```

## Usage
Create your es6 file:
``` js
import EventEmitter from 'browser-event-emitter';


function test() {
    let eventEmitter = new EventEmitter();

    eventEmitter.on('test', (data) => {
        console.log('test 1. Data is ' + data);
    });

    function cb() {
        console.log('test 2');
    }
    eventEmitter.on('test', cb);

    console.log(eventEmitter.eventNames()); // ['test']

    eventEmitter.emit('test', 'test data');


    console.log('remove one listener');
    eventEmitter.removeListener('test', cb);

    eventEmitter.emit('test', 'new test data');
}

export default test();

```

and then build it with webpack.

Add to html page you generated script and open console tab in devtools:
```
<script src='my-bundle.js'></script>
```
you will see:
``` js
['test']
test 1. Data is test data
test 2
remove one listener
test 1. Data is new test data
```

## API
### eventEmitter.addListener(eventName, listener)
Alias for eventEmitter.on(eventName, listener).

### eventEmitter.on(eventName, listener)
Adds the listener function to the end of the listeners array for the event named eventName.
``` js
let eventEmitter = new EventEmitter();

eventEmitter.on('test', (data) => {
    console.log('test 1. Data is ' + data);
});
```

### eventEmitter.removeListener(eventName, listener)
Removes the specified listener from the listener array for the event named eventName.
``` js
eventEmitter.removeListener('test', callback);
```

### eventEmitter.removeAllListeners(eventName)
Removes all listeners, or those of the specified eventName.
``` js
eventEmitter.removeAllListeners('test');
```

### eventEmitter.emit(eventName[, arg1][, arg2][, ...])
Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
``` js
eventEmitter.emit('test', 'data', 'another data');
```

### eventEmitter.eventNames()
Returns an array listing the events for which the emitter has registered listeners.
``` js
let eventEmitter = new EventEmitter();

eventEmitter.on('bar', () => { });
eventEmitter.on('foo', () => { });

console.log(eventEmitter.eventNames()); // ['bar', 'foo']
```