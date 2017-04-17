//偏函数
var toString = Object.prototype.toString();
var isString = function(obj){
    return toString.call(obj) == '[Object String]';
}

var isFunction = function(obj){
    return toString.call(obj) == '[Object Function]';
}

var isType = function(type){
    return function(obj){
        return toString.call(obj) == '[Object '+type+']';
    }
}

var isString = isType('String');
var isFunction = isType('Function');
//通过指定部分参数来产生一个新的定制函数的形式就是偏函数

_.after = function(times,func){
    if(times<=0) return func();
    return function(){
        if(--times < 1) {return func.apply(this,arguments)}
    }
}

//实现按照传入的times和func实现需要调用多次才真正执行的实际函数的作用
//underscore中的after方法原理
