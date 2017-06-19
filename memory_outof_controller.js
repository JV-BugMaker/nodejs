//内存泄漏 应当回收的对象出现意外而没有回被回收 常驻老生代中的对象
//原因可能
//缓存、队列消费不及时、作用域未释放

//创建缓存对象 但是会对gc产生影响

var cache = {};
var get = function(key){
    if(cache[key]){
        return cache[key];
    }else{
        //get the value from other resource
    }
};

var set = function(){
    cache[key] = value;
};



//limit cache strangy 缓存限制策略

var LimitableMap = function(limit){
    this.limit = limit || 10;
    this.map = {};
    this.keys = [];
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

LimitableMap.prototype.set = function(key,value){
    var map = this.map;
    var keys = this.keys;
    if(!hasOwnProperty.call(map,keys)){
        if(keys.length === this.limit){
            var firstKey = keys.shift();
            delete map[firstKey];
        }

        keys.push(key);
    }

    map[key] = value;
};

LimitableMap.prototype.get = function(key){
    return this.map[key];
};

module.exports = LimitableMap;
