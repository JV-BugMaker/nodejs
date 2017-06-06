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