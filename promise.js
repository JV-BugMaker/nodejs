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


var promisify = function(res){
    var deferred = new Deferred();

    var result = '';
    res.on('data',function(chunk){
        result += chunk;
        deferred.progress(chunk);
    });

    res.on('end',function(){
        deferred.resolve(result);
    });
    res.on('error',function(err){
        deferred.reject(err);
    });

    return deferred.promise;
}

promisify.then(function(){
    //done
},function(err){

},function(chunk){
    console.log(chunk);
});

