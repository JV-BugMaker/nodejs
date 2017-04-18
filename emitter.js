//异步编程 事件发布/订阅模式
var events = require('events');
//它具有 addListener/on() once() removeListener() removeAllListener() emit()
var event = new events.EventEmitter();
event.on('event1',function(message){
    console.log(message);
});
event.emit('event1','i am jv');


var options = {
    host:"www.google.com",
    prot:"80",
    path:"/upload",
    method:"POST",
};

var req = http.request(options,function(res){
    console.log('STATUS:'+res.statusCode);
    console.log('HEADERS:'+JSON.stringify(res.headers));

    res.setEncoding('utf8');
    res.on('data',function(chunk){
        console.log('BODY:'+chunk);
    });

    res.on('end',function(){
        //TODO 
    });
});
//on 为我们提供我们需要关注的事件
req.on('error',function(e){
    console.log('problem with request:'+e.message);
});

req.write('data\n');
req.write('data\n');
req.end();

//事件订阅发布方式使得我们只需要各个事件的节点即可