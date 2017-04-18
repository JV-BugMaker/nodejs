//异步编程 事件发布/订阅模式
var events = require('events');
//它具有 addListener/on() once() removeListener() removeAllListener() emit()
var event = new events.EventEmitter();
event.on('event1',function(message){
    console.log(message);
});
event.emit('event1','i am jv');
