//回调函数 就是异步编程直接体现的
function heavyCompute(n,callback){
    var count = 0,i,j;
    for( i = n;i>0;--i){
      for (j = n; j > 0; --j) {
            count += 1;
        }
    }
    callback(count);
}


heavyCompute(10000,function(count){
    console.log(count);
});

//JS本身是单线程的，无法异步执行，因此我们可以认为setTimeout这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，
//让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。
//
//同步方式

var output = fn1(fn2('input'));
//函数返回值

//异步编程

fn2('input',function(ouput2){
    fn1(output2,function(output1){

    });
});


(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // All array items have processed.
}));


//node提供domain域模块 来简化异步代码的异常处理
//一个域就是node执行的环境  使用process来捕获全局异常函数
process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
    fn();
});


//使用domain方式
function async(request, callback) {
    // Do something.
    asyncA(request, function (data) {
        // Do something
        asyncB(request, function (data) {
            // Do something
            asyncC(request, function (data) {
                // Do something
                callback(data);
            });
        });
    });
}
//使用.create方法创建了一个子域对象，并通过.run方法进入需要在子域中运行的代码的入口点。
http.createServer(function (request, response) {
    var d = domain.create();

    d.on('error', function () {
        response.writeHead(500);
        response.end();
    });

    d.run(function () {
        async(request, function (data) {
            response.writeHead(200);
            response.end(data);
        });
    });
});
