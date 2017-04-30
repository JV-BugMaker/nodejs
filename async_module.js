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
