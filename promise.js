//promise/deferred

var Promise = new function(){
    EventEmitter.call(this);
}
util.inherits(Promise,EventEmitter);

Promise.prototype.then = function(fulfilledHandler,errorHandler,progressHandler){
    if(typeof fulfilledHandler ==='function'){
        //利用once方法 保证成功回调只执行一次
        this.once('success',fulfilledHandler);
    }
    if(typeof errorHandler ==='function'){
        this.once('error',errorHandler);
    }

    if(typeof progressHandler === 'function'){
        this.on('progress',progressHandler);
    }
    return this;
}
//then 方法是把回调函数存放起来 执行这些回调函数的对象通常称为Deferred 延迟对象

var Deferred = function(){
    this.state = 'unfulfilled';
    this.promise = new Promise();
}

Deferred.prototype.resolve = function(obj){
    this.state = 'fulfilled';
    this.promise.emit('success',obj);
}
Deferred.prototype.reject = function(err){
    this.state = 'failed';
    this.promise.emit('error',err);
}

Deferred.prototype.success = function(data){
    this.state = 'success';
    this.promise.emit('progress',data);
}