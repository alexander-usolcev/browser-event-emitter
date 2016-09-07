import EventEmitter from '../source/event-emitter';


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

    eventEmitter.emit('test');
}

export default test();