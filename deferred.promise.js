//多异步promise


var Deferred = new function(){
    this.promise = new Promise();
}

//完成态

Deferred.prototype.resolve = function(obj){
    var promise = this.promise;
    var handler ;
    while((handler = promise.queue.shift())){
        if(handler && handler.fulfilled){
            var ret = handler.fulfilled(obj);
        }
        //是否是新的promoise对象是的话 剩余的回调交由其处理
        if(ret && ret.isPromise){
            //promise对象处理替换
            ret.queue = promise.queue;
            this.promise = ret;
            return ;
        }
    }
}

Deferred.prototype.reject = function(err){
    var promise = this.promise;
    var handler ;
    while((handler = promise.queue.shift())){
        if(handler && handler.error){
            var ret = handler.error(err);
            if(ret && ret.isPromise){
                ret.queue = this.promise;
                this.promise = queue;
                return;
            }
        }
    }
}

//生成回调
Deferred.prototype.callback = function(){
    var that = this;
    return function(err,file){
        if(err){
            return that.reject(err);
        }
        that.resolve(file);
    }
}


var Promise = function(){
    this.queue = [];
    this.promise = true;
}


Promise.prototype.then = function(fulfilledHandler,errorHandler,progressHandler){
    var handler = {};
    if(typeof fulfilledHandler == 'function'){
        handler.fulfilled = fulfilledHandler;
    }
    if(typeof errorHandler == 'function'){
        handler.error = errorHandler;
    }
    if(typeof progressHandler == 'function'){
        handler.progress = progressHandler;
    }
    //按照顺序推入到队列中去
    this.queue.push(handler);
    return this;
}


