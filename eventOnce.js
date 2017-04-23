//利用事件队列解决雪崩状态
var events = require('events');

var proxy = new events.EventEmitter();

var status = "ready";

var select = function(callback){
    //所有请求的回调都压入事件队列中
    proxy.once('select',callback);

    if(status == 'ready'){
        status = 'pending';
        db.select("SQL",function(results){
            //完成查询 触发事件 让各个回调消费这一次查询的结果
            proxy.emit('selected',results);
            status = "ready";
        });
    }
}

var proxy = new EventProxy();

//监听所有事件 当所有事件都完成之后才会执行回调函数 且执行事件的顺序按照此列表是一致的
proxy.all("template","data","resources",function(template,data,resources){
    //TODO

});

fs.readFile(template_path,"utf8",function(err,template){
    proxy.emit("template",template);
});

db.query(sql,function(err,data){
    proxy.emit("data",data);
});

l1on.get(function(err,resources){
    proxy.emit("resources",resources);
});
//all 方法只会执行一次 tail()方法会在满足条件之后执行一次 还会在组合事件中的某个事件再次触发，侦听器会使用最新的数据继续执行


//after 方法会实现事件执行多少次后 执行侦听器的单一事件组合订阅方式

var proxy = new EventProxy();

proxy.after("data",10,function(datas){
    //TODO
});

trigger:function(eventName){
    var list,calls,ev,callback,args;
    var both = 2;
    if(!(calls = this._callbacks)) return this;
    
}