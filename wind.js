//wind特殊异步解决方案

var compare = function(x,y){
    return x-y;
}

var swap = function(a,i,j){
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
};

var bubbleSort = function(array){
    for(var i = 0;i<array.length;i++){
        for(var j = 0;j<array.length-1 - i;i++){
            if(compare(array[j],array[i]) > 0){
                swap(array,j,j+1);
            }
        }
    }
}


//在冒泡排序中增加延迟

var compare = function(x,y){
    return x-y;
}
//利用eval能够访问上下文和编译器的特性，Wind.compile()会将普通的函数进行编译 然后交给eval进行执行
var swapAsync = eval(Wind.complie("async",function(a,i,j){
    //定义了异步任务
    $await(Wind.Async.sleep(20)); //暂停20秒
    //内置了setTimeout方法
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
    paint(a); //重绘数组
}));

var bubbleSort = eval(Wind.Async("async",function(array){
    for(var i = 0;i<array.length;i++){
        for(var j = 0;j<array.length-1 - i;i++){
            if(compare(array[j],array[i]) > 0){
                //任务模型 实现等待完成异步方法 只是一个等待占位符 告之编译器这里需要等待
                $await(swapAsync(array,j,j+1));
            }
        }
    }
}));


//Wind使用whenAll来并行处理

var Wind = require("wind");
var Task = Wind.Async.Task;

var readFileAsync = function(file,encoding){
    return Task.create(function(t){
        fs.readFile(file,encoding,function(err,file){
            if(err){
                t.complete('failure',err);
            }else{
                t.complete('success',file);
            }
        });
    });
};


var parallel = eval(Wind.compile('async',function(){
    var result = $await(Task.whenAll({
        file1:readFileAsync('file1.txt','utf-8'),
        file2:readFileAsync('file2.txt','utf-8'),
    }));

    console.log(file1);
    console.log(file2);
}));