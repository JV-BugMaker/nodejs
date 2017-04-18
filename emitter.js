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

//如果对一个事件的监听超过10个 会引起警告 是node基于单线程运行 过多的监听器会导致内存泄漏 
//emitter.setMaxListeners(0) 可以将这个限制去掉 由于事件发布会引擎侦听器执行，会导致CPU占用过高的场景。
//一个健壮的EventEmitter一定包括对error的监听，否则会导致进程的退出

function Stream(){
    events.EventEmitter.call(this);
}

util.inherits(Stream,events.EventEmitter);

