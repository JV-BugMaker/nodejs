//async流程控制模块
//series
async.series([
    function(callback){
        fs.readFile('file1.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('file2.txt','utf-8',callback);
    }
],function(err,result){
    //result => [file1.txt,file2.txt]
});

//series中传入的函数callback并非由使用者指定 ，此处的回调函数是由async通过高阶函数的方式注入
//每个callback执行时会将结果保存起来,然后执行下一个调用，直到结束所有调用.
//队列里的异步调用保存的结果以数组的方式传入，这里的异常处理，一旦出现异常就结束所有调用。

//异步并行调用
async.parallel([
    function(callback){
        fs.readFile('file1.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('file2.txt','utf-8',callback);
    }
],function(err,result){
    //result=>[file1.txt,file2.txt]
});

//异步并行调用 注入的回调函数 比较重要


async.waterfall([
    function(callback){
        fs.readFile('file1.txt','utf-8',function(err,content){
            //content是这次调用的结果
            callback(err,content);
        });
    },
    function(arg1,callback){
        fs.readFile(arg1,'utf-8',function(err,content){
            callback(err,content);
        });
    },
    function(arg1,callback){
        fs.readFile(arg1,'utf-8',function(err,content){
            callback(err,content);
        });
    },
],function(err,result){
    //result => file4.txt
});

//waterfall 当前一个的结果是后一个调用的输入


var deps = {
    readConfig:function(callback){
        //read config file 
        callback();
    },
    connectMongoDB:['readConfig',function(callback){
        //connect to mongodb 
        callback(); 
    }],
    connectRedis:['readConfig',function(callback){
        //connect to redis
        callback();
    }],
    complieAsserts:function(callback){
        callback();
    },
    uploadAsserts:['complieAsserts',function(callback){
        callback();
    }],
    startUp:[
        'connectMongoDB','connectRedis','uploadAsserts',function(callback){
            //startup

        }
    ],
};
//auto 方法能够根据依赖关系自动分析  以最佳顺序执行以上业务
async.auto();


//转换EventProxy实现

proxy.asap('readtheConfig',function(){
    //read config file
    proxy.emit('readConfig');
}).on('readConfig',function(){
    //connect to mongodb
    proxy.emit('connectMongodb');
}).on('readConfig',function(){
    //connect to redis
    proxy.emit('connectRedis');
}).asap('complietheasserts',function(){
    proxy.emit('complieAsserts');
}).on('complieAsserts',function(){
    proxy.emit('uploadAsserts');
}).all('connectMongodb','connectRedis','uploadAsserts',function(){
    //startup
});