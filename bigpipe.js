//异步并发控制方案 bigpipe

var Bagpipe = require('bagpipe');

//设定最大并发数10
var bagpipe = new Bagpipe(10);

for(var i = 0;i < 100;i++){
    //进入异步队列
    bagpipe.push(async,function(){
        //异步回调执行
    });
}
//当队列有变动的时候 就会通过事件 emit触发
bagpipe.on('full',function(length){
    console.log('当前队列长队:'+length);
});

//大致原型
Bagpipe.prototype.push = function(method){
    var args = [].slice.call(arguments,1);
    var callback = args[args.length-1]; //最后一个参数是回调函数
    if(typeof callback !== 'function'){
        args.push(function(){});
    }
    if(this.options.disabled || this.limit < 1){
        method.apply(null,args);
        return this;
    }

    if(this.queue.length < this.queueLength || !this.options.refuse){
        this.queue.push({
            method:method,
            args:args
        });
    }else{
        var err = new Error('Too much async call in queue');
        err.name = 'ToomuchAsyncCallError';
        callback(err);
    }

    if(this.queue.length > 1){
        this.emit('full',this.queue.length);
    }

    this.next();
    return this;
};

//next 原型
Bagpipe.prototype.next = function(){
    //上下文
    var that = this;
    if(that.active < that.limit && that.queue.length){
        var req = that.queue.shift();  //出队列
        that.run(req.method,req.args); //调用回调函数 执行
    }
};

Bagpipe.prototype.run = function(method,args){
    var that = this;
    that.active++;
    var callback = args[args.length - 1];
    var timer = null;
    var called = false;

    //inject logic
    args[args.length - 1] = function(err){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }

        if(!called){
            that._next();
            callback.apply(null,arguments);
        }else{
            if(err){
                that.emit('outdated',err);
            }
        }
    }

    var timeout = that.options.timeout;

    if(timeout){
        timeout = setTimeout(function(){
            called = true;
            that._next();

            var err = new Error(timeout + 'ms timeout');
            err.name = 'Bagpipe timeout error';
            err.data = {
                name:method.name,
                method:method.toString(),
                args:args.slice(0,-1),
            };
            callback(err);
        },timeout);
    }
    //指向null 是全局环境  上下文联系 node
    method.apply(null,args);
};

//拒绝模式

var bagpipe = new Bagpipe(10,{
    refuse:true,
    timeout:3000, // 设置异步调用超时设置 当超过规定时间的时候快速返回  防止调用时间过程阻塞
});
//设置拒绝模式 超过10个上线的时候 会快速拒绝